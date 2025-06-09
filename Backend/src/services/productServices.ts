import {
  Between,
  Equal,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from "typeorm";
import { OrderItem, Product, Seller } from "../entities/index.js";
import { appDataSource } from "../database/data-source.js";
import {
  CreateProductInput,
  PeriodFilter,
  ProductAndNbOrders,
  ProductFilter,
} from "../graphql/types/resolvers-types.js";
import { validateOrReject } from "class-validator";
import { GraphQLError } from "graphql";
import { categoryService } from "./categoryServices.js";
import { orderItemService } from "./OrderItemService.js";
import { dateUtil } from "../../utils/dateUtil.js";
import { i } from "react-router/dist/development/fog-of-war-CCAcUMgB.js";

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
      relations: { owner: true, category: true, reviews: { reviewer: true } },
    });
  }

  async getAll(input: ProductFilter) {
    let orderBy;

    switch (input.orderBy) {
      case "createdAt_ASC":
        orderBy = { createdAt: "ASC" };
        break;
      case "rating":
        orderBy = { rating: "DESC" };
        break;
      case "price_ASC":
        orderBy = { price: "ASC" };
        break;
      case "price_DESC":
        orderBy = { price: "DESC" };
        break;
      default:
        orderBy = { createdAt: "DESC" };
        break;
    }

    const whereConditions = {
      id: input.productId,
      isDisabled: input.isDisabled,
      category:
        input.categoryId !== undefined ? { id: input.categoryId } : undefined,
      quantity:
        input.available === undefined
          ? undefined
          : input.available
          ? MoreThan(0)
          : Equal(0),
      name: input.name ? Like(`%${input.name}%`) : undefined,
      price:
        input.minPrice !== undefined && input.maxPrice !== undefined
          ? Between(input.minPrice, input.maxPrice)
          : input.minPrice !== undefined
          ? MoreThanOrEqual(input.minPrice)
          : input.maxPrice !== undefined
          ? LessThanOrEqual(input.maxPrice)
          : undefined,
      rating:
        input.minRating !== undefined
          ? MoreThanOrEqual(input.minRating)
          : undefined,
    };

    // ✅ UNE SEULE REQUÊTE au lieu de deux !
    const [products, count] = await this.productRepository.findAndCount({
      order: orderBy,
      where: whereConditions,
      take:
        !input.pageSize || !input.pageNb
          ? Number.MAX_SAFE_INTEGER
          : input.pageSize,
      skip:
        !input.pageSize || !input.pageNb
          ? 0
          : (input.pageNb - 1) * input.pageSize,
      relations: { category: true, owner: true },
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
  async getTopSellingProductsBySellerId(
    sellerId: number,
    nbProducts: number
  ): Promise<ProductAndNbOrders[]> {
    const res = await appDataSource
      .getRepository(OrderItem)
      .createQueryBuilder("orderItem")
      .innerJoin("orderItem.product", "product")
      .select("product.id", "id")
      .addSelect("product.name", "name")
      .addSelect("product.reference", "reference")
      .addSelect("product.price", "price")
      .addSelect("product.description", "description")
      .addSelect("product.quantity", "quantity")
      .addSelect("product.createdAt", "createdAt")
      .addSelect("product.updatedAt", "updatedAt")
      .addSelect("product.rating", "rating")
      .addSelect("SUM(orderItem.quantity)", "totalSold")
      .where("product.ownerId = :sellerId", { sellerId })
      .groupBy("product.id")
      .orderBy('"totalSold"', "DESC")
      .limit(nbProducts)
      .getRawMany();
    return res.map((elm: any) => {
      return { product: { ...elm } as Product, totalSold: elm.totalSold };
    });
  }
  async countNewProducts(period?: PeriodFilter) {
    const date = dateUtil.getStartDateOfPeriod(period);
    const productsCount = await this.productRepository.count({
      where: {
        createdAt: period !== undefined ? MoreThanOrEqual(date) : undefined,
      },
    });
    return productsCount;
  }
  async getTopSellingProducts(
    input: ProductFilter
  ): Promise<ProductAndNbOrders[]> {
    const products = await this.productRepository
      .createQueryBuilder("product")
      .innerJoin("product.orderItems", "orderItem")
      .innerJoin("product.category", "category")
      .select("product.id", "id")
      .addSelect("product.name", "name")
      .addSelect("product.reference", "reference")
      .addSelect("product.price", "price")
      .addSelect("product.description", "description")
      .addSelect("product.quantity", "quantity")
      .addSelect("product.createdAt", "createdAt")
      .addSelect("product.updatedAt", "updatedAt")
      .addSelect("product.rating", "rating")
      .addSelect("SUM(orderItem.quantity)", "totalSold")
      .where(
        input.categoryId !== undefined ? "category.id = :categoryId" : "1=1",
        input.categoryId !== undefined
          ? { categoryId: input.categoryId }
          : undefined
      )
      .andWhere(
        input.available === undefined
          ? {}
          : input.available
          ? { quantity: MoreThan(0) }
          : { quantity: Equal(0) }
      )
      .andWhere(input.name ? { name: Like(`%${input.name}%`) } : {})
      .groupBy("product.id")
      .orderBy('"totalSold"', "DESC")
      .limit(input.pageSize || 10)
      .offset(input.pageNb ? (input.pageNb - 1) * (input.pageSize || 10) : 0)
      .getRawMany();

    return products.map((elm: any) => {
      return { product: { ...elm } as Product, totalSold: elm.totalSold };
    });
  }
  async updateProductDisableStatus(productId: number, isDisabled: boolean) {
    const product = await this.findById(productId);
    if (product === null) {
      throw new GraphQLError("Product not found", {
        extensions: { code: "BAD USER INPUTS" },
      });
    }
    product.isDisabled = isDisabled;
    await this.update(product);
    return true;
  }
}

export const productService = new ProductServices(
  appDataSource.getTreeRepository(Product)
);
