import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { useQuery } from "react-query";
import { formatRelative } from "date-fns";

import { getUsers } from "./data/user";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function TablePage() {
  const [name, setName] = useState("");
  const { data, refetch } = useQuery("users", () => getUsers(name));
  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          refetch();
        }}
        style={{ display: "flex", gap: "0.5rem" }}
      >
        <InputText value={name} onChange={(e) => setName(e.target.value)} />
        <Button label="Search" />
      </form>
      <DataTable
        value={data?.map((row) => {
          return {
            ...row,
            date: formatRelative(row.date, new Date()),
          };
        })}
      >
        <Column field="uuid" header="UUID" />
        <Column field="name" header="Name" />
        <Column field="lastName" header="Last Name" />
        <Column field="phone" header="Phone" />
        <Column field="email" header="Email" />
        <Column field="date" header="Date" />
      </DataTable>
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "1rem",
      }}
    >
      {children}
    </div>
  );
}

export default TablePage;
