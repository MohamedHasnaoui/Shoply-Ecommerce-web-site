import { Equal, Like, MoreThan, Not, Repository } from "typeorm";
import { Product, Seller } from "../entities/index.js";
import { appDataSource } from "../database/data-source.js";
import {
  CreateProductInput,
  ProductFilter,
} from "../graphql/types/resolvers-types.js";
import { validateOrReject } from "class-validator";
import { GraphQLError } from "graphql";
import { categoryService } from "./categoryServices.js";
import { orderItemService } from "./OrderItemService.js";

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
      console.log(product);
      validateOrReject(product);
      console.log("product");
      return await this.productRepository.save(product);
    } catch (errors) {
      throw new GraphQLError(errors, {
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
      relations: { owner: true, category: true },
    });
  }

  async getAll(input: ProductFilter) {
    const products = await this.productRepository.find({
      order: { createdAt: "DESC" },
      where: {
        category:
          input.categoryId !== undefined ? { id: input.categoryId } : undefined,
        quantity:
          input.available === undefined
            ? undefined
            : input.available
            ? MoreThan(0)
            : Equal(0),
        name: input.name ? Like(`%${input.name}%`) : undefined,
      },
      take:
        !input.pageSize || !input.pageNb
          ? Number.MAX_SAFE_INTEGER
          : input.pageSize,
      skip:
        !input.pageSize || !input.pageNb
          ? 0
          : (input.pageNb - 1) * input.pageSize,
      relations: { category: true },
    });
    const count = await this.productRepository.count({
      where: {
        category:
          input.categoryId !== undefined ? { id: input.categoryId } : undefined,
        quantity:
          input.available === undefined
            ? undefined
            : input.available
            ? MoreThan(0)
            : Equal(0),
      },
    });
    return { products, count };
  }
  async getAllBySellerId(sellerId: number, input: ProductFilter) {
    const products = await this.productRepository.find({
      order: { createdAt: "DESC" },
      where: {
        owner: { id: sellerId },
        category:
          input.categoryId !== undefined ? { id: input.categoryId } : undefined,
        quantity:
          input.available === undefined
            ? undefined
            : input.available
            ? MoreThan(0)
            : Equal(0),
        name: input.name ? Like(`%${input.name}%`) : undefined,
      },
      take:
        !input.pageSize || !input.pageNb
          ? Number.MAX_SAFE_INTEGER
          : input.pageSize,
      skip:
        !input.pageSize || !input.pageNb
          ? 0
          : (input.pageNb - 1) * input.pageSize,
      relations: { category: true },
    });
    const count = await this.productRepository.count({
      where: {
        owner: { id: sellerId },
        category:
          input.categoryId !== undefined ? { id: input.categoryId } : undefined,
        quantity:
          input.available === undefined
            ? undefined
            : input.available
            ? MoreThan(0)
            : Equal(0),
      },
    });
    return { products, count };
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
  async countAvailable(sellerId: number) {
    return await this.productRepository.count({
      where: {
        owner: { id: sellerId },
        quantity: MoreThan(0),
      },
    });
  }
  async countOutOfStock(sellerId: number) {
    return await this.productRepository.count({
      where: {
        owner: { id: sellerId },
        quantity: Equal(0),
      },
    });
  }
  async countTotalSales(productId: number) {
    return await orderItemService.countByProductId(productId);
  }
}

export const productService = new ProductServices(
  appDataSource.getTreeRepository(Product)
);
