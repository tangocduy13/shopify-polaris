import {
  Form,
  FormLayout,
  Modal,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import { useCallback, useState } from "react";

const TodoModal = ({ active, onClose, handleSubmit = () => {} }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const closeModal = () => {
    onClose();
    setTitle("");
    setError("");
  };

  const handleTitleInput = useCallback((value) => setTitle(value), []);
  const handleError = useCallback((value) => setError(value), []);

  return (
    <Modal
      open={active}
      onClose={closeModal}
      title="Create a new todo"
      primaryAction={{
        content: "Create",
        onAction: () => {
          if (title.trim() !== "") {
            handleSubmit(title);
            closeModal();
          } else {
            handleError("Please enter title here");
          }
        },
        primary: true,
        // disabled: !title.trim(),
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: () => {
            closeModal();
          },
        },
      ]}
    >
      <Modal.Section>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(title);
            setTitle("");
          }}
        >
          <FormLayout>
            <TextField
              value={title}
              onChange={handleTitleInput}
              type="text"
              autoComplete="off"
              placeholder="This is my todo name"
            />
          </FormLayout>
        </Form>
        <TextStyle variation="warning">{error}</TextStyle>
      </Modal.Section>
    </Modal>
  );
};

export default TodoModal;
