import { useParams } from "react-router-dom";
import { useDeleteInvoiceMutation, useGetInvoiceQuery } from "./invoicesApi";
import Button from "../../ui/Button";
import TaskTable from "./TaskTable";
import TaskMenu from "./TaskMenu";
import { useSelector } from "react-redux";
import { cartState } from "./cartSlice";
import CartOverview from "./CartOverview";
import { useGetAllTaskByInvoiceIdQuery } from "./taskListApi";
import CreateInvoiceForm from "./CreateInvoiceForm";
import Modal from "../../ui/Modal";
import { useGetAllProjectsQuery } from "./projectsApi";
import { useGetAllUsersQuery } from "./usersApi";
import MarkAsPaid from "../tasks/MarkAsPaid";
import TagText from "../../ui/TagText";
import DeleteInvoice from "./DeleteInvoice";

export default function InvoiceDetail() {
  const { id } = useParams();
  // 1) get an Invoice details by id
  const { data: invoice, isLoading } = useGetInvoiceQuery(id);

  // 2) get a corresponding project for that Invoice - although in the invoice data there is a field of which project Id should be fetch but we can't access that as that invoice is being downloaded that's why we fetch all the projects and later find the corresponding project by the invoice details data
  const { data: projects, isLoading: isProjectsLoading } =
    useGetAllProjectsQuery();

  // 3) get a corresponding user for that Invoice - same as allProjects query
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsersQuery();

  // 4) get all taskList that was added by the user for that Invoice
  const { data: tasksInCart, isLoading: isCartLoading } =
    useGetAllTaskByInvoiceIdQuery(id);

  const [deleteInvoice, { isLoading: isDeleting }] = useDeleteInvoiceMutation();

  if (isLoading || isCartLoading || isProjectsLoading || isLoadingUsers)
    return <h2>Loading</h2>;

  const hasCartEmpty = tasksInCart?.length === 0;
  console.log(tasksInCart);

  const projectName = projects.find((pro) => pro.name === invoice.projectName);
  const fullName = users.find((user) => user.fullName === invoice.userName);
  console.log(fullName);

  const invoiceToUpdate = {
    ...invoice,
    fullName: `${fullName.fullName.toLowerCase().split(" ").join("-")}-${
      fullName.id
    }`,
    email: fullName.email,
    address: fullName.address,
    city: fullName.city,
    postalCode: fullName.postalCode,
    country: fullName.country,
    projectName: `${projectName.name.toLowerCase().split(" ").join("-")}-${
      projectName.id
    }`,
    invoiceDate: invoice.date.slice(0, invoice.date.indexOf("T")),
    paymentTerm: invoice.paymentTerm.split("-")[1],
    cartList: tasksInCart,
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="border-l-4 border-indigo-700 rounded-e-md flex flex-col gap-2 bg-gray-800 p-2 sm:flex sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center gap-1">
          <TagText>Status: {invoice.status}</TagText>
        </div>

        <div className="flex items-center gap-2">
          <Modal>
            <Modal.Open opens={"update-invoice-form"}>
              {(handleClick) => (
                <Button type="small" onClick={handleClick}>
                  Update
                </Button>
              )}
            </Modal.Open>
            <Modal.Window windowName="update-invoice-form">
              {({ onCloseModal }) => (
                <CreateInvoiceForm
                  onCloseModal={onCloseModal}
                  invoiceToUpdate={invoiceToUpdate}
                />
              )}
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="delete-invoice">
              {(handleClick) => (
                <Button type="small" onClick={handleClick}>
                  Delete
                </Button>
              )}
            </Modal.Open>
            <Modal.Window windowName="delete-invoice" height="auto">
              {({ onCloseModal }) => (
                <DeleteInvoice
                  invoice={invoice}
                  isDeleting={isDeleting}
                  deleteInvoice={deleteInvoice}
                  onCloseModal={onCloseModal}
                />
              )}
            </Modal.Window>
          </Modal>
          {invoice.status !== "paid" && <MarkAsPaid moveBack={false} />}
        </div>
      </div>

      <div className="h-full flex flex-col gap-3 text-center md:text-left md:grid md:grid-cols-6 gap-y-8 md:grid-rows-[auto auto auto] overflow-y-scroll text-gray-300 scrollbar">
        <div className="md:row-start-1 md:col-span-3">
          <h3 className="uppercase font-bold text-xl tracking-wide">
            {invoice.name}
          </h3>
          <h5 className="uppercase text-sm font-bold text-yellow-400 tracking-wide">
            {invoice.projects.name}
          </h5>
        </div>

        <div className="md:col-span-3 text-gray-500 md:row-start-1 md:justify-self-end flex flex-col md:justify-end md:items-end">
          <p className="font-bold">{invoice.companyAddress}</p>
          <p className="font-bold">
            {invoice.companyCity}, {invoice.companyPostalCode},{" "}
            {invoice.companyCountry}
          </p>
        </div>

        <div className="md:col-start-1 md:col-span-2 md:row-start-2 flex flex-col gap-4">
          <div>
            <h4 className="font-bold">Invoice Date</h4>
            <p>{invoice.date}</p>
          </div>
          <div>
            <h4 className="font-bold">Due Date</h4>
            <p>{invoice.dueDate}</p>
          </div>
        </div>

        <div className="md:col-start-3 md:col-span-2 md:row-start-2 text-sm italic">
          <p className="font-bold not-italic uppercase">Bill To</p>
          <h4 className="uppercase text-yellow-400">
            {invoice.users.fullName}
          </h4>
          <h4>{invoice.users.address}</h4>
          <h4>
            {invoice.users.city}, {invoice.users.postalCode},{" "}
            {invoice.users.country}
          </h4>
          {/* <h4>{invoice.users.postalCode}</h4> */}
          {/* <h4>{invoice.users.country}</h4> */}
        </div>

        <div className="md:col-start-5 md:col-span-2 md:row-start-2">
          <p className="font-bold">Sent To</p>
          <TagText text={"normal"}>{invoice.users.email}</TagText>
        </div>

        <div className="col-start-1 col-span-6 row-start-3">
          {invoice.status === "paid" && <TaskTable />}
          {invoice.status === "pending" && (
            <TaskMenu projectId={invoice.projectId} />
          )}
        </div>
      </div>

      <div className="mt-auto">
        {invoice.status === "pending" && !hasCartEmpty && (
          <CartOverview cart={tasksInCart} />
        )}
      </div>
    </div>
  );
}

// Elements of Programming interview
