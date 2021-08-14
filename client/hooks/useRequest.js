import { useState } from "react";
import Router from "next/router";
import axios from "axios";

const useRequest = ({ url, method, body, onSuccess = null }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        console.log("about to onSuccess");
        onSuccess(response?.data);
      }
    } catch (err) {
      err?.response?.data?.errors &&
        setErrors(
          <div className="alert alert-danger">
            <h4>Oooops....</h4>
            <ul className="my-0">
              {err?.response?.data?.errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
