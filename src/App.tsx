import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "react-query";

import MainPage from "./MainPage";
import FormPage from "./FormPage";
import TablePage from "./TablePage";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Menubar } from "primereact/menubar";

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/form", element: <FormPage /> },
  { path: "/table", element: <TablePage /> },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <PrimeReactProvider>
        <QueryClientProvider client={queryClient}>
          <Menubar
            model={[
              { label: "Home", command: () => router.navigate("/") },
              { label: "Form", command: () => router.navigate("/form") },
              { label: "Table", command: () => router.navigate("/table") },
            ]}
            style={{ marginBottom: "2rem", justifyContent: "center" }}
          />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PrimeReactProvider>
    </>
  );
}

export default App;
