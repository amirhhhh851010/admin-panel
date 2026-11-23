import { NextResponse } from "next/server";
import { orders } from "@/data/orders";
import { Status, STATUSES } from "@/types/type";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body: { status: Status } = await request.json();//Known limitation

  if (STATUSES.includes(body.status)) {
    const order = orders.find((order) => order.id === id);
    if (order) {
      order.status = body.status;
      return NextResponse.json(order, { status: 200 });
    } else {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const orderIndex = orders.findIndex((order) => order.id === id);
  if (orderIndex < 0) {
    return NextResponse.json(
      { error: "Order not found for deleting" },
      { status: 404 },
    );
  }
  orders.splice(orderIndex, 1);
  return NextResponse.json({ status: 204 });
}
