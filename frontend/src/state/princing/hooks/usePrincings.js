import { useState } from 'react';
import { useStateValue } from '../../index';
import httpRequest from '../../../Components/Common/HttpRequests';

const LIST_PRINCING = 'princing/LIST_PRINCING';

const useUsers = () => {
  const [{ princing }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const request = async () => {
    setIsLoading(true);

    const response = await httpRequest.getPrincing();

    if (response) {
      dispatch({
        type: LIST_PRINCING,
        payload: response,
      });
    } else {
      const err = [];
      dispatch({
        type: LIST_PRINCING,
        payload: err,
      });
    }
    setIsLoading(false);
  };

  return [princing, isLoading, request];
};

export default useUsers;