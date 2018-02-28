import React, { Component } from 'react';
import firebase from 'firebase';
import { Input, Row, ProgressBar, Col, MediaBox } from 'react-materialize';

class Contribute extends Component {
    constructor({ match }) {
        super();
        this.state = {
            id: match.params.id,
            iniciatives: [],
            moneyContribute: 0
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.contribute = this.contribute.bind(this);
    }

    contribute() {
        if (this.state.moneyContribute > (this.state.iniciatives[0].money - this.state.iniciatives[0].moneyProgress)) {
            alert("I exceed the maximum limit")
        } else {
            const dbRefInvest = firebase.database().ref('iniciatives/' + this.state.iniciatives[0].id);
            dbRefInvest.update({
                moneyProgress: parseInt(this.state.iniciatives[0].moneyProgress, 10) + parseInt(this.state.moneyContribute, 10),
            });
            this.setState({
                moneyContribute: 0,
            });
            alert("Thanks for contributing")

        }
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
        });
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('iniciatives');
        itemsRef.on('value', (snapshot) => {
            let iniciatives = snapshot.val();
            let newState = [];
            for (let iniciative in iniciatives) {

                if (iniciative === this.state.id) {
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
            }
            this.setState({
                iniciatives: newState
            });
        });
    }
    render() {
        return (
            <div>
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
                                    <p style={{ textAlign: "justify" }}>Maximum money to contribute: ${parseInt(iniciative.money, 10) - parseInt(iniciative.moneyProgress, 10)}</p>
                                    <Row>
                                        <Col s={12}>
                                            <ProgressBar progress={(iniciative.moneyProgress / iniciative.money) * 100} />
                                        </Col>
                                    </Row>
                                    <center>
                                        <p>${iniciative.moneyProgress} / ${iniciative.money}</p>
                                    </center>

                                    <div style={{ width: '100%', float: 'left', paddingTop: 20 }}>
                                        <Row>
                                            <Input label="Money:"
                                                style={{ textAlign: 'right' }}
                                                s={12}
                                                value={this.state.moneyContribute}
                                                onChange={this.handleInputChange}
                                                name="moneyContribute"
                                                id="moneyrequired" type="number"
                                                className="form-control"
                                                required="required" />
                                        </Row>
                                    </div>
                                    <center>
                                        <Row>
                                            <button
                                                onClick={this.contribute}
                                                type="button"
                                                className="btn btn-success">Contribute!!</button>
                                        </Row>
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

export default Contribute;