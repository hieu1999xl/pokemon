import axios, { AxiosError } from 'axios';
import {v4 as uuidv4} from 'uuid';
import { HEADER_TRACE_KEY } from '../helpers/constants';
import { TError } from '../types';

/**
 * Global setup axios: baseURL, request interceptors, response interceptors
 */
export const setupAxios = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_HOST;
  axios.interceptors.request.use(async function (config: any) {
    const uuid = uuidv4();
    config.headers = { ...config.headers, [HEADER_TRACE_KEY]: uuid };
    if (config.url) {
    }

    return config;
  });

  //to allow handle error globally, 3 types of errors: 1. string 2. Error object 3. AxiosError
  axios.interceptors.response.use(undefined, function (error: any) {
    let errorResp: Error;
    if (error.isAxiosError) {
      // error threw by axios
      errorResp = getAxiosError(error);
    } else {
      // error threw by manual
      errorResp = getOtherError(error);
    }
    //handle 403 error, means access denied, then go to home page
    if (errorResp.status === 403) {
    }
    return Promise.reject(errorResp);
  });
};

type Error = Partial<TError>;

const getOtherError = (error: any): Error => {
  const path = window.location.pathname;
  if (typeof error === 'string') {
    return { message: error, path };
  } else if (!error.message) {
    console.error(error);
    return { message: ERROR_GENERAL, path };
  } else {
    console.error(error);
    return error as Error;
  }
};

const getAxiosError = (error: AxiosError<Error>): Error => {
  let message: string | undefined;
  if (error.code === AxiosError.ERR_NETWORK) {
    message = ERROR_NETWORK;
  } else if (error.code === AxiosError.ETIMEDOUT || error.response?.status === 504) {
    message = ERROR_TIMEOUT;
  } else if (error.response) {
    message = error.response.data?.message ? error.response.data.message : ERROR_GENERAL;
    // overwrite messages for specific status code
    switch (error.response.status) {
      case 401:
        message = 'You are not authorized to access this resource!';
        break;
      case 403:
        message = "You don't have permission to access the resource!";
        break;
      case 404:
        message = 'The requested resource does not exist or has been deleted!';
        break;
      case 500:
        // Show user friendly message instead of "Internal Server Error"
        message = ERROR_GENERAL;
        break;
      default:
      // do nothing
    }
  } else if (!error.request) {
    // Something happened in setting up the request that triggered an Error
    message = ERROR_CLIENT;
  }
  return {
    code: error.code,
    status: error.response?.status,
    error: error.response?.data?.error,
    message,
    path: error.config?.url,
    validation: error.response?.data?.validation,
    traceId: error.config?.headers?.[HEADER_TRACE_KEY]?.toString(),
    traceError: error.response?.data?.message,
    timestamp: error.response?.data?.timestamp || new Date(),
  };
};

const ERROR_GENERAL = 'Something went wrong and request was not completed!';
const ERROR_NETWORK = 'Network error, please check your network connectivity and try again.';
const ERROR_TIMEOUT =
  'Looks like the server is taking too long to respond, system is still processing your request in the backend, please check the result in a while or try again later.';
const ERROR_CLIENT = 'Client error found, not able to create the http request, please refresh and try again';
