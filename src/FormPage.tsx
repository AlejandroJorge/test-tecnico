import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  date: Date;
};

function FormPage() {
  const { register, handleSubmit } = useForm<Inputs>();

  const toast = useRef(null);

  const show = (severity: string, summary: string, detail: string) => {
    if (toast.current) {
      toast.current.show({
        severity,
        summary: summary,
        detail,
        life: 3000,
      });
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (
      data.name === "" ||
      data.lastName === "" ||
      data.phone === "" ||
      data.email === "" ||
      data.date === null
    ) {
      show("error", "Error", "All fields are required");
      return;
    }

    if (data.phone.length !== 9) {
      show("error", "Error", "Phone must have 9 digits");
      return;
    }

    if (!data.email.includes("@") || !data.email.includes(".")) {
      show("error", "Error", "Email must have @ and .");
      return;
    }

    if (new Date().getFullYear() - data.date.getFullYear() < 18) {
      show("error", "Error", "You must be at least 18 years old");
      return;
    }

    show("success", "Success", "Form submitted");

    const previousData = JSON.parse(localStorage.getItem("users") || "[]");
    localStorage.setItem("users", JSON.stringify([...previousData, data]));
  };
  return (
    <>
      <FormContainer>
        <form
          style={{
            padding: "2rem",
            border: "2px solid gray",
            borderRadius: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputWrapper label="name">
            <InputText placeholder={"Pepito"} {...register("name")} />
          </InputWrapper>
          <InputWrapper label="lastName">
            <InputText placeholder={"Ramirez"} {...register("lastName")} />
          </InputWrapper>
          <InputWrapper label="phone">
            <InputText placeholder={"999999999"} {...register("phone")} />
          </InputWrapper>
          <InputWrapper label="email">
            <InputText placeholder={"some@email.com"} {...register("email")} />
          </InputWrapper>
          <InputWrapper label="date">
            <Calendar {...register("date")} />
          </InputWrapper>
          <Button
            style={{ maxWidth: "8rem", margin: "auto" }}
            label="Submit"
            type="submit"
          />
        </form>
      </FormContainer>
      <Toast ref={toast} />
    </>
  );
}

const InputWrapper = ({
  label,
  children,
}: {
  label: string;
  children: any;
}) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={{ textTransform: "uppercase" }} htmlFor={label}>
      {label}
    </label>
    {children}
  </div>
);

const FormContainer = ({ children }: { children: any }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      maxWidth: "50%",
      margin: "auto",
      minHeight: "100vh",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);

export default FormPage;
