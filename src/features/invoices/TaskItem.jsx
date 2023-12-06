import Button from "../../ui/Button";
import UpdateItemQuantity from "./UpdateItemQuantity";
import {
  useAddTaskListMutation,
  useGetAllTaskByInvoiceIdQuery,
} from "./taskListApi";
import { useParams } from "react-router-dom";
import DeleteTask from "../tasks/DeleteTask";

export default function TaskItem({ task, projectId }) {
  const { id: invoiceId } = useParams();

  const { data: cartList, isLoading } =
    useGetAllTaskByInvoiceIdQuery(invoiceId);

  const [addTaskList, { isLoading: isAdding }] = useAddTaskListMutation();

  if (isLoading) return <h2>Loading</h2>;

  console.log(cartList);

  const { id, name, price } = task;

  // Check if this specific task is in the taskList/CartList or other word if this task has added by the user or NOT.
  const cartTaskItem = cartList?.find(
    (c) => c.name.toLowerCase() === task.name.toLowerCase()
  );
  const isInCart = Boolean(cartTaskItem?.name);
  console.log(cartTaskItem, isInCart);

  // Number of quantity of this specific taskItem
  const taskQuantity = cartList?.find(
    (c) => c.name.toLowerCase() === task.name.toLowerCase()
  )?.quantity;

  // total quantity of the
  const totalQuantityByInvoiceId = cartList
    .filter((cart) => cart.invoiceId === Number(invoiceId))
    .reduce((acc, cur) => acc + cur.quantity, 0);

  console.log(totalQuantityByInvoiceId);

  const totalPriceByInvoiceId = cartList
    .filter((cart) => cart.invoiceId === Number(invoiceId))
    .reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

  console.log(totalPriceByInvoiceId);

  console.log(task);

  function handleAddTask() {
    addTaskList({
      newTask: { projectId, invoiceId, name, quantity: 1, price },
      updateInvoice: {
        quantity: totalQuantityByInvoiceId + 1,
        totalPrice: totalPriceByInvoiceId + price,
      },
    });
  }

  return (
    <li className="flex gap-4 p-2 bg-pink-200 rounded-md text-gray-800 font-semibold">
      <div className="flex items-center w-full">
        <p className="flex-1 flex gap-2 font-bold">{name}</p>
        <p className="text-base mx-auto font-bold">€{price}</p>

        <div className="mt-auto flex-1 flex items-center justify-end">
          {isInCart && (
            <div className="w-full flex justify-end items-center gap-3 sm:gap-8">
              <span className="font-bold text-orange-800">
                {taskQuantity}&times;
              </span>

              <UpdateItemQuantity
                currentQuantity={taskQuantity}
                totalQuantityByInvoiceId={totalQuantityByInvoiceId}
                totalPriceByInvoiceId={totalPriceByInvoiceId}
                id={cartTaskItem.id}
                invoiceId={invoiceId}
                price={price}
              />

              <DeleteTask
                invoiceId={invoiceId}
                cartTaskItem={cartTaskItem}
                task={task}
                totalQuantityByInvoiceId={totalQuantityByInvoiceId}
                totalPriceByInvoiceId={totalPriceByInvoiceId}
              />
            </div>
          )}

          {!isInCart && (
            <Button
              className="justify-end"
              type="small"
              onClick={handleAddTask}
            >
              {isAdding ? "adding" : "Add to cart"}
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}
