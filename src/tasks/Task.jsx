import { useParams } from "react-router-dom";

function Task() {
    const { id } = useParams();

    return (
        <h1>Tarea { id }</h1>
    )
}

export default Task;