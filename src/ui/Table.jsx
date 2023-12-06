import { createContext, useContext } from "react";

const TableContext = createContext();

export default function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div>{children}</div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  // const cols = columns.split(" ").join("_");
  return (
    <div
      className={`grid grid-cols-[2fr_.6fr_1fr_1fr_.6fr] gap-2 bg-gray-100 text-gray-800 font-bold p-2 rounded`}
    >
      {children}
    </div>
  );
}

function Body({ data, render }) {
  return <section className="my-[0.4rem]">{data.map(render)}</section>;
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      className={`grid grid-cols-[2fr_.6fr_1fr_1fr_.6fr] gap-2 bg-pink-200 text-gray-800 items-center p-2 rounded font-semibold`}
    >
      {children}
    </div>
  );
}

function Footer({ children }) {
  return (
    <footer className="p-2 bg-gray-100 text-gray-800 font-bold rounded">
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
