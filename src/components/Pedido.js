import { Card, Button } from 'react-bootstrap';
import React from 'react';

const Orden = ({ orden, onCompletar }) => {
    return (
        <Card className="mb-3">
            <Card.Header className="d-flex justify-content-between">
                <span>{`Orden #${orden.id} - Mesa #${orden.mesa}`}</span>
                <span><b>${orden.monto}</b></span>
            </Card.Header>
            <Card.Body className="d-flex justify-content-between">
                <div>
                    {JSON.parse(orden.detalles).map((item) => (
                        <div className="mb-2">
                            <span>x{item.quantity}</span>
                            <img
                                    src={item.imagen}
                                    width={30}
                                    height={30}
                                    style={{borderRadius: 3, margin: "0 10px"}}
                                />
                                <span>{item.nombre}</span>
                        </div>
                    ))}
                </div>

                <div>
                    {onCompletar ? (
                        <Button variant="standard" size="md" onClick={onCompletar}>
                            Listo
                        </Button>
                    ) : null}
                </div>
            </Card.Body>
        </Card>
    )
}

export default Orden;