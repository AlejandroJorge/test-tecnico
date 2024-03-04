import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { v4 as uuidv4 } from "uuid";
import { User } from "./data/user";

import styled from "styled-components";

function FormPage() {
  const { register, handleSubmit } = useForm<User>();

  const toast = useRef(null);

  const show = (severity: string, summary: string, detail: string) => {
    if (toast.current) {
      //@ts-ignore
      toast.current.show({
        severity,
        summary: summary,
        detail,
        life: 3000,
      });
    }
  };

  const onSubmit: SubmitHandler<User> = (data) => {
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

    const uuid = uuidv4();
    const user = { ...data, uuid };

    const previousData = JSON.parse(localStorage.getItem("users") || "[]");
    localStorage.setItem("users", JSON.stringify([...previousData, user]));

    show("success", "Success", "Form submitted");
  };
  return (
    <>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <label htmlFor="name">name:</label>
            <InputText placeholder={"Pepito"} {...register("name")} />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="lastName">last name:</label>
            <InputText placeholder={"Ramirez"} {...register("lastName")} />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="phone">phone:</label>
            <InputText placeholder={"999999999"} {...register("phone")} />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="email">email:</label>
            <InputText placeholder={"some@email.com"} {...register("email")} />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="date">date:</label>
            <Calendar {...register("date")} />
          </InputWrapper>
          <Button
            style={{ maxWidth: "8rem", margin: "auto" }}
            label="Submit"
            type="submit"
          />
        </StyledForm>
      </FormContainer>
      <Toast ref={toast} />
    </>
  );
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  label {
    text-transform: uppercase;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 50%;
  margin: auto;
  justify-content: center;
`;

const StyledForm = styled.form`
  padding: 2rem;
  border: 2px solid gray;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default FormPage;
