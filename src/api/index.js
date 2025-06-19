import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const createBaseQueryWithReauth = (baseUrl) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    
    let result = await rawBaseQuery(args, api, extraOptions);

    // Token expired, try refresh
    if (result.error && result.error.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("currUser");
            return result;
          }

          // Attempt refresh
          const refreshResult = await fetch("http://localhost:8000/api/auth/token/refresh/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          const refreshData = await refreshResult.json();

          if (refreshResult.ok) {
            localStorage.setItem("accessToken", refreshData.access);
            // Retry original request with new token
            result = await rawBaseQuery(args, api, extraOptions);
          } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("currUser");
            window.location.href = "/login";
          }
        } catch (error) {
          console.error("Refresh token error:", error);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("currUser");
          window.location.href = "/login";
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await rawBaseQuery(args, api, extraOptions);
      }
    }

    return result;
  };
};

export default createBaseQueryWithReauth;