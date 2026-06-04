import axios from "axios";

export const getCallParams = (
  method: string,
  body: any = null,
  includeAuth: boolean = true,
  token?: string
) => {
  const isFormData = body instanceof FormData;

  const params: any = {
    method,
    headers: {} as Record<string, string>,
  };

  if (!isFormData) {
    params.headers["Content-Type"] = "application/json";
  }

  if (["POST", "PUT", "PATCH", "DELETE"].includes(method) && body) {
    params.body = isFormData ? body : JSON.stringify(body);
  }

  if (includeAuth) {
    if (!token) {
      throw new Error("Auth token missing");
    }
    params.headers.Authorization = `Bearer ${token}`;
  }

  return params;
};

export const makeCall = async (
  url: string,
  params: any,
  showToast: boolean = true,
  timeout: number = 10000,
  dispatch?: any
) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  params.signal = controller.signal;

  try {
    const response = await fetch(url, params);
    clearTimeout(timer);

    let json: any = {};
    try {
      json = await response.json();
    } catch {
      json = { success: false, message: "Invalid server response" };
    }

    if (response.status === 401 || json?.responseCode === 401) {
      try {
        dispatch?.({ type: "LOG_OUT" });
      } catch (e) {
        console.warn("Logout failed", e);
      }
      window.location.href = "/login";
      return null;
    }

    if (json?.success === false) {
      if (showToast) {
        let message = json.errMessage || json.message || "Something went wrong";
        if (message.toLowerCase() === "invalid password") {
          message = "Invalid credentials";
        }
        console.error(message);
      }
      return json;
    }

    if (showToast && json?.success === true) {
      console.log(json.message);
    }

    return json;
  } catch (err: any) {
    clearTimeout(timer);

    if (err.name === "AbortError") {
      if (showToast) console.info("Request timeout. Please try again.");
    } else {
      if (showToast) console.info(err.message || "Network error");
    }

    throw err;
  }
};