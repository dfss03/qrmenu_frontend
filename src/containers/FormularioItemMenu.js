import React, { useState, useContext, useRef } from 'react';
import { Button, Form, Popover, Overlay } from 'react-bootstrap';
import { RiPlayListAddFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

import { añadirCategoria, añadirItemsMenu, actualizarItemMenu } from '../apis';
import AuthContext from '../contexts/AuthContext';
import ImagenDropzone from './ImagenDropzone';

const FormularioItemMenu = ({ lugar, onDone, item = {} }) => {
    const [nombreCategoria, setNombreCategoria] = useState("");
    const [categoriaFormShow, setCategoriaFormShow] = useState(false);

    const [categoria, setCategoria] = useState(item.categoria);
    const [nombre, setNombre] = useState(item.nombre);
    const [precio, setPrecio] = useState(item.precio || 0);
    const [descripcion, setDescripcion] = useState(item.descripcion);
    const [imagen, setImagen] = useState(item.imagen);
    const [esta_disponible, setEsta_disponible] = useState(
        item.esta_disponible === undefined ? true : !!item.esta_disponible
    );

    const target = useRef(null);

    const auth = useContext(AuthContext);

    const onAñadirCategoria = async () => {
        const json = await añadirCategoria({ nombre: nombreCategoria, lugar: lugar.id }, auth.token);
        console.log(json);

        if (json) {
            toast(`Categoria ${json.nombre} fue creada con exito.`, {type: "success"});
            setCategoria(json.id);
            setNombreCategoria("");
            setCategoriaFormShow(false);
            onDone();
        }
    };

    const onAñadirItemsMenu = async () => {
        const json = await añadirItemsMenu({
            lugar: lugar.id,
            categoria,
            nombre,
            precio,
            descripcion,
            imagen,
            esta_disponible: esta_disponible
        }, auth.token);

        console.log(json);

        if (json) {
            toast(`El Item ${json.nombre} fue creado en este menu.`, {type: "success"});
            setCategoria("");
            setNombre("");
            setPrecio(0);
            setDescripcion("");
            setImagen("");
            setEsta_disponible(true);
            onDone();
        }
    }

    const onActualizarItemMenu = async () => {
        const json = await actualizarItemMenu(
            item.id,
            {
                lugar: lugar.id,
                categoria,
                nombre,
                precio,
                descripcion,
                imagen,
                esta_disponible: esta_disponible
            },
            auth.token
        );

        if (json) {
            console.log(json);

            toast(`El item ${json.nombre} fue actualizado.`, {type: "success"});
            setCategoria("");
            setNombre("");
            setPrecio(0)
            setDescripcion("");
            setImagen("");
            setEsta_disponible(false);
            onDone();
        }
    }

    return (
        <div>
            {/* FORMULARIO CATEGORIAS */}
            <Form.Group>
                <Form.Label>Categoria</Form.Label>
                <div className="d-flex align-items-center">

                    <Form.Control as="select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option/>
                        {lugar?.categorias?.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.nombre}
                            </option>
                        ))}
                    </Form.Control>

                    <Button ref={target} variant="link" onClick={() => setCategoriaFormShow(true)}>
                        <RiPlayListAddFill size={25}/>
                    </Button>

                    <Overlay
                        show={categoriaFormShow}
                        target={target.current}
                        placement="bottom"
                        rootClose
                        onHide={() => setCategoriaFormShow(false)}
                    >
                        <Popover id="popover-contained">
                            <Popover.Title as="h3">Categoria</Popover.Title>
                            <Popover.Content>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nombre"
                                        value={nombreCategoria}
                                        onChange={(e) => setNombreCategoria(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="standard" block onClick={onAñadirCategoria}>
                                    Añadir Categoria
                                </Button>
                            </Popover.Content>
                        </Popover>

                    </Overlay>


                </div>
            </Form.Group>

            {/* ITEMS DE MENU / FORMULARIO */}
            <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombre del producto"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Precio</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Descripción del Producto"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Imagen</Form.Label>
                <ImagenDropzone value={imagen} onChange={setImagen} />
            </Form.Group>
            <Form.Group>
                <Form.Check 
                    type="checkbox"
                    label="Esta disponible?"
                    checked={esta_disponible}
                    onChange={(e) => setEsta_disponible(e.target.checked)}
                />
            </Form.Group>
            <Button 
                variant="standard" 
                block 
                onClick={ item.id ? onActualizarItemMenu : onAñadirItemsMenu}
            >
                { item.id ? "Actualizar Producto" : "+ Añadir Producto al Menu"}
            </Button>
        </div>
        
    );
}

export default FormularioItemMenu;