import React, { Component } from 'react';
import './HeroDetails.scss';
import { withRouter } from "react-router-dom";
import { search } from '../utils/utils';


class HeroDetails extends Component {

  state = {
    value:'',
    hero: null,
    id: this.props.location.pathname.split('/')[2]
  }


  getById = async (id) => {
    const resp = await search(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=10fa2c2a0779afedacae0909b812458d`
    )

    return resp
  }

  renderHero = () => {
    if( !this.props.location.state ){
      this.getById(this.state.id)
      .then(resp => this.setState({ hero: resp.results[0] }))
      .catch(e => console.log(e))
    } else {
      this.setState({hero: this.props.location.state})
    }
  }

  componentDidMount() {
    this.renderHero()
  }

  backButton = () => {
    this.props.history.push('/')
  }

  render() {
    
    const { hero } = this.state
    console.log(hero)

    return (
      <div className="HeroDetails">              
        <div className="back-button">
          <img alt="back button" onClick={this.backButton} src="../back.png"/> 
        </div> 
         
        {
          hero ?
          <div className="hero-content">
            <div className="profile-bg"></div>
            <div className="hero-short">
              <div className="hero-profile">
                <div style={{display: 'inline-block', textAlign: 'center'}}>
                  <img alt="hero thumbnail" className="hero-pic" src={hero.thumbnail.path+'.'+hero.thumbnail.extension}/>
                  <h3>{hero.name}</h3>
                </div>
              </div>             
              <div className="hero-info">
                { hero.description ? <p>{hero.description}</p> : ''  }                
              </div>
              { 
                  hero.urls ? 
                  <div className="url-container"> 
                    { hero.urls.map((urlData,idx) => <a key={idx} className="url-link" href={ urlData.url } >
                    { urlData.type.toUpperCase()}</a>) } 
                  </div> 
                  : ''
                }
            </div>
            <div className="hero-full">
                {
                  hero.comics ? 
                  <div className="comic">
                    <h4>Comics</h4>
                    <ul className="comic-table">
                      { hero.comics.items.map((comic,idx) => <li key={idx}><a  href={comic.resourceURI}> {comic.name} </a> </li>) }
                    </ul>
                  </div>
                  : ''
                }

                {
                  hero.series ? 
                  <div className="comic">
                    <h4>Series</h4>
                    <ul className="comic-table">
                      { hero.series.items.map((serie,idx) => <li key={idx}><a  href={serie.resourceURI}> {serie.name} </a> </li>) }
                    </ul>
                  </div>
                  : ''
                }

                {
                  hero.stories ? 
                  <div className="comic">
                    <h4>Stories</h4>
                    <ul className="comic-table">
                      { hero.stories.items.map((story,idx) => <li key={idx}><a  href={story.resourceURI}> {story.name} </a> </li>) }
                    </ul>
                  </div>
                  : ''
                }
                
            </div>
          </div> 
          
          :''
        }
            
    </div>
    );
  }
}

export default withRouter(HeroDetails);
