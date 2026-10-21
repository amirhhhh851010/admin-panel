interface StatCardProps {
  title: string;
  value: string;
  id: string;
}

const StatCard = ({ title, value, id }: StatCardProps) => {
  return (
    <div id={id} className="border-2 rounded-md  px-3 py-2 min-w-0">
      <p className="text-green-500 mb-4">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default StatCard;
