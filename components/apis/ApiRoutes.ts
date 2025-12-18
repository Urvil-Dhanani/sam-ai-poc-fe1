import { ErrorAlert, SuccessAlert } from "../Alerts/Alert";
import { axiosClientJSON } from "./ApiClient";

export const API_URL = {
  AUTH: {
    LOGIN: "auth/login",
  },
  SUPER_ADMIN: {
    ASSOCIATIONS: "super-admin/associations",
  },
};

export async function API_CALL(
  method: string,
  url: string,
  body: any,
  alert: boolean
) {
  try {
    const httpMethod = method.toLowerCase();
    let response;

    const isFormData = body instanceof FormData;

    const config = {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data", "skip-encryption": "true" }
        : { "Content-Type": "application/json" },
    };

    if (httpMethod === "get") {
      response = await axiosClientJSON.get(url, { params: body });
    } else if (httpMethod === "delete") {
      response = await axiosClientJSON.delete(url, { params: body });
    } else if (httpMethod === "post") {
      response = await axiosClientJSON.post(url, body, config);
    } else if (httpMethod === "put") {
      response = await axiosClientJSON.put(url, body, config);
    } else if (httpMethod === "patch") {
      response = await axiosClientJSON.patch(url, body, config);
    }

    if (response?.data?.status === 1) {
      if (alert) {
        SuccessAlert(response?.data?.message);
      }
    } else {
      ErrorAlert(response?.data?.message);
    }

    return response?.data;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    ErrorAlert(
      error?.response?.data?.message || error?.message || "Something went wrong"
    );
    throw error;
  }
}
