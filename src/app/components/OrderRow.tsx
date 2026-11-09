import { Status } from "@/types/type";
interface OrderRowProps {
  id: string;
  name: string;
  date: string;
  status: Status;
  total: string;
  onStatusUpdate: (orderID: string, newStatus: Status) => void;
}

function getSelectStyle(status: Status) {
  switch (status) {
    case "Processing":
      return "px-3 py-1 text-blue-700 font-bold bg-blue-300 rounded-full";
    case "Pending":
      return "px-3 py-1 text-yellow-700 font-bold bg-yellow-300 rounded-full";
    case "Completed":
      return "px-3 py-1 text-green-700 font-bold bg-green-300 rounded-full";
    case "Cancelled":
      return "px-3 py-1 text-red-700 font-bold bg-red-300 rounded-full";
  }
}

const OrderRow = ({
  id,
  date,
  name,
  status,
  total,
  onStatusUpdate,
}: OrderRowProps) => {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{date}</td>
      <td className="">
        <select
          className={getSelectStyle(status)}
          value={status}
          onChange={(e) => onStatusUpdate(id, e.target.value as Status)}
        >
          <option
            className="text-yellow-700 font-bold bg-yellow-300"
            value="Pending"
          >
            Pending
          </option>
          <option
            className="text-blue-700 font-bold bg-blue-300"
            value="Processing"
          >
            Processing
          </option>
          <option
            className="text-green-700 font-bold bg-green-300"
            value="Completed"
          >
            Completed
          </option>
          <option
            className="text-red-700 font-bold bg-red-300"
            value="Cancelled"
          >
            Cancelled
          </option>
        </select>
      </td>
      <td>{status === "Cancelled" ? "-" : total}</td>
    </tr>
  );
};

export default OrderRow;
