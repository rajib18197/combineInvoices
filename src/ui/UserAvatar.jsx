import { useUser } from "../hooks/useUser";

export default function UserAvatar() {
  const data = useUser();
  console.log(data);
  const {
    user: {
      user_metadata: { fullName, avatar },
    },
  } = data;
  console.log(fullName);
  // console.log(data);
  // const avatar = "";

  const imageSrc = avatar ? avatar : "/vite.svg";

  return (
    <div className="flex items-center gap-4">
      <img
        src={imageSrc}
        alt="avatar"
        className="w-[2.2rem] h-[2.2rem] border-2 border-gray-100 rounded-full"
      />
      <span className="font-semibold text-gray-200">{fullName}</span>
    </div>
  );
}
