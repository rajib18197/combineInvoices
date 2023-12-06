export default function TagText({ text = "", children }) {
  return (
    <p
      className={`text-sm font-semibold ${
        text === "normal" ? "lowercase" : "uppercase"
      } bg-orange-300 text-gray-800 rounded-full px-3 py-1 w-max`}
    >
      {children}
    </p>
  );
}
