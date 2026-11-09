"use client";
import { useState } from "react";
import FilterOrder from "./components/FilterOrder";
import StatCard from "./components/StatCard";
import { Order, SortDirection, Status } from "@/types/type";
import OrdersTable from "./components/OrdersTable";

const totalFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Home() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "#1001",
      name: "Alex Morgan",
      date: "Oct 12",
      status: "Completed",
      total: 240,
    },
    {
      id: "#1002",
      name: "Sarah Chen",
      date: "Oct 13",
      status: "Processing",
      total: 125,
    },
    {
      id: "#1003",
      name: "David Lee",
      date: "Oct 14",
      status: "Pending",
      total: 380,
    },
    {
      id: "#1004",
      name: "Bruse Lee",
      date: "Oct 14",
      status: "Cancelled",
      total: 380,
    },
    {
      id: "#1005",
      name: "Margarit banner",
      date: "Oct 14",
      status: "Completed",
      total: 380,
    },
    {
      id: "#1006",
      name: "Alex Morgan",
      date: "Oct 11",
      status: "Pending",
      total: 880,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<Status | "All">("All");
  const [selectedSort, setSelectedSort] = useState<SortDirection>("default");

  const filterOrders: Order[] = orders.filter((order) => {
    const searchFilter = Object.values(order).some((value) =>
      String(value).toLowerCase().includes(searchTerm.trim().toLowerCase()),
    );
    const statusFilter =
      selectedStatus === "All" ? true : order.status === selectedStatus;

    return searchFilter && statusFilter;
  });
  const sortedOrders: Order[] = (() => {
    switch (selectedSort) {
      case "default":
        return filterOrders;
      case "asc":
      case "desc":
        return [...filterOrders].sort((a, b) =>
          selectedSort === "asc" ? a.total - b.total : b.total - a.total,
        );
      default:
        return filterOrders;
    }
  })();

  function searchChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }
  function statusChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedStatus(e.target.value as Status | "All");
  }
  function sortChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSort(e.target.value as SortDirection);
  }
  function resetClickHandler() {
    setSearchTerm("");
    setSelectedStatus("All");
    setSelectedSort("default");
  }
  function statusUpdateHandler(orderID: string, newStatus: Status) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderID ? { ...order, status: newStatus } : order,
      ),
    );
  }

  const totalSalesValue = () => {
    const result = orders
      .filter((order) => order.status === "Completed")
      .reduce((acc, curr) => acc + curr.total, 0);
    return totalFormatter.format(result);
  };
  const totalCustomersValue = () => {
    let flag: string[] = [];
    const result = orders.filter((order) => {
      if (!flag.includes(order.name)) {
        flag.push(order.name);
        return true;
      } else {
        return false;
      }
    }).length;
    return String(result);
  };
  const totalOrdersValue = () => {
    const result = orders.length;
    return String(result);
  };
  const totalPendingValue = () => {
    const result = orders.filter((order) => order.status === "Pending").length;
    return String(result);
  };

  return (
    <>
      <div id="container" className="flex flex-col gap-6">
        <div
          id="cards"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          <StatCard
            title="Total Sales"
            value={totalSalesValue()}
            id="total-sales"
          />
          <StatCard
            title="Total Customers"
            value={totalCustomersValue()}
            id="total-customers"
          />
          <StatCard
            title="Total Orders"
            value={totalOrdersValue()}
            id="total-orders"
          />
          <StatCard
            title="Pending Orders"
            value={totalPendingValue()}
            id="pending-orders"
          />
        </div>
        <FilterOrder
          termValue={searchTerm}
          statusValue={selectedStatus}
          sortValue={selectedSort}
          onSearchChange={searchChangeHandler}
          onStatusChange={statusChangeHandler}
          onResetClick={resetClickHandler}
          onSortChange={sortChangeHandler}
        />
        <OrdersTable
          orders={sortedOrders}
          onStatusUpdate={statusUpdateHandler}
        />
      </div>
    </>
  );
}
