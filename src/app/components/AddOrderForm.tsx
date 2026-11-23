import { Status } from "@/types/type";

interface AddOrderFormProps {
  customerValue: string;
  statusValue: Status;
  totalValue: number;
  onNewCustomerValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNewTotalValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNewStatusValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AddOrderForm = ({
  customerValue,
  statusValue,
  totalValue,
  onNewCustomerValue,
  onNewStatusValue,
  onNewTotalValue,
  onSubmit,
}: AddOrderFormProps) => {
  return (
    <div id="container" className="group max-w-1/5">
      <button
        type="button"
        className=" w-fit mb-2 p-1 cursor-pointer text-left border rounded-xl text-sky-500"
      >
        Add order +
      </button>
      <form className="hidden group-hover:block" action="" onSubmit={onSubmit}>
        <label htmlFor="customerName">Name: </label>
        <input
          value={customerValue}
          onChange={onNewCustomerValue}
          className="mb-2 border rounded-xl"
          id="customerName"
          type="text"
        />
        <br />
        <select
          value={statusValue}
          onChange={onNewStatusValue}
          className="mb-2 border"
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <br />
        <label htmlFor="total">Total: </label>
        <input
          value={totalValue}
          onChange={onNewTotalValue}
          className="mb-2 border rounded-xl"
          id="total"
          type="number"
          min="0"
        />
        <br />
        <button
          className="mb-2 p-1 cursor-pointer border rounded-xl"
          type="submit"
        >
          Add new order
        </button>
      </form>
    </div>
  );
};

export default AddOrderForm;
