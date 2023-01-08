import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosGet = (url, qparams = undefined) => {
  const [response, setResponse] = useState(null);
  useEffect(() => {
    let qparamsString = "";
    if (
      typeof qparams === "object" &&
      qparams !== null &&
      !Array.isArray(qparams)
    ) {
      const keyFromQparams = Object.keys(qparams);
      if (keyFromQparams.length > 0) {
        qparamsString =
          "?" + keyFromQparams.map((key) => `${key}=${qparams[key]}`).join("&");
      }
    }
    axios
      .get(url + qparamsString)
      .then((resFromServer) => {
        setResponse(resFromServer.data);
      })
      .catch((err) => {
        //error
      });
  }, [url, qparams]);
  return response;
};

export default useAxiosGet;

// let dataToServer = {
//     a:1,b:234523, c:34234
// }
// http://localhost:3000/test?a=1&b=234523&c=34234
