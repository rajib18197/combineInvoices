export default function Row({ type, children }) {
  const className = `flex ${
    type === "vertical"
      ? "flex-col gap-[1.6rem]"
      : "flex-row justify-between items-center"
  }`;

  return <div className={className}>{children}</div>;
}

Row.defaultProps = {
  type: "vertical",
};
