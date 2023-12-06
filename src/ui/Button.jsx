import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, icon, onClick, className }) {
  const base =
    "flex gap-2 items-center text-base rounded-md bg-indigo-700 font-semibold tracking-wide text-gray-200 transition-colors duration-300 hover:bg-indigo-800 focus:bg-orange-800 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: base + " px-2 py-2 md:px-2 md:py-2",
    small:
      "flex gap-2 items-center text-sm rounded-md bg-indigo-700 font-semibold tracking-wide text-gray-200 transition-colors duration-300 hover:bg-indigo-800 focus:bg-orange-800 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2 md:px-5 md:py-2.5 text-sm",
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-2 py-2 md:px-2 md:py-2",
    standard:
      "flex gap-2 items-center inline-block text-sm rounded border-2 border-indigo-700 font-semibold uppercase tracking-wide text-gray-800 transition-colors duration-300 hover:bg-stone-300 px-4 py-1 md:px-4 md:py-1",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button
      disabled={disabled}
      className={`${styles[type]} ${className}`}
      onClick={() => onClick?.()}
    >
      {icon && (
        <span className="w-[2rem] h-[2rem] bg-gray-300 rounded-full text-gray-900 flex items-center justify-center">
          {icon}
        </span>
      )}
      {children}
    </button>
  );
}

export default Button;
