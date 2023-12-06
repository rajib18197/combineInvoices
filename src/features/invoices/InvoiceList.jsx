import { useGetAllInvoicesQuery } from "./invoicesApi";
import InvoiceItem from "./InvoiceItem";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";

export default function InvoiceList() {
  const [searchParams] = useSearchParams();

  // 1) Filter Area
  const filterStatusValue = searchParams.get("status");
  const filterProjectNameValue = searchParams.get("projects");

  let filters = [];

  if (filterStatusValue !== "all" && filterStatusValue) {
    filters.push({ field: "status", value: filterStatusValue });
  }

  if (filterProjectNameValue !== "all" && filterProjectNameValue) {
    const projects = filterProjectNameValue.split(",").map((name) =>
      name
        .split("-")
        .map((n) => n[0].toUpperCase() + n.slice(1))
        .join(" ")
    );

    projects.forEach((projectName) =>
      filters.push({ field: "projectName", value: projectName, method: "in" })
    );
  }

  // 2) Sort Area
  const sortByRaw = searchParams.get("sortBy");

  const [field, direction] = sortByRaw?.split("-") || [];
  const sortBy = { field, direction };

  // 3) Pagination
  const page = Number(searchParams.get("page")) || 1;

  // Fetching Invoices
  const {
    data: { invoices, count } = {},
    isLoading,
    isFetching,
    isError,
    status,
  } = useGetAllInvoicesQuery(
    { filters, sortBy, page },
    {
      refetchOnMountOrArgChange: 15,
    }
  );

  console.log(status);

  if (isLoading || status === "pending") return <Spinner />;

  if (!isLoading && isError) return <h2>Error Occured</h2>;

  if (!isLoading && !isError && invoices.length === 0)
    return <h2>No Invoices found at the moment!</h2>;

  return (
    <>
      <ul className="flex flex-col gap-2">
        {invoices.map((invoice) => (
          <InvoiceItem key={invoice.id} invoice={invoice} />
        ))}
      </ul>

      <Pagination count={count} />
    </>
  );
}

/** 
  ✅ The Project: combineInvoices
  combinInvoices is a small centralized place for effortless tracking where company log their invoices. They  specialize in offering cutting-edge solutions.

  This business wants an internal application that will be used inside the company to track everything about their invoices: Invoice details with assoisiated project and tasklist.

  I built this project from the ground up, employing React for the frontend and Supabase for the backend. I even took charge of database design apart from react and create a seamless user experience with features like optimistic and pessimistic updates.

  ✅ Tech stack I decided to use - 
   1) React as in-house app is one of the perfect use case of react  
   1) React Router as standard in react community and for SPA
   2) Remote State management RTK Query for leveraging beautiful user experience (less network request/caching, revalidation, optimistic and pessimistic updates and more)
   3) React hook form for simplify manual state management and error handling in form
   4) Tailwind CSS for styling
   And other tools - React Icons, Supabase


   ✅ Project Requirements
    1) Authentication Feature
     - App users are company's employees. They need to be logged into the application to perform tasks
     - Creation of new users happens inside the app to make sure compnay's employee can get accounts

    2) Invoices Feature
     - app shows list of all invoices with Invoice name, project name, payment due date, custmer name, task quantity, task price and status
     - users can do all the CRUD operation for invoices seamlessly
     - refine the list as users want because of app has slightly complex filters, sorting and pagination operations
     - display details of an invoice such as - customer info, company info, status, the project that invoice offer and all the sub-tasks of that project
     - can add new task item in the cart from that sub-tasks which the company completed for the customer, update the task item quantity and also delete the item
     - mark the invoice as 'paid' status from pending after customer make the full payment 


  ✅ challenges
  1) Figuring out the right code organiztion
    I always try to follow some sort of patterns and architecture when I am building an app because I truely believe A project is never really done as I often need to add new feature or changes something inside and when I don't follow a good image of the code then it becomes too hard and frustrating when I am reading my code and wanted to change something.

  2) designing the database
    Run into many issues when designing database as this is my first database design and going through lot of re-thinking about that.

  3) On how to think about cache and invalidation
    I run into some quirky behavior when implementing optimistic/pessimistic update and got to do lot of experimenting and study about varius APIs like [refetchOnMountOrArgChange, refetchOnFocus, unused queries, cache time] and trying to relate with react query and how it's done on react query.

  ✅ Thought process
  second I divide my application into couple of feature categories like in this app I have auth, invoices, cartList feature categories and after that I try to drill down into each of this feature categories and figure out all the features I need to implement for each categories.
  I always striving for reuable component whenever need arises as it is one of the core and main advantage of the React library.
  As one of the big goal of this project is to ensure seamless experiece and for that I leverage most of the common benefits that RTK query offers and try to inject them with the best possible way. 


  ✅ Lessons Learned:
   The big lesson I get from this project where optimistic update makes sense and where pessimistic update makes sense as these two feature requires good thinking of how to revalidate a cache. I have to go quite a dive dive into these topics and learn their pros and cons.

   also I run into many issues when designing database and found some interesting and valuable guides for designing them 

 */
