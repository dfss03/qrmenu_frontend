import { Container, Row, Col, Button } from 'react-bootstrap';
import { IoClose, IoCloseOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import { fetchLugar } from '../apis';
import styled from 'styled-components';

import ListadoMenu from '../components/ListadoMenu';
import CarroCompra from '../components/CarroCompra';

const BotonDeOrden = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  box-shadow: 1px 1px 8px rgba(0,0,0,0.2);
  width: 60px;
  height: 60px;
`;

const Menu = () => {
    const [lugar, setLugar] = useState({});
    const [carroCompra, setCarroCompra] = useState({});
    const [mostrarCarroCompra, setMostrarCarroCompra] = useState(false);

    const params = useParams();

    const onFetchLugar = async () => {
        const json = await fetchLugar(params.id);
        console.log(json);
        if (json) {
            setLugar(json);
        }
    };

    const onAñadirItemCarroCompra = (item) => {
        setCarroCompra({
            ...carroCompra,
            [item.id]: {
                ...item,
                quantity: (carroCompra[item.id]?.quantity || 0) + 1,
            }
        });
    }

    const onEliminarItemCarroCompra = (item) => {
        if (cantidadTotal === 1) {
            setMostrarCarroCompra(false);
        }
        
        setCarroCompra({
            ...carroCompra,
            [item.id]: {
                ...item,
                quantity: (carroCompra[item.id]?.quantity || 0) - 1,
            }
        });
    }

    const onPagoListo = () => {
        setCarroCompra({});
        setMostrarCarroCompra(false);
    }

    const cantidadTotal = useMemo(
        () => Object.keys(carroCompra)
                .map((i) => carroCompra[i].quantity)
                .reduce((a,b) => a + b, 0),
        [carroCompra]
    );

    useEffect(() => {
        onFetchLugar();
    }, []);

    return (
        <Container className="mt-5 mb-5">
            <Row className="justify-content-center">
                <Col lg={8}>
                    {mostrarCarroCompra ? (
                        <CarroCompra 
                            items={Object.keys(carroCompra)
                                .map((key) => carroCompra[key])
                                .filter((item) => item.quantity > 0)
                            }
                            onAdd={onAñadirItemCarroCompra}
                            onRemove={onEliminarItemCarroCompra}
                            onPagoListo={onPagoListo}
                        />
                    ) : (
                        <ListadoMenu 
                            lugar={lugar} 
                            carroCompra={carroCompra} 
                            onOrder={onAñadirItemCarroCompra} 
                        />
                    )}
                </Col>
            </Row>

            {cantidadTotal ? (
                <BotonDeOrden variant="standard" onClick={() => setMostrarCarroCompra(!mostrarCarroCompra)}>
                    {mostrarCarroCompra ? <IoCloseOutline size={25} /> : cantidadTotal}
                </BotonDeOrden>
            ) : null}
        </Container>
    )
};

export default Menu;