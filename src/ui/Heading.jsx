export default function Heading({ as: Type = "h1", children }) {
  const styles = {
    h1: "font-bold text-[1.7rem] text-gray-200 capitalized",
    h2: "font-bold text-[1.5rem] text-gray-200 uppercase",
    h3: "font-semiblod text-[2rem] text-gray-200",
    h4: "font-semiblod text-[1.4rem] text-gray-800",
    h5: "font-semiblod text-[1rem] text-gray-800 uppercase",
  };
  return <Type className={styles[Type]}>{children}</Type>;
}
