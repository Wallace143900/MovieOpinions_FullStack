import { Router } from "express";
import { container } from "tsyringe";
import { UserServices } from "../services/user.services";
import { UserController } from "../controllers/user.controller";
import { ValidateBody } from "../middleware/validateBody.middleware";
import { userRegisterBodySchema } from "../schemas/user.schemas";
import { IsEmailRegistered } from "../middleware/isEmailRegistered.middlware";
import { VerifyToken } from "../middleware/verifyToken.middleware";
export const userRouter = Router();

container.registerSingleton('UserServices', UserServices);

const userControllers = container.resolve(UserController);

userRouter.post('/register', ValidateBody.execute(userRegisterBodySchema), IsEmailRegistered.execute, (req, res) => {
    console.log("Dados recebidos no backend:", req.body);
    userControllers.register(req, res);
});

userRouter.post('/login', (req, res) => {userControllers.login(req, res)});

userRouter.get('/profile', VerifyToken.execute, (req, res) => {userControllers.getUser(req, res)});