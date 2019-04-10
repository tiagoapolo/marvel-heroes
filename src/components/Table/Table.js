import React, { Component } from 'react';
import './Table.scss';

import Row from './Row/Row'

class Table extends Component {

  state = {
    heroes: null,
    loading: false,
    value:''
  }


  render() {

    const {data} = this.props


    return (
      <div className="Table">
        {
          data ? data.count ? data.results.map((hero) => <Row key={hero.name} content={hero.name}></Row>) 
          : <div>No Hero Found</div> 
          : <div>Look For Your Hero</div>
        }
      </div>
    );
  }
}

export default Table;
