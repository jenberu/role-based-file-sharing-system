import { Link } from "react-router-dom";

const Card = ({ title, count, link }) => (
  <div className="bg-white rounded shadow p-4">
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    {typeof count === "number" && (
      <p className="text-2xl font-bold text-blue-700">{count}</p>
    )}
    {link && (
      <Link
        to={link}
        className="text-blue-600 hover:underline text-sm mt-2 inline-block"
      >
        View Details
      </Link>
    )}
  </div>
);
export default Card;