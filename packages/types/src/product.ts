import type { Product, Category } from "@repo/product-db";
import z from "zod";

export type StripeProductType = {
  id: string;
  name: string;
  price: number;
};

export const CategoryFormSchema = z.object({
  name: z.string().min(1, { message: "Name is Required!" }),
  slug: z.string().min(1, { message: "Slug is Required!" }),
});

export type ProductType = Product;
export type ProductsType = ProductType[];
export type CategoryType = Category;
