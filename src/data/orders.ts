import { Order } from "@/types/type";

//this data is a Known limitation
export const orders:Order[] = [
  {
    id: "1001",
    name: "Alex Morgan",
    date: new Date("12 Oct 26").toISOString(),
    status: "Completed",
    total: 240,
  },
  {
    id: "1002",
    name: "Sarah Chen",
    date: new Date("13 Oct 26").toISOString(),
    status: "Processing",
    total: 125,
  },
  {
    id: "1003",
    name: "David Lee",
    date: new Date("14 Oct 26").toISOString(),
    status: "Pending",
    total: 380,
  },
  {
    id: "1004",
    name: "Bruse Lee",
    date: new Date("14 Oct 26").toISOString(),
    status: "Cancelled",
    total: 380,
  },
  {
    id: "1005",
    name: "Margarit banner",
    date: new Date("15 Oct 26").toISOString(),
    status: "Completed",
    total: 380,
  },
  {
    id: "1006",
    name: "Alex Morgan",
    date: new Date("15 Oct 26").toISOString(),
    status: "Pending",
    total: 880,
  },
];