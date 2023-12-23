import Logo from "./Logo";
import Navbar from "./Navbar";
import UserAvatar from "./UserAvatar";

export default function Header() {
  return (
    <header className="bg-gray-900 text-stone-100 p-3 rounded flex flex-wrap flex-row justify-between items-center">
      <Logo />
      <Navbar />
      <UserAvatar />
    </header>
  );
}
