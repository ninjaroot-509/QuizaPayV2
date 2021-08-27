import { useState } from 'react';
import { useStateValue } from '../../index';
import httpRequest from '../../../Components/Common/HttpRequests';

const LIST_FRIENDREQUEST = 'friendrequest/LIST_FRIENDREQUEST';

const useFriendRequests = () => {
  const [{ friendrequest }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const request = async () => {
    setIsLoading(true);

    const response = await httpRequest.getFriendRequest();

    if (response) {
      dispatch({
        type: LIST_FRIENDREQUEST,
        payload: response,
      });
    } else {
      const err = [];
      dispatch({
        type: LIST_FRIENDREQUEST,
        payload: err,
      });
    }
    setIsLoading(false);
  };

  return [friendrequest, isLoading, request];
};

export default useFriendRequests;