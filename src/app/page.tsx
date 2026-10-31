"use client";
import { useState } from "react";
import FilterOrder from "./components/FilterOrder";
import OrderRow from "./components/OrderRow";
import StatCard from "./components/StatCard";
import { Order, Status } from "@/types/type";

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
  {
    id: "#1004",
    name: "Bruse Lee",
    date: "Oct 14",
    status: "Cancelled",
    total: "$380",
  },
  {
    id: "#1005",
    name: "Margarit banner",
    date: "Oct 14",
    status: "Completed",
    total: "$380",
  },
  {
    id: "#1006",
    name: "Alex Morgan",
    date: "Oct 11",
    status: "Pending",
    total: "$880",
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<Status | "All">("All");

  const filterResult: Order[] = orders.filter((order) => {
    const searchFilter = Object.values(order).some((value: string) =>
      value.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    const statusFilter =
      selectedStatus === "All" ? true : order.status === selectedStatus;

    return searchFilter && statusFilter;
  });

  function searchChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }
  function statusChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedStatus(e.target.value as Status | "All");
  }
  function resetClickHandler() {
    setSearchTerm("");
    setSelectedStatus("All");
  }

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
        <FilterOrder
          termValue={searchTerm}
          statusValue={selectedStatus}
          onSearchChange={searchChangeHandler}
          onStatusChange={statusChangeHandler}
          onResetClick={resetClickHandler}
        />
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
              {filterResult.length !== 0 ? (
                filterResult.map((order) => (
                  <OrderRow
                    key={order.id}
                    id={order.id}
                    name={order.name}
                    date={order.date}
                    status={order.status}
                    total={order.total}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5}>no orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
