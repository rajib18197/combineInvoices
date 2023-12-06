import { supabase } from "../../services/supabase";
import apiSlice from "../serverState/apiSlice";

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      queryFn: async () => {
        const { data: users, error } = await supabase.from("users").select("*");
        if (error) return { error };

        return { data: users };
      },
    }),
  }),
});

export const { useGetAllUsersQuery } = usersApi;
