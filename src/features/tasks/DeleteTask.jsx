import Button from "../../ui/Button";
import { useDeleteTaskMutation } from "../invoices/taskListApi";

export default function DeleteTask({
  cartTaskItem,
  invoiceId,
  totalQuantityByInvoiceId,
  totalPriceByInvoiceId,
  task,
}) {
  const [deleteTask] = useDeleteTaskMutation();

  function handleDelete() {
    deleteTask({
      id: cartTaskItem.id,
      invoice: {
        invoiceId,
        quantity: totalQuantityByInvoiceId - cartTaskItem.quantity,
        totalPrice: totalPriceByInvoiceId - task.price * cartTaskItem.quantity,
      },
    });
  }

  return (
    <>
      <Button type="small" onClick={handleDelete}>
        Delete
      </Button>
    </>
  );
}
