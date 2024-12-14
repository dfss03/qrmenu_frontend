import { toast } from 'react-toastify';

function request(path, { data = null, token = null, method = "GET" }) {
    return fetch(path, {
        method,
        headers: {
            Authorization: token ? `Token ${token}` : "",
            "Content-Type": "application/json",
        },
        body: method !== "GET" && method !== "DELETE" ? JSON.stringify(data) : null,
    })
    .then((response) => {

        // If it is success
        if(response.ok) {
            if (method === "DELETE") {
                // If delete, nothing return
                return true;
            }
            return response.json();
        }

        // If there are errors
        return response
            .json()
            .then((json) => {
                // Handle JSON error, response by the server

                if (response.status === 400) {
                    const errors = Object.keys(json).map(
                        (k) => `${(json[k].join(" "))}`
                    );
                    throw new Error(errors.join(" "));
                }
                throw new Error(JSON.stringify(json));
            })
            .catch((e) => {
                if (e.name === "SyntaxError") {
                    throw new Error(response.statusText);
                }
                throw new Error(e);
            })
    })
    .catch((e) => {
        // Handle all errors
        toast(e.message, {type: "error"});
    })
}



export function iniciarSesion(usuario, contraseña) {
    return request("/auth/token/login/", {
        data: {username: usuario, password: contraseña},
        method: "POST",
    })
}

export function registro(usuario, contraseña) {
    return request("/auth/users/", {
        data: {username: usuario, password: contraseña},
        method: "POST",
    })
}

export function fetchLugares(token) {
    return request("/api/lugares/", {token});
}

export function añadirLugar(data, token) {
    return request("/api/lugares/", { data, token, method: "POST" });
}

export function subirImagen(imagen) {
    const formData = new FormData();
    formData.append("file", imagen);
    formData.append("upload_preset", "qrmenu_fotos");

    return fetch("https://api.cloudinary.com/v1_1/dhn9z9ahq/image/upload", {
        method: "POST",
        body: formData,
    }).then((response) => {
        return response.json();
    });
}

export function fetchLugar(id, token) {
    return request(`/api/lugares/${id}`, { token });
}

export function añadirCategoria(data, token) {
    return request("/api/categorias/", { data, token, method: "POST" });
}

export function añadirItemsMenu(data, token) {
    return request("/api/items_menu/", { data, token, method: "POST" });
}

export function actualizarItemMenu(id, data, token) {
    return request(`/api/items_menu/${id}`, { data, token, method: "PATCH" });
}

export function eliminarLugar(id, token) {
    return request(`/api/lugares/${id}`, { token, method: "DELETE" });
}

export function eliminarCategoria(id, token) {
    return request(`/api/categorias/${id}`, { token, method: "DELETE" });
}

export function eliminarItemMenu(id, token) {
    return request(`/api/items_menu/${id}`, { token, method: "DELETE" });
}

export function actualizarLugar(id, data, token) {
    return request(`/api/lugares/${id}`, { data, token, method: "PATCH" });
}

export function crearIntentoPago(data, token) {
    return request("/api/crear_intento_pago/", { data, token, method: "POST" });
}

export function fetchPedidos(lugarId, token) {
    return request(`/api/pedidos/?lugar=${lugarId}`, { token });
}

export function completarPedido(pedidoId, data, token) {
    return request(`/api/pedidos/${pedidoId}`, { data, token, method: "PATCH"});
}