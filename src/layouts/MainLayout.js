import { Navbar, Nav, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';

import AuthContext from '../contexts/AuthContext';

const MainLayout = ({ children }) => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const enIniciarSesion = () => {
        history.replace("/login");
    }

    const enRegistro = () => {
        history.replace("/registro");
    }

    const enCerrarSesion = () => {
        auth.cerrarSesion();
        history.push("/login");
    }

    const iralugares = () => {
        history.push("/lugares");
    }

    return (
        <>
        <Navbar bg="light" variant="light" className="mb-4">
            <Navbar.Brand href="/">FlavorView</Navbar.Brand>

            <Nav>
                <Nav.Link onClick={iralugares}>Establecimientos</Nav.Link>
            </Nav>

            <Nav className="flex-grow-1 justify-content-end">
                {auth.token ? (
            <Nav.Link onClick={enCerrarSesion}>Cerrar Sesión</Nav.Link>
                ) : (
                    [
                    <Nav.Link key={1} onClick={enIniciarSesion}>Login</Nav.Link>,
                    <Nav.Link key={2} onClick={enRegistro}>Registro</Nav.Link>
                    ]
                )}
            </Nav>
        </Navbar>
        <Container>
            {children}
        </Container>
        </>
    )
}

export default MainLayout;