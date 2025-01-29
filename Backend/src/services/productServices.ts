import { Repository } from "typeorm";
import { Product } from "../entities/index.js";
import { categoryService } from "./categoryServices.js";
import { validateOrReject, ValidationError } from "class-validator";
import { GraphQLError } from "graphql";
import { appDataSource } from "../database/data-source.js";

export class ProductServices {
  constructor(private productRepository: Repository<Product>) {}

  async findProductById(id: number) {
    return await this.productRepository.findOneBy({ id });
  }

  async getProductByCategory(categoryName: string) {
    const category = await categoryService.findCategoryByName(categoryName);
    if (!category) {
      throw new GraphQLError("Category doesn't exist", {
        extensions: { code: "NOT_FOUND" },
      });
    }
    const categoryId = category.id;
    return await this.productRepository.find({
      where: { category: { id: categoryId } },
      relations: ["category"],
    });
  }
}

export const productService = new ProductServices(
  appDataSource.getTreeRepository(Product)
);
