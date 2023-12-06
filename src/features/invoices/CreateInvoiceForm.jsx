import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormInput from "../../ui/FormInput";
import { useGetAllUsersQuery } from "./usersApi";
import { useGetAllProjectsQuery } from "./projectsApi";
import {
  useAddNewInvoiceMutation,
  useUpdateInvoiceMutation,
} from "./invoicesApi";
import TaskTable from "./TaskTable";
import { transformer } from "../../utils/transformer";
import Input, { classNames } from "../../ui/Input";
import Select from "../../ui/Select";
import Heading from "../../ui/Heading";
import { useDispatch, useSelector } from "react-redux";
import apiSlice from "../serverState/apiSlice";

const valueCheck = function (arr, val, getVal) {
  const r = arr?.find(
    (el) =>
      el.fullName.toLowerCase().split(" ").join("-") ===
      val.split("-").slice(0, -1).join("-")
  )?.[getVal];
  console.log(r);
  return r;
};

const timestampTranformation = function (dateStr) {
  console.log(dateStr);
  var originalDate = new Date(dateStr);
  originalDate.setHours(23, 59, 59, 999);

  // Convert to string in the desired format
  var formattedDate = originalDate.toISOString().split("T")[0] + " 23:59:59";

  console.log(formattedDate);
  return formattedDate;
};

const termOptions = [
  { value: "30", label: "Net-30-days" },
  { value: "60", label: "net-60-days" },
];

export default function ({ onCloseModal, invoiceToUpdate = {} }) {
  const isUpdateSession = Boolean(invoiceToUpdate?.id);
  const isAnythingLoading = useSelector((state) => {
    console.log(state.api);
    return Object.values(state.api.mutations).some(
      (entry) => entry.status === "pending"
    );
  });

  console.log(isAnythingLoading);

  const { data: users, isLoading, isError } = useGetAllUsersQuery();
  const dispatch = useDispatch();

  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: projectsError,
  } = useGetAllProjectsQuery();

  const [addNewInvoice, { data: addedData, isLoading: isCreating }] =
    useAddNewInvoiceMutation();

  const [updateInvoice, { data, isLoading: isUpdating }] =
    useUpdateInvoiceMutation();

  const { register, handleSubmit, getValues, setValue, formState } = useForm({
    defaultValues: isUpdateSession ? { ...invoiceToUpdate } : {},
  });

  console.log(formState);
  console.log(invoiceToUpdate);

  if (isLoading || isProjectsLoading) return <h2>Loading</h2>;

  const userOptions = transformer(users);
  const projectOptions = transformer(projects);

  console.log(userOptions);
  console.log(projectOptions);
  console.log(users);

  async function onSubmit(data) {
    const {
      name,
      companyAddress,
      companyCity,
      companyCountry,
      companyPostalCode,
      fullName,
      invoiceDate,
      paymentTerm,
      projectName,
    } = data;
    console.log(data);

    let dueDate = new Date(invoiceDate);
    console.log(dueDate);

    dueDate.setDate(dueDate.getDate() + Number(paymentTerm));
    const projectId = projectName.split("-").at(-1);
    const userId = fullName.split("-").at(-1);
    console.log(dueDate);

    const obj = {
      name,
      companyAddress,
      companyCity,
      companyCountry,
      companyPostalCode,
      date: timestampTranformation(invoiceDate),
      dueDate: timestampTranformation(dueDate),
      projectId,
      userId,
      paymentTerm: `net-${paymentTerm}-days`,
      projectName: projectName
        .split("-")
        .slice(0, -1)
        .map((n) => n[0].toUpperCase() + n.slice(1))
        .join(" "),
      userName: fullName
        .split("-")
        .slice(0, -1)
        .map((n) => n[0].toUpperCase() + n.slice(1))
        .join(" "),
      status: isUpdateSession ? invoiceToUpdate.status : "pending",
    };

    console.log(obj);

    if (isUpdateSession) {
      const r = await dispatch(
        apiSlice.endpoints.updateInvoice.initiate({
          id: invoiceToUpdate.id,
          obj,
        })
      ).unwrap();
      console.log(r);
      onCloseModal();
      return;
    }

    addNewInvoice(obj);
  }

  console.log(isUpdating);

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <FormInput label="Invoice Name">
        <Input type="text" id="name" {...register("name")} />
      </FormInput>

      <div className="flex flex-col gap-2">
        <Heading as="h5">Bill From</Heading>
        {/* <button>address</button> */}
        <div className="grid grid-cols-[1fr_1fr_1fr] gap-4">
          <FormInput label="Street Address" className="col-span-3">
            <Input
              type="text"
              id="companyAddress"
              {...register("companyAddress")}
            />
          </FormInput>

          <FormInput label="City" className="col-span-1">
            <Input type="text" id="companyCity" {...register("companyCity")} />
          </FormInput>

          <FormInput label="Postal Code" className="col-span-1">
            <Input
              type="text"
              id="companyPostalCode"
              {...register("companyPostalCode")}
            />
          </FormInput>

          <FormInput label="Country" className="col-span-1">
            <Input
              type="text"
              id="companyCountry"
              {...register("companyCountry")}
            />
          </FormInput>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Heading as="h5">Bill To</Heading>
        <div className="grid grid-cols-[1fr_1fr_1fr] gap-4">
          <FormInput label="Client Name" className="col-span-3">
            <Select
              className={classNames}
              options={userOptions}
              id="fullName"
              {...register("fullName", {
                onChange: () => {
                  console.log(getValues().fullName);
                  setValue(
                    "email",
                    valueCheck(users, getValues().fullName, "email")
                  );
                  setValue(
                    "address",
                    valueCheck(users, getValues().fullName, "address")
                  );
                  setValue(
                    "city",
                    valueCheck(users, getValues().fullName, "city")
                  ),
                    setValue(
                      "country",
                      valueCheck(users, getValues().fullName, "country")
                    ),
                    setValue(
                      "postalCode",
                      valueCheck(users, getValues().fullName, "postalCode")
                    );
                },
              })}
            />
          </FormInput>

          <FormInput label="Client Email" className="col-span-3">
            <Input
              type="email"
              id="email"
              disabled={true}
              {...register("email")}
            />
          </FormInput>

          <FormInput label="Street Address" className="col-span-3">
            <Input
              type="text"
              id="address"
              disabled={true}
              {...register("address")}
            />
          </FormInput>

          <FormInput label="City" className="col-span-1">
            <Input
              type="text"
              id="city"
              disabled={true}
              {...register("city")}
            />
          </FormInput>

          <FormInput label="Postal Code" className="col-span-1">
            <Input
              type="text"
              id="postalCode"
              disabled={true}
              {...register("postalCode")}
            />
          </FormInput>

          <FormInput label="Country" className="col-span-1">
            <Input
              type="text"
              id="country"
              disabled={true}
              {...register("country")}
            />
          </FormInput>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-4">
        <FormInput label="Invoice Date" className="col-span-1">
          <Input type="date" id="invoiceDate" {...register("invoiceDate")} />
        </FormInput>

        <FormInput label="Payment Terms" className="col-span-1">
          <Select
            className={classNames}
            options={termOptions}
            id="paymentTerm"
            {...register("paymentTerm")}
          />
        </FormInput>
      </div>

      <div className="grid grid-cols-[1fr_1fr_1fr] gap-4">
        <FormInput label="Project Name" className="col-span-3">
          <Select
            className={classNames}
            options={projectOptions}
            id="projectName"
            {...register("projectName")}
          />
        </FormInput>
      </div>

      {isUpdateSession && (
        <div>
          <TaskTable />
        </div>
      )}

      <div className="flex gap-2 justify-end items-center">
        <Button onClick={onCloseModal} type="secondary">
          Cancel
        </Button>
        <Button type="primary">
          {isUpdateSession
            ? isUpdating || isAnythingLoading
              ? "updating"
              : "update"
            : isCreating
            ? "creating"
            : "create"}
        </Button>
      </div>
    </form>
  );
}
