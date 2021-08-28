import { useState } from 'react';
import { useStateValue } from '../../index';
import httpRequest from '../../../Components/Common/HttpRequests';

const LIST_USER = 'userlist/LIST_USER';

const useUsers = () => {
  const [{ userlist }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const request = async () => {
    setIsLoading(true);

    const response = await httpRequest.getUserList();

    if (response) {
      dispatch({
        type: LIST_USER,
        payload: response,
      });
    } else {
      const err = [];
      dispatch({
        type: LIST_USER,
        payload: err,
      });
    }
    setIsLoading(false);
  };

  return [userlist, isLoading, request];
};

export default useUsers;