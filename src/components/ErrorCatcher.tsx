import { useEffect } from "react";
import api from "../server/routers/api";

const ErrorCatcher = ({ children }) => {
  useEffect(() => {
    window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
      api.public.error({
        errorMsg,
        url,
        lineNumber,
      });
      return false;
    };
  }, []);
  return children;
};

export default ErrorCatcher;
