import coinReducer from './coin/reducers';
import walletReducer from './wallet/reducers';
import friendReducer from './friend/reducers';
import friendrequestReducer from './friendrequest/reducers';
import badgeReducer from './badge/reducers';
import questReducer from './quest/reducers';
import resultatReducer from './resultat/reducers';
import userlistReducer from './userlist/reducers';
import levelReducer from './level/reducers';
import princingReducer from './princing/reducers';

export default ({ level, coin, wallet, friend, friendrequest, badge, quest, resultat, userlist, princing }, action) => ({
  coin: coinReducer(coin, action),
  wallet: walletReducer(wallet, action),
  friend: friendReducer(friend, action),
  friendrequest: friendrequestReducer(friendrequest, action),
  badge: badgeReducer(badge, action),
  quest: questReducer(quest, action),
  resultat: resultatReducer(resultat, action),
  userlist: userlistReducer(userlist, action),
  level: levelReducer(level, action),
  princing: princingReducer(princing, action),
});
