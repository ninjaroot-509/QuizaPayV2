import { useState } from 'react';
import { useStateValue } from '../../index';
import httpRequest from '../../../Components/Common/HttpRequests';

const SET_WALLET = 'wallet/SET_WALLET';

const useWallets = () => {
  const [{ wallet }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const request = async () => {
    setIsLoading(true);

    const response = await httpRequest.getWallet();

    if (response) {
      dispatch({
        type: SET_WALLET,
        payload: response,
      });
    } else {
      const err = [];
      dispatch({
        type: SET_WALLET,
        payload: err,
      });
    }
    setIsLoading(false);
  };

  return [wallet, isLoading, request];
};

export default useWallets;