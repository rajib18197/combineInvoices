import { HiChevronRight } from "react-icons/hi2";
import Button from "../../ui/Button";
import ButtonIcon from "../../ui/ButtonIcon";
import { useNavigate } from "react-router-dom";

export default function InvoiceItem({ invoice }) {
  const {
    id,
    name,
    projectName,
    userName,
    dueDate,
    totalPrice,
    quantity,
    status,
  } = invoice;
  const navigate = useNavigate();

  return (
    <li className="bg-indigo-200 text-gray-800 font-medium p-2 rounded grid grid-cols-[.6fr_1.8fr_1fr_1fr_.8fr_.6fr_.4fr] gap-2 items-center">
      <div>{name}</div>
      <div>{projectName}</div>
      <div>Due {new Date(dueDate).toLocaleDateString()}</div>
      <div>{userName}</div>
      <div>
        {quantity ? quantity : <>&mdash;</>}/
        {totalPrice ? `${totalPrice}` : <>&mdash;</>}
      </div>
      <div>
        <p className="flex items-center justify-between text-sm rounded border-2 border-indigo-700 font-semibold uppercase text-gray-800 px-2 py-1">
          &#x2022; {status}
        </p>
      </div>
      <div className="justify-self-center">
        <ButtonIcon onClick={() => navigate(`/invoices/${id}`)}>
          <HiChevronRight />
        </ButtonIcon>
      </div>
    </li>
  );
}
