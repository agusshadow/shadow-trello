import { Modal, ModalHeader, ModalBody, ModalContent, ModalFooter, Input, Textarea, Button, Select, SelectItem } from "@nextui-org/react";
import { useFormik } from "formik";
import * as taskService from "../services/taskService.js";
import { useEffect, useState } from "react";

const EditTaskModal = ({ isOpen, onOpenChange, taskId, updateTaskList }) => {
    const [task, setTask] = useState({});
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            status: '',
        },
        onSubmit: async (values) => {
            try {
                console.log(values);
                await taskService.updateTask(taskId, values);
                onOpenChange(false);
                updateTaskList();
            } catch (error) {
                console.error('Error editing task:', error.message);
            }
        },
    });

    const statusOptions = [
        { value: 'todo', label: 'Por hacer' },
        { value: 'in-progress', label: 'En progreso' },
        { value: 'in-review', label: 'En revisión' },
        { value: 'done', label: 'Finalizada' },
    ];

    useEffect(() => {
        if (taskId) {
            getTaskById(taskId);
        }
    }, [taskId]);

    const getTaskById = async (taskId) => {
        try {
            const fetchedTask = await taskService.getTaskById(taskId);
            setTask(fetchedTask);
            formik.setValues({
                title: fetchedTask.title || '',
                description: fetchedTask.description || '',
                status: fetchedTask.status || '',
            });
        } catch (error) {
            console.error('Error fetching task:', error.message);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="text-center">
                <form onSubmit={formik.handleSubmit}>
                    <ModalHeader className="flex flex-col font-bold">Editar tarea</ModalHeader>
                    <ModalBody>
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
                        <Select
                            label="Estado"
                            className="w-full mt-3"
                            selectedKeys={[formik.values.status]}
                            onSelectionChange={(selectedKey) => formik.setFieldValue('status', Array.from(selectedKey).join(''))}
                            onBlur={formik.handleBlur}
                            name="status"
                            placeholder="Seleccionar estado"
                        >
                            {statusOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="submit"
                            color="warning"
                            className="text-white font-bold ml-2"
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            {formik.isSubmitting ? 'Guardando...' : 'Guardar cambios'}
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default EditTaskModal;
