import React from "react";
import ReactDOM from "react-dom/client";
import TodosTablePage from "./pages/TodosTablePage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TodosTablePage />
    </QueryClientProvider>{" "}
  </React.StrictMode>
);
