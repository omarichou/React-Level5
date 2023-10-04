// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints

// for All products
export const ProductsApi = createApi({
  reducerPath: 'ProductsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    getProductsByName: builder.query({
      query: (name) => `products`,
    }),
  }),
})

// for One products
export const OneProductsApi = createApi({
  reducerPath: 'OneProductsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    getOneProductsByName: builder.query({
      query: (name) => `products/${name}`,
    }),
  }),
})




// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsByNameQuery } = ProductsApi

export const { useGetOneProductsByNameQuery } = OneProductsApi
