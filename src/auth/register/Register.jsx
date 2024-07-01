import { useFormik } from "formik";
import { Input, Button } from "@nextui-org/react";
import Loader from "../../components/Loader/Loader";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

const initialValues = {
    name: '',
    email: '',
    password: ''
};

function Register() {
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (userCredentials) => {
        try {
            setLoading(true);
            await authService.register(userCredentials);
            login();
            navigate('/inicio');
        } catch (error) {
            // TODO: Handle error
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate: (values) => {
            const errors = {};

            if (!values.name) {
                errors.name = "Requerido";
            }

            if (!values.email) {
                errors.email = "Requerido";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = "Correo electrónico inválido";
            }

            if (!values.password) {
                errors.password = "Requerido";
            } else if (values.password.length < 6) {
                errors.password = "La contraseña debe tener al menos 6 caracteres";
            }

            return errors;
        }
    });

    const goToLogin = () => {
        navigate('/iniciar-sesion')
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-full max-w-md">
                <h2 className="text-4xl font-bold mb-2">Crear cuenta</h2>
                <p className="mb-8">Ingresa tu nombre de usuario, correo electrónico y contraseña para crear una cuenta.</p>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-5">
                        <Input 
                            id="name"
                            name="name"
                            type="text"
                            label="Nombre de usuario"
                            variant="bordered"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full"
                        />
                        {formik.touched.name && formik.errors.name ? <div className="text-red-500 m-2">{formik.errors.name}</div> : null}
                    </div>
                    <div className="mb-5">
                        <Input 
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            variant="bordered"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full"
                        />
                        {formik.touched.email && formik.errors.email ? <div className="text-red-500 m-2">{formik.errors.email}</div> : null}
                    </div>
                    <div className="mb-5">
                        <PasswordInput
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full"
                        />
                        {formik.touched.password && formik.errors.password ? <div className="text-red-500 m-2">{formik.errors.password}</div> : null}
                    </div>
                    <Button 
                        type="submit"
                        color="warning"
                        className="w-full font-bold text-white"
                        disabled={!formik.isValid || formik.isSubmitting}>
                        Crear cuenta
                    </Button>
                    <span 
                        className="text-warning cursor-pointer mt-4 block"
                        onClick={goToLogin}>
                        Iniciar sesión
                    </span>
                </form>
            </div>
            {loading && <Loader />}
        </div>
    );
}

export default Register;
