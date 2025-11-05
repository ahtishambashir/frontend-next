import { NextResponse } from "next/server";

const BASE_URL = "https://fakestoreapi.com/products";

export const GET = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    return NextResponse.json({
      status: 200,
      data,
      count: data.length,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({
      error: "Error getting data",
      status: 200,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const newProduct = await response.json();

    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({
      error: "Error getting data",
      status: 200,
    });
  }
};

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const response = await fetch(`BASE_URL/${body.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const updatedProduct = await response.json();
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({
      error: "Invild data",
      status: 400,
    });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const response = await fetch(`BASE_URL`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const deleted = await response.json();
    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    console.error("Error while deleting", error);
    return NextResponse.json({
      error: "Error while deleting the data",
      status: 400,
    });
  }
};
