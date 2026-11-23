import { Order, SortDirection, Status } from "@/types/type";

export function filterOrders(
  orders: Order[],
  selectedStatus: Status | "All",
  searchTerm: string,
): Order[] {
  const normalTerm = searchTerm.trim().toLowerCase();
  const idTerm = searchTerm.trim().replace("#", "");
  return orders.filter((order) => {
    const searchFilter = Object.entries(order).some(([key, value]) => {
      const term = key === "id" ? idTerm : normalTerm;
      return String(value).toLowerCase().includes(term);
    });
    const statusFilter =
      selectedStatus === "All" ? true : order.status === selectedStatus;

    return searchFilter && statusFilter;
  });
}

export function sortOrders(
  filteredOrders: Order[],
  selectedSort: SortDirection,
): Order[] {
  switch (selectedSort) {
    case "default":
      return filteredOrders;
    case "asc":
    case "desc":
      return [...filteredOrders].sort((a, b) =>
        selectedSort === "asc" ? a.total - b.total : b.total - a.total,
      );
    default:
      return filteredOrders;
  }
}

export function calculateStats(orders: Order[]) {
  const totalSales = orders
    .filter((order) => order.status === "Completed")
    .reduce((acc, curr) => acc + curr.total, 0);

  const totalCustomers = new Set(orders.map((order) => order.name)).size;

  const totalOrders = orders.length;

  const totalPending = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  return {
    totalSales,
    totalCustomers,
    totalOrders,
    totalPending,
  };
}
