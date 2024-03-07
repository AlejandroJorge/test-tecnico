import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useControlContext } from "rectangular-forms";

export function FormInputText(props: any) {
  const { control } = useControlContext();
  const { value, disabled, onChange, onBlur } = control;

  return (
    <InputText
      value={value || ""}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
}

export function FormInputDate(props: any) {
  const { control } = useControlContext();
  const { value, disabled, onChange, onBlur } = control;

  return (
    <Calendar
      value={value || ""}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
}

export function FormInputNumber(props: any) {
  const { control } = useControlContext();
  const { value, disabled, onChange, onBlur } = control;

  return (
    <InputNumber
      value={value || ""}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
}
