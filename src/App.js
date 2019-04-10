import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

import axios from "axios";
import { search } from './utils';

class App extends Component {

  state = {
    heroes: null,
    loading: false,
    value:''
  }

  search = async val => {

    this.setState({ loading: true })   
    
    const res = await search(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${val}&apikey=10fa2c2a0779afedacae0909b812458d`
    );

    const heroes = res;
    
    this.setState({ heroes, loading: false });
  }

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  get renderHeroes() {
    let heroes = <h1>There's no heroes</h1>;
    if (this.state.heroes) {
      heroes = this.state.heroes ? this.state.heroes.map(movie => <div>{movie.name}</div>) : ''
    }

    return heroes;
  }

  render() {
    return (
      <div className="App">
        <input
          value={this.state.value}
          onChange={e => this.onChangeHandler(e)}
          placeholder="Type something to search"
        />
        {this.renderHeroes}
      </div>
    );
  }
}

export default App;
