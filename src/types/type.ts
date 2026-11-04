export type Status = "Processing" | "Pending" | "Completed" | "Cancelled";
export type SortDirection = "default" | "asc" | "desc";

export interface Order {
  id: string;
  name: string;
  date: string;
  status: Status;
  total: number;
}
