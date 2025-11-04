import { NextResponse } from "next/server";

let products = [
  { id: 1, title: "iPhone 14", category: "Electronics", price: 999 },
  { id: 2, title: "MacBook Pro", category: "Electronics", price: 1999 },
  { id: 3, title: "Coffee Mug", category: "Home", price: 12 },
  { id: 4, title: "Gaming Mouse", category: "Electronics", price: 49 },
];

export const GET = async () => {
  try {
    return NextResponse.json({
      status: 200,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({
      message: "Error getting products",
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      ...body,
    };
    products.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating new product:", error);
    return NextResponse.json({
      error: "Error creating new products",
      status: 500,
    });
  }
};

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const index = products.findIndex((p) => p.id === body.id);
    if (index === -1)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    products[index] = { ...products[index], ...body };
    return NextResponse.json(products[index]);
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const index = products.findIndex((p) => p.id === body.id);
    if (index === -1)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    const deleted = products.splice(index, 1);
    return NextResponse.json(deleted[0]);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
};
