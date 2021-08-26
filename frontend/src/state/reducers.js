import coinReducer from './coin/reducers';
import walletReducer from './wallet/reducers';
import friendReducer from './friend/reducers';
import friendrequestReducer from './friendrequest/reducers';
import badgeReducer from './badge/reducers';
import questReducer from './quest/reducers';
import resultatReducer from './resultat/reducers';
import userlistReducer from './userlist/reducers';

export default ({ coin, wallet, friend, friendrequest, badge, quest, resultat, userlist }, action) => ({
  coin: coinReducer(coin, action),
  wallet: walletReducer(wallet, action),
  friend: friendReducer(friend, action),
  friendrequest: friendrequestReducer(friendrequest, action),
  badge: badgeReducer(badge, action),
  quest: questReducer(quest, action),
  resultat: resultatReducer(resultat, action),
  userlist: userlistReducer(userlist, action),
});
