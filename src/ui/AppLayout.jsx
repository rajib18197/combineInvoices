import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="grid grid-rows-[auto_1fr] gap-2 h-screen">
      <Header />
      <main className="bg-gray-900 text-stone-100 p-3 rounded">
        <Outlet />
      </main>
    </div>
  );
}
