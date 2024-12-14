import {IoMdArrowBack} from 'react-icons/io';
import {AiOutlineDelete, AiOutlineQrcode} from 'react-icons/ai';
import { RiFileList3Line } from 'react-icons/ri';
import {Row, Col, Button, Modal} from 'react-bootstrap';
import {useParams, useHistory} from 'react-router-dom';
import React, {useEffect, useState, useContext} from 'react';
import styled from 'styled-components';

import { 
    fetchLugar, 
    eliminarLugar, 
    eliminarCategoria, 
    eliminarItemMenu, 
    actualizarLugar 
} from '../apis';
import AuthContext from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';
import FormularioItemMenu from '../containers/FormularioItemMenu';
import ItemMenu from '../components/ItemMenu';
import QRCodeModal from '../components/QRCodeModal';

const Panel = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0,0,0,0.05);
`;

const Lugar = () => {
    const [lugar, setLugar] = useState({});
    const [itemMenuFormShow, setItemMenuFormShow] = useState(false);
    const [itemSeleccionado, setItemSeleccionado] = useState(null);
    const [qrCode, setQrCode] = useState(false);

    const showModal = () => setItemMenuFormShow(true);
    const hideModal = () => setItemMenuFormShow(false);

    const showQRModal = () => setQrCode(true);
    const hideQRModal = () => setQrCode(false);

    const auth = useContext(AuthContext);
    const params = useParams();
    const history = useHistory();

    const onBack = () => history.push("/lugares");

    const onFetchLugar = async () => {
        const json = await fetchLugar(params.id, auth.token);
        if (json) {
            setLugar(json);
        }
    };

    const onEliminarLugar = () => {
        const c = window.confirm("Estas seguro de querer eliminar esto?");
        if (c) {
            eliminarLugar(params.id, auth.token).then(onBack);
        }
    };

    const onEliminarCategoria = (id) => {
        const c = window.confirm("Estas seguro de querer eliminar esto?");
        if (c) {
            eliminarCategoria(id, auth.token).then(onFetchLugar);
        }
    };

    const onEliminarItemMenu = (id) => {
        const c = window.confirm("Estas seguro de querer eliminar esto?");
        if (c) {
            eliminarItemMenu(id, auth.token).then(onFetchLugar);
        }
    };

    const onActualizarLugar = (mesas) => {
        actualizarLugar(lugar.id, { numero_de_mesas: mesas }, auth.token).then(
            (json) => {
                if (json) {
                    setLugar(json);
                }
            }
        )
    }

    useEffect(() => {
        onFetchLugar();
    }, []);

    return (
        <MainLayout>
            <Row>
                <Col lg={12}>
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <Button variant="link" onClick={onBack}>
                                <IoMdArrowBack size={25} color="black"/>
                            </Button>
                            <h3 className="mb-0 ml-2 mr-2">{lugar.nombre}</h3>

                            <Button variant="link" onClick={onEliminarLugar}>
                                <AiOutlineDelete size={25} color="red"/>
                            </Button>
                        </div>

                        <Button variant="link" onClick={showQRModal}>
                            <AiOutlineQrcode size={25} />
                        </Button>
                        <Button variant="link" href={`/lugares/${params.id}/pedidos`}>
                            <RiFileList3Line size={25} />
                        </Button>
                    </div>
                </Col>
                <Col md={4}>
                    <Panel>
                        <FormularioItemMenu lugar={lugar} onDone={onFetchLugar} />
                    </Panel>
                </Col>

                <Col md={8}>
                    {lugar?.categorias?.map((categoria) => (
                        <div key={categoria.id} className="mb-5">
                            <div className="d-flex align-items-center mb-4">
                                <h4 className="mb-0 mr-2">
                                    <b>{categoria.nombre}</b>
                                </h4>
                                <Button variant="link" onClick={() => onEliminarCategoria(categoria.id)}>
                                    <AiOutlineDelete size={25} color="red" />
                                </Button>
                            </div>
                            
                            {categoria.productos_menu.map((item) => (
                                <ItemMenu
                                    key={item.id} 
                                    item={item}
                                    onEdit={() => {
                                        setItemSeleccionado(item);
                                        showModal()
                                    }}
                                    onRemove={() => onEliminarItemMenu(item.id)}
                                />
                            ))}
                        </div>
                    ))}
                </Col>
            </Row>

            <Modal show={itemMenuFormShow} onHide={hideModal} centered>
                <Modal.Body>
                    <h4 className="text-center">Producto</h4>
                    <FormularioItemMenu
                        lugar={lugar}
                        onDone={() => {
                            onFetchLugar();
                            hideModal()
                        }}
                        item={itemSeleccionado}
                    />
                </Modal.Body>
            </Modal>

            <QRCodeModal 
                show={qrCode} 
                onHide={hideQRModal} 
                lugar={lugar} 
                centered 
                onActualizarLugar={onActualizarLugar}
            />
        </MainLayout>
    )
}

export default Lugar;