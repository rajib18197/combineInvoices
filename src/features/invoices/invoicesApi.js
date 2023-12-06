import { supabase } from "../../services/supabase";
import apiSlice from "../serverState/apiSlice";

const NUM_PER_PAGE = 5;

export const invoicesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllInvoices: builder.query({
      queryFn: async ({ filters, sortBy, page = 1 }) => {
        let query = supabase.from("invoices").select("*", { count: "exact" });

        if (filters.length > 0) {
          let arr = [];
          let filterField;
          filters.forEach((filter) => {
            if (filter.method === "in") {
              arr.push(filter.value);
              filterField = filter.field;
            } else {
              query = query.eq(filter.field, filter.value);
            }
          });

          if (arr.length > 0) {
            query = query.in(filterField, arr);
          }
        }

        if (sortBy.field) {
          query = query.order(sortBy.field, {
            ascending: sortBy.direction === "asc",
          });
        }

        const from = (page - 1) * NUM_PER_PAGE;
        const to = from + NUM_PER_PAGE - 1;
        console.log(from, to);
        query = query.range(from, to);

        const { data: invoices, count, error } = await query;

        if (error) return { error };
        return { data: { invoices, count } };
      },

      providesTags: ["invoices"],
    }),

    getInvoice: builder.query({
      queryFn: async (id) => {
        const { data: invoice, error } = await supabase
          .from("invoices")
          .select(`*, projects(*), users(*)`)
          .eq("id", id)
          .single();

        if (error) return { error };
        console.log(invoice);
        return { data: invoice };
      },
      providesTags: (result, error, arg) => [{ type: "invoices", id: arg }],
    }),

    addNewInvoice: builder.mutation({
      queryFn: async (newData) => {
        const { data, error } = await supabase
          .from("invoices")
          .insert([newData])
          .select();

        if (error) return { error };
        return { data };
      },
    }),

    updateInvoice: builder.mutation({
      queryFn: async ({ id, obj }) => {
        console.log(id, obj);
        const { data, error } = await supabase
          .from("invoices")
          .update([obj])
          .eq("id", id)
          .select();

        if (error) return { error };
        console.log(data);

        return { data };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "invoices", id: arg.id },
        { type: "invoices" },
      ],
    }),

    deleteInvoice: builder.mutation({
      queryFn: async (id) => {
        const { error: taskListError } = await supabase
          .from("taskList")
          .delete()
          .eq("invoiceId", id);

        if (taskListError) return { error };

        const { error } = await supabase.from("invoices").delete().eq("id", id);

        if (error) return { error };

        return { data: true };
      },
    }),
  }),
});

export const {
  useGetAllInvoicesQuery,
  useGetInvoiceQuery,
  useAddNewInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoicesApi;
