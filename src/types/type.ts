export const STATUSES = [
  "Pending",
  "Processing",
  "Completed",
  "Cancelled",
] as const;
export type Status = (typeof STATUSES)[number];
export type SortDirection = "default" | "asc" | "desc";
export type OrdersState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; orders: Order[] };

export interface Order {
  id: string;
  name: string;
  date: string;
  status: Status;
  total: number;
}

export interface NewOrderData {
  name: string;
  status: Status;
  total: number;
}
