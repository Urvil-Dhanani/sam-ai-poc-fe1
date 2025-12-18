import axios from "axios";

export const axiosClientJSON = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Accept-Language": process.env.NEXT_PUBLIC_API_LANG,
    "Content-Type": process.env.NEXT_PUBLIC_CONT_TYPE,
  },
});

axiosClientJSON.interceptors.request.use(async (request) => {
  const token = localStorage.getItem("token");

  if (token) {
    request.headers["authorization"] = "Bearer " + token;
  }

  if (request.method?.toUpperCase() === "GET") return request;

  if (
    request.headers["skip-encryption"] === "true" ||
    request.data instanceof FormData
  ) {
    return request;
  }

  if (request.data?.encryptedData || request.data?.data) return request;

  //   if (request?.url?.includes("clients/")) {
  //     const encrypted = await encryptDataBrowser( || {});
  //     request.data = {
  //       data: encrypted,
  //     };
  //     return request;
  //   }

  return request;
});

// ---- AUTO DECRYPT RESPONSE ----
axiosClientJSON.interceptors.response.use(
  async (response) => {
    try {
      //   if (response.config.url?.includes("clients/")) {
      //     const encryptedResponse = response.data;

      //     if (!encryptedResponse) return response;

      //     const decrypted = await decryptDataBrowser(encryptedResponse);

      //     response.data = decrypted;
      //     return response;
      //   }

      return response;
    } catch (error) {
      console.error("Response decrypt failed", error);
      throw error;
    }
  },
  (error) => {
    throw error;
  }
);
