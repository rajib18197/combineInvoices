import { useForm } from "react-hook-form";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";
import { useSignUpMutation } from "./authApi";
import Input from "../../ui/Input";

export default function SignupForm() {
  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;

  console.log(formState);
  console.log(errors);

  const [signUp, { data, isLoading: isSigningUp }] = useSignUpMutation();

  function onSubmit({ fullName, email, password }) {
    console.log(data);
    signUp({ email, password, fullName });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4  justify-center w-8/12"
    >
      <div className="flex flex-col gap-4 text-gray-100">
        <FormInput label="Full Name" error={errors?.fullName?.message}>
          <Input
            type="text"
            {...register("fullName", {
              required: "This field is required",
            })}
          />
        </FormInput>

        <FormInput label="Email" error={errors?.email?.message}>
          <Input
            type="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: "/^[^s@]+@[^s@]+.[^s@]+$/",
                message: "Please provide a valid email address",
              },
            })}
          />
        </FormInput>

        <FormInput label="Password" error={errors?.password?.message}>
          <Input
            type="password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "passwords needs to minimum 8 characters",
              },
            })}
          />
        </FormInput>

        <FormInput
          label="Repeat Password"
          error={errors?.["repeat-password"]?.message}
        >
          <Input
            type="password"
            {...register("repeat-password", {
              validate: (value) =>
                getValues().password === value || "passwords need to match",
            })}
          />
        </FormInput>
      </div>

      <div>
        <Button type="small">{isSigningUp ? "Signing up" : "Submit"}</Button>
      </div>
    </form>
  );
}
