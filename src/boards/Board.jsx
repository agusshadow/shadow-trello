import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { BiTrash, BiSync } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import Loader from "../components/Loader/Loader.jsx";
import CreateTaskModal from "./CreateTaskModal.jsx";
import EditTaskModal from "./EditTaskModal.jsx";
import * as boardService from "../services/boardService.js";
import DeleteBoardModal from "./DeleteBoardModal.jsx";
import { statusLabels } from "../constants/statusLabels.js";

const STATUS_COLUMNS = ['todo', 'in-progress', 'in-review', 'done'];

function Board() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState({});
    const [loading, setLoading] = useState(false);
    const [tasksByStatus, setTasksByStatus] = useState({
        'todo': [],
        'in-progress': [],
        'in-review': [],
        'done': []
    });

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => {
        fetchBoardById(id);
    }, []);

    const fetchBoardById = async (boardId) => {
        try {
            setLoading(true);
            const board = await boardService.getBoardById(boardId);
            setBoard(board);
            groupTasksByStatus(board.tasks);
            setLoading(false);
        } catch (error) {
            // TODO: Manejar error
            setLoading(false);
        }
    };

    const groupTasksByStatus = (tasks) => {
        const groupedTasks = tasks.reduce((acc, task) => {
            const { status } = task;
            if (!acc[status]) {
                acc[status] = [];
            }
            acc[status].push(task);
            return acc;
        }, {'todo': [], 'in-progress': [], 'in-review': [], 'done': []});
        setTasksByStatus(groupedTasks);
    };

    const updateBoard = async () => {
        try {
            await fetchBoardById(id);
        } catch (error) {
            // TODO: Manejar el error
            console.log(error);
        }
    };

    const deleteBoard = async () => {
        try {
            await boardService.deleteBoard(id);
            navigate('/tableros')
        } catch (error) {
            // TODO: Manejar el error
            console.log(error);
        }
    };

    const handleOpenTaskModal = () => setIsTaskModalOpen(true);

    const handleCloseTaskModal = () => {
        setIsTaskModalOpen(false);
        updateBoard();
    };

    const handleOpenEditTaskModal = (taskId) => {
        setSelectedTaskId(taskId);
        setIsEditTaskModalOpen(true);
    };

    const handleCloseEditTaskModal = () => {
        setIsEditTaskModalOpen(false);
        setSelectedTaskId(null);
        updateBoard();
    };

    return (
        <>
            <h2 className="text-4xl font-bold mb-8">{board.name}</h2>
            <div className="mb-8 flex gap-2">
                <Button 
                    color="warning"
                    className="text-white font-bold"
                    endContent={<IoAddCircleOutline className="text-2xl" />}
                    onPress={handleOpenTaskModal}
                >
                    Crear tarea
                </Button>
                <Button
                    color="warning"
                    variant="bordered"
                    className="font-bold"
                    endContent={<BiSync className="text-2xl" />}
                    onPress={updateBoard}
                >
                    Actualizar tareas
                </Button>
                <Button
                    color="danger"
                    isIconOnly
                    onPress={onOpen}
                >
                    <BiTrash className="text-xl" />
                </Button>
            </div>
            <section className="grid grid-cols-4 gap-4">
                {STATUS_COLUMNS.map((status) => (
                    <div key={status} className="bg-slate-200 rounded">
                        <h3 className="py-2 text-center font-bold bg-warning text-white capitalize rounded-t">{statusLabels[status]}</h3>
                        <div className="p-4">
                            <ul>
                                {tasksByStatus[status].length > 0 ? 
                                (
                                    tasksByStatus[status].map(task => (
                                        <Card
                                            key={task._id}
                                            shadow="none"
                                            isHoverable
                                            isPressable
                                            fullWidth
                                            className="mb-4"
                                            onPress={() => handleOpenEditTaskModal(task._id)}
                                        >
                                            <CardBody>
                                                <h4 className="capitalize font-bold">{task.title}</h4>
                                            </CardBody>
                                        </Card>
                                    ))
                                ) : <p className="text-center">No hay tareas</p>}
                            </ul>
                        </div>
                    </div>
                ))}
            </section>
            <DeleteBoardModal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange} 
                onDelete={deleteBoard} 
            />
            <CreateTaskModal 
                isOpen={isTaskModalOpen} 
                onOpenChange={handleCloseTaskModal} 
                updateTaskList={updateBoard} 
                boardId={id}
                status="todo"
            />
            <EditTaskModal
                isOpen={isEditTaskModalOpen}
                onOpenChange={handleCloseEditTaskModal}
                updateTaskList={updateBoard}
                taskId={selectedTaskId}
            />
            {loading && <Loader />}
        </>
    );
}

export default Board;
