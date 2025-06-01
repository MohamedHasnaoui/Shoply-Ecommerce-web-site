import { MutationOptions, QueryOptions } from "@apollo/client";
import {
  CreateProductInput,
  CreateProductMutation,
  CreateProductMutationVariables,
  GetAllCategoriesQuery,
  GetAllMyProductsQuery,
  GetAllMyProductsQueryVariables,
  GetMyProductsStatisticsQuery,
  GetMyProductsStatisticsQueryVariables,
  GetProductQuery,
  GetProductQueryVariables,
  GetSellerTopProductsQuery,
  GetSellerTopProductsQueryVariables,
  ProductFilter,
  RemoveProductMutation,
  RemoveProductMutationVariables,
  UpdateProductInput,
  UpdateProductMutation,
  UpdateProductMutationVariables,
} from "../../generated";
import {
  ALL_CATEG_ID_NAME,
  CREATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,
  GET_MY_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS_STOCK_COUNTS,
  GET_TOP_SELLING_PRODUCT_,
  UPDATE_PRODUCT_MUTATION,
} from "../../graphql/product.graphql";
import { client } from "../../graphqlProvider";

class ProductService {
  async getCatgories() {
    const options: QueryOptions<GetAllCategoriesQuery> = {
      query: ALL_CATEG_ID_NAME,
    };
    const response = await client.query<GetAllCategoriesQuery>(options);
    return response;
  }
  async createProduct(input: CreateProductInput) {
    const options: MutationOptions<
      CreateProductMutation,
      CreateProductMutationVariables
    > = {
      mutation: CREATE_PRODUCT_MUTATION,
      variables: { input },
      update: (cache, { data }) => {
        if (data?.createProduct) {
          const result = cache.readQuery<GetAllMyProductsQuery>({
            query: GET_MY_PRODUCTS,
          });
          if (result) {
            result.getAllMyProducts.products.push(data.createProduct);
            result.getAllMyProducts.count++;
            cache.writeQuery<GetAllMyProductsQuery>({
              query: GET_MY_PRODUCTS,
              data: { getAllMyProducts: result.getAllMyProducts },
            });
          }
        }
      },
    };
    const response = await client.mutate(options);
    return response;
  }
  async updateProduct(input: UpdateProductInput) {
    const options: MutationOptions<
      UpdateProductMutation,
      UpdateProductMutationVariables
    > = {
      mutation: UPDATE_PRODUCT_MUTATION,
      variables: { input },
    };
    const response = await client.mutate(options);
    return response;
  }
  async deleteProduct(productId: number) {
    const options: MutationOptions<
      RemoveProductMutation,
      RemoveProductMutationVariables
    > = {
      mutation: DELETE_PRODUCT_MUTATION,
      variables: { productId },
      update: (cache, { data }) => {
        if (data?.removeProduct) {
          const result = cache.readQuery<GetAllMyProductsQuery>({
            query: GET_MY_PRODUCTS,
          });
          console.log("res", result);
          if (result) {
            const updatedProducts = result.getAllMyProducts.products.filter(
              (product) => product.id !== productId
            );
            result.getAllMyProducts.products = updatedProducts;
            result.getAllMyProducts.count--;
            console.log("up", result);
            cache.writeQuery<GetAllMyProductsQuery>({
              query: GET_MY_PRODUCTS,
              data: { getAllMyProducts: result.getAllMyProducts },
            });
          }
        }
      },
    };
    const response = await client.mutate(options);
    return response;
  }
  async getMyProducts(input: ProductFilter) {
    const options: QueryOptions<
      GetAllMyProductsQueryVariables,
      GetAllMyProductsQuery
    > = {
      query: GET_MY_PRODUCTS,
      variables: { input },
    };
    const response = await client.query(options);
    return response;
  }
  async getProductStockCounts() {
    const options: QueryOptions<
      GetMyProductsStatisticsQueryVariables,
      GetMyProductsStatisticsQuery
    > = {
      query: GET_PRODUCTS_STOCK_COUNTS,
    };
    const response = await client.query(options);
    return response;
  }

  async getProductByID(productId: number) {
    const options: QueryOptions<GetProductQueryVariables, GetProductQuery> = {
      query: GET_PRODUCT_BY_ID,
      variables: { productId },
    };
    const response = await client.query(options);
    return response;
  }
  async getTopSellingProducts(nbProduct: number) {
    const options: QueryOptions<
      GetSellerTopProductsQueryVariables,
      GetSellerTopProductsQuery
    > = {
      query: GET_TOP_SELLING_PRODUCT_,
      variables: { nbProduct },
    };
    const response = await client.query(options);
    return response;
  }
}

export const productService = new ProductService();
