import { Row, Col, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

import { fetchLugares } from '../apis';
import AuthContext from '../contexts/AuthContext';

import MainLayout from '../layouts/MainLayout';
import FormularioLugar from '../containers/FormularioLugar';

const Lugar = styled.div`
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.2s;
  :hover {
    transform: scale(1.05);
  }
  > div {
    background-size: cover;
    height: 200px;
    border-radius: 5px;
  }
  > p {
    margin-top: 5px;
    font-size: 20px;
    font-weight: bold;
  }
`;

const AñadirLugarButton = styled.div`
  border: 1px dashed gray;
  height: 200px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  background-color: white;
  :hover {
    background-color: #fbfbfb;
  }
`;

const Lugares = () => {
    const [lugares, setLugares] = useState([]);
    const [show, setShow] = useState(false);

    const auth = useContext(AuthContext);
    const history = useHistory();

    const onHide = () => setShow(false);
    const onShow = () => setShow(true);

    const onFetchLugares = async () => {
        const json = await fetchLugares(auth.token);
        if (json) {
            setLugares(json);
        }
    };

    const onDone = () => {
        onFetchLugares();
        onHide();
    }

    useEffect(() => {
        onFetchLugares()
    }, []);

    return (
        <MainLayout>
            <h3>Mis Restaurantes</h3>

            <Modal show={show} onHide={onHide} centered>
                <Modal.Body>
                    <FormularioLugar onDone={onDone} />
                </Modal.Body>
            </Modal>

            <Row>
                {lugares.map((lugar) => (
                    <Col key={lugar.id} lg={4}>
                        <Lugar onClick={() => history.push(`/lugares/${lugar.id}`)}>
                            <div style={{backgroundImage: `url(${lugar.imagen})`}}></div>
                            <p>{lugar.nombre}</p>
                        </Lugar>
                    </Col>
                ))}
                <Col lg={4}>
                    <AñadirLugarButton onClick={onShow}>Añadir</AñadirLugarButton>
                </Col>
            </Row>
        </MainLayout>
    )
}

export default Lugares;