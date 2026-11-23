import { Order, Status } from "@/types/type";
import OrderRow from "./OrderRow";
import { totalFormatter , dateFormatter } from "@/lib/formatters";

interface OrdersTableProps {
  orders: Order[];
  onStatusUpdate: (orderID: string, newStatus: Status) => void;
  onOrderDelete: (orderID: string) => void;
}
const OrdersTable = ({
  orders,
  onStatusUpdate,
  onOrderDelete,
}: OrdersTableProps) => {
  return (
    <table className="w-full [&_th]:text-left [&_th]:px-4 [&_td]:px-4 [&_th]:py-3 [&_td]:py-3 overflow-x-auto">
      <thead className="border-b">
        <tr>
          <th scope="col">Order ID</th>
          <th scope="col">Customer</th>
          <th scope="col">Date</th>
          <th scope="col">Status</th>
          <th scope="col">Total</th>
          <th scope="col">Delete</th>
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
                date={dateFormatter.format(new Date(order.date))}
                status={order.status}
                total={totalFormatter.format(order.total)}
                onStatusUpdate={onStatusUpdate}
                onOrderDelete={onOrderDelete}
              />
            );
          })
        ) : (
          <tr>
            <td colSpan={6}>no orders found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrdersTable;
