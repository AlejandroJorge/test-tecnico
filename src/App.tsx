import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "react-query";

import MainPage from "./MainPage";
import FormPage from "./FormPage";
import TablePage from "./TablePage";

import "primereact/resources/themes/lara-light-cyan/theme.css";

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
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PrimeReactProvider>
    </>
  );
}

export default App;
