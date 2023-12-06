import Button from "../../ui/Button";
import Heading from "../../ui/Heading";

export default function DeleteInvoice({
  invoice,
  onCloseModal,
  deleteInvoice,
  isDeleting,
}) {
  return (
    <div>
      <Heading as="h4">
        Are you sure you want to delete this invoice and all the tasks that
        belongs to this ({invoice.name}({invoice.id}))? This action cannot be
        undone.
      </Heading>
      <div className="flex gap-2 justify-end items-center">
        <Button type="small" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="small" onClick={() => deleteInvoice(invoice.id)}>
          {isDeleting ? "deleting" : "Delete"}
        </Button>
      </div>
    </div>
  );
}
