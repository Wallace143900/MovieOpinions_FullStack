"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_services_1 = require("../services/category.services");
class CategoryController {
    getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryService = new category_services_1.CategoryServices();
            const { id } = req.params;
            const movie = yield categoryService.getCategoryById(Number(id));
            return res.status(200).json(movie);
        });
    }
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieService = new category_services_1.CategoryServices();
            const categories = yield movieService.getAllCategories();
            return res.status(200).json(categories);
        });
    }
}
exports.CategoryController = CategoryController;
