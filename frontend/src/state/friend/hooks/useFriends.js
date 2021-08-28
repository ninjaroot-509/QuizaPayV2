import { useState } from 'react';
import { useStateValue } from '../../index';
import httpRequest from '../../../Components/Common/HttpRequests';

const LIST_FRIEND = 'friend/LIST_FRIEND';

const useFriends = () => {
  const [{ friend }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const request = async () => {
    setIsLoading(true);

    const response = await httpRequest.getFriendList();

    if (response) {
      dispatch({
        type: LIST_FRIEND,
        payload: response,
      });
    } else {
      const err = [];
      dispatch({
        type: LIST_FRIEND,
        payload: err,
      });
    }
    setIsLoading(false);
  };

  return [friend, isLoading, request];
};

export default useFriends;