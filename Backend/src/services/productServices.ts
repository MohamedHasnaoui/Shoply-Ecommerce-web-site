import { Repository } from "typeorm";
import { Product, Seller } from "../entities/index.js";
import { appDataSource } from "../database/data-source.js";
import { CreateProductInput } from "../graphql/types/resolvers-types.js";
import { validateOrReject } from "class-validator";
import { GraphQLError } from "graphql";
import { categoryService } from "./categoryServices.js";

export class ProductServices {
  constructor(private productRepository: Repository<Product>) {}

  async create(createProductInput: CreateProductInput, owner: Seller) {
    const category = await categoryService.findById(
      createProductInput.categoryId
    );
    const product = this.productRepository.create({
      ...createProductInput,
      owner,
      category,
    });
    try {
      validateOrReject(product);
      return await this.productRepository.save(product);
    } catch (errors) {
      throw new GraphQLError("validation error", {
        extensions: { errors, code: "BAD USER INPUTS" },
      });
    }
  }

  async update(product: Product) {
    return await this.productRepository.save(product);
  }

  async remove(product: Product) {
    await this.productRepository.remove(product);
    return true;
  }

  async findById(id: number) {
    return await this.productRepository.findOne({
      where: { id },
      relations: { owner: true },
    });
  }

  async getByCategory(categoryId: number, pageNb?: number, pageSize?: number) {
    if (pageNb && pageSize) {
      return await this.productRepository.find({
        order: { id: "DESC" },
        where: { category: { id: categoryId } },
        take: pageSize,
        skip: (pageNb - 1) * pageSize,
      });
    }
    return await this.productRepository.find({
      where: { category: { id: categoryId } },
    });
  }
  async getAll(pageNb?: number, pageSize?: number) {
    if (pageNb && pageSize) {
      return await this.productRepository.find({
        order: { id: "DESC" },
        take: pageSize,
        skip: (pageNb - 1) * pageSize,
      });
    }
    return await this.productRepository.find();
  }
  async incrementQuantity(productId: number, quantity: number) {
    const product = await this.findById(productId);
    if (product === null) {
      throw new GraphQLError("Product not found", {
        extensions: { code: "BAD USER INPUTS" },
      });
    }
    product.quantity += quantity;
    return await this.update(product);
  }
}

export const productService = new ProductServices(
  appDataSource.getTreeRepository(Product)
);
