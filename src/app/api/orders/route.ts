import { NextResponse } from "next/server";
import { orders } from "@/data/orders";
import { NewOrderData, Order, STATUSES } from "@/types/type";

let nextId: number = 1007; //Known limitation

export async function GET() {
  return NextResponse.json(orders, { status: 200 });
}

export async function POST(request: Request) {
  const body: NewOrderData = await request.json(); //Known limitation

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const conditions = {
    isNameValid: /^[\p{L} ]+$/u.test(name),
    isStatusValid: STATUSES.includes(body.status),
    isTotalValid:
      typeof body.total === "number" &&
      Number.isFinite(body.total) &&
      body.total >= 0,
  };

  if (
    !conditions.isNameValid ||
    !conditions.isStatusValid ||
    !conditions.isTotalValid
  ) {
    return NextResponse.json(
      { error: "Invalid order input or inputs" },
      { status: 400 },
    );
  } //early return

  const newOrder: Order = {
    id: String(nextId++),
    name: name,
    status: body.status,
    date: new Date().toISOString(),
    total: body.total,
  };
  orders.push(newOrder);
  return NextResponse.json(newOrder, { status: 201 });
}