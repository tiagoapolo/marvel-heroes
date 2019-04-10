import React, { Component } from 'react';
import './Row.scss';


class Row extends Component {

  state = {
    heroes: null,
    loading: false,
    value:''
  }


  render() {

    const {content} = this.props

    return (
      <div className="Row">
        <div style={{width: '200px', textAlign: 'center'}}>Eh nois {content} </div>
      </div>
    );
  }
}

export default Row;
