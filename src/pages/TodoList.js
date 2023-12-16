import {
  ResourceList,
  ResourceItem,
  Card,
  TextStyle,
  Layout,
  Button,
  Page,
  Stack,
  Badge,
} from "@shopify/polaris";
import useFetchApi from "../hooks/useFetchTodo";
import React, { useCallback } from "react";
import { useState } from "react";
import TodoModal from "../components/Modal/TodoModal";
import axiosTodo from "../helpers/api/axiosTodo";

const TodoList = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [active, setActive] = useState(false);

  const {
    data: todos,
    setData: setTodos,
    loading,
  } = useFetchApi({ url: "/todos" });

  const resourceName = {
    singular: "todo",
    plural: "todos",
  };

  const toggleModal = useCallback(() => setActive((active) => !active), []);

  const promotedBulkActions = [
    {
      content: "Edit todos",
      onAction: () => console.log("Todo: implement bulk edit"),
    },
  ];

  const bulkActions = [
    {
      content: "Complete",
      onAction: () => console.log("Todo: implement bulk add tags"),
    },
    {
      content: "Delete",
      onAction: () => console.log("Todo: implement bulk remove tags"),
    },
  ];

  const addTodo = async (title) => {
    const { data } = await axiosTodo.post("/todos", {
      id: Math.floor(Math.random() * (500 - 11 + 1)) + 11,
      title: title,
      completed: false,
    });
    let newTodo = data.data;
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  return (
    <Page
      title="Todos"
      primaryAction={{ content: "Create todo", onAction: () => toggleModal() }}
    >
      <TodoModal active={active} onClose={toggleModal} handleSubmit={addTodo} />
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={resourceName}
              items={todos}
              renderItem={renderItem}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              loading={loading}
              promotedBulkActions={promotedBulkActions}
              bulkActions={bulkActions}
              resolveItemId={resolveItemIds}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );

  function renderItem(item) {
    const { id, title, completed } = item;
    return (
      <ResourceItem id={id} verticalAlignment="center">
        <Stack alignment="center" distribution="equalSpacing">
          <TextStyle variant="bodyMd" as="label">
            {title}
          </TextStyle>
          <Stack alignment="center">
            <Badge status={completed ? "success" : ""}>
              {completed ? "done" : "pending"}
            </Badge>
            <Button>Completed</Button>
            <Button destructive>Delete</Button>
          </Stack>
        </Stack>
      </ResourceItem>
    );
  }
  function resolveItemIds({ id }) {
    return id;
  }
};

export default TodoList;
