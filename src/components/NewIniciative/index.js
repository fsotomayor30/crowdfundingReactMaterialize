import React, { Component } from 'react';
import firebase from 'firebase';
import { Row, Input } from 'react-materialize';



class newIniciative extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            categories: 'Infrastructure',
            money: 0,
            description: '',
            uploadValue: 0,
            moneyProgress: 0,
            picture: null,
            uid: '',
            photoUser: ''
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({
                uid: user.displayName,
                photoUser: user.photoURL
            });
        })
    }


    handleSave() {
        if (this.state.uid) {
            if (this.state.title === '' ||
                this.state.categories === '' ||
                this.state.money === 0 ||
                this.state.description === '' ||
                this.state.picture === null) {
                alert("there can not be empty fields");
            } else {
                const record = {
                    title: this.state.title,
                    categories: this.state.categories,
                    money: parseInt(this.state.money, 10),
                    description: this.state.description,
                    photo: this.state.picture,
                    moneyProgress: parseInt(this.state.moneyProgress, 10),
                    user: this.state.uid,
                    photoUser: this.state.photoUser,
                };

                const dbRef = firebase.database().ref('iniciatives');
                const newIniciative = dbRef.push();
                newIniciative.set(record);
                alert("added correctly");

                this.setState({
                    title: '',
                    categories: '',
                    money: 0,
                    description: '',
                    uploadValue: 0,
                    picture: null,
                });
            }
        }
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value,
        });
    }

    handleUpload(event) {
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`/Fotos/${file.name}`);
        const task = storageRef.put(file);

        task.on('state_changed', snapshot => {
            let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue: percent

            })
        }, error => {
            console.log(error.message)
        }, () => {
            this.setState({
                uploadValue: 100,
                picture: task.snapshot.downloadURL
            })
        });
    }


    render() {


        return (
            <div className="cuadrado">

                <form>
                    <div style={{ width: '79%', float: 'left', paddingTop: 20 }}>
                        <Input label="Title" 
                            value={this.state.title}
                            onChange={this.handleInputChange} 
                            name="title" 
                            id="title" />
                    </div>

                    <div style={{ width: '20%', float: 'right', paddingTop: 20 }}>
                        <Input
                            style={{ textAlign: 'center' }}
                            s={11} type='select' 
                            label="Category:" 
                            value={this.state.categories}
                            onChange={this.handleInputChange} name="categories">
                            <option value="infrastructure">Infrastructure</option>
                            <option value="Climate and Culture">Climate and Culture</option>
                            <option value="Solidarity fund">Solidarity fund</option>
                        </Input>
                    </div>

                    <div style={{ width: '50%', float:'left', paddingTop: 20 }}>
                        <Row>
                    <Input label="Money Required:" 
                                
                                s={12}
                                onChange={this.handleInputChange}
                                name="money"
                                id="moneyrequired" type="number"
                                className="form-control"
                                required="required" />
                        </Row>
                        
                    </div>
                    <div style={{ width: '50%',float:'right', paddingTop: 20 }}>
                        
                    <Row>
                    <Input label="Description:" 
                                s={12}
                                
                                ovalue={this.state.description}
                            onChange={this.handleInputChange}
                            style={{ resize: 'none' }}
                            className="form-control"
                            name="description"
                            id="description"
                            cols="30"
                            rows="10"
                            required="required" />
                        </Row>

                       
                    </div>

                    <div style={{ width: '100%', paddingTop: 20 }}>
                        <progress style={{ width: '100%' }} value={this.state.uploadValue} max="100"></progress>
                        <br />


                <div className="file-field input-field">
      <div className="btn">
        <span>Image</span>
        <input type="file" onChange={this.handleUpload}
                            name="file"
                            id="file"
                            required="required"/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>

                        
                        <center>
                            <img
                                style={{ marginTop: 10 }}
                                width="320"
                                alt=""
                                src={this.state.picture} />
                        </center>
                    </div>
                </form>
                <center>
                    <button onClick={this.handleSave} className="btn btn-primary" style={{ marginTop: 10 }} type="submit">Send </button>
                </center>
            </div>

        );
    };

}
export default newIniciative;