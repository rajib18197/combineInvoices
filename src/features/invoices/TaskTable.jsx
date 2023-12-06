import { useSelector } from "react-redux";
import Table from "../../ui/Table";
import TaskRow from "./TaskRow";
import {
  useGetAllTaskByInvoiceIdQuery,
  useGetAllTaskListQuery,
} from "./taskListApi";
import { cartState } from "./cartSlice";
import { useParams } from "react-router-dom";

export default function TaskTable() {
  const { id } = useParams();
  const { data: cartList, isLoading } = useGetAllTaskByInvoiceIdQuery(id);
  // const { data: taskList, isLoading } = useGetAllTaskListQuery();

  if (isLoading) return <h2>Loading</h2>;
  const totalCartPrice = cartList.reduce((acc, cur) => {
    const sum = cur.price * cur.quantity;
    return acc + sum;
  }, 0);

  return (
    <Table columns={{ col1: 2, col2: 0.6, col3: 1, col4: 1 }}>
      <Table.Header>
        <div>Name</div>
        <div>Quantity</div>
        <div>Price</div>
        <div>Total</div>
      </Table.Header>
      <Table.Body
        data={cartList}
        render={(task) => <TaskRow key={task.id} task={task} />}
      />
      <Table.Footer>
        <div className="flex items-center justify-between">
          <p>Total</p>
          <p>{totalCartPrice}</p>
        </div>
      </Table.Footer>
    </Table>
  );
}
