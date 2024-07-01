import { Modal, ModalHeader, ModalBody, ModalContent, ModalFooter, Input, Textarea, Button } from "@nextui-org/react";
import { useFormik } from "formik";
import * as taskService from "../services/taskService.js";

const initialValues = {
  title: '',
  description: '',
};

function CreateTaskModal({ isOpen, onOpenChange, updateTaskList, boardId }) {
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const taskData = {
          ...values,
          board_id: boardId,
        };
        await taskService.createTask(taskData);
        onOpenChange(false);
        updateTaskList();
      } catch (error) {
        console.error('Error creating task:', error.message);
      }
    },
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="text-center">
        {(onClose) => (
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader className="flex flex-col font-bold">Crear tarea</ModalHeader>
            <ModalBody>
              <span>Ingrese el título y la descripción de su nueva tarea.</span>
              <Input
                type="text"
                label="Título"
                className="mt-5 w-full bg-white rounded-md p-2 text-gray-700"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="title"
                required
              />
              <Textarea
                label="Descripción"
                className="w-full mt-3 bg-white rounded-md p-2 text-gray-700"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="description"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                color="warning"
                className="text-white font-bold ml-2"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Creando...' : 'Crear tarea'}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}

export default CreateTaskModal;
