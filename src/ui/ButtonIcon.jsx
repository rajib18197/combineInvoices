export default function ButtonIcon({ children, ...props }) {
  return (
    <button
      className="w-10 h-10 flex items-center text-gray-800 justify-center rounded-full hover:bg-gray-800 hover:text-gray-50"
      {...props}
    >
      {children}
    </button>
  );
}
