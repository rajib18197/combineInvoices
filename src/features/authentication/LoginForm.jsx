import { useForm } from "react-hook-form";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";
import { authApi, useLoginMutation } from "./authApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../ui/Input";
import { useState } from "react";

export default function LoginForm() {
  const isLoggingIn = useSelector((state) =>
    Object.values(state.api.mutations).some(
      (entry) => entry.status === "pending"
    )
  );

  console.log(isLoggingIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("rajib.egnr@gmail.com");
  const [password, setPassword] = useState("rajib1234");

  function handleLogin(e) {
    e.preventDefault();

    console.log(email, password);
    dispatch(authApi.endpoints.login.initiate({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 bg-pink-200 p-4 rounded justify-center w-5/12"
    >
      <div className="flex flex-col gap-4">
        <FormInput label="email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormInput>

        <FormInput label="password">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormInput>
      </div>

      <div>
        <Button type="small">{isLoggingIn ? "Logging in" : "Login"}</Button>
      </div>
    </form>
  );
}
