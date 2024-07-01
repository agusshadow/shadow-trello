import { useEffect, useState } from "react";
import { format, parseISO } from 'date-fns';
import Loader from "../components/Loader/Loader.jsx";
import * as userService from "../services/userService.js"

function UserProfile() {

    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        fetchUser(userId);
    }, [])

    const fetchUser = async (userId) => {
        try {
            setLoading(true);
            const user = await userService.getUserById(userId);
            setUserData(user);
            setLoading(false);
        } catch (error) {
            // TODO: Manejar error
        }
    };

    const formatDate = (date) => {
        const dateFromDb = '2024-06-17T14:56:52.402+00:00';
        return  format(parseISO(dateFromDb), 'yyyy-MM-dd HH:mm:ss');
    }

    return (
        <>
            <h2 className="text-4xl font-bold mb-8">Perfil de usuario</h2>
            <div className="flex flex-col gap-8">
                <h3 className="text-6xl capitalize text-amber-500">{userData.name}</h3>
                <p className="text-xl">{userData.email}</p>
                <p className="text-xl">Cuenta creada: {formatDate(userData.created_at)}</p>
            </div>
            <span className="fixed bottom-5 right-5">ID: {userData._id}</span>
            {loading && <Loader />}
        </>
    )
}

export default UserProfile;