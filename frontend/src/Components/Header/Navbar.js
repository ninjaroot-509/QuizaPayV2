import React, { useState, useEffect } from 'react'
import { getToken, getUser, removeUserSession } from '../Common/Auth/Sessions';
import { 
    Facebook, 
    Twitter, 
    Instagram, 
    Search, 
    Menu, 
    // AccountCircle, 
    // ExitToApp, 
    // DoubleArrow
} from '@material-ui/icons';
import { Link } from 'react-router-dom'
import request from '../Common/HttpRequests'
import Toggle from '../../themes/Toggle'
import ScrollTop from "react-scrolltop-button";
import { ArrowUpward } from '@material-ui/icons';
import useWallets from '../../state/wallet/hooks/useWallets';

const Navbar = ({theme, toggleTheme}) => {
    const [wallet, isLoading, setWallets] = useWallets();
    const [menu, setMenu] = useState('')
    const [search, setSearch] = useState('')
    const [basket, setBasket] = useState('')
    const [chat, setChat] = useState('')

    const handleMenu = () => {
      if (menu === 'active') {
          setMenu('')
      } else {
          setMenu('active')
      }
  };

  const toggleSearch = () => {
      if (search === 'active') {
          setSearch('')
      } else {
          setSearch('active')
      }
  };

  const toggleBasket = () => {
      if (basket === 'active') {
          setBasket('')
      } else {
          setBasket('active')
      }
  };

  const toggleChat = () => {
    if (basket === 'active') {
        setChat('')
    } else {
        setChat('active')
    }
};

  const handleClickOutside = () => {
    setMenu('')
    setSearch('')
    setBasket('')
    setChat('')
  }

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [menu, basket, chat]);

    useEffect(() => {
      if (!wallet.details || wallet.details.length === 0) {
        setWallets();
      }
    }, [wallet, setWallets]);


    return (
      <>
        <nav id="navigation-widget-small" className={`navigation-widget navigation-widget-desktop ${menu === 'active'? '': 'closed'} sidebar left ${menu === 'active'? 'hidden': 'delayed'}`}>
          <Link className="user-avatar small no-outline online" to="#">
          <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
          </Link>

          <ul className="menu small">
            <li className="menu-item">
              <Link className="menu-item-link text-tooltip-tfr" to="newsfeed.html" data-title="Newsfeed" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-newsfeed">
                  <use xlinkHref="#svg-newsfeed"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -84, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Newsfeed</p></div></Link>
            </li>

            <li className="menu-item active">
              <Link className="menu-item-link text-tooltip-tfr" to="overview.html" data-title="Overview" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-overview">
                  <use xlinkHref="#svg-overview"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -81, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Overview</p></div></Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link text-tooltip-tfr" to="groups.html" data-title="Groups" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-group">
                  <use xlinkHref="#svg-group"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -71, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Groups</p></div></Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link text-tooltip-tfr" to="members.html" data-title="Members" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-members">
                  <use xlinkHref="#svg-members"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -81, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Members</p></div></Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link text-tooltip-tfr" to="badges.html" data-title="Badges" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-badges">
                  <use xlinkHref="#svg-badges"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -71, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Badges</p></div></Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link text-tooltip-tfr" to="quests.html" data-title="Quests" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-quests">
                  <use xlinkHref="#svg-quests"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -69, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Quests</p></div></Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link text-tooltip-tfr" to="streams.html" data-title="Streams" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-streams">
                  <use xlinkHref="#svg-streams"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -75, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Streams</p></div></Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link text-tooltip-tfr" to="events.html" data-title="Events" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-events">
                  <use xlinkHref="#svg-events"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -67, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Events</p></div></Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link text-tooltip-tfr" to="forums.html" data-title="Forums" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-forums">
                  <use xlinkHref="#svg-forums"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -72, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Forums</p></div></Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link text-tooltip-tfr" to="marketplace.html" data-title="Marketplace" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-marketplace">
                  <use xlinkHref="#svg-marketplace"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -97, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Marketplace</p></div></Link>
            </li>
          </ul>
        </nav>

        <nav id="navigation-widget" className={`navigation-widget navigation-widget-desktop sidebar left  ${menu === 'active'? 'delayed': 'hidden'}`} data-simplebar="init" style={{height: 594}}><div className="simplebar-wrapper" style={{margin: '0px 0px -40px'}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div><div className="simplebar-mask"><div className="simplebar-offset" style={{right: 0, bottom: 0}}><div className="simplebar-content-wrapper" style={{height: '100%', overflow: 'hidden scroll'}}><div className="simplebar-content" style={{padding: '0px 0px 40px'}}>
          <figure className="navigation-widget-cover liquid" style={{background: "url(&quot;https://odindesignthemes.com/vikinger/img/cover/01.jpg&quot;) center center / cover no-repeat"}}>
            <img src="https://odindesignthemes.com/vikinger/img/cover/01.jpg" alt="cover-01" style={{display: menu === 'active'? 'block':'none'}}/>
          </figure>

          <div className="user-short-description">
            <Link className="user-short-description-avatar user-avatar medium" to="#">
              <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
            </Link>

            <p className="user-short-description-title"><Link to="#">Marina Valentine</Link></p>

            <p className="user-short-description-text"><Link to="#">www.gamehuntress.com</Link></p>
          </div>

          <div className="badge-list small">
            <div className="badge-item">
              <img src="https://odindesignthemes.com/vikinger/img/badge/gold-s.png" alt="badge-gold-s"/>
            </div>

            <div className="badge-item">
              <img src="https://odindesignthemes.com/vikinger/img/badge/age-s.png" alt="badge-age-s"/>
            </div>

            <div className="badge-item">
              <img src="https://odindesignthemes.com/vikinger/img/badge/caffeinated-s.png" alt="badge-caffeinated-s"/>
            </div>

            <div className="badge-item">
              <img src="https://odindesignthemes.com/vikinger/img/badge/warrior-s.png" alt="badge-warrior-s"/>
            </div>

            <Link className="badge-item" to="profile-badges.html">
              <img src="https://odindesignthemes.com/vikinger/img/badge/blank-s.png" alt="badge-blank-s"/>
              <p className="badge-item-text">+9</p>
            </Link>
          </div>

          <div className="user-stats">
            <div className="user-stat">
              <p className="user-stat-title">930</p>

              <p className="user-stat-text">posts</p>
            </div>

            <div className="user-stat">
              <p className="user-stat-title">82</p>

              <p className="user-stat-text">friends</p>
            </div>

            <div className="user-stat">
              <p className="user-stat-title">5.7k</p>

              <p className="user-stat-text">visits</p>
            </div>
          </div>

          <ul className="menu">
            <li className="menu-item">
              <Link className="menu-item-link" to="newsfeed.html">
                <svg className="menu-item-link-icon icon-newsfeed">
                  <use xlinkHref="#svg-newsfeed"></use>
                </svg>
                Newsfeed
              </Link>
            </li>

            <li className="menu-item active">
              <Link className="menu-item-link" to="overview.html">
                <svg className="menu-item-link-icon icon-overview">
                  <use xlinkHref="#svg-overview"></use>
                </svg>
                Overview
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="groups.html">
                <svg className="menu-item-link-icon icon-group">
                  <use xlinkHref="#svg-group"></use>
                </svg>
                Groups
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="members.html">
                <svg className="menu-item-link-icon icon-members">
                  <use xlinkHref="#svg-members"></use>
                </svg>
                Members
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="badges.html">
                <svg className="menu-item-link-icon icon-badges">
                  <use xlinkHref="#svg-badges"></use>
                </svg>
                Badges
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="quests.html">
                <svg className="menu-item-link-icon icon-quests">
                  <use xlinkHref="#svg-quests"></use>
                </svg>
                Quests
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="streams.html">
                <svg className="menu-item-link-icon icon-streams">
                  <use xlinkHref="#svg-streams"></use>
                </svg>
                Streams
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="events.html">
                <svg className="menu-item-link-icon icon-events">
                  <use xlinkHref="#svg-events"></use>
                </svg>
                Events
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="forums.html">
                <svg className="menu-item-link-icon icon-forums">
                  <use xlinkHref="#svg-forums"></use>
                </svg>
                Forums
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="marketplace.html">
                <svg className="menu-item-link-icon icon-marketplace">
                  <use xlinkHref="#svg-marketplace"></use>
                </svg>
                Marketplace
              </Link>
            </li>
          </ul>
        </div></div></div></div><div className="simplebar-placeholder" style={{width: 'auto', height: 1019}}></div></div><div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}><div className="simplebar-scrollbar" style={{width: 0, transform: 'translate3d(0px, 0px, 0px)',display: 'none'}}></div></div><div className="simplebar-track simplebar-vertical" style={{visibility: 'visible'}}><div className="simplebar-scrollbar" style={{height: 346, transform: 'translate3d(0px, 0px, 0px)', display: 'block'}}></div></div>
        </nav>

        <nav id="navigation-widget-mobile" className={`navigation-widget navigation-widget-mobile sidebar left ${menu === 'active'? '': 'hidden'}`} data-simplebar="init" style={{height: 674}}><div className="simplebar-wrapper" style={{margin: '0px 0px -40px'}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div><div className="simplebar-mask"><div className="simplebar-offset" style={{right: 0, bottom: 0}}><div className="simplebar-content-wrapper" style={{height: '100%', overflow: 'hidden scroll'}}><div className="simplebar-content" style={{padding: '0px 0px 40px'}}>
          <div className="navigation-widget-close-button" onClick={handleMenu}>
            <svg className="navigation-widget-close-button-icon icon-back-arrow">
              <use xlinkHref="#svg-back-arrow"></use>
            </svg>
          </div>

          <div className="navigation-widget-info-wrap">
            <div className="navigation-widget-info">
            <Link className="user-avatar small no-outline" to="#">
              <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
              </Link>

              <p className="navigation-widget-info-title"><Link to="#">Marina Valentine</Link></p>

              <p className="navigation-widget-info-text">Welcome Back!</p>
            </div>

            <p className="navigation-widget-info-button button small secondary" >Logout</p>
          </div>

          <p className="navigation-widget-section-title">Sections</p>

          <ul className="menu">
            <li className="menu-item">
              <Link className="menu-item-link" to="newsfeed.html">
                <svg className="menu-item-link-icon icon-newsfeed">
                  <use xlinkHref="#svg-newsfeed"></use>
                </svg>
                Newsfeed
              </Link>
            </li>

            <li className="menu-item active">
              <Link className="menu-item-link" to="overview.html">
                <svg className="menu-item-link-icon icon-overview">
                  <use xlinkHref="#svg-overview"></use>
                </svg>
                Overview
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="groups.html">
                <svg className="menu-item-link-icon icon-group">
                  <use xlinkHref="#svg-group"></use>
                </svg>
                Groups
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="members.html">
                <svg className="menu-item-link-icon icon-members">
                  <use xlinkHref="#svg-members"></use>
                </svg>
                Members
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="badges.html">
                <svg className="menu-item-link-icon icon-badges">
                  <use xlinkHref="#svg-badges"></use>
                </svg>
                Badges
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="quests.html">
                <svg className="menu-item-link-icon icon-quests">
                  <use xlinkHref="#svg-quests"></use>
                </svg>
                Quests
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="streams.html">
                <svg className="menu-item-link-icon icon-streams">
                  <use xlinkHref="#svg-streams"></use>
                </svg>
                Streams
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="events.html">
                <svg className="menu-item-link-icon icon-events">
                  <use xlinkHref="#svg-events"></use>
                </svg>
                Events
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="forums.html">
                <svg className="menu-item-link-icon icon-forums">
                  <use xlinkHref="#svg-forums"></use>
                </svg>
                Forums
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="marketplace.html">
                <svg className="menu-item-link-icon icon-marketplace">
                  <use xlinkHref="#svg-marketplace"></use>
                </svg>
                Marketplace
              </Link>
            </li>
          </ul>

          <p className="navigation-widget-section-title">My Profile</p>

          <Link className="navigation-widget-section-link" to="hub-profile-info.html">Profile Info</Link>

          <Link className="navigation-widget-section-link" to="hub-profile-social.html">Social &amp; Stream</Link>

          <Link className="navigation-widget-section-link" to="hub-profile-notifications.html">Notifications</Link>

          <Link className="navigation-widget-section-link" to="hub-profile-messages.html">Messages</Link>

          <Link className="navigation-widget-section-link" to="hub-profile-requests.html">Friend Requests</Link>

          <p className="navigation-widget-section-title">Account</p>

          <Link className="navigation-widget-section-link" to="hub-account-info.html">Account Info</Link>

          <Link className="navigation-widget-section-link" to="hub-account-password.html">Change Password</Link>

          <Link className="navigation-widget-section-link" to="hub-account-settings.html">General Settings</Link>

          <p className="navigation-widget-section-title">Groups</p>

          <Link className="navigation-widget-section-link" to="hub-group-management.html">Manage Groups</Link>

          <Link className="navigation-widget-section-link" to="hub-group-invitations.html">Invitations</Link>

          <p className="navigation-widget-section-title">My Store</p>

          <Link className="navigation-widget-section-link" to="hub-store-account.html">My Account <span className="highlighted">$250,32</span></Link>

          <Link className="navigation-widget-section-link" to="hub-store-statement.html">Sales Statement</Link>

          <Link className="navigation-widget-section-link" to="hub-store-items.html">Manage Items</Link>

          <Link className="navigation-widget-section-link" to="hub-store-downloads.html">Downloads</Link>

          <p className="navigation-widget-section-title">Main Links</p>

          <Link className="navigation-widget-section-link" to="#">Home</Link>

          <Link className="navigation-widget-section-link" to="#">Careers</Link>

          <Link className="navigation-widget-section-link" to="#">Faqs</Link>

          <Link className="navigation-widget-section-link" to="#">About Us</Link>

          <Link className="navigation-widget-section-link" to="#">Our Blog</Link>

          <Link className="navigation-widget-section-link" to="#">Contact Us</Link>

          <Link className="navigation-widget-section-link" to="#">Privacy Policy</Link>
        </div></div></div></div><div className="simplebar-placeholder" style={{width: 'auto', height: 1976}}></div></div><div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}><div className="simplebar-scrollbar" style={{width: 0, transform: 'translate3d(0px, 0px, 0px)',display: 'none'}}></div></div><div className="simplebar-track simplebar-vertical" style={{visibility: 'visible'}}><div className="simplebar-scrollbar" style={{height: 229, transform: 'translate3d(0px, 0px, 0px)', display: 'block'}}></div></div></nav>

        <aside id="chat-widget-messages" className={`chat-widget ${chat === 'active'? '': 'closed'} sidebar right`}>
          <div className="chat-widget-messages" data-simplebar="init" style={{height: menu === 'active'? 427 : 514}}><div className="simplebar-wrapper" style={{margin: 0}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div><div className="simplebar-mask"><div className="simplebar-offset" style={{right: 0, bottom: 0}}><div className="simplebar-content-wrapper" style={{height: '100%', overflow: 'hidden scroll'}}><div className="simplebar-content" style={{padding: 0}}>
            <div className="chat-widget-message">
              <div className="user-status">
                <div className="user-status-avatar">
                  <div className="user-avatar small no-outline online">
                      <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
                  </div>
                </div>
            
                <p className="user-status-title"><span className="bold">Nick Grissom</span></p>
            
                <p className="user-status-text small">Can you stream the new game?</p>
            
                <p className="user-status-timestamp floaty">2hrs</p>
              </div>
            </div>

            <div className="chat-widget-message">
              <div className="user-status">
                <div className="user-status-avatar">
                  <div className="user-avatar small no-outline online">
                  <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
                  </div>
                </div>
            
                <p className="user-status-title"><span className="bold">Matt Parker</span></p>
            
                <p className="user-status-text small">Can you stream the new game?</p>
            
                <p className="user-status-timestamp floaty">2hrs</p>
              </div>
            </div>

            <div className="chat-widget-message">
              <div className="user-status">
                <div className="user-status-avatar">
                  <div className="user-avatar small no-outline away">
                  <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
                  </div>
                </div>
            
                <p className="user-status-title"><span className="bold">Neko Bebop</span></p>
            
                <p className="user-status-text small">Awesome! I'll see you there!</p>
            
                <p className="user-status-timestamp floaty">54mins</p>
              </div>
            </div>

            <div className="chat-widget-message">
              <div className="user-status">
                <div className="user-status-avatar">
                  <div className="user-avatar small no-outline offline">
                  <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
                  </div>
                </div>
            
                <p className="user-status-title"><span className="bold">Bearded Wonder</span></p>
            
                <p className="user-status-text small">Great! Then we'll meet with them at...</p>
            
                <p className="user-status-timestamp floaty">2hrs</p>
              </div>
            </div>

            <div className="chat-widget-message">
              <div className="user-status">
                <div className="user-status-avatar">
                  <div className="user-avatar small no-outline online">
                  <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
                  </div>
                </div>
            
                <p className="user-status-title"><span className="bold">Sandra Strange</span></p>
            
                <p className="user-status-text small">Can you stream the new game?</p>
            
                <p className="user-status-timestamp floaty">2hrs</p>
              </div>
            </div>

            <div className="chat-widget-message">
              <div className="user-status">
                <div className="user-status-avatar">
                  <div className="user-avatar small no-outline online">
                  <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
                  </div>
                </div>
            
                <p className="user-status-title"><span className="bold">James Murdock</span></p>
            
                <p className="user-status-text small">Great! Then we'll meet with them at...</p>
            
                <p className="user-status-timestamp floaty">7hrs</p>
              </div>
            </div>

            <div className="chat-widget-message">
              <div className="user-status">
                <div className="user-status-avatar">
                  <div className="user-avatar small no-outline away">
                  <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
                  </div>
                </div>
            
                <p className="user-status-title"><span className="bold">The Green Goo</span></p>
            
                <p className="user-status-text small">Can you stream the new game?</p>
            
                <p className="user-status-timestamp floaty">2hrs</p>
              </div>
            </div>

            <div className="chat-widget-message">
              <div className="user-status">
                <div className="user-status-avatar">
                  <div className="user-avatar small no-outline online">
                  <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
                  </div>
                </div>
            
                <p className="user-status-title"><span className="bold">Sarah Diamond</span></p>
            
                <p className="user-status-text small">I'm sending you the latest news of...</p>
            
                <p className="user-status-timestamp floaty">16hrs</p>
              </div>
            </div>

            <div className="chat-widget-message">
              <div className="user-status">
                <div className="user-status-avatar">
                  <div className="user-avatar small no-outline offline">
                  <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
                  </div>
                </div>
            
                <p className="user-status-title"><span className="bold">Destroy Dex</span></p>
            
                <p className="user-status-text small">Can you stream the new game?</p>
            
                <p className="user-status-timestamp floaty">2hrs</p>
              </div>
            </div>

            <div className="chat-widget-message">
              <div className="user-status">
                <div className="user-status-avatar">
                  <div className="user-avatar small no-outline online">
                  <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
                  </div>
                </div>
            
                <p className="user-status-title"><span className="bold">Damian Greyson</span></p>
            
                <p className="user-status-text small">Can you stream the new game?</p>
            
                <p className="user-status-timestamp floaty">2hrs</p>
              </div>
            </div>

            <div className="chat-widget-message">
              <div className="user-status">
                <div className="user-status-avatar">
                  <div className="user-avatar small no-outline online">
                  <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
                  </div>
                </div>
            
                <p className="user-status-title"><span className="bold">Paul Lang</span></p>
            
                <p className="user-status-text small">Can you stream the new game?</p>
            
                <p className="user-status-timestamp floaty">2hrs</p>
              </div>
            </div>
          </div></div></div></div><div className="simplebar-placeholder" style={{width: 'auto', height: menu === 'active'? 792 : 735}}></div></div><div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}><div className="simplebar-scrollbar" style={{width: 0, display: 'none'}}></div></div><div className="simplebar-track simplebar-vertical" style={{visibility: 'visible'}}><div className="simplebar-scrollbar" style={{height: 359, transform: 'translate3d(0px, 0px, 0px)', display: 'block'}}></div></div></div>

          <form className="chat-widget-form">
            <div className="interactive-input small">
              <input type="text" id="chat-widget-search" name="chat_widget_search" placeholder="Search Messages..."/>
              <div className="interactive-input-icon-wrap">
                <svg className="interactive-input-icon icon-magnifying-glass">
                  <use xlinkHref="#svg-magnifying-glass"></use>
                </svg>
              </div>

              <div className="interactive-input-action">
                <svg className="interactive-input-action-icon icon-cross-thin">
                  <use xlinkHref="#svg-cross-thin"></use>
                </svg>
              </div>
            </div>
          </form>

          <div className="chat-widget-button" onClick={toggleChat}>
            <div className="chat-widget-button-icon">
              <div className="burger-icon">
                <div className="burger-icon-bar"></div>

                <div className="burger-icon-bar"></div>

                <div className="burger-icon-bar"></div>
              </div>
            </div>

            <p className="chat-widget-button-text" onClick={toggleChat}>Messages / Chat</p>
          </div>
        </aside>

        <aside id="chat-widget-message" className="chat-widget chat-widget-overlay hidden sidebar right">
          <div className="chat-widget-header">
            <div className="chat-widget-close-button">
              <svg className="chat-widget-close-button-icon icon-back-arrow">
                <use xlinkHref="#svg-back-arrow"></use>
              </svg>
            </div>

            <div className="user-status">
              <div className="user-status-avatar">
                <div className="user-avatar small no-outline online">
                <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
                </div>
              </div>

              <p className="user-status-title"><span className="bold">Nick Grissom</span></p>

              <p className="user-status-tag online">Online</p>
            </div>
          </div>

          <div className="chat-widget-conversation" data-simplebar="init" style={{height: 335}}><div className="simplebar-wrapper" style={{margin: '-35px -28px'}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div><div className="simplebar-mask"><div className="simplebar-offset" style={{right: 0, bottom: 0}}><div className="simplebar-content-wrapper" style={{height: '100%', overflow: 'hidden scroll'}}><div className="simplebar-content" style={{padding: '35px 28px'}}>
            <div className="chat-widget-speaker left">
              <div className="chat-widget-speaker-avatar">
                <div className="user-avatar tiny no-border">
                  <div className="user-avatar-content">
                    <img src="https://odindesignthemes.com/vikinger/img/avatar/03.jpg" style={{width: 24, height: 26, position: 'relative'}}/>
                  </div>
                </div>
              </div>

              <p className="chat-widget-speaker-message">Hi Marina! It's been a long time!</p>

              <p className="chat-widget-speaker-timestamp">Yesterday at 8:36PM</p>
            </div>

            <div className="chat-widget-speaker right">
              <p className="chat-widget-speaker-message">Hey Nick!</p>

              <p className="chat-widget-speaker-message">You're right, it's been a really long time! I think the last time we saw was at Neko's party</p>

              <p className="chat-widget-speaker-timestamp">10:05AM</p>
            </div>

            <div className="chat-widget-speaker left">
              <div className="chat-widget-speaker-avatar">
                <div className="user-avatar tiny no-border">
                  <div className="user-avatar-content">
                    <img src="https://odindesignthemes.com/vikinger/img/avatar/03.jpg" style={{width: 24, height: 26, position: 'relative'}}/>
                  </div>
                </div>
              </div>

              <p className="chat-widget-speaker-message">Yeah! I remember now! The stream launch party</p>

              <p className="chat-widget-speaker-message">That reminds me that I wanted to ask you something</p>

              <p className="chat-widget-speaker-message">Can you stream the new game?</p>
            </div>
          </div></div></div></div><div className="simplebar-placeholder" style={{width: 'auto', height: 542}}></div></div><div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}><div className="simplebar-scrollbar" style={{width: 0, transform: 'translate3d(0px, 0px, 0px)',display: 'none'}}></div></div><div className="simplebar-track simplebar-vertical" style={{visibility: 'visible'}}><div className="simplebar-scrollbar" style={{height: 207, transform: 'translate3d(0px, 0px, 0px)', display: 'block'}}></div></div></div>

          <form className="chat-widget-form">
            <div className="interactive-input small">
              <input type="text" id="chat-widget-message-text" name="chat_widget_message_text" placeholder="Write a message..."/>
              <div className="interactive-input-icon-wrap">
                <svg className="interactive-input-icon icon-send-message">
                  <use xlinkHref="#svg-send-message"></use>
                </svg>
              </div>

              <div className="interactive-input-action">
                <svg className="interactive-input-action-icon icon-cross-thin">
                  <use xlinkHref="#svg-cross-thin"></use>
                </svg>
              </div>
            </div>
          </form>
        </aside>

        <header className="header">
          <div className="header-actions">
            <div className="header-brand">
              <div className="logo">
                <Link to="/">
                  <img src="/logo.png" alt="QuizaPay"  style={{width: 'auto', height: 40}}/> 
                </Link>
              </div>

              <h1 className="header-brand-text">QuizaPay</h1>
              <div style={{paddingLeft: 20}}>
                <div style={{padding: '5px 7px',background: 'white',borderRadius: 25}}>
                    <span style={{fontFamily: 'fantasy',fontSize: 16,color: '#005'}}>500HTG</span>
                </div>
                <div className="add_money" style={{position: 'absolute',bottom: 10,left: 135}}>
                  <div style={{padding: '0px 7px',borderRadius: 20,background: '#ff8612'}}>
                    <span style={{color: 'white'}}>+</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="header-actions">
            <div className="sidemenu-trigger navigation-widget-trigger" onClick={handleMenu}>
              <svg className="icon-grid">
                <use xlinkHref="#svg-grid"></use>
              </svg>
            </div>

            <div className="mobilemenu-trigger navigation-widget-mobile-trigger" onClick={handleMenu}>
              <div className="burger-icon inverted">
                <div className="burger-icon-bar"></div>

                <div className="burger-icon-bar"></div>

                <div className="burger-icon-bar"></div>
              </div>
            </div>

            <nav className="navigation">
              <ul className="menu-main">
                <li className="menu-main-item">
                  <Link className="menu-main-item-link" to="#">Home</Link>
                </li>

                <li className="menu-main-item">
                  <Link className="menu-main-item-link" to="#">Careers</Link>
                </li>

                <li className="menu-main-item">
                  <Link className="menu-main-item-link" to="#">Faqs</Link>
                </li>

                <li className="menu-main-item">
                  <p className="menu-main-item-link">
                    <svg className="icon-dots">
                      <use xlinkHref="#svg-dots"></use>
                    </svg>
                  </p>

                  <ul className="menu-main">
                    <li className="menu-main-item">
                      <Link className="menu-main-item-link" to="#">About Us</Link>
                    </li>

                    <li className="menu-main-item">
                      <Link className="menu-main-item-link" to="#">Our Blog</Link>
                    </li>

                    <li className="menu-main-item">
                      <Link className="menu-main-item-link" to="#">Contact Us</Link>
                    </li>

                    <li className="menu-main-item">
                      <Link className="menu-main-item-link" to="#">Privacy Policy</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header-actions search-bar" style={{position: 'relative'}}>
            <div className="interactive-input dark">
              <input type="text" id="search-main" name="search_main" placeholder="Search here for people or groups"/>
              <div className="interactive-input-icon-wrap">
                <svg className="interactive-input-icon icon-magnifying-glass">
                  <use xlinkHref="#svg-magnifying-glass"></use>
                </svg>
              </div>

              <div className="interactive-input-action">
                <svg className="interactive-input-action-icon icon-cross-thin">
                  <use xlinkHref="#svg-cross-thin"></use>
                </svg>
              </div>
            </div>

            <div className="dropdown-box padding-bottom-small header-search-dropdown" style={{position: 'absolute', zIndex: 9999, top: 57, left: 0, opacity: 0, visibility: 'hidden', transform: 'translate(0px, -40px)', transition: 'transform 0.4s ease-in-out 0s, opacity 0.4s ease-in-out 0s, visibility 0.4s ease-in-out 0s'}}>
              <div className="dropdown-box-category">
                <p className="dropdown-box-category-title">Members</p>
              </div>
          
              <div className="dropdown-box-list small no-scroll">
                <Link className="dropdown-box-list-item" to="#">
                  <div className="user-status notification">
                    <div className="user-status-avatar">
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
                    </div>
                
                    <p className="user-status-title"><span className="bold">Neko Bebop</span></p>
                
                    <p className="user-status-text">1 friends in common</p>
                
                    <div className="user-status-icon">
                      <svg className="icon-friend">
                        <use xlinkHref="#svg-friend"></use>
                      </svg>
                    </div>
                  </div>
                </Link>
          
                <Link className="dropdown-box-list-item" to="#">
                  <div className="user-status notification">
                    <div className="user-status-avatar">
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
                    </div>
                
                    <p className="user-status-title"><span className="bold">Tim Rogers</span></p>
                
                    <p className="user-status-text">4 friends in common</p>
                
                    <div className="user-status-icon">
                      <svg className="icon-friend">
                        <use xlinkHref="#svg-friend"></use>
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
          
              <div className="dropdown-box-category">
                <p className="dropdown-box-category-title">Groups</p>
              </div>
          
              <div className="dropdown-box-list small no-scroll">
                <Link className="dropdown-box-list-item" to="group-timeline.html">
                  <div className="user-status notification">
                    <div className="user-status-avatar">
                      <div className="user-avatar small no-border">
                        <div className="user-avatar-content">
                          <img src="https://odindesignthemes.com/vikinger/img/avatar/24.jpg" style={{width: 40, height: 44, position: 'relative'}}/>
                        </div>
                      </div>
                    </div>
                
                    <p className="user-status-title"><span className="bold">Cosplayers of the World</span></p>
                
                    <p className="user-status-text">139 members</p>
                
                    <div className="user-status-icon">
                      <svg className="icon-group">
                        <use xlinkHref="#svg-group"></use>
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
          
              <div className="dropdown-box-category">
                <p className="dropdown-box-category-title">Marketplace</p>
              </div>
            
              <div className="dropdown-box-list small no-scroll">
                <Link className="dropdown-box-list-item" to="marketplace-product.html">
                  <div className="user-status no-padding-top">
                    <div className="user-status-avatar">
                      <figure className="picture small round liquid" style={{background: 'url(&quot;https://odindesignthemes.com/vikinger/img/marketplace/items/07.jpg&quot;) center center / cover no-repeat'}}>
                        <img src="https://odindesignthemes.com/vikinger/img/marketplace/items/07.jpg" alt="item-07" style={{display: 'none'}}/>
                      </figure>
                    </div>
                
                    <p className="user-status-title"><span className="bold">Mercenaries White Frame</span></p>
                
                    <p className="user-status-text">By Neko Bebop</p>
                
                    <div className="user-status-icon">
                      <svg className="icon-marketplace">
                        <use xlinkHref="#svg-marketplace"></use>
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="header-actions">
            <div className="progress-stat">
              <div className="bar-progress-wrap">
                <p className="bar-progress-info">Next: <span className="bar-progress-text">38<span className="bar-progress-unit">exp</span></span></p>
              </div>
          
              <div id="logged-user-level" className="progress-stat-bar" style={{width: 110, height: 4, position: 'relative'}}><canvas width="110" height="4" style={{position: 'absolute', top: 0, left: 0}}></canvas><canvas width="110" height="4" style={{position: 'absolute', top: 0, left: 0}}></canvas></div>
            </div>
          </div>

          <div className="header-actions">
            <div className="action-list dark">
              <div className="action-list-item-wrap" style={{position: 'relative'}}>
                <div className={`action-list-item header-dropdown-trigger ${basket === 'active'? 'active' : ''} `} onClick={toggleBasket}>
                  <svg className="action-list-item-icon icon-shopping-bag">
                    <use xlinkHref="#svg-shopping-bag"></use>
                  </svg>
                </div>

                <div className="dropdown-box no-padding-bottom header-dropdown" style={{position: 'absolute', zIndex: 9999, top: 64, right: 6, visibility: basket === 'active'? 'visible' : 'hidden', transform: 'translate(0px, 0px)', transition: 'transform 0.4s ease-in-out 0s, opacity 0.4s ease-in-out 0s, visibility 0.4s ease-in-out 0s'}}>
                  <div className="dropdown-box-header">
                    <p className="dropdown-box-header-title">Shopping Cart <span className="highlighted">3</span></p>
                  </div>
              
                  <div className="dropdown-box-list scroll-small no-hover" data-simplebar="init"><div className="simplebar-wrapper" style={{margin: 0}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div><div className="simplebar-mask"><div className="simplebar-offset" style={{right: 0, bottom: 0}}><div className="simplebar-content-wrapper" style={{height: '100%', overflow: 'hidden scroll'}}><div className="simplebar-content" style={{padding: 0}}>
                    <div className="dropdown-box-list-item">
                      <div className="cart-item-preview">
                        <Link className="cart-item-preview-image" to="marketplace-product.html">
                          <figure className="picture medium round liquid" style={{background: 'url(&quot;https://odindesignthemes.com/vikinger/img/marketplace/items/01.jpg&quot;) center center / cover no-repeat'}}>
                            <img src="https://odindesignthemes.com/vikinger/img/marketplace/items/01.jpg" alt="item-01" style={{display: 'none'}}/>
                          </figure>
                        </Link>
                    
                        <p className="cart-item-preview-title"><Link to="marketplace-product.html">Twitch Stream UI Pack</Link></p>
                    
                        <p className="cart-item-preview-text">Regular License</p>
                    
                        <p className="cart-item-preview-price"><span className="highlighted">$</span> 12.00 x 1</p>
                    
                        <div className="cart-item-preview-action">
                          <svg className="icon-delete">
                            <use xlinkHref="#svg-delete"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
              
                    <div className="dropdown-box-list-item">
                      <div className="cart-item-preview">
                        <Link className="cart-item-preview-image" to="marketplace-product.html">
                          <figure className="picture medium round liquid" style={{background: 'url(&quot;https://odindesignthemes.com/vikinger/img/marketplace/items/11.jpg&quot;) center center / cover no-repeat'}}>
                            <img src="https://odindesignthemes.com/vikinger/img/marketplace/items/11.jpg" alt="item-11" style={{display: 'none'}}/>
                          </figure>
                        </Link>
                    
                        <p className="cart-item-preview-title"><Link to="marketplace-product.html">Gaming Coin Badges Pack</Link></p>
                    
                        <p className="cart-item-preview-text">Regular License</p>
                    
                        <p className="cart-item-preview-price"><span className="highlighted">$</span> 6.00 x 1</p>
                    
                        <div className="cart-item-preview-action">
                          <svg className="icon-delete">
                            <use xlinkHref="#svg-delete"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
              
                    <div className="dropdown-box-list-item">
                      <div className="cart-item-preview">
                        <Link className="cart-item-preview-image" to="marketplace-product.html">
                          <figure className="picture medium round liquid" style={{background: 'url(&quot;https://odindesignthemes.com/vikinger/img/marketplace/items/10.jpg&quot;) center center / cover no-repeat'}}>
                            <img src="https://odindesignthemes.com/vikinger/img/marketplace/items/10.jpg" alt="item-10" style={{display: 'none'}}/>
                          </figure>
                        </Link>
                    
                        <p className="cart-item-preview-title"><Link to="marketplace-product.html">Twitch Stream UI Pack</Link></p>
                    
                        <p className="cart-item-preview-text">Regular License</p>
                    
                        <p className="cart-item-preview-price"><span className="highlighted">$</span> 26.00 x 1</p>
                    
                        <div className="cart-item-preview-action">
                          <svg className="icon-delete">
                            <use xlinkHref="#svg-delete"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
              
                    <div className="dropdown-box-list-item">
                      <div className="cart-item-preview">
                        <Link className="cart-item-preview-image" to="marketplace-product.html">
                          <figure className="picture medium round liquid" style={{background: 'url(&quot;https://odindesignthemes.com/vikinger/img/marketplace/items/04.jpg&quot;) center center / cover no-repeat'}}>
                            <img src="https://odindesignthemes.com/vikinger/img/marketplace/items/04.jpg" alt="item-04" style={{display: 'none'}}/>
                          </figure>
                        </Link>
                    
                        <p className="cart-item-preview-title"><Link to="marketplace-product.html">Generic Joystick Pack</Link></p>
                    
                        <p className="cart-item-preview-text">Regular License</p>
                    
                        <p className="cart-item-preview-price"><span className="highlighted">$</span> 16.00 x 1</p>
                    
                        <div className="cart-item-preview-action">
                          <svg className="icon-delete">
                            <use xlinkHref="#svg-delete"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div></div></div></div><div className="simplebar-placeholder" style={{width: 'auto', height: 360}}></div></div><div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}><div className="simplebar-scrollbar" style={{width: 0, display: 'none'}}></div></div><div className="simplebar-track simplebar-vertical" style={{visibility: 'visible'}}><div className="simplebar-scrollbar" style={{height: 227, transform: 'translate3d(0px, 0px, 0px)', display: 'block'}}></div></div></div>
              
                  <div className="cart-preview-total">
                    <p className="cart-preview-total-title">Total:</p>
              
                    <p className="cart-preview-total-text"><span className="highlighted">$</span> 60.00</p>
                  </div>
              
                  <div className="dropdown-box-actions">
                    <div className="dropdown-box-action">
                      <Link className="button secondary" to="marketplace-cart.html">Shopping Cart</Link>
                    </div>
              
                    <div className="dropdown-box-action">
                      <Link className="button primary" to="marketplace-checkout.html">Go to Checkout</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="action-list-item-wrap" style={{position: 'relative'}}>
                <div className="action-list-item header-dropdown-trigger">
                  <svg className="action-list-item-icon icon-friend">
                    <use xlinkHref="#svg-friend"></use>
                  </svg>
                </div>

                <div className="dropdown-box header-dropdown" style={{position: 'absolute', zIndex: 9999, top: 64, right: 6, opacity: 0, visibility: 'hidden', transform: 'translate(0px, -40px)', transition: 'transform 0.4s ease-in-out 0s, opacity 0.4s ease-in-out 0s, visibility 0.4s ease-in-out 0s'}}>
                  <div className="dropdown-box-header">
                    <p className="dropdown-box-header-title">Friend Requests</p>
              
                    <div className="dropdown-box-header-actions">
                      <p className="dropdown-box-header-action">Find Friends</p>
                      
                      <p className="dropdown-box-header-action">Settings</p>
                    </div>
                  </div>
              
                  <div className="dropdown-box-list no-hover" data-simplebar="init"><div className="simplebar-wrapper" style={{margin: 0}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div><div className="simplebar-mask"><div className="simplebar-offset" style={{right: 0, bottom: 0}}><div className="simplebar-content-wrapper" style={{height: '100%', overflow: 'hidden'}}><div className="simplebar-content" style={{padding: 0}}>
                    <div className="dropdown-box-list-item">
                      <div className="user-status request">
                        
                        <Link className="user-avatar small no-outline online" to="#">
                          <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
                        </Link>
                    
                        <p className="user-status-title"><Link className="bold" to="#">Ginny Danvers</Link></p>
                    
                        <p className="user-status-text">6 friends in common</p>
                    
                        <div className="action-request-list">
                          <div className="action-request accept">
                            <svg className="action-request-icon icon-add-friend">
                              <use xlinkHref="#svg-add-friend"></use>
                            </svg>
                          </div>
                    
                          <div className="action-request decline">
                            <svg className="action-request-icon icon-remove-friend">
                              <use xlinkHref="#svg-remove-friend"></use>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
              
                    <div className="dropdown-box-list-item">
                      <div className="user-status request">
                      <Link className="user-avatar small no-outline online" to="#">
                          <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
                        </Link>
                    
                        <p className="user-status-title"><Link className="bold" to="#">Paul Lang</Link></p>
                    
                        <p className="user-status-text">2 friends in common</p>
                    
                        <div className="action-request-list">
                          <div className="action-request accept">
                            <svg className="action-request-icon icon-add-friend">
                              <use xlinkHref="#svg-add-friend"></use>
                            </svg>
                          </div>
                    
                          <div className="action-request decline">
                            <svg className="action-request-icon icon-remove-friend">
                              <use xlinkHref="#svg-remove-friend"></use>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
              
                    <div className="dropdown-box-list-item">
                      <div className="user-status request">
                      <Link className="user-avatar small no-outline online" to="#">
                          <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="https://odindesignthemes.com/vikinger/img/avatar/04.jpg" style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
      
                          <div className="user-avatar-badge"style={{left: 25,top: 30}}>         
                            <div style={{backgroundColor: '#143fff', padding: 2, borderRadius: 10, justifyContent: 'center',display: 'flex',alignItems: 'center',border: '2px solid #ffffff'}}><p className="user-avatar-badge-text">24</p></div>
                          </div>
                        </Link>
                    
                        <p className="user-status-title"><Link className="bold" to="#">Cassie May</Link></p>
                    
                        <p className="user-status-text">4 friends in common</p>
                    
                        <div className="action-request-list">
                          <div className="action-request accept">
                            <svg className="action-request-icon icon-add-friend">
                              <use xlinkHref="#svg-add-friend"></use>
                            </svg>
                          </div>
                    
                          <div className="action-request decline">
                            <svg className="action-request-icon icon-remove-friend">
                              <use xlinkHref="#svg-remove-friend"></use>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div></div></div></div><div className="simplebar-placeholder" style={{width: 'auto', height: 228}}></div></div><div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}><div className="simplebar-scrollbar" style={{width: 0, display: 'none'}}></div></div><div className="simplebar-track simplebar-vertical" style={{visibility: 'hidden'}}><div className="simplebar-scrollbar" style={{height: 0, display: 'none'}}></div></div></div>
              
                  <Link className="dropdown-box-button secondary" to="hub-profile-requests.html">View all Requests</Link>
                </div>
              </div>

              <div className="action-list-item-wrap" style={{position: 'relative'}}>
                <div className="action-list-item header-dropdown-trigger">
                  <svg className="action-list-item-icon icon-messages">
                    <use xlinkHref="#svg-messages"></use>
                  </svg>
                </div>

                <div className="dropdown-box header-dropdown" style={{position: 'absolute', zIndex: 9999, top: 64, right: 6, opacity: 0, visibility: 'hidden', transform: 'translate(0px, -40px)', transition: 'transform 0.4s ease-in-out 0s, opacity 0.4s ease-in-out 0s, visibility 0.4s ease-in-out 0s'}}>
                  <div className="dropdown-box-header">
                    <p className="dropdown-box-header-title">Messages</p>
              
                    <div className="dropdown-box-header-actions">
                      <p className="dropdown-box-header-action">Mark all as Read</p>
                      
                      <p className="dropdown-box-header-action">Settings</p>
                    </div>
                  </div>
              
                  <div className="dropdown-box-list medium" data-simplebar="init"><div className="simplebar-wrapper" style={{margin: 0}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div><div className="simplebar-mask"><div className="simplebar-offset" style={{right: 0, bottom: 0}}><div className="simplebar-content-wrapper" style={{height: '100%', overflow: 'hidden scroll'}}><div className="simplebar-content" style={{padding: 0}}>
                    <Link className="dropdown-box-list-item" to="hub-profile-messages.html">
                      <div className="user-status">
                        <div className="user-status-avatar">
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


                        </div>
                    
                        <p className="user-status-title"><span className="bold">Bearded Wonder</span></p>
                    
                        <p className="user-status-text">Great! Then will meet with them at the party...</p>
                    
                        <p className="user-status-timestamp floaty">29 mins ago</p>
                      </div>
                    </Link>
              
                    <Link className="dropdown-box-list-item" to="hub-profile-messages.html">
                      <div className="user-status">
                        <div className="user-status-avatar">
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
                        </div>
              
                        <p className="user-status-title"><span className="bold">Neko Bebop</span></p>
              
                        <p className="user-status-text">Awesome! I'll see you there!</p>
              
                        <p className="user-status-timestamp floaty">54 mins ago</p>
                      </div>
                    </Link>
              
                    <Link className="dropdown-box-list-item" to="hub-profile-messages.html">
                      <div className="user-status">
                        <div className="user-status-avatar">
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
                        </div>
              
                        <p className="user-status-title"><span className="bold">Nick Grissom</span></p>
              
                        <p className="user-status-text">Can you stream that new game?</p>
              
                        <p className="user-status-timestamp floaty">2 hours ago</p>
                      </div>
                    </Link>
              
                    <Link className="dropdown-box-list-item" to="hub-profile-messages.html">
                      <div className="user-status">
                        <div className="user-status-avatar">
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
                        </div>
              
                        <p className="user-status-title"><span className="bold">Sarah Diamond</span></p>
              
                        <p className="user-status-text">I'm sending you the latest news of the release...</p>
              
                        <p className="user-status-timestamp floaty">16 hours ago</p>
                      </div>
                    </Link>
              
                    <Link className="dropdown-box-list-item" to="hub-profile-messages.html">
                      <div className="user-status">
                        <div className="user-status-avatar">
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
                        </div>
              
                        <p className="user-status-title"><span className="bold">James Murdock</span></p>
              
                        <p className="user-status-text">Great! Then will meet with them at the party...</p>
              
                        <p className="user-status-timestamp floaty">7 days ago</p>
                      </div>
                    </Link>
              
                    <Link className="dropdown-box-list-item" to="hub-profile-messages.html">
                      <div className="user-status">
                        <div className="user-status-avatar">
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
                        </div>
              
                        <p className="user-status-title"><span className="bold">The Green Goo</span></p>
              
                        <p className="user-status-text">Can you stream that new game?</p>
              
                        <p className="user-status-timestamp floaty">10 days ago</p>
                      </div>
                    </Link>
                  </div></div></div></div>
                  <div className="simplebar-placeholder" style={{width: 'auto', height: 504}}></div>
                  </div>
                  <div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}>
                    <div className="simplebar-scrollbar" style={{width: 0, display: 'none'}}></div>
                    </div>
                    <div className="simplebar-track simplebar-vertical" style={{visibility: 'visible'}}>
                      <div className="simplebar-scrollbar" style={{height: 350, transform: 'translate3d(0px, 0px, 0px)', display: 'block'}}>
                      </div>
                      </div>
                      </div>
              
                  <Link className="dropdown-box-button primary" to="hub-profile-messages.html">View all Messages</Link>
                </div>
              </div>

              <div className="action-list-item-wrap" style={{position: 'relative'}}>
                <div className="action-list-item unread header-dropdown-trigger">
                  <svg className="action-list-item-icon icon-notification">
                    <use xlinkHref="#svg-notification"></use>
                  </svg>
                </div>

                <div className="dropdown-box header-dropdown" style={{position: 'absolute', zIndex: 9999, top: 64, right: 6, opacity: 0, visibility: 'hidden', transform: 'translate(0px, -40px)', transition: 'transform 0.4s ease-in-out 0s, opacity 0.4s ease-in-out 0s, visibility 0.4s ease-in-out 0s'}}>
                  <div className="dropdown-box-header">
                    <p className="dropdown-box-header-title">Notifications</p>
              
                    <div className="dropdown-box-header-actions">
                      <p className="dropdown-box-header-action">Mark all as Read</p>
                      
                      <p className="dropdown-box-header-action">Settings</p>
                    </div>
                  </div>
              
                  <div className="dropdown-box-list" data-simplebar="init"><div className="simplebar-wrapper" style={{margin: 0}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div><div className="simplebar-mask"><div className="simplebar-offset" style={{right: 0, bottom: 0}}><div className="simplebar-content-wrapper" style={{height: '100%', overflow: 'hidden scroll'}}><div className="simplebar-content" style={{padding: 0}}>
                    <div className="dropdown-box-list-item unread">
                      <div className="user-status notification">
                        <Link className="user-status-avatar" to="#">
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
                        </Link>
                    
                        <p className="user-status-title"><Link className="bold" to="#">Nick Grissom</Link> posted a comment on your <Link className="highlighted" to="#">status update</Link></p>
                    
                        <p className="user-status-timestamp">2 minutes ago</p>
                    
                        <div className="user-status-icon">
                          <svg className="icon-comment">
                            <use xlinkHref="#svg-comment"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
              
                    <div className="dropdown-box-list-item">
                      <div className="user-status notification">
                        <Link className="user-status-avatar" to="#">
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
                        </Link>
                    
                        <p className="user-status-title"><Link className="bold" to="#">Sarah Diamond</Link> left a like <img className="reaction" src="https://odindesignthemes.com/vikinger/img/reaction/like.png" alt="reaction-like"/> reaction on your <Link className="highlighted" to="#">status update</Link></p>
                    
                        <p className="user-status-timestamp">17 minutes ago</p>
                    
                        <div className="user-status-icon">
                          <svg className="icon-thumbs-up">
                            <use xlinkHref="#svg-thumbs-up"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
              
                    <div className="dropdown-box-list-item">
                      <div className="user-status notification">
                        <Link className="user-status-avatar" to="#">
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
                        </Link>
              
                        <p className="user-status-title"><Link className="bold" to="#">Destroy Dex</Link> posted a comment on your <Link className="highlighted" to="profile-photos.html">photo</Link></p>
              
                        <p className="user-status-timestamp">31 minutes ago</p>
              
                        <div className="user-status-icon">
                          <svg className="icon-comment">
                            <use xlinkHref="#svg-comment"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
              
                    <div className="dropdown-box-list-item">
                      <div className="user-status notification">
                        <Link className="user-status-avatar" to="#">
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
                        </Link>
              
                        <p className="user-status-title"><Link className="bold" to="#">The Green Goo</Link> left a love <img className="reaction" src="https://odindesignthemes.com/vikinger/img/reaction/love.png" alt="reaction-love"/> reaction on your <Link className="highlighted" to="#">status update</Link></p>
              
                        <p className="user-status-timestamp">2 hours ago</p>
              
                        <div className="user-status-icon">
                          <svg className="icon-thumbs-up">
                            <use xlinkHref="#svg-thumbs-up"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
              
                    <div className="dropdown-box-list-item">
                      <div className="user-status notification">
                        <Link className="user-status-avatar" to="#">
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
                        </Link>
              
                        <p className="user-status-title"><Link className="bold" to="#">Neko Bebop</Link> posted a comment on your <Link className="highlighted" to="#">status update</Link></p>
              
                        <p className="user-status-timestamp">3 hours ago</p>
              
                        <div className="user-status-icon">
                          <svg className="icon-comment">
                            <use xlinkHref="#svg-comment"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div></div></div></div><div className="simplebar-placeholder" style={{width: 'auto', height: 481}}></div></div><div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}><div className="simplebar-scrollbar" style={{width: 0, display: 'none'}}></div></div><div className="simplebar-track simplebar-vertical" style={{visibility: 'visible'}}><div className="simplebar-scrollbar" style={{height: 366, transform: 'translate3d(0px, 0px, 0px)', display: 'block'}}></div></div></div>
              
                  <Link className="dropdown-box-button secondary" to="hub-profile-notifications.html">View all Notifications</Link>
                </div>
              </div>
            </div>

            <div className="action-item-wrap" style={{position: 'relative'}}>
              <div className="action-item dark header-settings-dropdown-trigger">
                <svg className="action-item-icon icon-settings">
                  <use xlinkHref="#svg-settings"></use>
                </svg>
              </div>

              <div className="dropdown-navigation header-settings-dropdown" style={{position: 'absolute', zIndex: 9999, top: 64, right: 22, opacity: 0, visibility: 'hidden', transform: 'translate(0px, -40px)', transition: 'transform 0.4s ease-in-out 0s, opacity 0.4s ease-in-out 0s, visibility 0.4s ease-in-out 0s'}}>
                <div className="dropdown-navigation-header">
                  <div className="user-status">
                    <Link className="user-status-avatar" to="#">
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
                    </Link>
                
                    <p className="user-status-title"><span className="bold">Hi Marina!</span></p>
                
                    <p className="user-status-text small"><Link to="#">@marinavalentine</Link></p>
                  </div>
                </div>
            
                <p className="dropdown-navigation-category">My Profile</p>
            
                <Link className="dropdown-navigation-link" to="hub-profile-info.html">Profile Info</Link>
            
                <Link className="dropdown-navigation-link" to="hub-profile-social.html">Social &amp; Stream</Link>
            
                <Link className="dropdown-navigation-link" to="hub-profile-notifications.html">Notifications</Link>
            
                <Link className="dropdown-navigation-link" to="hub-profile-messages.html">Messages</Link>
            
                <Link className="dropdown-navigation-link" to="hub-profile-requests.html">Friend Requests</Link>
            
                <p className="dropdown-navigation-category">Account</p>
            
                <Link className="dropdown-navigation-link" to="hub-account-info.html">Account Info</Link>
            
                <Link className="dropdown-navigation-link" to="hub-account-password.html">Change Password</Link>
            
                <Link className="dropdown-navigation-link" to="hub-account-settings.html">General Settings</Link>
            
                <p className="dropdown-navigation-category">Groups</p>
            
                <Link className="dropdown-navigation-link" to="hub-group-management.html">Manage Groups</Link>
            
                <Link className="dropdown-navigation-link" to="hub-group-invitations.html">Invitations</Link>
            
                <p className="dropdown-navigation-category">My Store</p>
            
                <Link className="dropdown-navigation-link" to="hub-store-account.html">My Account <span className="highlighted">$250,32</span></Link>
            
                <Link className="dropdown-navigation-link" to="hub-store-statement.html">Sales Statement</Link>
            
                <Link className="dropdown-navigation-link" to="hub-store-items.html">Manage Items</Link>
            
                <Link className="dropdown-navigation-link" to="hub-store-downloads.html">Downloads</Link>
            
                <p className="dropdown-navigation-button button small secondary" >Logout</p>
              </div>
            </div>
          </div>
        </header>

        <aside className="floaty-bar">
          <div className="bar-actions">
            <div className="progress-stat">
              <div className="bar-progress-wrap">
                <p className="bar-progress-info">Next: <span className="bar-progress-text">12<span className="bar-progress-unit">exp</span></span></p>
              </div>
          
              <div id="logged-user-level-cp" className="progress-stat-bar" style={{width: 0, height: 4, position: 'relative'}}><canvas width="0" height="4" style={{position: 'absolute', top: 0, left: 0}}></canvas><canvas width="0" height="4" style={{position: 'absolute', top: 0, left: 0}}></canvas></div>
            </div>
          </div>

          <div className="bar-actions">
            <div className="action-list dark">
              <Link className="action-list-item" to="marketplace-cart.html">
                <svg className="action-list-item-icon icon-shopping-bag">
                  <use xlinkHref="#svg-shopping-bag"></use>
                </svg>
              </Link>

              <Link className="action-list-item" to="hub-profile-requests.html">
                <svg className="action-list-item-icon icon-friend">
                  <use xlinkHref="#svg-friend"></use>
                </svg>
              </Link>

              <Link className="action-list-item" to="hub-profile-messages.html">
                <svg className="action-list-item-icon icon-messages">
                  <use xlinkHref="#svg-messages"></use>
                </svg>
              </Link>

              <Link className="action-list-item unread" to="hub-profile-notifications.html">
                <svg className="action-list-item-icon icon-notification">
                  <use xlinkHref="#svg-notification"></use>
                </svg>
              </Link>
            </div>

            <Link className="action-item-wrap" to="hub-profile-info.html">
              <div className="action-item dark">
                <svg className="action-item-icon icon-settings">
                  <use xlinkHref="#svg-settings"></use>
                </svg>
              </div>
            </Link>
          </div>
        </aside>
      </>
    )
}
export default Navbar;