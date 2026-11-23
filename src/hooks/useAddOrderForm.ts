"use client";

import { useState } from "react";
import { NewOrderData, Status } from "@/types/type";

const INITIAL_FORM: NewOrderData = {
  name: "",
  status: "Pending",
  total: 0,
};

export function useAddOrderForm() {
  const [newOrderData, setNewOrderData] = useState<NewOrderData>(INITIAL_FORM);

  function handleNewCustomerValue(e: React.ChangeEvent<HTMLInputElement>) {
    setNewOrderData((prev) => ({ ...prev, name: e.target.value }));
  }
  function handleNewStatusValue(e: React.ChangeEvent<HTMLSelectElement>) {
    setNewOrderData((prev) => ({
      ...prev,
      status: e.target.value as Status,
    }));
  }
  function handleNewTotalValue(e: React.ChangeEvent<HTMLInputElement>) {
    setNewOrderData((prev) => ({ ...prev, total: Number(e.target.value) }));
  }

  function resetForm() {
    setNewOrderData(INITIAL_FORM);
  }
  return {
    newOrderData,
    handleNewCustomerValue,
    handleNewStatusValue,
    handleNewTotalValue,
    resetForm,
  };
}
