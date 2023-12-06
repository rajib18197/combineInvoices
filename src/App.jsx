import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Users from "./pages/Users";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Invoices from "./pages/Invoices";
import Invoice from "./pages/Invoice";
import ProtectedRoute from "./ui/ProtectedRoute";
import Tasks from "./pages/Tasks";
import InfiniteScroll from "./ui/InfiniteScroll";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="invoices" replace />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="invoices/:id" element={<Invoice />} />
          <Route path="invoices/:id/cart" element={<Tasks />} />
          <Route path="users" element={<Users />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="infinitescroll" element={<InfiniteScroll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
