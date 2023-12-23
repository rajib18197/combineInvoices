import { NavLink } from "react-router-dom";
import {
  HiArrowRightOnRectangle,
  HiMoon,
  HiOutlineUser,
} from "react-icons/hi2";
import Logout from "../features/authentication/Logout";

export default function Navbar() {
  return (
    <nav className="bg-gray-700 p-1 rounded w-max">
      <ul className="flex gap-3 items-center">
        <li>
          <NavLink
            to={"users"}
            className="p-[.2rem] hover:bg-gray-800 block rounded"
          >
            <HiOutlineUser className="w-[1.6rem] h-[1.6rem]" />
          </NavLink>
        </li>
        {/* <li>
          <NavLink className="p-[.2rem] hover:bg-gray-800 block rounded">
            <HiMoon className="w-[1.6rem] h-[1.6rem]" />
          </NavLink>
        </li> */}
        <li>
          <Logout />
        </li>
      </ul>
    </nav>
  );
}
