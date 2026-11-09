import { Order, Status } from "@/types/type";
import OrderRow from "./OrderRow";

interface OrdersTableProps {
  orders: Order[];
  onStatusUpdate: (orderID: string, newStatus: Status) => void;
}
const totalFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const OrdersTable = ({ orders, onStatusUpdate }: OrdersTableProps) => {
  return (
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
        {orders.length !== 0 ? (
          orders.map((order) => {
            return (
              <OrderRow
                key={order.id}
                id={order.id}
                name={order.name}
                date={order.date}
                status={order.status}
                total={totalFormatter.format(order.total)}
                onStatusUpdate={onStatusUpdate}
              />
            );
          })
        ) : (
          <tr>
            <td colSpan={5}>no orders found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrdersTable;
