import { useState } from 'react';
import { useStateValue } from '../../index';
import httpRequest from '../../../Components/Common/HttpRequests';

const LIST_RESULTAT = 'resultat/LIST_RESULTAT';

const useResultats = () => {
  const [{ resultat }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const request = async () => {
    setIsLoading(true);

    const response = await httpRequest.getResultat();

    if (response) {
      dispatch({
        type: LIST_RESULTAT,
        payload: response,
      });
    } else {
      const err = [];
      dispatch({
        type: LIST_RESULTAT,
        payload: err,
      });
    }
    setIsLoading(false);
  };

  return [resultat, isLoading, request];
};

export default useResultats;