import { Form, Button } from 'react-bootstrap' ;
import React, { useState, useContext } from 'react';

import { añadirLugar } from '../apis';
import AuthContext from '../contexts/AuthContext';

import ImageDropzone from './ImagenDropzone';

const FormularioLugar = ({onDone}) => {
    const [nombre, setNombre] = useState("");
    const [imagen, setImagen] = useState("");

    const auth = useContext(AuthContext);

    const onClick = async () => {
        const json = await añadirLugar({nombre, imagen}, auth.token);
        if (json) {
            setNombre("");
            setImagen("");
            onDone();
        }
    }

    return (
        <div>
            <h4 className="text-center">Nuevo Establecimiento</h4>
            <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombre de tu Restaurante/Local"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Image</Form.Label>
                <ImageDropzone value={imagen} onChange={setImagen} />
            </Form.Group>
            <Button variant="standard" block onClick={onClick}>
                Añadir
            </Button>
        </div>
    )
}

export default FormularioLugar;