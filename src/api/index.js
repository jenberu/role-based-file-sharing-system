// src/api/baseQueryWithReauth.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

// Create a mutex instance to avoid overlapping refresh requests.
const mutex = new Mutex();
const createBaseQueryWithReauth = (baseUrl) => {
  // Create our underlying base query
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      // Read token from localStorage (adjust if you use cookies)
      const currUser = JSON.parse(localStorage.getItem('currUser') || '{}');
      const token = currUser.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  // Return a function that wraps the raw base query with refresh logic.
 return async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  // Extract URL from args
  const path = typeof args === 'string' ? args : args.url;
  const fullUrl = baseUrl + path;

  // 🔍 LOG the full URL before making request
  console.log('📡 Making request to:', fullUrl);

  // Try the original request.
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.warn('🔐 Token expired, attempting refresh...');

    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const currUser = JSON.parse(localStorage.getItem('currUser') || '{}');
        const refreshToken = currUser.refresh;
        if (!refreshToken) {
          localStorage.removeItem('currUser');
          return result;
        }

        // 🔁 Log refresh attempt
        const refreshResult = await fetchBaseQuery({
          baseUrl: '',
          prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
          },
        })({
          url: 'http://127.0.0.1:8000/api/user/token/refresh/',
          method: 'POST',
          body: { refresh: refreshToken },
        }, api, extraOptions);

        if (refreshResult.data) {
          const data = refreshResult.data;
          localStorage.setItem('currUser', JSON.stringify({ ...currUser, token: data.access }));
          console.log('✅ Token refreshed successfully');

          // Retry the original request with new token
          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          console.error('❌ Token refresh failed');
          localStorage.removeItem('currUser');
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  // 🧪 Optional: log response data or error
  if (result.error) {
    console.error('❌ Request error:', result.error);
  } else {
    console.log('✅ Request succeeded:', result.data);
  }

  return result;
};

};

export default createBaseQueryWithReauth;
