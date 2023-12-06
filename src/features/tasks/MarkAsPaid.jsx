import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { invoicesApi } from "../invoices/invoicesApi";
import { useNavigate, useParams } from "react-router-dom";

export default function MarkAsPaid({ moveBack = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  function handleClick() {
    dispatch(
      invoicesApi.endpoints.updateInvoice.initiate({
        id: id,
        obj: { status: "paid" },
      })
    )
      .unwrap()
      .then(() => {
        if (moveBack) navigate(-1);
      });
  }

  return (
    <Button type="small" onClick={handleClick}>
      Mark as paid
    </Button>
  );
}
