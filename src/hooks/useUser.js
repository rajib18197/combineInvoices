import { useGetCurrentSessionQuery } from "../features/authentication/authApi";

export function useUser() {
  const { data: user, isLoading } = useGetCurrentSessionQuery();
  console.log(user);

  return { user, isAuthenticated: user?.role === "authenticated", isLoading };
}
