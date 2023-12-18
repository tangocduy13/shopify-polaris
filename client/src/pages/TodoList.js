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
      content: "Complete",
      onAction: () => completeTodo(selectedItems),
    },
    {
      content: "Delete",
      onAction: () => removeTodo(selectedItems),
    },
  ];

  const addTodo = async (title) => {
    const { data } = await axiosTodo.post("/todos", {
      id: Math.floor(Math.random() * (500 - 1 + 1)) + 1,
      title: title,
      completed: false,
    });
    let newTodo = data.data;
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  const removeTodo = async (array) => {
    try {
      const { data } = await axiosTodo.delete("/todos", {
        data: array,
      });
      if (data.success) {
        const updatedTodos = todos.filter((todo) => !array.includes(todo.id));
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedItems([]);
    }
  };

  const completeTodo = async (array) => {
    try {
      const { data } = await axiosTodo.patch("/todos", {
        data: array,
      });
      if (data.success) {
        const updatedTodos = todos.map((todo) => {
          if (array.includes(todo.id)) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          } else return todo;
        });
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedItems([]);
    }
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
            <Button
              onClick={() => {
                completeTodo([id]);
              }}
            >
              Completed
            </Button>
            <Button
              destructive
              onClick={() => {
                removeTodo([id]);
              }}
            >
              Delete
            </Button>
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
