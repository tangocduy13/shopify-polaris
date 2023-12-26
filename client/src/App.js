import { AppProvider } from "@shopify/polaris";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AppProvider
      theme={{
        logo: {
          width: 105,
          topBarSource: "https://cdn1.avada.io/logo/avada_logo_final_color.png",
        },
      }}
    >
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <AppLayout />
    </AppProvider>
  );
}

export default App;
