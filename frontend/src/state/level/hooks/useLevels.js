import { useState } from 'react';
import { useStateValue } from '../../index';
import httpRequest from '../../../Components/Common/HttpRequests';

const SET_LEVEL = 'level/SET_LEVEL';

const useLevels = () => {
  const [{ level }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const request = async () => {
    setIsLoading(true);

    const response = await httpRequest.getLevel();

    if (response) {
      dispatch({
        type: SET_LEVEL,
        payload: response,
      });
    } else {
      const err = [];
      dispatch({
        type: SET_LEVEL,
        payload: err,
      });
    }
    setIsLoading(false);
  };

  return [level, isLoading, request];
};

export default useLevels;