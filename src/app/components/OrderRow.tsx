import { Status, Order } from "@/types/type";

function switchedText(status: Status) {
  switch (status) {
    case "Processing":
      return (
        <span className="px-3 py-1 text-blue-700 font-bold bg-blue-300 rounded-full">
          {status}
        </span>
      );
    case "Pending":
      return (
        <span className="px-3 py-1 text-yellow-700 font-bold bg-yellow-300 rounded-full">
          {status}
        </span>
      );
    case "Completed":
      return (
        <span className="px-3 py-1 text-green-700 font-bold bg-green-300 rounded-full">
          {status}
        </span>
      );
    case "Cancelled":
      return (
        <span className="px-3 py-1 text-red-700 font-bold bg-red-300 rounded-full">
          {status}
        </span>
      );
  }
}

const OrderRow = ({ id, date, name, status, total }: Order) => {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{date}</td>
      <td className="">{switchedText(status)}</td>
      <td>{total}</td>
    </tr>
  );
};

export default OrderRow;
