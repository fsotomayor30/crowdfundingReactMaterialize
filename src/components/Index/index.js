//Dependencies
import React, { Component } from 'react';
import { Row, Input} from 'react-materialize';
import firebase from 'firebase'


class Index extends Component {
    constructor() {
        super();
        this.state = {
            iniciatives: [],
            images: [],
            titleSearch: '',
            categorySearch: '',
            statePropose: null,
            stateEvaluate: null,
            stateInvest: null,
            stateExecute: null,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value,
        });
    }

    

    renderStage() {
        if (this.state.statePropose === true) {
            return (
                <div>
                
                    <div className="col-xs-12 col-sm-12">
                        <div className="cuadradoStage">
                            <h1 style={{ textAlign: 'center' }} >Currently in the stage of proposing</h1>
                        </div>
                    </div>
                </div>
            )
        } else {
            if (this.state.stateEvaluate === true) {
                return (
                    <div>
                        <div className="col-xs-12 col-sm-12">
                            <div className="cuadradoStage">
                                <h1 style={{ textAlign: 'center' }} >Currently in the evaluation stage</h1>
                            </div>
                        </div>
                    </div>
                )
            } else {
                if (this.state.stateInvest === true) {
                    return (
                        <div>
                            <div className="col-xs-12 col-sm-12">
                                <div className="cuadradoStage">
                                    <h1 style={{ textAlign: 'center' }} >Currently in the stage of investing</h1>
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    if (this.state.stateExecute === true) {
                        return (
                            <div>
                                <div className="col-xs-12 col-sm-12">
                                    <div className="cuadradoStage">
                                        <h1 style={{ textAlign: 'center' }} >Currently in the execution stage</h1>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
            }
        }
    }
    searchByTitle = () => {
        window.location = "/iniciative/title/" + this.state.titleSearch;
    }

    searchByCategory = () => {
        window.location = "/iniciative/category/" + this.state.categorySearch;
    }


    componentDidMount() {
        const iniciativeRef = firebase.database().ref('iniciatives');
        iniciativeRef.on('value', (snapshot) => {
            let iniciatives = snapshot.val();
            let newState = [];
            let image = [];
            for (let iniciative in iniciatives) {
                newState.push({
                    photo: iniciatives[iniciative].photo,
                    title: iniciatives[iniciative].title,
                    description: iniciatives[iniciative].description,
                });
                image.push(iniciatives[iniciative].photo)
            }

            this.setState({
                iniciatives: newState,
                images: image

            });
        });

        const stageRef = firebase.database().ref('stages');
        stageRef.on('value', (snapshot) => {
            let stages = snapshot.val();
            for (let stage in stages) {
                if (stages[stage].name === 'Propose') {
                    if (stages[stage].state === false) {
                        this.setState({
                            statePropose: false
                        })
                    } else {
                        this.setState({
                            statePropose: true,
                        });
                    }
                } else {
                    if (stages[stage].name === 'Evaluate') {
                        if (stages[stage].state === false) {
                            this.setState({
                                stateEvaluate: false
                            });
                        } else {

                            this.setState({
                                stateEvaluate: true
                            });
                        }
                    } else {
                        if (stages[stage].name === 'Invest') {
                            if (stages[stage].state === false) {
                                this.setState({
                                    stateInvest: false
                                });
                            } else {
                                this.setState({
                                    stateInvest: true
                                });
                            }
                        } else {
                            if (stages[stage].state === false) {
                                this.setState({
                                    stateExecute: false
                                });
                            } else {
                                this.setState({
                                    stateExecute: true
                                });
                            }
                        }
                    }
                }
            }
        });
    }


    render() {
        return (
            <div className="Iniciatives">

                <div className="row">
                    {this.renderStage()}
                </div>

                <div className="cuadrado">
                    <h1> Search </h1>
                    <div className="row">
                        <div className="container" style={{ width: '49%', float: 'left' }}>
                            <center>

                                <Input
                                    style={{ textAlign: 'center' }}
                                    s={11} type='select' label="Category:" onChange={this.handleInputChange} name="categorySearch" value={this.state.categorySearch} >
                                    <option value="infrastructure">Infrastructure</option>
                                    <option value="Climate and Culture">Climate and Culture</option>
                                    <option value="Solidarity fund">Solidarity fund</option>
                                </Input>

                                <button
                                    onClick={this.searchByCategory}
                                    style={{ marginTop: 10 }}
                                    type="button"
                                    className="btn btn-primary">Search</button>
                            </center>
                        </div>

                        <div className="container" style={{ width: '49%', float: 'left' }}>
                            <center>
                                <Row>
                                    <Input s={10} label="Title" validate placeholder="Ex: Team building" onChange={this.handleInputChange}
                                        value={this.state.titleSearch} name="titleSearch" />
                                </Row>


                                <button style={{ marginTop: 10 }} type="button" className="btn btn-primary" onClick={this.searchByTitle} >Search</button>
                            </center>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    };

}
export default Index;
