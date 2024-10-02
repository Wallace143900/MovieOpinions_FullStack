import { sign } from "jsonwebtoken";
import { prisma } from "../database/prisma";
import { TLoginReturn, TUserLoginBody, TUserRegisterBody, TUserReturn, userReturnSchema } from "../schemas/user.schemas";
import bcrypt from 'bcrypt';
import { injectable } from "tsyringe";
import { AppError } from "../errors/appError";

@injectable()
export class UserServices {
    async register(body: TUserRegisterBody): Promise<TUserReturn> {
        const hashPassword = await bcrypt.hash(body.password, 10);

        const newUser: TUserRegisterBody = {
            name: body.name,
            email: body.email,
            password: hashPassword,
        };

        const data = await prisma.user.create({ data: newUser});

        const schemaReturn = userReturnSchema.parse(data);

        return schemaReturn
    }

    async login(body: TUserLoginBody): Promise<TLoginReturn> {
        const user = await prisma.user.findFirst({ where: {email: body.email} });

        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }

        const compare = await bcrypt.compare(body.password, user.password);

        if (!compare) {
            throw new AppError("Senha incorreta", 404);
        }

        const secret = process.env.JWT_SECRET as string;

        if (!secret) {
            throw new AppError("JWT_SECRET não configurado no ambiente", 401);
        }
        
        const token = sign(
            { id: user.id }, secret, {
            expiresIn: "24h",
            subject: String(user.id),
        });

        if (typeof token !== 'string') {
            throw new Error("Falha na geração do token");
        }

        return {
            accessToken: token,
            user: userReturnSchema.parse(user),
        }
    }

    async getUser(id: number): Promise<TUserReturn> {
        const user = await prisma.user.findFirst({ where: {id} });

        if (!user) {
            throw new AppError("User not found", 404);
        }
        return userReturnSchema.parse(user);
    }
}