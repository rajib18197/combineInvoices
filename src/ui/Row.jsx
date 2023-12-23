export default function Row({ type, children }) {
  const className = `flex ${
    type === "vertical"
      ? "flex-col gap-[1.6rem]"
      : "flex-col gap-3 md:flex-row md:gap-0 justify-between items-center"
  }`;

  return <div className={className}>{children}</div>;
}

Row.defaultProps = {
  type: "vertical",
};
