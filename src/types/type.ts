export type Status = "Pending" | "Processing" | "Completed" | "Cancelled";
export type SortDirection = "default" | "asc" | "desc";

export interface Order {
  id: string;
  name: string;
  date: string;
  status: Status;
  total: number;
}
