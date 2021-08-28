import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Step1 = () => {
    return (
  <div className="content-grid">
    <div className="section-banner">
      <img className="section-banner-icon" src="http://localhost:3000/static/assets/img/banner/badges-icon.png" alt="badges-icon"/>
  
      <p className="section-banner-title">Methode de jeu</p>
  
      <p className="section-banner-text">Choisissez votre methode de jeu!</p>
    </div>

    <div className="grid grid-3-3-3-3 top-space centered">

      <div className="badge-item-stat"> 
        <img className="badge-item-stat-image" src="http://localhost:3000/static/assets/img/badge/bronze-b.png" alt="badge-bronze-b"/>
    
        <p className="badge-item-stat-title">QuizaPay solo</p>
    
        <p className="badge-item-stat-text">Cliquez ici, si vous voulez jouer seul!</p>
    
          <div style={{paddingTop: 20}}>
            <Link to="/etape-2" className="button secondary full">
              <svg className="button-icon icon-play" style={{margin: 5}}>
                <use xlinkHref="#svg-play"></use>
              </svg>
              Continuer
            </Link>
          </div>
      </div>

      <div className="badge-item-stat"> 
        <img className="badge-item-stat-image" src="http://localhost:3000/static/assets/img/badge/gold-b.png" alt="badge-gold-b"/>
    
        <p className="badge-item-stat-title">QuizaPay friendly</p>
    
        <p className="badge-item-stat-text">Cliquez ici, si vous voulez jouer avec un ami!</p>
    
          <div style={{paddingTop: 20}}>
            <Link to="#" className="button secondary full" onClick={()=> alert('En cours de preparation!!')}>
              <svg className="button-icon icon-play" style={{margin: 5}}>
                <use xlinkHref="#svg-play"></use>
              </svg>
              Continuer
            </Link>
          </div>
      </div>

      <div className="badge-item-stat"> 
        <img className="badge-item-stat-image" src="http://localhost:3000/static/assets/img/badge/silver-b.png" alt="badge-silver-b"/>
    
        <p className="badge-item-stat-title">QuizaPay collectives</p>
    
        <p className="badge-item-stat-text">Cliquez ici, si vous voulez y jouer avec plus d'une personne en même temps!</p>
    
          <div style={{paddingTop: 20}}>
            <Link to="#" className="button secondary full"  onClick={()=> alert('En cours de preparation!!')}>
              <svg className="button-icon icon-play" style={{margin: 5}}>
                <use xlinkHref="#svg-play"></use>
              </svg>
              Continuer
            </Link>
          </div>
      </div>


    </div>
  </div>
    )
}
export default Step1