import React, { useState, useEffect, useRef } from 'react'
import request from '../Components/Common/HttpRequests'
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
// import OwlCarousel from 'react-owl-carousel';

const Home = () => {

    return (
        <>
            <div className="content-grid">

                <div className="grid">
                <div className="grid grid-half change-on-desktop" style={{marginTop: -45}}>
                    <div className="achievement-box secondary">
                    <div className="achievement-box-info-wrap">
                        <img className="achievement-box-image" src="https://odindesignthemes.com/vikinger/img/badge/caffeinated-b.png" alt="badge-caffeinated-b"/>
                
                        <div className="achievement-box-info">
                        <p className="achievement-box-title">Dernier badge déverrouillé</p>
                
                        <p className="achievement-box-text"><span className="bold">Caffé</span> il y a 2 jours</p>
                        </div>
                    </div>
                
                    <Link to="/etape-1" className="button white-solid">Continuer de jouer</Link>
                    </div>
                
                    <div className="achievement-box primary">
                    <div className="achievement-box-info-wrap">
                        <img className="achievement-box-image" src="https://odindesignthemes.com/vikinger/img/quest/completedq-l.png" alt="quest-completedq-l"/>
                
                        <div className="achievement-box-info">
                        <p className="achievement-box-title">Dernière quête terminée</p>
                
                        <p className="achievement-box-text"><span className="bold">Rien à cacher</span> Il y a 7 heures</p>
                        </div>
                    </div>
                
                    <Link to="/etape-1" className="button white-solid">Continuer de jouer</Link>
                    
                    </div>
                </div>

                <div className="grid grid-3-9">
                    <div className="grid-column">
                    <div className="widget-box">
                        <div className="progress-arc-summary">
                        <div className="progress-arc-wrap" style={{display: 'contents',justifyContent: 'center'}}>
                                 <div style={{padding: 10}}>
                                        <div>
                                            <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 100,height: 100, borderRadius: 15, border: '2px solid blue'}}/>
                                        </div>
                                    </div>
                    
                            </div>
                            <div className="progress-arc-info">
                                <p className="progress-arc-title">59%</p> 
                            </div>
                    
                        <div className="progress-arc-summary-info" style={{marginTop: 10}}>
                            <p className="progress-arc-summary-title">Achèvement du profil</p>
                    
                            <p className="progress-arc-summary-subtitle">Castin Stanley</p>
                    
                            <p className="progress-arc-summary-text">Complétez votre profil en remplissant des champs d'informations sur le profil, complétant les quêtes et déverrouillage des badges</p>
                        </div>
                        </div>

                        <div className="achievement-status-list">
                        <div className="achievement-status">
                            <p className="achievement-status-progress">11/30</p>

                            <div className="achievement-status-info">
                            <p className="achievement-status-title">Quests</p>
                            
                            <p className="achievement-status-text">Completed</p>
                            </div>

                            <img className="achievement-status-image" src="https://odindesignthemes.com/vikinger/img/badge/completedq-s.png" alt="bdage-completedq-s"/>
                        </div>

                        <div className="achievement-status">
                            <p className="achievement-status-progress">22/46</p>

                            <div className="achievement-status-info">
                            <p className="achievement-status-title">Badges</p>
                            
                            <p className="achievement-status-text">Unlocked</p>
                            </div>

                            <img className="achievement-status-image" src="https://odindesignthemes.com/vikinger/img/badge/unlocked-badge.png" alt="bdage-unlocked-badge"/>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="grid-column">
                    <div className="level-progress-box">
                        <div className="level-progress-badge">
                        <p className="level-progress-badge-title">Level</p>
                    
                        <p className="level-progress-badge-text">1</p>
                        </div>
                    
                        <div className="progress-stat">
                        <div className="bar-progress-wrap big">
                            <p className="bar-progress-info start negative progress-with-text">+38EXP <span className="light">atteindre le niveau suivant</span></p>
                    
                            <p className="progress-stat-info" style={{top: 20}}>13.625 Total des points d'exp reçus</p>
                        </div>
                    
                        <div id="exp-to-next-level" className="progress-stat-bar"></div>
                        </div>
                    </div>

                    <div className="widget-box no-padding">
                        <p className="widget-box-title">Historique de l'expérience</p>
                    
                        <div className="widget-box-content small-margin-top padded-for-scroll small" data-simplebar>
                        <div className="exp-line-list scroll-content">
                            <div className="exp-line">
                            <svg className="exp-line-icon icon-badges">
                                <use xlinkHref="#svg-badges"></use>
                            </svg>
                    
                            <p className="text-sticker small-text">
                                <svg className="text-sticker-icon icon-plus-small">
                                <use xlinkHref="#svg-plus-small"></use>
                                </svg>
                                80 EXP
                            </p>
                    
                            <p className="exp-line-text">Continue comme ça!Vous avez atteint le niveau II du badge "Warrior"</p>
                    
                            <p className="exp-line-timestamp">29 minutes ago</p>
                            </div>
                    
                            <div className="exp-line">
                            <svg className="exp-line-icon icon-quests">
                                <use xlinkHref="#svg-quests"></use>
                            </svg>
                    
                            <p className="text-sticker small-text">
                                <svg className="text-sticker-icon icon-plus-small">
                                <use xlinkHref="#svg-plus-small"></use>
                                </svg>
                                65 EXP
                            </p>
                    
                            <p className="exp-line-text">Félicitations!Vous avez terminé la quête «rien à cacher»</p>
                    
                            <p className="exp-line-timestamp">7 hours ago</p>
                            </div>
                    
                            <div className="exp-line">
                            <svg className="exp-line-icon icon-badges">
                                <use xlinkHref="#svg-badges"></use>
                            </svg>
                    
                            <p className="text-sticker small-text">
                                <svg className="text-sticker-icon icon-plus-small">
                                <use xlinkHref="#svg-plus-small"></use>
                                </svg>
                                40 EXP
                            </p>
                    
                            <p className="exp-line-text">Bon travail!Vous venez de déverrouiller le badge "caféiné"</p>
                    
                            <p className="exp-line-timestamp">2 days ago</p>
                            </div>
                    
                            <div className="exp-line">
                            <svg className="exp-line-icon icon-badges">
                                <use xlinkHref="#svg-badges"></use>
                            </svg>
                    
                            <p className="text-sticker small-text">
                                <svg className="text-sticker-icon icon-plus-small">
                                <use xlinkHref="#svg-plus-small"></use>
                                </svg>
                                100 EXP
                            </p>
                    
                            <p className="exp-line-text">Étonnante!Vous venez de déverrouiller le badge "Gold User"</p>
                    
                            <p className="exp-line-timestamp">5 days ago</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div className="grid">
                <div className="grid grid-12-3 stretched">
                    <div className="widget-box">
                        <p className="widget-box-title">Top Friends leaderboards</p>
                    
                        <div className="widget-box-content no-margin-top">
                        <div className="table table-top-friends join-rows">
                            <div className="table-header">
                            <div className="table-header-column">
                                <p className="table-header-title">Friend</p>
                            </div>
                        
                            <div className="table-header-column centered padded">
                                <p className="table-header-title">Reactions</p>
                            </div>
                        
                            <div className="table-header-column centered padded">
                                <p className="table-header-title">Comments</p>
                            </div>
                        
                            <div className="table-header-column centered padded">
                                <p className="table-header-title">Shares</p>
                            </div>
                        
                            <div className="table-header-column centered padded">
                                <p className="table-header-title">Replies</p>
                            </div>
                            </div>
                        
                            <div className="table-body">
                            <div className="table-row tiny">
                                <div className="table-column">
                                <div className="user-status">
                                    <a className="user-status-avatar" href="profile-timeline.html">
                                    <div className="user-avatar small no-outline">
                                    <div className="user-avatar-content">
                                        <div style={{display: 'flex',justifyContent: 'center'}}>
                                        <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                                        </div>
                                    </div>
                
                                    <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                                        <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                                    </div>
                                    </div>
                                    </a>
                                
                                    <p className="user-status-title"><a className="bold" href="profile-timeline.html">Nick Grissom</a></p>
                                
                                    <p className="user-status-text small">Friended: Jan 14, 2017</p>
                                </div>
                                </div>
                        
                                <div className="table-column centered padded">
                                <p className="table-title">1569</p>
                                </div>
                        
                                <div className="table-column centered padded">
                                <p className="table-title">750</p>
                                </div>
                        
                                <div className="table-column padded-left">
                                <div className="progress-stat-wrap">
                                    <div className="progress-stat">
                                    <div id="post-engagement-1" className="progress-stat-bar"></div>
                                
                                    <div className="bar-progress-wrap">
                                        <p className="bar-progress-info medium negative"><span className="bar-progress-text no-space"></span></p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        
                            <div className="table-row tiny">
                                <div className="table-column">
                                <div className="user-status">
                                    <a className="user-status-avatar" href="profile-timeline.html">
                                    <div className="user-avatar small no-outline">
                                    <div className="user-avatar-content">
                                        <div style={{display: 'flex',justifyContent: 'center'}}>
                                        <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                                        </div>
                                    </div>
                
                                    <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                                        <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                                    </div>
                                    </div>
                                    </a>
                                
                                    <p className="user-status-title"><a className="bold" href="profile-timeline.html">Destroy Dex</a></p>
                                
                                    <p className="user-status-text small">Friended: May 22, 2017</p>
                                </div>
                                </div>
                        
                                <div className="table-column centered padded">
                                <p className="table-title">1036</p>
                                </div>
                        
                                <div className="table-column centered padded">
                                <p className="table-title">803</p>
                                </div>
                        
                                <div className="table-column padded-left">
                                <div className="progress-stat-wrap">
                                    <div className="progress-stat">
                                    <div id="post-engagement-2" className="progress-stat-bar"></div>
                                
                                    <div className="bar-progress-wrap">
                                        <p className="bar-progress-info medium negative"><span className="bar-progress-text no-space"></span></p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div className="table-row tiny">
                                <div className="table-column">
                                <div className="user-status">
                                    <a className="user-status-avatar" href="profile-timeline.html">
                                    <div className="user-avatar small no-outline">
                                    <div className="user-avatar-content">
                                        <div style={{display: 'flex',justifyContent: 'center'}}>
                                        <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                                        </div>
                                    </div>
                
                                    <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                                        <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                                    </div>
                                    </div>
                                    </a>
                                
                                    <p className="user-status-title"><a className="bold" href="profile-timeline.html">Neko Bebop</a></p>
                                
                                    <p className="user-status-text small">Friended: Sep 19, 2018</p>
                                </div>
                                </div>
                        
                                <div className="table-column centered padded">
                                <p className="table-title">860</p>
                                </div>
                        
                                <div className="table-column centered padded">
                                <p className="table-title">662</p>
                                </div>
                        
                                <div className="table-column padded-left">
                                <div className="progress-stat-wrap">
                                    <div className="progress-stat">
                                    <div id="post-engagement-3" className="progress-stat-bar"></div>
                                
                                    <div className="bar-progress-wrap">
                                        <p className="bar-progress-info medium negative"><span className="bar-progress-text no-space"></span></p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div className="table-row tiny">
                                <div className="table-column">
                                <div className="user-status">
                                    <a className="user-status-avatar" href="profile-timeline.html">
                                    <div className="user-avatar small no-outline">
                                    <div className="user-avatar-content">
                                        <div style={{display: 'flex',justifyContent: 'center'}}>
                                        <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                                        </div>
                                    </div>
                
                                    <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                                        <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                                    </div>
                                    </div>
                                    </a>
                                
                                    <p className="user-status-title"><a className="bold" href="profile-timeline.html">Sarah Diamond</a></p>
                                
                                    <p className="user-status-text small">Friended: Aug 6, 2017</p>
                                </div>
                                </div>
                        
                                <div className="table-column centered padded">
                                <p className="table-title">742</p>
                                </div>
                        
                                <div className="table-column centered padded">
                                <p className="table-title">401</p>
                                </div>
                        
                                <div className="table-column padded-left">
                                <div className="progress-stat-wrap">
                                    <div className="progress-stat">
                                    <div id="post-engagement-4" className="progress-stat-bar"></div>
                                
                                    <div className="bar-progress-wrap">
                                        <p className="bar-progress-info medium negative"><span className="bar-progress-text no-space"></span></p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div className="table-row tiny">
                                <div className="table-column">
                                <div className="user-status">
                                    <a className="user-status-avatar" href="profile-timeline.html">
                                    <div className="user-avatar small no-outline">
                                    <div className="user-avatar-content">
                                        <div style={{display: 'flex',justifyContent: 'center'}}>
                                        <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                                        </div>
                                    </div>
                
                                    <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                                        <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                                    </div>
                                    </div>
                                    </a>
                                
                                    <p className="user-status-title"><a className="bold" href="profile-timeline.html">The Green Goo</a></p>
                                
                                    <p className="user-status-text small">Friended: Dec 27, 2019</p>
                                </div>
                                </div>
                        
                                <div className="table-column centered padded">
                                <p className="table-title">421</p>
                                </div>
                        
                                <div className="table-column centered padded">
                                <p className="table-title">200</p>
                                </div>
                        
                                <div className="table-column padded-left">
                                <div className="progress-stat-wrap">
                                    <div className="progress-stat">
                                    <div id="post-engagement-5" className="progress-stat-bar"></div>
                                
                                    <div className="bar-progress-wrap">
                                        <p className="bar-progress-info medium negative"><span className="bar-progress-text no-space"></span></p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                </div>

                </div>
            </div>
        </>
    )
}
export default Home;