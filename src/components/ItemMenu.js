import { Col, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import styled from 'styled-components';
import { BiEdit } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import ARViewer from './AR';

const Container = styled.div`
  border-radius: 5px;
  background-color: white;
  margin-bottom: 30px;
  box-shadow: 1px 1px 8px rgba(0,0,0,0.1);
  display: flex;
  opacity: ${({active}) => (active ? 1 : 0.6)};
  > div:first-child {
    width: 40%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-size: cover;
  }
  > div:last-child {
    padding: 15px 20px;
    min-height: 150px;
  }
`;

const ItemMenu = ({ item, onEdit, onRemove, onOrder }) => {
    const [showAR, setShowAR] = useState(false); // Estado para mostrar el modelo
    const [showImagen, setShowImagen] = useState(true);

    const toggleARView = () => {
        setShowAR(!showAR);
        setShowImagen(!showImagen);
    };

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    return (
        <Container active={item.esta_disponible}>
            {showImagen && (
                <Col xs={5} style={{ backgroundImage: `url(${item.imagen})`, backgroundSize: 'cover', height: '200px' }} />
            )}

            <Col xs={7} className="d-flex flex-column justify-content-between w-100">
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h4 className="mb-0">
                            <b>{item.nombre}</b>
                        </h4>
                        <div>
                            { onEdit ? (
                                <Button variant="link" onClick={onEdit}>
                                    <BiEdit size={20} />
                                </Button>
                            ) : null }

                            { onRemove ? (
                                <Button variant="link" onClick={onRemove}>
                                    <AiOutlineDelete size={20} color="red" />
                                </Button>
                            ) : null }
                        </div>
                    </div>
                    <p className="mb-4">{item.descripcion}</p>
                </div>
                <div className="d-flex justify-content-between align-items-end">
                    <div>
                        <h5 className="mb-0 text-standard">
                            <b>${item.precio}</b>
                        </h5>

                        {onOrder ? (
                            <Button variant="standard" className="mt-2" size="sm" onClick={() => onOrder(item)}>
                                {!item.quantity ? "Añadir a pedido" : `Añadir más (${item.quantity})`}
                            </Button>
                        ) : null}
                    </div>

                    {!item.esta_disponible ? (<small className="text-secondary">No Disponible</small>) : null}

                </div>
                {/* Botón para previsualizar modelo en AR */}
                {item.modeloar && (
                    <div className="mt-3 d-flex flex-column">
                        <Button variant="secondary" onClick={toggleARView} className="mb-2">
                            {showAR ? 'Cerrar Modelo AR' : 'Ver Modelo AR'}
                        </Button>

                        {/* Botón para abrir el modelo en camara del usuario */}
                        <a
                            href={isIOS ? item.modelo_usdz : `intent://arvr.google.com/scene-viewer/1.0?file=${item.modeloar}#Intent;scheme=https;package=com.google.ar.core;end;`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="success">Ver en tu entorno</Button>
                        </a>
                    </div>
                )}

                {showAR && item.modeloar && (
                    <div style={{ marginTop: '20px' }}>
                        <ARViewer modelUrl={item.modeloar} />
                    </div>
                )}
            </Col>
        </Container>
    );
};

export default ItemMenu;