import { useCallback, useState } from "react";
import { getCallParams, makeCall } from "../services/helper";
import { useAuth } from "../contextApi/AuthContext";

const useApiCall = () => {
  const { token } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const callApi = useCallback(
    async ({
      url,
      method = "GET",
      body = null,
      includeAuth = true,
      showToast = true,
      timeout = 10000,
    }: {
      url: string;
      method?: string;
      body?: any;
      includeAuth?: boolean;
      showToast?: boolean;
      timeout?: number;
    }) => {
      setError(null);

      try {
        const params = getCallParams(
          method,
          body,
          includeAuth,
          includeAuth ? token ?? undefined : undefined
        );

        const result = await makeCall(url, params, showToast, timeout);
        return result;
      } catch (err: any) {
        setError(err?.message || "Unknown error");
        return null;
      }
    },
    [token]
  );

  return { callApi, error };
};

export default useApiCall;