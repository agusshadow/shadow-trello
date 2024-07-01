import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

function DeleteBoardModal({ isOpen, onOpenChange, onDelete }) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">¿Estás seguro que deseas eliminar este tablero?</ModalHeader>
                <ModalBody>
                    <p>Esta acción no se puede deshacer.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="warning" variant="bordered" onPress={onClose}>
                    Cancelar
                    </Button>
                    <Button color="danger" onPress={() => { onDelete(); onClose(); }}>
                    Eliminar
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    );
};

export default DeleteBoardModal;