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
    name: "jhone doe",
    role: "Project Manger"
  }
];

export async function Get() {
  return NextResponse.json(users)
}


