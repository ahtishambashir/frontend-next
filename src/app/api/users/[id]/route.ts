import { error } from "console";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

export async function PUT(
  req: NextResponse,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const body = await req.json();

  const index = users.findIndex((u) => u.id === id);
  if (index === -1)
    return NextResponse.json({ error: "user not found" }, { status: 201 });

  users[index] = { ...users[index], ...body };
  return NextResponse.json(users[index]);
}

export async function DELETE(_req: NextResponse, {params}: {params: {id: string}}) {
    const id = parseInt(params.id);
    users = users.filter((u) => u.id !== id);
    return NextResponse.json({Message: "user deleted successfully"});
}
