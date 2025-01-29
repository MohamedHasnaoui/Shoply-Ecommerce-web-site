import { Repository } from "typeorm";
import { Category } from "../entities/index.js";
import { CategoryInput } from "../graphql/types/resolvers-types";
import { validateOrReject, ValidationError } from "class-validator";
import { GraphQLError } from "graphql";
import { appDataSource } from "../database/data-source.js";
export class CategoryService {
  constructor(private categoryRepository: Repository<Category>) {}

  async findCategoryById(id: number) {
    return await this.categoryRepository.findOneBy({ id });
  }
  async findCategoryByName(name: string) {
    return await this.categoryRepository.findOneBy({ name });
  }

  async create(categoryInput: CategoryInput) {
    const category = await this.findCategoryByName(categoryInput.name);
    if (category) {
      throw new GraphQLError("Category already exist!", {
        extensions: { code: "BAD CATEGORY NAME" },
      });
    }

    const newCategory = this.categoryRepository.create({ ...categoryInput });
    console.log(newCategory);
    try {
      await validateOrReject(newCategory);
      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new GraphQLError("Validation error", {
          extensions: { error, code: "Validation ERROR" },
        });
      } else {
        throw new GraphQLError("Database error", {
          extensions: { error, code: "DATABASE ERROR" },
        });
      }
    }
  }

  async getAllCategories() {
    return await this.categoryRepository.find();
  }
  async getCategoryByName(name: string) {
    const category = await this.findCategoryByName(name);
    if (!category) {
      throw new GraphQLError("Category doesn't exists", {
        extensions: { code: "NOT EXIST" },
      });
    }
    return category;
  }
}

export const categoryService = new CategoryService(
  appDataSource.getRepository(Category)
);
