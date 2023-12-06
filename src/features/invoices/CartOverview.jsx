import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartState } from "./cartSlice";

export default function CartOverview({ cart }) {
  const totalCartQuantity = cart.reduce((acc, cur) => {
    const sum = cur.quantity;
    return acc + sum;
  }, 0);

  const totalCartPrice = cart.reduce((acc, cur) => {
    const sum = cur.price * cur.quantity;
    return acc + sum;
  }, 0);

  return (
    <div className="flex items-center justify-between bg-gray-800 rounded-md px-4 py-4 text-sm uppercase text-gray-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} Tasks</span>
        <span>{totalCartPrice}</span>
      </p>
      <Link to="cart">Open cart &rarr;</Link>
    </div>
  );
}
