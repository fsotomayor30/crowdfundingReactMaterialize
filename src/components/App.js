import React, { Component } from 'react';
import propTypes from 'prop-types';

//component
import Header from './Global/Header'
import Content from './Global/Content'
import Footer from './Global/Footer'

class App extends Component {
  static propTypes = {
    children: propTypes.object.isRequired,
  };
  render() {
    const { children } = this.props;
    return (
      <div className="App">
        <Header/>
        <Content body={children} />
        <Footer />
      </div>
    );
  }
}

export default App;
