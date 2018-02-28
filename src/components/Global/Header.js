import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';

import logo from './images/logo.png';
import './css/header.css';
import './css/style.css';
import firebase from 'firebase';



class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            stage: null,
            admins: [],

        };

        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        const stageRef = firebase.database().ref('stages');
        stageRef.on('value', (snapshot) => {
            let stages = snapshot.val();
            for (let stage in stages) {
                if (stages[stage].state === true) {
                    this.setState((state, props) => {
                        return {
                            stage: stages[stage].name
                        }
                    });
                } else {
                    this.setState((state, props) => {
                        return {
                            stage: null
                        }
                    });
                }
            }
        });

        const adminsRef = firebase.database().ref('admin');
        adminsRef.on('value', (snapshot) => {
            let admins = snapshot.val();
            let newState = [];
            for (let admin in admins) {
                newState.push({
                    email: admins[admin].email
                });

            }
            this.setState({
                admins: newState
            });
        });
    }


    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({
                user: user

            });
        })
    }



    handleAuth(e) {
        e.preventDefault();
        e.stopPropagation();
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => console.log(`${result.user.email} ha iniciado sesion`)
            );

    }

    handleLogout() {
        firebase.auth().signOut()
        window.location.href = '/index'
    }

    renderNewIniciative() {
        if (this.state.stage === "Propose") {
            return (
                <NavItem href='/new-iniciative'>I have an idea</NavItem>
            )
        }
    }


    renderDisplayName() {
        let admins = this.state.admins;
        for (let admin in admins) {
        if (admins[admin].email === this.state.user.email) {
            return (
                <div>[ADMIN] {this.state.user.displayName}!</div>
            )
        }else{
            return (
                <div>[USER] {this.state.user.displayName}!</div>
            )
        }

    }
        
    }


renderAdmin() {
    let admins = this.state.admins;
    for (let admin in admins) {
        if (admins[admin].email === this.state.user.email) {
            return (
                <NavItem href='/admin'>Admin</NavItem>
            )
        }

    }


}



render() {
    if (this.state.user) {
        return (
            <div>
                <div className="Header">
                    <header className="Logo">
                        <img src="http://www.ingeniovirtual.com/wp-content/uploads/caracteristicas-de-un-logotipo-moderno.jpg" alt="logo" />
                        <h1 className="Titulo">Title</h1>
                    </header>
                </div>
                <Navbar style={{ backgroundColor: 'rgb(73, 171, 210)' }}>

                    <NavItem href='/index'>Index</NavItem>
                    {this.renderNewIniciative()}
                    <NavItem href='/iniciatives'>I want to seen an idea</NavItem>
                    {this.renderAdmin()}
                    <NavItem onClick={this.handleLogout} >Log Out</NavItem>
                    <div style={{ float: 'right', marginRight: 20 }}>
                        {this.renderDisplayName()}

                    </div>
                    <img id="image" src={this.state.user.photoURL}
                        className="image-user"
                        alt={this.state.user.displayName}
                        style={{ float: 'right', marginRight: 20, marginTop: 20 }} />
                </Navbar>

            </div>
        );
    } else {
        return (
            <div>

                <div className="Header">
                    <header className="Logo">
                        <img src={logo} alt="logo" />
                        <h1 className="Titulo">Title</h1>
                    </header>
                </div>
                <Navbar style={{ backgroundColor: 'rgb(73, 171, 210)' }}>
                    <div>
                        <NavItem href='/index'>Index</NavItem>
                        <NavItem href='/iniciatives'>I want to seen an idea</NavItem>

                    </div>
                    <div>
                        <NavItem onClick={this.handleAuth}>
                            Log in
                </NavItem>
                    </div>
                </Navbar>

            </div>
        );

    }
}
}

export default Header;
