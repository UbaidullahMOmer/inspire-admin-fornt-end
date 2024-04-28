import Config from "../constants/Index";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const inspireApis = createApi({
  reducerPath: "inspireApis",
  baseQuery: fetchBaseQuery({ baseUrl: Config.serverApiUrl }),
  tagTypes: ['getProducts', 'Orders'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products?populate=*",
      providesTags: ['getProducts'],
    }),
    getSingleProduct: builder.query({
      query: (id) => `products/${id}?populate=*`,
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['getProducts'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['getProducts'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['getProducts'],
    }),
    getOrders: builder.query({
      query: ()=> "orders"
    }),
    getSingleOrder: builder.query({
      query: (id) => `orders/${id}`,
    })
  }),
});
export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetOrdersQuery,
  useGetSingleOrderQuery
} = inspireApis;
