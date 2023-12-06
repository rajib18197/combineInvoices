import { useParams } from "react-router-dom";
import Table from "../../ui/Table";
import {
  useDeleteTaskMutation,
  useGetAllTaskByInvoiceIdQuery,
  useUpdateTaskMutation,
} from "./taskListApi";
import Button from "../../ui/Button";
import { useGetInvoiceQuery, useUpdateInvoiceMutation } from "./invoicesApi";
import DeleteTask from "../tasks/DeleteTask";
import UpdateItemQuantity from "./UpdateItemQuantity";

export default function TaskRow({ task }) {
  const { id: invoiceId } = useParams();

  const { data: invoice, isLoading: isInvoiceLoading } =
    useGetInvoiceQuery(invoiceId);

  const { name, quantity, price } = task;
  const totalPrice = price * quantity;

  const { data: cartList, isLoading } =
    useGetAllTaskByInvoiceIdQuery(invoiceId);

  if (isLoading || isInvoiceLoading) return <h2>Loading</h2>;

  const cartTaskItem = cartList.find(
    (c) => c.name.toLowerCase() === task.name.toLowerCase()
  );

  const totalQuantityByInvoiceId = cartList
    .filter((cart) => cart.invoiceId === Number(invoiceId))
    .reduce((acc, cur) => acc + cur.quantity, 0);
  console.log(totalQuantityByInvoiceId);

  const totalPriceByInvoiceId = cartList
    .filter((cart) => cart.invoiceId === Number(invoiceId))
    .reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

  console.log(totalPriceByInvoiceId);

  console.log(cartTaskItem);
  console.log(invoice);

  return (
    <Table.Row>
      <div>{name}</div>
      <div className="flex gap-2 items-center">
        <span className="font-bold text-orange-800">{quantity}&times;</span>

        {invoice.status !== "paid" && (
          <UpdateItemQuantity
            currentQuantity={quantity}
            totalQuantityByInvoiceId={totalQuantityByInvoiceId}
            totalPriceByInvoiceId={totalPriceByInvoiceId}
            id={cartTaskItem.id}
            invoiceId={invoiceId}
            price={price}
          />
        )}
      </div>
      <div>{price}</div>
      <div>{totalPrice}</div>
      {invoice.status !== "paid" && (
        <div>
          <DeleteTask
            invoiceId={invoiceId}
            cartTaskItem={cartTaskItem}
            totalQuantityByInvoiceId={totalQuantityByInvoiceId}
            totalPriceByInvoiceId={totalPriceByInvoiceId}
            task={task}
          />
        </div>
      )}
    </Table.Row>
  );
}

// what the problem was
// when it happened
// where it happened
// how you solved the problem
// what the outcome was

// <input
//             type="number"
//             className="w-[50px] rounded bg-gray-400"
//             onBlur={async (e) => {
//               await updateTask({
//                 id: cartTaskItem.id,
//                 obj: { quantity: quantity + Number(e.target.value) },
//                 invoiceId,
//               });

//               await updateInvoice({
//                 id: cartTaskItem.invoiceId,
//                 obj: {
//                   quantity: totalQuantityByInvoiceId + Number(e.target.value),
//                   totalPrice:
//                     totalPriceByInvoiceId + price * Number(e.target.value),
//                 },
//               });
//             }}
//           />
