import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://hvhgbrdhdtldjnagciqq.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2aGdicmRoZHRsZGpuYWdjaXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NzYyMDUsImV4cCI6MjAxNTQ1MjIwNX0.fjjA0KJCkZ0pP3Zd_tfX0nEBtddA7YbBW2rPHbCRbb0";

export const supabase = createClient(supabaseUrl, supabaseKey);

// useEffect(function () {
//   async function fetchAllInvoices() {
//     const { data: invoiceDetails, error } = await supabase
//       .from("invoiceDetails")
//       .select(`*, taskList(*, projects(*)), invoices(*, users(*))`);

//     console.log(invoiceDetails);

//     const data = invoiceDetails.reduce((acc, cur) => {
//       const existingTaskIndex = acc.findIndex((el) => {
//         return el.invoiceId === cur.invoiceId;
//       });

//       if (existingTaskIndex !== -1) {
//         acc[existingTaskIndex] = {
//           ...acc[existingTaskIndex],
//           taskList: [
//             ...acc[existingTaskIndex].taskList,
//             {
//               id: cur.taskList.id,
//               name: cur.taskList.name,
//               price: cur.taskList.price,
//               quantity: cur.taskList.quantity,
//             },
//           ],
//         };
//         return acc;
//       }

//       const invoiceObj = {
//         invoiceId: cur.invoiceId,
//         invoiceName: cur.invoices.name,
//         address: cur.invoices.address,
//         city: cur.invoices.city,
//         country: cur.invoices.country,
//         date: cur.invoices.date,
//         dueDate: cur.invoices.dueDate,
//         status: cur.invoices.status,
//         users: { ...cur.invoices.users },
//         project: cur.taskList.projects.name,
//         projectColor: cur.taskList.projects.color,
//         taskList: [
//           {
//             id: cur.taskList.id,
//             name: cur.taskList.name,
//             price: cur.taskList.price,
//             quantity: cur.taskList.quantity,
//           },
//         ],
//       };
//       return [...acc, invoiceObj];
//     }, []);

//     console.log(data);
//   }

//   fetchAllInvoices();
// }, []);
