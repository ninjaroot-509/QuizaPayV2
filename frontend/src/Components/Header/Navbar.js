import React, { useState, useEffect, useRef } from 'react'
import { getToken, getUser, removeUserSession } from '../Common/Auth/Sessions';
import { Link } from 'react-router-dom'
import request from '../Common/HttpRequests'
import Toggle from '../../themes/Toggle'
import useWallets from '../../state/wallet/hooks/useWallets';
import ProgressBar from "@ramonak/react-progress-bar";
import useLevels from '../../state/level/hooks/useLevels';
import useFriendRequests from '../../state/friendrequest/hooks/useFriendRequests';
import useFriends from '../../state/friend/hooks/useFriends';
import useUsers from '../../state/userlist/hooks/useUsers';
import moment from 'moment';

const Navbar = ({theme, toggleTheme}) => {
  const refbasket = useRef()
  const refmenu = useRef()
  const reffriendrequest = useRef()
  const refchat = useRef()
  const refnotifi = useRef()
  const refsearch = useRef()
  const [level, isLoadinglevel, setLevels] = useLevels();
    const [wallet, isLoading, setWallets] = useWallets();
    const [friendrequestlist, isLoadingfr, setFriendRequests] = useFriendRequests();
    const [friend, isLoadingf, setFriends] = useFriends();
    const [userlist, isLoadingU, setUserLists] = useUsers();
    const [menu, setMenu] = useState('')
    const [search, setSearch] = useState('')
    const [basket, setBasket] = useState('')
    const [chat, setChat] = useState('')
    const [friendrequest, setFriendRequest] = useState('')
    const [notifi, setNotifi] = useState('')

    const lowercasedFilter = search.toLowerCase();
    const filteredData = userlist?.list?.filter(item => {
      // return Object.keys(item).some(key =>
      //   item[key].toLowerCase().search(lowercasedFilter)
      // );
      return item.first_name.toLowerCase().search(lowercasedFilter)
    });
    const [temp, setTemp] = useState(0)

    useEffect(()=>{
        setInterval(()=>{
            setTemp((prevTemp)=>prevTemp+1)
        }, 9000)
    }, [])

    const handleMenu = () => {
      if (menu === 'active') {
          setMenu('')
      } else {
          setMenu('active')
      }
  };

  const handleSearch = event => {
    setSearch(event.target.value);
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

const toggleFR = () => {
    if (friendrequest === 'active') {
        setFriendRequest('')
    } else {
        setFriendRequest('active')
    }
};

const toggleNotifi = () => {
    if (notifi === 'active') {
        setNotifi('')
    } else {
        setNotifi('active')
    }
};

  const handleClickOutside = (env) => {
    if (basket == 'active' && refbasket.current && !refbasket.current.contains(env.target)) {
      setBasket('')
    }
    if (menu == 'active' && refmenu.current && !refmenu.current.contains(env.target)) {
      setMenu('')
    }
    if (search == 'active' && refsearch.current && !refsearch.current.contains(env.target)) {
      setSearch('')
    }
    if (chat == 'active' && refchat.current && !refchat.current.contains(env.target)) {
      setChat('')
    }
    if (friendrequest == 'active' && reffriendrequest.current && !reffriendrequest.current.contains(env.target)) {
      setFriendRequest('')
    }
    if (notifi == 'active' && refnotifi.current && !refnotifi.current.contains(env.target)) {
      setNotifi('')
    }
  }

  const handlelogout = () => {
    removeUserSession()
    window.location.reload()
  }

  const acceptFriend = (id) => {
        request.postAcceptFriend(id).then(res => {
            setTimeout(() => {
              setFriendRequests()
              setFriends()
            }, 100);
        })
  }

  const addFriend = (id) => {
      request.postAddFriend(id).then(res => {
          setTimeout(() => {
            setUserLists()
          }, 100);
      })
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menu, basket, chat, notifi, friendrequest, search]);

    useEffect(() => {
      if (!wallet.details || wallet.details.length === 0) {
        setWallets();
      }
    }, [wallet, setWallets]);

    useEffect(() => {
      if (!level.details || level.details.length === 0) {
        setLevels();
      }
    }, [level, setLevels]);

    useEffect(() => {
      if (!friendrequestlist.list || friendrequestlist.list.length === 0) {
        setFriendRequests();
      }
    }, [temp]);

    useEffect(() => {
      if (!friend.list || friend.list.length === 0) {
        setFriends();
      }
    }, [temp]);

    useEffect(() => {
      if (!userlist.list || userlist.list.length === 0) {
        setUserLists();
      }
    }, [temp]);

    const user = getUser()


    return (
      <>
        <nav id="navigation-widget-small" ref={refmenu} className={`navigation-widget navigation-widget-desktop ${menu === 'active'? '': 'closed'} sidebar left ${menu === 'active'? 'hidden': 'delayed'}`}>
          <Link className="user-avatar small no-outline online" to="#">
          <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src={'http://localhost:8000' + user.photo} style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
          </Link>

          <ul className="menu small">

            <li className="menu-item active">
              <Link className="menu-item-link text-tooltip-tfr" to="/" data-title="Overview" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-overview">
                  <use xlinkHref="#svg-overview"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -81, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Tableau de bord</p></div></Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link text-tooltip-tfr" to="/amis" data-title="Groups" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-group">
                  <use xlinkHref="#svg-group"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -71, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Mes amis</p></div></Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link text-tooltip-tfr" to="/membres" data-title="Members" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-members">
                  <use xlinkHref="#svg-members"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -81, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Membres</p></div></Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link text-tooltip-tfr" to="/badges" data-title="Badges" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-badges">
                  <use xlinkHref="#svg-badges"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -71, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Badges</p></div></Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link text-tooltip-tfr" to="/quetes" data-title="Quests" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-quests">
                  <use xlinkHref="#svg-quests"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -69, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Quêtes</p></div></Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link text-tooltip-tfr" to="/forums" data-title="Forums" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-forums">
                  <use xlinkHref="#svg-forums"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -72, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Forums</p></div></Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link text-tooltip-tfr" to="/marketplace" data-title="Marketplace" style={{position: 'relative'}}>
                <svg className="menu-item-link-icon icon-marketplace">
                  <use xlinkHref="#svg-marketplace"></use>
                </svg>
              <div className="xm-tooltip" style={{whiteSpace: 'nowrap', position: 'absolute', zIndex: 99999, right: -97, top: '50%', marginTop: -12, opacity: 0, visibility: 'hidden', transform: 'translate(10px, 0px)', transition: 'all 0.3s ease-in-out 0s'}}><p className="xm-tooltip-text">Marketplace</p></div></Link>
            </li>
          </ul>
        </nav>

        <nav id="navigation-widget-mobile" ref={refmenu} className={`navigation-widget navigation-widget-mobile sidebar left ${menu === 'active'? '': 'hidden'}`} data-simplebar="init" style={{height: 674}}><div className="simplebar-wrapper" style={{margin: '0px 0px -40px'}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div><div className="simplebar-mask"><div className="simplebar-offset" style={{right: 0, bottom: 0}}><div className="simplebar-content-wrapper" style={{height: '100%', overflow: 'hidden scroll'}}><div className="simplebar-content" style={{padding: '0px 0px 40px'}}>
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
                              <img src={'http://localhost:8000' + user.photo} style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
              </Link>

              <p className="navigation-widget-info-title"><Link to="#">{user.first_name} {user.last_name}</Link></p>

              <p className="navigation-widget-info-text">
              <ProgressBar height={15} width={90} bgColor="#FF864D" completed={level?.details?.progression} />
              </p>
            </div>

            <p className="navigation-widget-info-button button small secondary" onClick={handlelogout}>Deconnecter</p>
          </div>

          <p className="navigation-widget-section-title">Sections</p>

          <ul className="menu">

            <li className="menu-item active">
              <Link className="menu-item-link" to="/">
                <svg className="menu-item-link-icon icon-overview">
                  <use xlinkHref="#svg-overview"></use>
                </svg>
                Tableau de bord
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="/amis">
                <svg className="menu-item-link-icon icon-group">
                  <use xlinkHref="#svg-group"></use>
                </svg>
                Mes amis
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="/membres">
                <svg className="menu-item-link-icon icon-members">
                  <use xlinkHref="#svg-members"></use>
                </svg>
                Membres
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="/badges">
                <svg className="menu-item-link-icon icon-badges">
                  <use xlinkHref="#svg-badges"></use>
                </svg>
                Badges
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="/quetes">
                <svg className="menu-item-link-icon icon-quests">
                  <use xlinkHref="#svg-quests"></use>
                </svg>
                Quêtes
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="/forums">
                <svg className="menu-item-link-icon icon-forums">
                  <use xlinkHref="#svg-forums"></use>
                </svg>
                Forums
              </Link>
            </li>

            <li className="menu-item">
              <Link className="menu-item-link" to="/marketplace">
                <svg className="menu-item-link-icon icon-marketplace">
                  <use xlinkHref="#svg-marketplace"></use>
                </svg>
                Marketplace
              </Link>
            </li>
          </ul>

          <p className="navigation-widget-section-title">Mon profile</p>

          <Link className="navigation-widget-section-link" to="#">Profile Info</Link>

          <Link className="navigation-widget-section-link" to="#">Notifications</Link>

          <Link className="navigation-widget-section-link" to="#">Messages</Link>

          <Link className="navigation-widget-section-link" to="#">Demandes d'ami</Link>

          <p className="navigation-widget-section-title">Compte</p>

          <Link className="navigation-widget-section-link" to="#">Informations du compte</Link>

          <Link className="navigation-widget-section-link" to="#">Changer le mot de passe</Link>

          <Link className="navigation-widget-section-link" to="#">réglages généraux</Link>


          <p className="navigation-widget-section-title">Liens principaux</p>

          <Link className="navigation-widget-section-link" to="/">Accueil</Link>

          <Link className="navigation-widget-section-link" to="#">Faqs</Link>

          <Link className="navigation-widget-section-link" to="#">À propos de nous</Link>

          <Link className="navigation-widget-section-link" to="#">Notre blog</Link>

          <Link className="navigation-widget-section-link" to="#">Nous contacter</Link>

          <Link className="navigation-widget-section-link" to="#">Politique de confidentialité</Link>
        </div></div></div></div><div className="simplebar-placeholder" style={{width: 'auto', height: 1976}}></div></div><div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}><div className="simplebar-scrollbar" style={{width: 0, transform: 'translate3d(0px, 0px, 0px)',display: 'none'}}></div></div><div className="simplebar-track simplebar-vertical" style={{visibility: 'visible'}}><div className="simplebar-scrollbar" style={{height: 229, transform: 'translate3d(0px, 0px, 0px)', display: 'block'}}></div></div></nav>

        <aside id="chat-widget-messages" ref={refchat} className={`chat-widget ${chat === 'active'? '': 'closed'} sidebar right`}>
          <div className="chat-widget-messages" data-simplebar="init" style={{height: chat === 'active'? 427 : 514}}><div className="simplebar-wrapper" style={{margin: 0}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div><div className="simplebar-mask"><div className="simplebar-offset" style={{right: 0, bottom: 0}}><div className="simplebar-content-wrapper" style={{height: '100%', overflow: 'hidden scroll'}}><div className="simplebar-content" style={{padding: 0}}>
            {friend?.list?.map((item)=>
              <div key={item.id} className="chat-widget-message">
                <div className="user-status">
                  <div className="user-status-avatar">
                    <div className="user-avatar small no-outline online">
                        <div className="user-avatar-content">
                              <div style={{display: 'flex',justifyContent: 'center'}}>
                                <img src={'http://localhost:8000' + item.photo} style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                                </div>
                            </div>
                    </div>
                  </div>
              
                  <p className="user-status-title"><span className="bold">{item.first_name} {item.last_name}</span></p>
              
                  <p className="user-status-text small">Cliquez pour voir son profil</p>
              
                  <p className="user-status-timestamp floaty">level {item.level}</p>
                </div>
              </div>
            )}

          </div></div></div></div><div className="simplebar-placeholder" style={{width: 'auto', height: menu === 'active'? 792 : 735}}></div></div><div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}><div className="simplebar-scrollbar" style={{width: 0, display: 'none'}}></div></div><div className="simplebar-track simplebar-vertical" style={{visibility: 'visible'}}><div className="simplebar-scrollbar" style={{height: 359, transform: 'translate3d(0px, 0px, 0px)', display: 'block'}}></div></div></div>

          <form className="chat-widget-form">
            <div className="interactive-input small">
              <input type="text" id="chat-widget-search" name="chat_widget_search" placeholder="Rechercher dans la liste..."/>
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
                              <img src={process.env.PUBLIC_URL + '/static/assets/img/avatar/04.jpg'} style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
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
                    <img src={process.env.PUBLIC_URL + '/static/assets/img/avatar/03.jpg'} style={{width: 24, height: 26, position: 'relative'}}/>
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
                    <img src={process.env.PUBLIC_URL + '/static/assets/img/avatar/03.jpg'} style={{width: 24, height: 26, position: 'relative'}}/>
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
                    <span style={{fontFamily: 'fantasy',fontSize: 14,color: '#005'}}>{Math.round(wallet?.details?.montant)}HTG</span>
                <Link to="/depot/moncash" style={{position: 'absolute'}}>
                  <div style={{padding: '1px 5px',borderRadius: 20,background: '#ff8612'}}>
                    <span style={{color: 'white'}}>+</span>
                  </div>
                </Link>
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
                  <Link className="menu-main-item-link" to="/">Accueil</Link>
                </li>

                {/* <li className="menu-main-item">
                  <Link className="menu-main-item-link" to="#">Carrières</Link>
                </li> */}

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
                      <Link className="menu-main-item-link" to="#">À propos de nous</Link>
                    </li>

                    <li className="menu-main-item">
                      <Link className="menu-main-item-link" to="#">Notre blog</Link>
                    </li>

                    <li className="menu-main-item">
                      <Link className="menu-main-item-link" to="#">Nous contacter</Link>
                    </li>

                    <li className="menu-main-item">
                      <Link className="menu-main-item-link" to="#">Politique de confidentialité</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header-actions search-bar" style={{position: 'relative'}}>
            <div className={`interactive-input dark ${search !== ''? 'active': ''}`}>
              <input ref={refsearch} type="text" id="search-main" name="search" value={search} onChange={handleSearch} placeholder="Rechercher vos amis ici!"/>
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

            <div className="dropdown-box padding-bottom-small header-search-dropdown" style={{position: 'absolute', zIndex: 9999, top: 57, left: 0, opacity: 1, visibility: search !== ''? 'visible': 'hidden', transform: 'translate(0px, 0px)', transition: 'transform 0.4s ease-in-out 0s, opacity 0.4s ease-in-out 0s, visibility 0.4s ease-in-out 0s'}}>
              <div className="dropdown-box-category">
                <p className="dropdown-box-category-title">Membres</p>
              </div>
          
              <div className="dropdown-box-list small no-scroll">
                {filteredData?.map((item)=> 
                  <Link key={item.id} className="dropdown-box-list-item" to="#">
                    <div className="user-status notification">
                      <div className="user-status-avatar">
                        <div className="user-avatar small no-outline">
                        <div className="user-avatar-content">
                              <div style={{display: 'flex',justifyContent: 'center'}}>
                                <img src={'http://localhost:8000' + item.photo} style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                                </div>
                            </div>
                        </div>
                      </div>
                  
                      <p className="user-status-title"><span className="bold">{item.first_name} {item.last_name}</span></p>
                  
                      <p className="user-status-text">{moment(item.date_joined).calendar()}</p>
                  
                      <div className="user-status-icon" onClick={() => addFriend(item.id)}>
                        <svg className="action-request-icon icon-add-friend">
                          <use xlinkHref="#svg-add-friend"></use>
                        </svg>
                      </div>
                    </div>
                  </Link>
                )}

              </div>
              
            </div>
          </div>

          <div className="header-actions">
            <div className="progress-stat">
              <div className="bar-progress-wrap">
                <p className="bar-progress-info">Prochaine: <span className="bar-progress-text">50<span className="bar-progress-unit">Exp</span></span></p>
              </div>
          
              <div id="logged-user-level" className="progress-stat-bar" style={{width: 110, height: 4, position: 'relative'}}>
              <ProgressBar height={15} bgColor="#FF864D" completed={level?.details?.progression} />
                </div>
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

                <div className="dropdown-box no-padding-bottom header-dropdown" ref={refbasket} style={{position: 'absolute', zIndex: 9999, top: 64, right: 6, visibility: basket === 'active'? 'visible' : 'hidden', transform: 'translate(0px, 0px)', transition: 'transform 0.4s ease-in-out 0s, opacity 0.4s ease-in-out 0s, visibility 0.4s ease-in-out 0s'}}>
                  <div className="dropdown-box-header">
                    <p className="dropdown-box-header-title">Panier <span className="highlighted">1</span></p>
                  </div>
              
                  <div className="dropdown-box-list scroll-small no-hover" data-simplebar="init"><div className="simplebar-wrapper" style={{margin: 0}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div><div className="simplebar-mask"><div className="simplebar-offset" style={{right: 0, bottom: 0}}><div className="simplebar-content-wrapper" style={{height: '100%', overflow: 'hidden scroll'}}><div className="simplebar-content" style={{padding: 0}}>
              
                    <div className="dropdown-box-list-item">
                      <div className="cart-item-preview">
                        <Link className="cart-item-preview-image" to="#">
                          <figure className="picture medium round liquid" style={{background: 'url("/logo.png") center center / cover no-repeat'}}>
                            <img src="/logo.png" alt="item-11" style={{display: 'none'}}/>
                          </figure>
                        </Link>
                    
                        <p className="cart-item-preview-title"><Link to="#">QuizaPay Pro</Link></p>
                    
                        <p className="cart-item-preview-text">Version VIP</p>
                    
                        <p className="cart-item-preview-price"><span className="highlighted">$</span> 6.00 x 1</p>
                    
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
                      <Link className="button secondary" to="#">Panier d'achat</Link>
                    </div>
              
                    <div className="dropdown-box-action">
                      <Link className="button primary" to="#">Aller à la caisse</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="action-list-item-wrap" style={{position: 'relative'}}>
                <div className={`action-list-item header-dropdown-trigger ${friendrequest === 'active'? 'active': ''}`} onClick={toggleFR}>
                  <svg className="action-list-item-icon icon-friend">
                    <use xlinkHref="#svg-friend"></use>
                  </svg>
                </div>

                <div className="dropdown-box header-dropdown" ref={reffriendrequest} style={{position: 'absolute', zIndex: 9999, top: 64, right: 6, opacity: 1, visibility: friendrequest === 'active'? 'visible': 'hidden', transform: 'translate(0px, 0px)', transition: 'transform 0.4s ease-in-out 0s, opacity 0.4s ease-in-out 0s, visibility 0.4s ease-in-out 0s'}}>
                  <div className="dropdown-box-header">
                    <p className="dropdown-box-header-title">Demandes d'ami</p>
              
                    <div className="dropdown-box-header-actions">
                      <p className="dropdown-box-header-action">Retrouver des amis</p>
                      
                      <p className="dropdown-box-header-action">Paramètres</p>
                    </div>
                  </div>
              
                  <div className="dropdown-box-list no-hover" data-simplebar="init"><div className="simplebar-wrapper" style={{margin: 0}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div><div className="simplebar-mask"><div className="simplebar-offset" style={{right: 0, bottom: 0}}><div className="simplebar-content-wrapper" style={{height: '100%', overflow: 'hidden'}}><div className="simplebar-content" style={{padding: 0}}>
                    {friendrequestlist?.list?.map((item)=>
                      <div className="dropdown-box-list-item" key={item.id}>
                        <div className="user-status request">
                          
                          <Link className="user-status-avatar" to="#">
                            <div className="user-avatar-content">
                              <div style={{display: 'flex',justifyContent: 'center'}}>
                                <img src={'http://localhost:8000' + user.photo} style={{width: 40,borderRadius: 10}}/>
                                </div>
                            </div>
        
                          </Link>
                      
                          <p className="user-status-title"><Link className="bold" to="#">{item.from_user_first_name} {item.from_user_last_name}</Link></p>
                      
                          <p className="user-status-text">{moment(item.timestamp).calendar()}</p>
                      
                          <div className="action-request-list">
                            <div className="action-request accept" onClick={() => acceptFriend(item.from_user)}>
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
                    )}
              
                  </div></div></div></div><div className="simplebar-placeholder" style={{width: 'auto', height: 228}}></div></div><div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}><div className="simplebar-scrollbar" style={{width: 0, display: 'none'}}></div></div><div className="simplebar-track simplebar-vertical" style={{visibility: 'hidden'}}><div className="simplebar-scrollbar" style={{height: 0, display: 'none'}}></div></div></div>
              
                  <Link className="dropdown-box-button secondary" to="#">View all Requests</Link>
                </div>
              </div>

              <div className="action-list-item-wrap" style={{position: 'relative'}}>
                <Link to="#messages" className="action-list-item header-dropdown-trigger">
                  <svg className="action-list-item-icon icon-messages">
                    <use xlinkHref="#svg-messages"></use>
                  </svg>
                </Link>
              </div>

              <div className="action-list-item-wrap" style={{position: 'relative'}}>
                <div className="action-list-item unread header-dropdown-trigger"  onClick={toggleNotifi}>
                  <svg className={`action-list-item-icon icon-notification ${notifi == 'active'? 'active': ''}`}>
                    <use xlinkHref="#svg-notification"></use>
                  </svg>
                </div>

                <div className="dropdown-box header-dropdown" ref={refnotifi} style={{position: 'absolute', zIndex: 9999, top: 64, right: 6, opacity: 1, visibility: notifi == 'active'? 'visible':'hidden', transform: 'translate(0px, 0px)', transition: 'transform 0.4s ease-in-out 0s, opacity 0.4s ease-in-out 0s, visibility 0.4s ease-in-out 0s'}}>
                  <div className="dropdown-box-header">
                    <p className="dropdown-box-header-title">Notifications</p>
              
                    <div className="dropdown-box-header-actions">
                      <p className="dropdown-box-header-action">Tout marquer comme lu</p>
                      
                      <p className="dropdown-box-header-action">Paramètres</p>
                    </div>
                  </div>
              
                  <div className="dropdown-box-list" data-simplebar="init"><div className="simplebar-wrapper" style={{margin: 0}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div><div className="simplebar-mask"><div className="simplebar-offset" style={{right: 0, bottom: 0}}><div className="simplebar-content-wrapper" style={{height: '100%', overflow: 'hidden scroll'}}><div className="simplebar-content" style={{padding: 0}}>
              
                    <div className="dropdown-box-list-item">
                      <div className="user-status notification">
                        <Link className="user-status-avatar" to="#">
                          <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                              <img src="/logo.png" style={{width: 40}}/>
                              </div>
                          </div>
      
                          </div>
                        </Link>
              
                        <p className="user-status-title"><Link className="bold" to="#">QuizaPay</Link> vous a laissé une coeur <img className="reaction" src={process.env.PUBLIC_URL + '/static/assets/img/reaction/love.png'} alt="reaction-love"/> Bienvenue parmi nous <Link className="highlighted" to="#">{user.first_name}</Link></p>
              
                        <p className="user-status-timestamp">{moment(user.date_joined).calendar()}</p>
              
                      </div>
                    </div>
              
                  </div></div></div></div><div className="simplebar-placeholder" style={{width: 'auto', height: 481}}></div></div><div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}><div className="simplebar-scrollbar" style={{width: 0, display: 'none'}}></div></div><div className="simplebar-track simplebar-vertical" style={{visibility: 'visible'}}><div className="simplebar-scrollbar" style={{height: 366, transform: 'translate3d(0px, 0px, 0px)', display: 'block'}}></div></div></div>
              
                  <Link className="dropdown-box-button secondary" to="#">View all Notifications</Link>
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
                              <img src={'http://localhost:8000' + user.photo} style={{width: 40,border: '2px solid #143fff',borderRadius: 10}}/>
                              </div>
                          </div>
                      </div>
                    </Link>
                
                    <p className="user-status-title"><span className="bold">Hi {user.first_name}!</span></p>
                
                    {/* <p className="user-status-text small"><Link to="#">@user</Link></p> */}
                  </div>
                </div>
            
                <p className="dropdown-navigation-category">Mon Profile</p>
            
                <Link className="dropdown-navigation-link" to="#">Profile Info</Link>
                        
                <Link className="dropdown-navigation-link" to="#">Notifications</Link>
            
                <Link className="dropdown-navigation-link" to="#">Messages</Link>
            
                <Link className="dropdown-navigation-link" to="#">Friend Requests</Link>
            
                <p className="dropdown-navigation-category">Account</p>
            
                <Link className="dropdown-navigation-link" to="#">Account Info</Link>
            
                <Link className="dropdown-navigation-link" to="#">Change Password</Link>
            
                <Link className="dropdown-navigation-link" to="#">General Settings</Link>
            
                <p className="dropdown-navigation-button button small secondary" onClick={handlelogout}>Deconnecter</p>
              </div>
            </div>
          </div>
        </header>

        <aside className="floaty-bar">
          <div className="bar-actions">
          <div className="progress-stat">
              <div className="bar-progress-wrap">
                <p className="bar-progress-info">Prochaine: <span className="bar-progress-text">50<span className="bar-progress-unit">Exp</span></span></p>
              </div>
          
              <div id="logged-user-level" className="progress-stat-bar" style={{width: 110, height: 4, position: 'relative'}}>
              <ProgressBar height={15} bgColor="#FF864D" completed={level?.details?.progression} />
                </div>
            </div>
          </div>

          <div className="bar-actions">
            <div className="action-list dark">
              <Link className="action-list-item" to="#">
                <svg className="action-list-item-icon icon-shopping-bag">
                  <use xlinkHref="#svg-shopping-bag"></use>
                </svg>
              </Link>

              <Link className="action-list-item" to="#">
                <svg className="action-list-item-icon icon-friend">
                  <use xlinkHref="#svg-friend"></use>
                </svg>
              </Link>

              <Link className="action-list-item" to="/etape-1">
                <svg className="action-list-item-icon icon-play">
                  <use xlinkHref="#svg-play"></use>
                </svg>
              </Link>

              <Link className="action-list-item unread" to="#">
                <svg className="action-list-item-icon icon-notification">
                  <use xlinkHref="#svg-notification"></use>
                </svg>
              </Link>
            </div>

            <Link className="action-item-wrap" to="#">
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