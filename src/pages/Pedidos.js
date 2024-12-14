import { IoMdArrowBack } from 'react-icons/io'
import { Row, Col, Button } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';

import { fetchPedidos, completarPedido } from '../apis';
import AuthContext from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';
import Orden from '../components/Pedido';

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const params = useParams();
    const history = useHistory();
    const auth = useContext(AuthContext);

    const onBack = () => history.push(`/lugares/${params.id}`);

    const onFetchPedidos = async () => {
        const json = await fetchPedidos(params.id, auth.token);
        if (json) {
            console.log(json);
            setPedidos(json);
        }
    }

    const onCompletarPedido = async (pedidoId) => {
        const json = await completarPedido(pedidoId, { status: "completed"}, auth.token )
        if (json) {
            onFetchPedidos();
        }
    }

    useEffect(() => {
        onFetchPedidos();
        const interval = setInterval(() => {
            onFetchPedidos();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <MainLayout>
            <div className="d-flex align-items-center mb-4">
                <Button variant="link" onClick={onBack}>
                    <IoMdArrowBack size={25} color="black" />
                </Button>
                <h3 className="mb-0 ml-2 mr-2">Mis Ordenes</h3>
            </div>

            <Row className="justify-content-center">
                {pedidos
                ?.filter((orden) => orden.status === "processing")
                ?.map((orden) => (
                    <Col key={orden.id} lg={8}>
                        <Orden orden={orden} onCompletar={() => onCompletarPedido(orden.id)} />
                    </Col>
                ))}
            </Row>
        </MainLayout>
    )
} 

export default Pedidos;