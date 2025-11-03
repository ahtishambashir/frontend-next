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
    role: "Quality Assurance Engineer"
  },
  {
    id: 3,
    name: "john doe",
    role: "Project Manger"
  }
];

export async function GET() {
  return NextResponse.json(users)
}

export async function POST(req: Request) {
  const body = await req.json();
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    ...body
  }
  users.push(newUser);
  return NextResponse.json(newUser, {status: 201});
}


