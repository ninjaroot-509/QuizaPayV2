import { useState } from 'react';
import { useStateValue } from '../../index';
import httpRequest from '../../../Components/Common/HttpRequests';

const LIST_PRODUIT = 'produit/LIST_PRODUIT';

const useProduits = () => {
  const [{ produit }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const request = async () => {
    setIsLoading(true);

    const response = await httpRequest.getProduit();

    if (response) {
      dispatch({
        type: LIST_PRODUIT,
        payload: response,
      });
    } else {
      const err = [];
      dispatch({
        type: LIST_PRODUIT,
        payload: err,
      });
    }
    setIsLoading(false);
  };

  return [produit, isLoading, request];
};

export default useProduits;