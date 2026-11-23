"use client";

import { useState, useEffect } from "react";
import { OrdersState, Order, Status, NewOrderData } from "@/types/type";

export function useOrders() {
  const [ordersState, setOrdersState] = useState<OrdersState>({
    status: "loading",
  });
  const [actionError, setActionError] = useState<null | string>(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await fetch("/api/orders");
        if (response.ok) {
          const data = await response.json();
          setOrdersState({ status: "success", orders: data });
        } else {
          throw new Error("fail");
        }
      } catch (e) {
        setOrdersState({ status: "error", message: String(e) });
      }
    }
    loadOrders();
  }, []);

  async function statusUpdateHandler(orderID: string, newStatus: Status) {
    try {
      const response = await fetch(`/api/orders/${orderID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        const data: Order = await response.json();
        setOrdersState((prev) => {
          if (prev.status === "success") {
            const newOrders = prev.orders.map((order) =>
              order.id === orderID ? data : order,
            );
            return { ...prev, orders: newOrders };
          } else {
            return prev;
          }
        });
        setActionError(null);
      } else {
        throw new Error(`PATCH failed with status ${response.status}`);
      }
    } catch (e) {
      setActionError("Failed to update the order status");
      console.error(e);
    }
  }

  async function orderDeleteHandler(orderID: string) {
    if (!window.confirm("Would you like to delete this order?")) {
      return;
    }
    try {
      const response = await fetch(`/api/orders/${orderID}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setOrdersState((prev) => {
          if (prev.status === "success") {
            const newOrders = prev.orders.filter(
              (order) => order.id !== orderID,
            );
            return { ...prev, orders: newOrders };
          } else {
            return prev;
          }
        });
        setActionError(null);
      } else {
        throw new Error(`DELETE failed with status ${response.status}`);
      }
    } catch (e) {
      setActionError("Failed to delete the order");
      console.error(e);
    }
  }

  async function addOrder(newOrderData: NewOrderData):Promise<boolean> {
    if (ordersState.status !== "success") return false;

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrderData),
      });
      if (response.ok) {
        const data: Order = await response.json();
        setOrdersState((prev) => {
          if (prev.status === "success") {
            return { ...prev, orders: [...prev.orders, data] };
          } else {
            return prev;
          }
        });
        setActionError(null);
        return true;
      } else {
        throw new Error(`POST failed with status ${response.status}`);
      }
    } catch (e) {
      setActionError("Failed to add the order");
      console.error(e);
      return false;
    }
  }

  return {
    ordersState,
    actionError,
    statusUpdateHandler,
    orderDeleteHandler,
    addOrder,
  };
}
