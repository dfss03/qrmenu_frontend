import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';

import { AuthProvider } from '../contexts/AuthContext';
import RutaPrivada from './RutaPrivada';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Lugares from '../pages/Lugares';
import Lugar from '../pages/Lugar';
import Menu from '../pages/Menu';
import Pedidos from '../pages/Pedidos';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route exact path='/login'>
            <Login/>
          </Route>
          <Route exact path='/registro'>
            <Registro/>
          </Route>
          <Route exact path='/menu/:id/:mesa'>
            <Menu/>
          </Route>

          <RutaPrivada exact path='/lugares/:id'>
            <Lugar/>
          </RutaPrivada>
          <RutaPrivada exact path='/lugares'>
            <Lugares/>
          </RutaPrivada>
          <RutaPrivada exact path='/lugares/:id/pedidos'>
            <Pedidos/>
          </RutaPrivada>
        </Switch>
      </BrowserRouter>
      <ToastContainer/>
    </AuthProvider>
  )
}

export default App;