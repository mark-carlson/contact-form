import React, { Component } from 'react';
import {Nav} from './Components/Nav';
import { Contact } from './Components/Contact';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav brand="My Porfolio" />
        <Contact />
      </div>
    );
  }
}

export default App;
