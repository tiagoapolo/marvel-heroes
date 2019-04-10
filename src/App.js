import React, { Component } from 'react';
import './App.scss';

import { search } from './utils/utils';
import Table from './components/Table/Table';
import { paginate } from './utils/Paginate'
import LiveQuery from './components/LiveQuery/LiveQuery';

class App extends Component {

  state = {
    heroes: null,
    loading: false,
    value:''
  }

  search = async val => {

    this.setState({ loading: true })   
    console.log('myval ', val)
    const res = await search(
      `https://gateway.marvel.com:443/v1/public/characters?apikey=10fa2c2a0779afedacae0909b812458d`,
      val ? { nameStartsWith: val } : null
    );

    const heroes = await res;
    
    this.setState({ heroes, loading: false });
  }

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  get renderHeroes() {
    let heroes = <h1>There's no heroes</h1>;
    if (this.state.heroes) {
      heroes = this.state.heroes.count ? this.state.heroes.results.map(hero => <div key={hero.name}>{hero.name}</div>) : <div>No items found</div>
    }

    return heroes;
  }

  clearSearch = () => this.setState({heroes: null, value: ''})

  selectedHero = (hero) => console.log('Chosen hero: ', hero)

  render() {

    const {heroes} = this.state

    if(heroes) console.log(`Paginate for ${heroes.total} `,paginate(heroes.total))

    return (
      <div className="App">
{/*         <input
          value={this.state.value}
          onChange={e => this.onChangeHandler(e)}
          placeholder="Type something to search"
        />
 */}
        <div style={{maxWidth: '300px'}}>
          <LiveQuery 
            apiUrl={'https://gateway.marvel.com:443/v1/public/characters?apikey=10fa2c2a0779afedacae0909b812458d'}
            onSelected={this.selectedHero}
          ></LiveQuery>
        </div>


{/*         <Table data={heroes}></Table>
        <button onClick={this.clearSearch}>Clear Search</button> */}
      </div>
    );
  }
}

export default App;
