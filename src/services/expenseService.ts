// import axios from "axios";
import { axiosInstance as axios } from "@/utils/globalVars";

export const expenseService = {
  fetchExpenses: async (search: string = "", startDate: string | null = null, endDate: string | null = null, minAmount: string | null = null, maxAmount: string | null = null, expenseCategory: string | null = null) => {
    let url = `/expenses`;
    const params = {};
    if(search?.trim()) params["search"]= search?.trim();
    if(startDate) params["startDate"]= startDate;
    if(endDate) params["endDate"]= endDate;
    if(minAmount) params["minAmount"]= minAmount;
    if(maxAmount) params["maxAmount"]= maxAmount;
    if(expenseCategory) params["expenseCategory"]= expenseCategory;

    const res = await axios.get(url, { params });
    return { expenses: res?.data?.data?.expenses, total: res?.data?.total};
  },

  fetchStats: async (timePeriod: "7" | "30" | "90" |"180" | "365") => {
    const res = await axios.get(`/expenses/stats/${timePeriod}`);
    return res;
  },

  fetchTopExpenses: async (timePeriod: "5" | "10" | "20" | "30") => {
    const res = await axios.get(`/expenses/top-expense/${timePeriod}`);
    return res;
  },

  fetchExpenseCategories: async () => {
    const res = await axios.get(`/expense-categories?select=-createdAt`);
    return { categories: res?.data?.data?.categories };
  },

  addExpense: async (data) => {
    const res = await axios.post(`/expenses`, data);
  },

  updateExpense: async (data) => {
    const res = await axios.put(`expenses/${data?._id}`, data);
    return res;
  },

  deleteExpense: async (id: string) => {
    const res = await axios.delete(`expenses/${id}`);
    return res;
  }
}