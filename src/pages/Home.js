import {Button, Jumbotron, Container, Row, Col, Image} from 'react-bootstrap';
import React from 'react';
import MainLayout from '../layouts/MainLayout';

const Home = () => (
    <MainLayout>
        <Jumbotron className="bg-light">
            <Container>
                <Row>
                    <Col md={6} className="my-auto">
                        <h1><b>Panel de Gestion FlavorView</b></h1>
                        <h5 className="mt-4 mb-4">
                            Crea, lista y actualiza tu Menu. 
                        </h5>
                        <br/>
                        <Button href="/lugares" variant="standard" size="lg">
                            Continuar
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Image
                            src="https://i.pinimg.com/originals/97/60/07/976007711726d8a9e4cbe2290f484fe2.gif"
                            rounded fluid/>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    </MainLayout>
);

export default Home;