import { prisma } from "../database/prisma";

export class CategoryServices {
    async getCategoryById(id: number) {
        return await prisma.category.findUnique({
            where: { id },
            include: {
                movies: true,
            },
        });
    }

    async getAllCategories() {
        return await prisma.category.findMany();
    }
}