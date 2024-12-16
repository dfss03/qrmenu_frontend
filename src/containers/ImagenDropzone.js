import { Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { subirImagen } from '../apis';

const Dropzone = styled.div`
border: 1px dashed #ced4d9;
border-radius: 5px;
color: #6c757d;
display: flex;
align-items: center;
justify-content: center;
height: 142px;
img {
    height: 140px;
}
`;

function ImagenDropzone({ value, onChange, label = "Sube una imagen", accept = "image/*" }) {
    const [loading, setLoading] = useState(false);
  
    const onDrop = useCallback((acceptedFiles) => {
      console.log(acceptedFiles);
  
      setLoading(true);
      subirImagen(acceptedFiles[0])
        .then((json) => onChange(json.url))
        .finally(() => setLoading(false));
    }, [onChange]);
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      multiple: false,
      accept,
    });
  
    return (
      <Dropzone {...getRootProps()}>
        <input {...getInputProps()} />
        {value ? (
          accept.includes('image') ? (
            <img src={value} alt="Preview" />
          ) : (
            <span>Modelo subido: {value.split('/').pop()}</span> // Mostrar el nombre del modelo
          )
        ) : loading ? (
          <Spinner variant="standard" animation="border" role="status" />
        ) : (
          <span>{label}</span>
        )}
      </Dropzone>
    );
  }
  

export default ImagenDropzone;