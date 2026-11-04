import { SortDirection, Status } from "@/types/type";

interface FilterOrderProps {
  termValue: string;
  statusValue: Status | "All";
  sortValue: SortDirection;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onResetClick: () => void;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterOrder = ({
  termValue,
  statusValue,
  sortValue,
  onSearchChange,
  onStatusChange,
  onResetClick,
  onSortChange,
}: FilterOrderProps) => {
  return (
    <div>
      <label htmlFor="filter">Filter: </label>
      <input
        value={termValue}
        onChange={onSearchChange}
        className="border rounded-xl"
        id="filter"
        type="search"
      />
      <select
        className="mx-2 border"
        value={statusValue}
        onChange={onStatusChange}
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <br />
      <select className="mx-2 border" value={sortValue} onChange={onSortChange}>
        <option value="default">Default</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button
        className="border rounded-xl px-1 my-1 text-sky-500"
        type="button"
        onClick={onResetClick}
      >
        Reset
      </button>
    </div>
  );
};

export default FilterOrder;
