import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div>
      <Link to={"/"} className="flex gap-2 items-center">
        <img src="/vite.svg" alt="logo" className="w-10 h-10 object-cover" />
        <h1 className="text-stone-200 text-xl">
          combine<span className="text-2xl">I</span>nvoices
        </h1>
      </Link>
    </div>
  );
}
