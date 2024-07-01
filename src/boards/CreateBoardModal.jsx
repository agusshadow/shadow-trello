import { Modal, ModalHeader, ModalBody, ModalContent, ModalFooter, Input, Textarea, Button, RadioGroup, Radio } from "@nextui-org/react";
import { useFormik } from "formik";
import * as boardService from "../services/boardService.js";

const initialValues = {
  name: '',
  description: '',
  is_public: true,
};

function CreateBoardModal({ isOpen, onOpenChange, updateBoardList }) {
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        console.log(values);
        await boardService.createBoard(values);
        onOpenChange(false);
        updateBoardList();
      } catch (error) {
        console.error('Error creating board:', error.message);
      }
    },
  });

  const handleVisibilityChange = (value) => {
    formik.setFieldValue('is_public', value === 'public');
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="text-center">
        {(onClose) => (
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader className="flex flex-col font-bold">Crear tablero</ModalHeader>
            <ModalBody>
              <span>Ingrese el nombre y la visibilidad de su nuevo tablero.</span>
              <Input
                type="text"
                label="Nombre"
                className="mt-5 w-full bg-white rounded-md p-2 text-gray-700"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
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
              <RadioGroup
                label="Visibilidad"
                className="mt-5"
                value={formik.values.is_public ? 'public' : 'private'}
                onChange={(value) => handleVisibilityChange(value)}
                onBlur={formik.handleBlur}
                name="is_public"
              >
                <Radio
                  value="public"
                  checked={formik.values.is_public === true}
                  onChange={() => handleVisibilityChange('public')}
                >
                  Público
                </Radio>
                <Radio
                  value="private"
                  checked={formik.values.is_public === false}
                  onChange={() => handleVisibilityChange('private')}
                >
                  Privado
                </Radio>
              </RadioGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                color="warning"
                className="text-white font-bold ml-2"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Creando...' : 'Crear tablero'}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}

export default CreateBoardModal;
