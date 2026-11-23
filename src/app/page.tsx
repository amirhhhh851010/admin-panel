"use client";

import { useOrders } from "@/hooks/useOrders";
import { useOrdersFilters } from "@/hooks/useOrdersFilters";
import { filterOrders, sortOrders, calculateStats } from "@/lib/orders";
import { totalFormatter } from "@/lib/formatters";
import { useAddOrderForm } from "@/hooks/useAddOrderForm";
import StatCard from "./components/StatCard";
import OrdersTable from "./components/OrdersTable";
import FilterOrder from "./components/FilterOrder";
import AddOrderForm from "./components/AddOrderForm";

export default function Home() {
  const {
    ordersState,
    actionError,
    statusUpdateHandler,
    orderDeleteHandler,
    addOrder,
  } = useOrders();

  const {
    searchTerm,
    selectedStatus,
    selectedSort,
    searchChangeHandler,
    statusChangeHandler,
    sortChangeHandler,
    resetClickHandler,
  } = useOrdersFilters();

  const {
    newOrderData,
    handleNewCustomerValue,
    handleNewStatusValue,
    handleNewTotalValue,
    resetForm,
  } = useAddOrderForm();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = await addOrder(newOrderData);
    if (success) resetForm();
  }

  const orders = ordersState.status === "success" ? ordersState.orders : [];

  const filteredOrders = filterOrders(orders, selectedStatus, searchTerm);
  const sortedOrders = sortOrders(filteredOrders, selectedSort);
  const { totalSales, totalCustomers, totalOrders, totalPending } =
    calculateStats(orders);

  if (ordersState.status === "loading") {
    return <p>loading...</p>;
  }
  if (ordersState.status === "error") {
    return <p>{ordersState.message}</p>;
  }
  return (
    <div id="container" className="flex flex-col gap-6">
      <div
        id="cards"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        <StatCard
          title="Total Sales"
          value={totalFormatter.format(totalSales)}
          id="total-sales"
        />
        <StatCard
          title="Total Customers"
          value={totalCustomers}
          id="total-customers"
        />
        <StatCard title="Total Orders" value={totalOrders} id="total-orders" />
        <StatCard
          title="Pending Orders"
          value={totalPending}
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
      <AddOrderForm
        customerValue={newOrderData.name}
        statusValue={newOrderData.status}
        totalValue={newOrderData.total}
        onNewCustomerValue={handleNewCustomerValue}
        onNewStatusValue={handleNewStatusValue}
        onNewTotalValue={handleNewTotalValue}
        onSubmit={handleSubmit}
      />
      {actionError && <p className="text-red-500">{actionError}</p>}
      <OrdersTable
        orders={sortedOrders}
        onStatusUpdate={statusUpdateHandler}
        onOrderDelete={orderDeleteHandler}
      />
    </div>
  );
}
