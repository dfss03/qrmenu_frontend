import React from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import QRCode from './QRCode';
import BotonDeOperacion from './BotonDeOperacion';

const QRCodeModal = ({ show, onHide, lugar, onActualizarLugar }) => (
    <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Body className="text-center pt-4">
            <Container>
                <h3>Codigos QR - Mesas</h3>
                <div className="d-flex align-items-center mt-4 mb-4">
                    <h5 className="mb-0 mr-2">
                        Mesas totales: <b>{lugar.numero_de_mesas}</b>
                    </h5>

                    <BotonDeOperacion 
                        variant="lightgray"
                        size="sm"
                        onClick={() => onActualizarLugar(lugar.numero_de_mesas - 1)}
                    >
                        -
                    </BotonDeOperacion>
                    <BotonDeOperacion 
                        variant="lightgray"
                        size="sm"
                        onClick={() => onActualizarLugar(lugar.numero_de_mesas + 1)}
                    >
                        +
                    </BotonDeOperacion>
                </div>

                <Row>
                    {Array.from({ length: lugar.numero_de_mesas }, (_, i) => i + 1).map(
                        (mesa) => (
                            <Col key={mesa} lg={4} md={6} className="mb-4">
                                <QRCode mesa={mesa} lugarId={lugar.id}/>
                            </Col>
                        )
                    )}
                </Row>
            </Container>
        </Modal.Body>
    </Modal>
)

export default QRCodeModal;