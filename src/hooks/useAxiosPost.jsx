import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosPost = (url, body = undefined) => {
  const [response, setResponse] = useState(null);
  useEffect(() => {
    axios
      .post(url, body)
      .then((resFromServer) => {
        setResponse(resFromServer.data);
      })
      .catch((err) => {
        //error
      });
  }, [url, body]);
  return response;
};

export default useAxiosPost;
