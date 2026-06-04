import JOBTRACKER_URLS from "../constants/urlConstants";

export const registerUser = async (callApi: any, body: {
  name: string;
  email: string;
  password: string;
}) => {
  return await callApi({
    url: JOBTRACKER_URLS.REGISTER,
    method: "POST",
    body,
    includeAuth: false,
    showToast: false,
  });
};

export const loginUser = async (callApi: any, body: {
  email: string;
  password: string;
}) => {
  return await callApi({
    url: JOBTRACKER_URLS.LOGIN,
    method: "POST",
    body,
    includeAuth: false,
    showToast: false,
  });
};