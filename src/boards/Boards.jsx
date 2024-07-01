import { Card, CardHeader, CardBody, Divider, Button, Modal } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader.jsx";
import CreateBoardModal from "./CreateBoardModal.jsx";
import { BiSync } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";
import * as boardService from "../services/boardService.js";

function Boards() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = async () => {
        try {
            setLoading(true);
            const boards = await boardService.getBoards();
            setBoards(boards);
            setLoading(false);
        } catch (error) {
            // TODO: Manejar error
        }
    };

    const handleBoardClick = (id) => {
        navigate(`/tableros/${id}`);
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
      setIsModalOpen(false);
      updateBoardList();
    };

    const updateBoardList = async () => {
        try {
          await fetchBoards();
        } catch (error) {
            // TODO: Manejar el error
            console.log(error);
        }
      };

    return (
        <>
            <h2 className="text-4xl font-bold mb-8">Mis tableros</h2>
            <div className="mb-8 flex gap-2">
                <Button 
                    onPress={handleOpenModal}
                    color="warning"
                    className="text-white font-bold"
                    endContent={<IoAddCircleOutline className="text-2xl" />}>
                Crear tablero
                </Button>
                <Button
                    onClick={fetchBoards}
                    color="warning"
                    variant="bordered"
                    className="font-bold"
                    isLoading={loading}
                    endContent={<BiSync className="text-2xl" />}
                    >
                        Actualizar tableros
                </Button>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.isArray(boards) && boards.length > 0 ? (
                    boards.map((board, index) => (
                        <li key={index}>
                            <Card
                                onPress={() => handleBoardClick(board._id)}
                                isHoverable="true"
                                isPressable="true"
                                fullWidth="true"
                                className="p-2"
                            >
                                <CardHeader className="flex flex-col items-start">
                                    <div className="absolute top-5 right-5 p-1 hover:bg-red-200 rounded">
                                    </div>
                                    <span className="text-xl font-semibold text-gray-900">
                                        {board.name}
                                    </span>
                                    <span className="text-sm text-gray-500">{board.description}</span>
                                </CardHeader>
                                <Divider />
                                <CardBody className="grid gap-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500 uppercase">id</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {board._id}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Visibilidad</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {board.is_public ? "Publico" : "Privado"}
                                        </span>
                                    </div>
                                </CardBody>
                            </Card>
                        </li>
                    ))
                ) : (
                    <p>No hay tableros disponibles</p>
                )}
            </ul>
            <CreateBoardModal isOpen={isModalOpen} onOpenChange={handleCloseModal} updateBoardList={updateBoardList} />
            {loading && <Loader />}
        </>
    );
}

export default Boards; 
