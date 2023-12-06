import { useUpdateTaskMutation } from "./taskListApi";
import { useRef } from "react";

export default function UpdateItemQuantity({
  currentQuantity,
  totalQuantityByInvoiceId,
  totalPriceByInvoiceId,
  id,
  invoiceId,
  price,
}) {
  const ref = useRef();

  const [updateTask] = useUpdateTaskMutation();

  return (
    <div className="flex items-center justify-end gap-2 md:gap-3 w-max">
      <input
        type="number"
        className="w-[50px] rounded bg-rose-300"
        ref={ref}
        onBlur={(e) => {
          updateTask({
            id,
            obj: { quantity: currentQuantity + Number(e.target.value) },
            invoiceId,
            invoiceObj: {
              quantity: totalQuantityByInvoiceId + Number(e.target.value),
              totalPrice:
                totalPriceByInvoiceId + price * Number(e.target.value),
            },
          });
          ref.current.value = "";
        }}
      />
    </div>
  );
}
