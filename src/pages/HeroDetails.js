import React, { Component } from 'react';
// import './App.scss';
import { withRouter } from "react-router-dom";


class HeroDetails extends Component {

  state = {
    value:''
  }

  selectedHero = (hero) => console.log('Chosen hero: ', hero)

  render() {


    return (
      <div className="HeroDetails">

      </div>
    );
  }
}

export default withRouter(HeroDetails);
