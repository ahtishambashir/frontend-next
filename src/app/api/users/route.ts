import { NextResponse } from "next/server";

let users = [
  {
    id: 1,
    name: "Ahtisham Bashir",
    role: "Frontend Developer",
  },
  {
    id: 2,
    name: "Sarah",
    role: "Quality Assurance Engineer",
  },
  {
    id: 3,
    name: "john doe",
    role: "Project Manger",
  },
];

export async function GET() {
  try {
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error getting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      ...body,
    };
    users.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user", error);

    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
