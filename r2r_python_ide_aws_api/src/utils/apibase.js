import axios, { Axios } from 'axios';
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
export const api = axios.create({ baseURL: "https://r2r-lm-fin-dashboard.vercel.app/" });
export const apiSheety = axios.create({ baseURL: "https://api.sheety.co/f86a219e4c66ae9bacf55c87219398c1/" });
// export const authorDaashboardApi = axios.create({ baseURL: "http://localhost:3000/" });
export const authorDaashboardApi = axios.create({ baseURL: "https://author-dashboard-theta.vercel.app" });
