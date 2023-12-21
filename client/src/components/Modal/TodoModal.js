import { Form, FormLayout, Frame, Modal, TextField } from "@shopify/polaris";
import { useCallback, useState } from "react";

const TodoModal = ({ active, onClose, handleSubmit = () => {} }) => {
  const [title, setTitle] = useState("");

  const closeModal = () => {
    onClose();
    setTitle("");
  };

  const handleTitleInput = useCallback((value) => setTitle(value), []);

  return (
    <div>
      <Modal
        open={active}
        onClose={closeModal}
        title="Create a new todo"
        primaryAction={{
          content: "Create",
          onAction: () => {
            handleSubmit(title);
            closeModal();
          },
          primary: true,
          disabled: !title.trim(),
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: closeModal,
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
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default TodoModal;
