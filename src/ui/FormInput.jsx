export default function FormInput({ label, error, className, children }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={children.id} className="font-semibold capitalize">
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-red-800 font-semibold">{error}</p>}
    </div>
  );
}
