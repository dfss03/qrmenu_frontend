import { Button, Col, Form, FormGroup, FormLabel, Row, Card, Spinner } from "react-bootstrap"
import { React, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { iniciarSesion } from "../apis";
import MainLayout from '../layouts/MainLayout';
import AuthContext from "../contexts/AuthContext";

const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");

    const history = useHistory();
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (auth.token) {
            history.replace('/lugares');
        }
    });

    const onClick = () => {
        auth.iniciarSesion(usuario, contraseña, () => history.replace("/lugares"));
    };

    return (
        <MainLayout>
            <Row className="justify-content-center">
                <Col lg={6} md={8}>
                    <Card>
                        <Card.Body>
                            <h3 className="text-center">
                                <b>LOGIN</b>
                            </h3>
                            <FormGroup>
                                <FormLabel>Usuario</FormLabel>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Ingresar Usuario" 
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)} 
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Contraseña</FormLabel>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Ingresar Contraseña" 
                                    value={contraseña}
                                    onChange={(e) => setContraseña(e.target.value)} 
                                />
                            </FormGroup>
                            <Button variant="standard" block onClick={onClick} disabled={auth.loading}>
                                {
                                    auth.loading ? (
                                        <Spinner 
                                            variant="standard"
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        "Iniciar Sesión"
                                    )
                                }
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </MainLayout>
    )
}


export default Login;