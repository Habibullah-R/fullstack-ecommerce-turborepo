import type { Prisma } from "@repo/product-db";
import { prisma } from "@repo/product-db";
import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  const data: Prisma.ProductCreateInput = req.body;
  const { colors, images } = data;
  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    return res.status(400).json({ message: "Colors array is required" });
  }
  if (!images || typeof images !== "object") {
    return res.status(400).json({ message: "Images object is required" });
  }
  const missingColor = colors.filter((color) => !(color in images));
  if (missingColor.length > 0) {
    return res
      .status(400)
      .json({ message: "Missing images for colors", missingColor });
  }
  const product = await prisma.product.create({ data });
  res.status(201).json(product);
};
export const updateProduct = async (req: Request, res: Response) => {};
export const deleteProduct = async (req: Request, res: Response) => {};
export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany()
  return res.status(200).json(products)
};
export const getProduct = async (req: Request, res: Response) => {};
