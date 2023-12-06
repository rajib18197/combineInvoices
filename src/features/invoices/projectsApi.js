import { supabase } from "../../services/supabase";
import apiSlice from "../serverState/apiSlice";

const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      queryFn: async () => {
        const { data: projects, error } = await supabase
          .from("projects")
          .select("*");

        if (error) return { error };

        return { data: projects };
      },
    }),

    getProjectById: builder.query({
      queryFn: async (id) => {
        const { data: project, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id);

        if (error) return { error };

        return { data: project };
      },
    }),

    getProjectByName: builder.query({
      queryFn: async (projectName) => {
        const { data: project, error } = await supabase
          .from("projects")
          .select("*")
          .eq("name", projectName);

        if (error) return { error };

        return { data: project };
      },
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useGetProjectByNameQuery,
} = projectsApi;
