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

export const uploadDocument = async (callApi: any, formData: FormData) => {
  return await callApi({
    url: JOBTRACKER_URLS.UPLOAD_DOCUMENT,
    method: "POST",
    body: formData,
    includeAuth: true,
  });
};

export const fetchDocuments = async (callApi: any) => {
  return await callApi({
    url: JOBTRACKER_URLS.GET_DOCUMENTS,
    method: "GET",
    includeAuth: true,
  });
};