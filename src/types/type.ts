export type Status = "Processing" | "Pending" | "Completed" | "Cancelled";

export interface Order {
  id: string;
  name: string;
  date: string;
  status: Status;
  total: string;
}
