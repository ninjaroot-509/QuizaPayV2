import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StateProvider } from './state';
import { INITIAL_STATE as COIN_INITIAL_STATE } from './state/coin/reducers';
import { INITIAL_STATE as WALLET_INITIAL_STATE } from './state/wallet/reducers';
import { INITIAL_STATE as RESULTAT_INITIAL_STATE } from './state/resultat/reducers';
import { INITIAL_STATE as FRIEND_INITIAL_STATE } from './state/friend/reducers';
import { INITIAL_STATE as FRIENDREQUEST_INITIAL_STATE } from './state/friendrequest/reducers';
import { INITIAL_STATE as BADGE_INITIAL_STATE } from './state/badge/reducers';
import { INITIAL_STATE as USERLIST_INITIAL_STATE } from './state/userlist/reducers';
import { INITIAL_STATE as LEVEL_INITIAL_STATE } from './state/level/reducers';
import reducers from './state/reducers';
import * as serviceWorker from './serviceWorker';

const initialState = {
  coin: COIN_INITIAL_STATE,
  wallet: WALLET_INITIAL_STATE,
  resultat: RESULTAT_INITIAL_STATE,
  friend: FRIEND_INITIAL_STATE,
  friendrequest: FRIENDREQUEST_INITIAL_STATE,
  badge: BADGE_INITIAL_STATE,
  quest: BADGE_INITIAL_STATE,
  userlist: USERLIST_INITIAL_STATE,
  level: LEVEL_INITIAL_STATE,
};

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducers}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
