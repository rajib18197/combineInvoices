import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { authApi, useLogoutMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick() {
    dispatch(authApi.endpoints.logout.initiate())
      .unwrap()
      .then(() => {
        navigate("/login");
      });
  }
  return (
    <button
      className="p-[.2rem] hover:bg-gray-800 block rounded"
      onClick={handleClick}
    >
      <HiArrowRightOnRectangle className="w-[1.6rem] h-[1.6rem]" />
    </button>
  );
}
