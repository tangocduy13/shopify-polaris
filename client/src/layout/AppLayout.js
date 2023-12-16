import { Frame, TopBar } from "@shopify/polaris";
import React from "react";
import TodoList from "../pages/TodoList";

const AppLayout = () => {
  const userMenuMarkup = <TopBar.UserMenu name="Tạ Ngọc Duy" initials="D" />;

  const topBarMarkup = <TopBar userMenu={userMenuMarkup} />;
  return (
    <Frame topBar={topBarMarkup}>
      <TodoList />
    </Frame>
  );
};

export default AppLayout;
