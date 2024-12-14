import React, { useMemo } from 'react';
import { Card } from 'react-bootstrap';
import BotonDeOperacion from './BotonDeOperacion';
import FormularioPago from '../containers/FormularioPago';

const CarroCompra = ({ items, onAdd, onRemove, onPagoListo }) => {
    const precioTotal = useMemo(
        () => items.map((i) => i.quantity * i.precio).reduce((a, b) => a + b, 0),
        [items]
    );

    return (
        <>
            <h3>
                <b>Tu Pedido</b>
            </h3>
            <Card>
                <Card.Body>
                    {items.map((item) => (
                        <div key={item.id} className="d-flex mb-4 align-items-center">
                            <div className="flex-grow-1">
                                <p className="mb-0">
                                    <b>{item.nombre}</b>
                                </p>
                                <span>${item.precio}</span>
                            </div>

                            <div className="d-flex align-items-center">
                                <BotonDeOperacion
                                    variant="lightgray"
                                    size="sm"
                                    onClick={() => onRemove(item)}
                                >
                                    -
                                </BotonDeOperacion>
                                <span>{item.quantity}</span>
                                <BotonDeOperacion
                                    variant="lightgray"
                                    size="sm"
                                    onClick={() => onAdd(item)}
                                >
                                    +
                                </BotonDeOperacion>
                            </div>
                        </div>
                    ))}

                    <hr/>
                    <div className="d-flex justify-content-between">
                        <h5><b>Total</b></h5>
                        <h5><b>${precioTotal}</b></h5>
                    </div>

                    <hr className="mb-4" />
                    <FormularioPago monto={precioTotal} items={items} onDone={onPagoListo} />
                </Card.Body>
            </Card>
        </>
    );
};

export default CarroCompra;