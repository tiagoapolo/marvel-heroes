import React, { Component } from 'react';
import './SearchPage.scss';
import LiveQuery from '../components/LiveQuery/LiveQuery';
import { withRouter } from "react-router-dom";


class SearchPage extends Component {

  state = {
    value:''
  }

  selectedHero = (hero) => { 
    console.log('Chosen hero: ', hero)
    this.props.history.push('/heroes/'+hero.id, hero)
  }

  render() {


    return (
      <div className="SearchPage">
        <div>
          <img src="./marvel-logo.png" />
        </div>
        <LiveQuery
          width={80}
          apiUrl={'https://gateway.marvel.com:443/v1/public/characters?apikey=10fa2c2a0779afedacae0909b812458d'}
          onSelected={this.selectedHero}
        ></LiveQuery>
      </div>
    );
  }
}

export default SearchPage;
