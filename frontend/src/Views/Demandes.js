
import React, { useState, useEffect, useRef } from 'react'
import request from '../Components/Common/HttpRequests'
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
// import OwlCarousel from 'react-owl-carousel';
import useFriendRequests from '../state/friendrequest/hooks/useFriendRequests';
import { getUser } from '../Components/Common/Auth/Sessions';
import moment from 'moment';

const Demandes = () => {
    const [friendrequestlist, isLoadingfr, setFriendRequests] = useFriendRequests();
    const [temp, setTemp] = useState(0)

    useEffect(()=>{
        setInterval(()=>{
            setTemp((prevTemp)=>prevTemp+1)
        }, 9000)
    }, [])

    const acceptFriend = (id) => {
        request.postAcceptFriend(id).then(res => {
            setTimeout(() => {
              setFriendRequests()
            }, 100);
        })
  }


    useEffect(() => {
        if (!friendrequestlist.list || friendrequestlist.list.length === 0) {
          setFriendRequests();
        }
      }, [temp]);

      const user = getUser()

    return (
        <>
            <div className="content-grid">
                <div className="grid grid-3-9" style={{marginTop: 0}}>
                <div className="account-hub-content">
                    <div className="section-header" style={{marginTop: 0}}>
                    <div className="section-header-info">
                        <h2 className="section-title">Demandes d'ami <span className="highlighted">{friendrequestlist?.list?.length}</span></h2>
                    </div>

                    <div className="section-header-actions">
                        <p className="section-header-action">Retrouver des amis</p>
                    </div>
                    </div>

                    <div className="notification-box-list">

                    {friendrequestlist?.list?.map((item)=>
                    <div className="notification-box" key={item.id}>
                        <div className="user-status request">
                        <Link className="user-status-avatar" to="#">
                            <div className="user-avatar-content">
                              <div style={{display: 'flex',justifyContent: 'center'}}>
                                <img src={user.photo} style={{width: 40,borderRadius: 10}}/>
                                </div>
                            </div>
        
                          </Link>

                        <p className="user-status-title"><a className="bold" href="#">{item.from_user_first_name} {item.from_user_last_name}</a></p>

                        <p className="user-status-text small-space">{moment(item.timestamp).calendar()}</p>

                        <div className="action-request-list">
                            <p className="action-request accept with-text" onClick={() => acceptFriend(item.from_user)}>
                            <svg className="action-request-icon icon-add-friend">
                                <use xlinkHref="#svg-add-friend"></use>
                            </svg>

                            <span className="action-request-text">Accepter l'invitation</span>
                            </p>

                            <div className="action-request decline">
                            <svg className="action-request-icon icon-remove-friend">
                                <use xlinkHref="#svg-remove-friend"></use>
                            </svg>
                            </div>
                        </div>
                        </div>
                    </div>
                    )}


                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
export default Demandes;