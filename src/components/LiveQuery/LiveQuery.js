import React, { Component } from 'react';
import './LiveQuery.scss';

import { search } from '../../utils/utils';

class LiveQuery extends Component {

  state = {
    heroes: null,
    loading: false,
    value:'',
    query: '',
    collapsed: true
  }
  
  componentDidMount() {
    document.addEventListener('mousedown', this.dismiss, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.dismiss, false);
  }

  dismiss = (ev) => {
    if( !this.node.contains(ev.target) ){
      this.setState({ heroes: null, value: '', loading: false ,collapsed: true }) 
    } 
  }

  search = async (val='', ...queryParams) => {

    this.setState({ loading: true, query: val })   

    const res = await search(
      this.props.apiUrl,
      val ? { nameStartsWith: val, ...queryParams } : null
    );

    const heroes = await res;

    this.setState({ heroes, loading: false });

  }

  updateSearch = () => {
    
    if(!this.state.loading && this.state.heroes.offset < this.state.heroes.total){
      
      this.setState({loading: true})
      
      let diff = this.state.heroes.total-this.state.heroes.offset
      let resOffset = diff > 20 ? this.state.heroes.offset + 20 : this.state.heroes.offset + diff 

      search(
        this.props.apiUrl,
        this.state.query ? { nameStartsWith: this.state.query, offset: resOffset } : { offset: resOffset }
      ).then(h => {

        this.setState({ loading: false, heroes: {...this.state.heroes, offset: h.offset, results: this.state.heroes.results.concat(h.results) } })

      })
      .catch(e => console.log(e))

    }

  }

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value, collapsed: false });
  };

  onFocusHandler = async () => {
    this.search('');
    this.setState({ value: '', collapsed: false });
  };

  selected = (e) => {
    let idx = e.currentTarget.value
    let hero = this.state.heroes.results[idx]
    this.props.onSelected(hero)
  }

  onScrollBottom = (e) => {
    if(((e.currentTarget.scrollHeight - e.currentTarget.scrollTop) - e.currentTarget.clientHeight) <= 0.5 && !this.state.collapsed) {
      this.updateSearch()
    }
  }

  renderResults = (results) => {
    return results.map((hero, idx) => 
    <li key={ hero.id } value={idx} onClick={this.selected} className="query-result">
      <img alt="Hero Thumbnail" className="result-thumbnail" style={{width:'30px', height: '30px', overflow: 'hidden' }} src={hero.thumbnail.path+'.'+hero.thumbnail.extension} />
      <span className="result-name">{ hero.name }</span>
    </li>)
  }

  render() {

    const { heroes, loading } = this.state
    const { width } = this.props

    return (
      <div className="LiveQuery" ref={node => this.node = node} style={{width: width+'%'}}>
        <input
          className="query-input"
          value={this.state.value}
          onChange={e => this.onChangeHandler(e)}
          placeholder="Type your hero's name"
          style={ 
            heroes && heroes.count ? 
            {
              borderBottomLeftRadius: '0px',
              borderBottomRightRadius: '0px',
            } 
            :
            {
              borderBottomLeftRadius: '5px',
              borderBottomRightRadius: '5px',
            } 
          }
        />
        { 
          
          heroes ? 
          <ul className="dropList" onScroll={this.onScrollBottom} style={{width: width ? (width+1) + '%' : 'auto'}} >
            {  
              (heroes && heroes.count) ? 
              this.renderResults(heroes.results)
              : <li className="">No results</li> 
            }
            {loading ? <li className="loader">Loading...</li> : ''}
          </ul>
          : ''
        }
          
      </div>
    );
  }
}

export default LiveQuery;
