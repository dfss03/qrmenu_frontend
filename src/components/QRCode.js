import { AiOutlineLink } from 'react-icons/ai';
import { Button } from 'react-bootstrap';
import QRCodeReact from 'qrcode.react';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useReactToPrint } from 'react-to-print';

const Container = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  > div {
    margin: auto;
  }
`;

const ImprimirComponente = styled.div`
  text-align: center;
  margin-top: 200px;
  h1 {
    font-size: 100px;
    font-weight: bold;
    margin-bottom: 50px;
  }
  h2 {
    font-size: 60px;
    margin-bottom: 100px
  }
`;

const QRCode = ({mesa, lugarId}) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const url = `${window.location.origin}/menu/${lugarId}/${mesa}`; // Se vera así: localhost:3000/menu/1/3

    return (
        <Container>
            <QRCodeReact value={url} size={200}/>
            <Overlay>
                <div className="d-flex">
                    <Button variant="standard" onClick={handlePrint} className="mr-2">
                        {`Imprimir QR Mesa ${mesa}`}
                    </Button>
                    <Button variant="standard" href={`/menu/${lugarId}/${mesa}`} target="_blank">
                        <AiOutlineLink size={20}/>
                    </Button>
                </div>
            </Overlay>

            <div style={{display: "none"}}>
                <ImprimirComponente ref={componentRef}>
                    <h1>Mesa {mesa}</h1>
                    <h2>Escanea para acceder al menu</h2>
                    <QRCodeReact value={url} size={500}/>
                </ImprimirComponente>
            </div>
        </Container>
)};

export default QRCode;