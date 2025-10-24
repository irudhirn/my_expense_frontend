import axios from "axios"

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

  fetchExpenseCategories: async () => {
    const res = await axios.get(`/expense-categories?select=-createdAt`);
    return { categories: res?.data?.data?.categories };
  },

  addExpense: async (data) => {
    const res = await axios.post(`/expenses`, data);
  }
}