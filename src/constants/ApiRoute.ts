export const BASE_URL = "https://live-project-backend-viiy.onrender.com/api";

export const API_ROUTES = {
  CONTACT: {
    GET_ALL: `${BASE_URL}/contact`,
    GET_BY_ID: (id: string) => `${BASE_URL}/contact/${id}`,
    GET_BY_PARAMS: (params: string) => `${BASE_URL}/contact?${params}`,
    ADD: `${BASE_URL}/contact`,
    UPDATE: (id: string) => `${BASE_URL}/contact/${id}`,
    DELETE: (id: string) => `${BASE_URL}/contact/${id}`,
  },
  CONTACTFOLLOWUP: {
    GET_ALL: `${BASE_URL}/con/followup`,
    GET_BY_ID: (id: string) => `${BASE_URL}/con/followup/${id}`,
    GET_BY_PARAMS: (params: string) => `${BASE_URL}/con/followup?${params}`,
    ADD: `${BASE_URL}/con/followup`,
    UPDATE: (id: string) => `${BASE_URL}/con/followup/${id}`,
    DELETE: (id: string) => `${BASE_URL}/con/followup/${id}`,
  },
  SHEDULES: {
    GET_ALL: `${BASE_URL}/sch`,
    GET_BY_ID: (id: string) => `${BASE_URL}/sch/${id}`,
    GET_BY_PARAMS: (params: string) => `${BASE_URL}/sch?${params}`,
    ADD: `${BASE_URL}/sch`,
    UPDATE: (id: string) => `${BASE_URL}/sch/${id}`,
    DELETE: (id: string) => `${BASE_URL}/sch/${id}`,
  },
    TASK: {
    GET_ALL: `${BASE_URL}/task`,
    GET_BY_ID: (id: string) => `${BASE_URL}/task/${id}`,
    GET_BY_PARAMS: (params: string) => `${BASE_URL}/task?${params}`,
    ADD: `${BASE_URL}/task`,
    UPDATE: (id: string) => `${BASE_URL}/task/${id}`,
    DELETE: (id: string) => `${BASE_URL}/task/${id}`,
  },
  ADMIN: {
    LOGIN: `${BASE_URL}/admin/login`,
    LOGOUT: `${BASE_URL}/admin/logout`,
    CHECK: `${BASE_URL}/admin/check`,
  },
};