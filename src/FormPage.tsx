import { Button } from "primereact/button";
import { useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import { User, addUser } from "./data/user";

import styled from "styled-components";
import {
  ControlErrors,
  FormControl,
  FormGroup,
  Validators,
  WForm,
  WFormControl,
  useFormConfig,
} from "rectangular-forms";
import { FormInputDate, FormInputText } from "./FormInput";
import { useNavigate } from "react-router-dom";

function FormPage() {
  const navigate = useNavigate();

  const formConfig = useFormConfig({
    createForm: (data) => {
      const formGroup = new FormGroup({
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        lastName: new FormControl(null, Validators.required),
        phone: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^\d+$/),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        date: new FormControl(null, Validators.required),
      });
      formGroup.patchValue(data);
      return formGroup;
    },
    onSubmit: (form) => {
      if (form.valid) {
        const user: User = {
          uuid: uuidv4(),
          name: form.value.name,
          lastName: form.value.lastName,
          phone: form.value.phone,
          email: form.value.email,
          date: form.value.date,
        };
        addUser(user);
        localStorage.setItem("lastUser", JSON.stringify(user));
        console.log("User saved", user);
        navigate("/table");
      }
    },
  });

  const { loadSucceed } = formConfig;

  useEffect(() => {
    loadSucceed({});
  }, [loadSucceed]);

  return (
    <>
      <FormContainer>
        <StyledWForm formConfig={formConfig}>
          <StyledWFormControl
            name="name"
            errorMessages={{
              required: "Debes colocar un nombre",
              minlength: "El nombre debe tener al menos 3 caracteres",
            }}
          >
            <StyledLabel>name:</StyledLabel>
            <FormInputText placeholder={"Pepito"} />
            <ControlErrors>
              {(message) => {
                return <StyledErrorMessage>{message}</StyledErrorMessage>;
              }}
            </ControlErrors>
          </StyledWFormControl>
          <StyledWFormControl
            name="lastName"
            errorMessages={{ required: "Debes colocar un apellido" }}
          >
            <StyledLabel>last name:</StyledLabel>
            <FormInputText placeholder={"Ramirez"} />
            <ControlErrors>
              {(message) => {
                return <StyledErrorMessage>{message}</StyledErrorMessage>;
              }}
            </ControlErrors>
          </StyledWFormControl>
          <StyledWFormControl
            name="phone"
            errorMessages={{
              required: "Debes colocar un telefono",
              pattern: "Debes colocar un telefono valido",
            }}
          >
            <StyledLabel>phone:</StyledLabel>
            <FormInputText placeholder={"888 888 888"} />
            <ControlErrors>
              {(message) => {
                return <StyledErrorMessage>{message}</StyledErrorMessage>;
              }}
            </ControlErrors>
          </StyledWFormControl>
          <StyledWFormControl
            name="email"
            errorMessages={{
              required: "Debes colocar un email",
              email: "Debes colocar un email valido",
            }}
          >
            <StyledLabel>email:</StyledLabel>
            <FormInputText placeholder={"something@example.com"} />
            <ControlErrors>
              {(message) => {
                return <StyledErrorMessage>{message}</StyledErrorMessage>;
              }}
            </ControlErrors>
          </StyledWFormControl>
          <StyledWFormControl
            name="date"
            errorMessages={{ required: "Debes colocar una fecha" }}
          >
            <StyledLabel>birthdate:</StyledLabel>
            <FormInputDate placeholder={new Date()} />
            <ControlErrors>
              {(message) => {
                return <StyledErrorMessage>{message}</StyledErrorMessage>;
              }}
            </ControlErrors>
          </StyledWFormControl>
          <Button
            style={{ maxWidth: "8rem", margin: "auto" }}
            label="Submit"
            type="submit"
          />
        </StyledWForm>
      </FormContainer>
    </>
  );
}

const StyledWFormControl = styled(WFormControl)`
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

const StyledWForm = styled(WForm)`
  padding: 2rem;
  border: 2px solid gray;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  text-align: center;
`;

const StyledLabel = styled.label`
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export default FormPage;
