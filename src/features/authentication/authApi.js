import { supabase } from "../../services/supabase";
import apiSlice from "../serverState/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      queryFn: async ({ email, password, fullName }) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              fullName,
              avatar: "",
            },
          },
        });

        if (error) return { error };
        return { data };
      },
    }),

    login: builder.mutation({
      queryFn: async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) return { error };
        return { data };
      },

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          console.log(data);
          dispatch(
            apiSlice.util.upsertQueryData(
              "getCurrentSession",
              undefined,
              data?.data?.user
            )
          );
        } catch {}
      },
    }),

    getCurrentSession: builder.query({
      queryFn: async () => {
        const { data: session } = await supabase.auth.getSession();
        console.log(session);
        if (!session.session) return { data: null };

        const { data, error } = await supabase.auth.getUser();

        if (error) return { error };
        console.log(data);
        return { data: data?.user };
      },
    }),

    logout: builder.mutation({
      queryFn: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) return { error };

        return { data: "logged out successfully" };
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentSessionQuery,
} = authApi;
