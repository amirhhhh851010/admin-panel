// import Image from "next/image";
import OrderRow from "./components/OrderRow";
import StatCard from "./components/StatCard";
import { Order } from "@/types/type";

export default function Home() {
  const orders: Order[] = [
    {
      id: "#1001",
      name: "Alex Morgan",
      date: "Oct 12",
      status: "Completed",
      total: "$240",
    },
    {
      id: "#1002",
      name: "Sarah Chen",
      date: "Oct 13",
      status: "Processing",
      total: "$125",
    },
    {
      id: "#1003",
      name: "David Lee",
      date: "Oct 14",
      status: "Pending",
      total: "$380",
    },
  ];
  return (
    <>
      <div id="container" className="flex flex-col gap-6">
        <div
          id="cards"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          <StatCard title="Total Sales" value="$12,450" id="total-sales" />
          <StatCard title="Total Products" value="48" id="total-products" />
          <StatCard title="Total Orders" value="156" id="total-orders" />
          <StatCard title="Pending Orders" value="12" id="pending-orders" />
        </div>
        <div id="recent-orders">
          <table className="w-full [&_th]:text-left [&_th]:px-4 [&_td]:px-4 [&_th]:py-3 [&_td]:py-3 overflow-x-auto">
            <thead className="border-b">
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Customer</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow
                  key={order.id}
                  id={order.id}
                  name={order.name}
                  date={order.date}
                  status={order.status}
                  total={order.total}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
