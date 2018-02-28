import React, { Component } from 'react';
import firebase from 'firebase';
import { Row, ProgressBar, Col, MediaBox } from 'react-materialize';


class Iniciatives extends Component {

    constructor() {
        super();
        this.state = {
            iniciatives: [],
            user: '',
        };
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({
                user: user
            });
        })
    }


    renderContributteButton(id) {
        if (this.state.user) {
            return (
                <div>
                    <a href={id}>
                        <button
                            type="button"
                            className="btn btn-success">Contribute!!</button>
                    </a>
                </div>
            )
        }
    }



    componentDidMount() {
        const itemsRef = firebase.database().ref('iniciatives');
        itemsRef.on('value', (snapshot) => {
            let iniciatives = snapshot.val();
            let newState = [];
            for (let iniciative in iniciatives) {
                newState.push({
                    id: iniciative,
                    title: iniciatives[iniciative].title,
                    description: iniciatives[iniciative].description,
                    money: iniciatives[iniciative].money,
                    category: iniciatives[iniciative].categories,
                    moneyProgress: iniciatives[iniciative].moneyProgress,
                    photo: iniciatives[iniciative].photo,
                    user: iniciatives[iniciative].user,
                    photoUser: iniciatives[iniciative].photoUser,
                });
            }
            this.setState({
                iniciatives: newState
            });
        });
    }


    render() {
        return (
            <div className="Iniciatives">
                <br />
                {this.state.iniciatives.map((iniciative, i) => {
                    return (
                        <div className="cuadrado" key={i}>
                            <h1> {iniciative.title}

                            </h1>
                            <div className="row">
                                <div style={{ width: '30%', float: 'left' }}>

                                    <MediaBox className="responsive-img" src={iniciative.photo} caption="A demo media box1" width="400" />


                                </div>
                                <div style={{ width: '65%', float: 'right' }}>

                                    <h3 style={{ textAlign: 'center' }}>Categorie: {iniciative.category} </h3>
                                    <p style={{ textAlign: "center" }}>
                                        <img src={iniciative.photoUser}
                                            className="image-user"
                                            alt=""
                                            style={{ marginRight: 4 }} />
                                        {iniciative.user}
                                    </p>
                                    <p style={{ textAlign: "justify" }}>{iniciative.description}</p>
                                    <Row>
                                        <Col s={12}>
                                            <ProgressBar progress={(iniciative.moneyProgress / iniciative.money) * 100 } />
                                        </Col>
                                        
                                    </Row>
                                    <center>                                   
                                            <p>${iniciative.moneyProgress} / ${iniciative.money}</p>
                                 </center>

                                    <center>
                                        {this.renderContributteButton("/contribute/" + iniciative.id)}
                                    </center>

                                </div>
                            </div>
                        </div>
                    )
                })}
                <br />
            </div>
        );
    };

}
export default Iniciatives;