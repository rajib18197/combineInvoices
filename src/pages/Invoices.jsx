import { HiPlus } from "react-icons/hi2";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import InvoiceList from "../features/invoices/InvoiceList";
import InvoiceListOperations from "../features/invoices/InvoiceListOperations";
import Filters, { Filter } from "../ui/Filters";
import AddInvoices from "../features/invoices/AddInvoices";

export default function Invoices() {
  return (
    <Row>
      <Row type="horizontal">
        <Heading>Invoice List</Heading>
        <AddInvoices />

        <Filters
          filterField="status"
          options={[
            { value: "all", label: "All" },
            { value: "pending", label: "Pending" },
            { value: "paid", label: "Paid" },
          ]}
          multiple={false}
        />
      </Row>
      <Row>
        <InvoiceListOperations />
      </Row>
      <Row>
        <InvoiceList />
      </Row>
    </Row>
  );
}
