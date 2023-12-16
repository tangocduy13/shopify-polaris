import { AppProvider } from "@shopify/polaris";
import "./App.css";
import AppLayout from "./layout/AppLayout";

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
      <AppLayout />
    </AppProvider>
  );
}

export default App;
