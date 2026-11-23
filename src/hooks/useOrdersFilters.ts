"use client";

import { useState } from "react";
import { Status, SortDirection } from "@/types/type";

export function useOrdersFilters() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<Status | "All">("All");
  const [selectedSort, setSelectedSort] = useState<SortDirection>("default");

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

  return {
    searchTerm,
    selectedStatus,
    selectedSort,
    searchChangeHandler,
    statusChangeHandler,
    sortChangeHandler,
    resetClickHandler,
  };
}
