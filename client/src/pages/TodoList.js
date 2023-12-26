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
import { toast } from "react-hot-toast";

const TodoList = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [active, setActive] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  const {
    data: todos,
    setData: setTodos,
    loading,
    setLoading,
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
    try {
      setLoadingModal(true);
      const { data } = await axiosTodo.post("/todos", {
        // id: Math.floor(Math.random() * (500 - 1 + 1)) + 1, Không tạo ID trên FE
        title: title,
        completed: false,
      });
      let newTodo = data.data;
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    } catch (error) {
      toast.error("You have not entered a title yet!");
    } finally {
      setLoadingModal(false);
      setActive(false);
    }
  };

  const removeTodo = async (array) => {
    try {
      setLoading(true);
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
      setLoading(false);
      setSelectedItems([]);
    }
  };

  const completeTodo = async (array) => {
    try {
      setLoading(true);
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
      setLoading(false);
      setSelectedItems([]);
    }
  };
  return (
    <Page
      title="Todos"
      primaryAction={{ content: "Create todo", onAction: () => toggleModal() }}
    >
      <TodoModal
        loading={loadingModal}
        active={active}
        onClose={toggleModal}
        handleSubmit={addTodo}
      />
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
              {completed ? "Uncomplete" : "Complete"}
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
