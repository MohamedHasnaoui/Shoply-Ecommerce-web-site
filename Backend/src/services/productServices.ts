import { Equal, MoreThan, Not, Repository } from "typeorm";
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
      relations: { owner: true, category: true },
    });
  }

  async getAll(
    categId?: number,
    available?: boolean,
    pageNb?: number,
    pageSize?: number
  ) {
    const products = await this.productRepository.find({
      order: { createdAt: "DESC" },
      where: {
        category: categId !== undefined ? { id: categId } : undefined,
        quantity:
          available === undefined
            ? undefined
            : available
            ? MoreThan(0)
            : Equal(0),
      },
      take: !pageSize || !pageNb ? Number.MAX_SAFE_INTEGER : pageSize,
      skip: !pageSize || !pageNb ? 0 : (pageNb - 1) * pageSize,
      relations: { category: true },
    });
    const count = await this.productRepository.count({
      where: {
        category: categId !== undefined ? { id: categId } : undefined,
        quantity:
          available === undefined
            ? undefined
            : available
            ? MoreThan(0)
            : Equal(0),
      },
    });
    return { products, count };
  }
  async getAllBySellerId(
    sellerId: number,
    categId?: number,
    available?: boolean,
    pageNb?: number,
    pageSize?: number
  ) {
    const products = await this.productRepository.find({
      order: { createdAt: "DESC" },
      where: {
        owner: { id: sellerId },
        category: categId !== undefined ? { id: categId } : undefined,
        quantity:
          available === undefined
            ? undefined
            : available
            ? MoreThan(0)
            : Equal(0),
      },
      take: !pageSize || !pageNb ? Number.MAX_SAFE_INTEGER : pageSize,
      skip: !pageSize || !pageNb ? 0 : (pageNb - 1) * pageSize,
      relations: { category: true },
    });
    const count = await this.productRepository.count({
      where: {
        owner: { id: sellerId },
        category: categId !== undefined ? { id: categId } : undefined,
        quantity:
          available === undefined
            ? undefined
            : available
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
}

export const productService = new ProductServices(
  appDataSource.getTreeRepository(Product)
);
