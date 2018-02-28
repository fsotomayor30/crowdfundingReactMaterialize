//Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Components
import App from './components/App';
import Iniciatives from './components/Iniciatives';
import Index from './components/Index';
import NewIniciative from './components/NewIniciative';
import Admin from './components/Admin';
import Iniciative from './components/Iniciative';
import Contribute from './components/Contribute';


const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/index" component={Index} />
            <Route exact path="/" component={Index} />
            <Route exact path="/iniciatives" component={Iniciatives} />
            <Route exact path="/new-iniciative" component={NewIniciative} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/iniciative/title/:title" component={Iniciative} />
            <Route exact path="/iniciative/category/:category" component={Iniciative} />
            <Route exact path="/contribute/:id" component={Contribute} />
        </Switch> 
    </App>;

      
export default AppRoutes;