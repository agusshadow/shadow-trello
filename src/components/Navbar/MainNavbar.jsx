import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Avatar, Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService.js"
import { useAuth } from '../../contexts/AuthContext.jsx';

function MainNavbar() {

    const { logout } = useAuth();
    const [ avatar, setAvatar ] = useState('https://images.unsplash.com/brok');
    const navigate = useNavigate();

    useEffect(() => {
        setAvatar('https://i.pravatar.cc/150?u=a042581f4e29026024d')
    }, [avatar])

    const handleLogout = async () => {
        try {
            await authService.logout();
            logout();
            navigate('/iniciar-sesion')
        } catch (error) {
            // TODO: Handle error
            console.log(error.message);
        }
    }

    return (
        <>
            <Navbar maxWidth="full" className="bg-gray-900 text-white">
                <NavbarContent justify="center">
                        <NavbarBrand>
                            <Link to="/inicio" className="font-bold text-inherit cursor-pointer">Shadow Trello</Link>
                        </NavbarBrand>
                </NavbarContent>
            
                <NavbarContent justify="end">
                    <Button
                        onClick={handleLogout}
                        color="warning"
                        variant="light"   
                    >
                        Cerrar sesion
                    </Button>
                    
                    <NavbarItem>
                        <Link to="/perfil">
                            <Avatar showFallback src={avatar} size="sm" className="cursor-pointer" />
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </>
    )
}

export default MainNavbar;