import React from 'react';
import styled from 'styled-components';
import ItemMenu from './ItemMenu';

const Lugar = styled.div`
  text-align: center;
  img {
    border-radius: 5px;
    margin-bottom: 20px;
  }
`;

const ListadoMenu = ({ lugar, carroCompra, onOrder }) => {
    return (
      <>
        <Lugar>
          <img src={lugar.imagen} width={100} height={100} />
          <h3><b>{lugar.nombre}</b></h3>
        </Lugar>
        {lugar?.categorias
          ?.filter(
            (categoria) => categoria.productos_menu.filter((i) => i.esta_disponible).length
          )
          .map((categoria) => (
            <div key={categoria.id} className="mt-5">
                <h4 className="mb-4">
                    <b>{categoria.nombre}</b>
                </h4>
                {categoria.productos_menu
                    .filter((item) => item.esta_disponible)
                    .map((item) => (
                        <ItemMenu 
                        key={item.id} 
                        item={{ 
                                ...item,
                                quantity: carroCompra[item.id]?.quantity,
                            }} 
                            onOrder={onOrder}
                        />
                    ))
                }
            </div>
          ))
        }
      </>
    )
};

export default ListadoMenu;