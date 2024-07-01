import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader.jsx";
import * as taskService from "../services/taskService.js";
import { formatDistanceToNow } from "date-fns";
import es from "date-fns/locale/es";
import { Button } from "@nextui-org/react";
import { BiSync } from "react-icons/bi";
import { statusLabels } from "../constants/statusLabels.js";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const tasks = await taskService.getTasks();
            setTasks(tasks);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setLoading(false);
        }
    };

    const updateTasks = async () => {
        try {
            await fetchTasks();
        } catch (error) {
            // TODO: Manejar el error
            console.log(error);
        }
    };

    return (
        <>
            <h2 className="text-4xl font-bold mb-8">Mis tareas</h2>
            <div className="mb-8 flex gap-2">
                <Button
                    color="warning"
                    variant="bordered"
                    className="font-bold"
                    endContent={<BiSync className="text-2xl" />}
                    onPress={updateTasks}
                >
                    Actualizar tareas
                </Button>
            </div>
            <div className="w-full mx-auto">
                <div className="rounded-lg shadow-md">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100 text-left font-medium">
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Tarea</th>
                                <th className="px-4 py-3">Fecha de creación</th>
                                <th className="px-4 py-3">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task._id} className="border-b border-gray-200">
                                    <td className="px-4 py-3">{task._id}</td>
                                    <td className="px-4 py-3">{task.title}</td>
                                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">
                                        {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true, locale: es })}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`font-bold text-white px-2 py-1 rounded-full text-xs ${
                                            task.status === "todo" ? "bg-yellow-500" :
                                            task.status === "in-progress" ? "bg-blue-500" :
                                            task.status === "in-review" ? "bg-violet-500" :
                                            task.status === "done" ? "bg-green-500" :
                                            "bg-red-500"
                                        }`}>
                                            {statusLabels[task.status]} {/* Utiliza el label de estado desde statusLabels */}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {loading && <Loader />}
        </>
    );
}

export default Tasks;
