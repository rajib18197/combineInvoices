import { HiPlus } from "react-icons/hi2";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateInvoiceForm from "./CreateInvoiceForm";

export default function AddInvoices() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="invoice-form">
          {(handleClick) => (
            <Button icon={<HiPlus />} type="primary" onClick={handleClick}>
              Add Invoice
            </Button>
          )}
        </Modal.Open>
        <Modal.Window windowName="invoice-form">
          {({ onCloseModal }) => (
            <CreateInvoiceForm onCloseModal={onCloseModal} />
          )}
        </Modal.Window>
      </Modal>
    </div>
  );
}
