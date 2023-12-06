import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

export default function Login() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center rounded bg-gray-900 h-full">
      <Logo />
      <Heading as="h3">Log in to your account</Heading>
      <LoginForm />
    </div>
  );
}

// Task Remaining (4)

// display nice Loading spinner
// Button component re-design
// check rtk query features if all okay or not
// responsiveness
