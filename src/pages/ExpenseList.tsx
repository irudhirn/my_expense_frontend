import { useEffect, useState } from "react";
import { Search, Filter, Download, Edit, Trash2, List, Calendar, DollarSign, Clock } from "lucide-react";
import { subDays, subMonths, subYears, isAfter } from "date-fns";
import Navbar from "../components/Layout/Navbar";
import { expenseService } from "@/services/expenseService";

interface Expense {
  _id: string;
  title: string;
  expenseCategory: { _id: string, name: string };
  subCategory?: string;
  vendor?: string;
  expenseDate: string;
  expenseAmount: number;
  transactionType: "credit" | "debit";
  expenseDescription?: string;
  receipt?: string;
}

const ExpenseList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  // const [startDate, setStartDate] = useState(`${new Date(new Date().getFullYear(), new Date().getMonth(), 1)}`);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setAmountFilter] = useState({ min: "", max: "" });
  const [timePeriod, setTimePeriod] = useState("30"); // 30, 90, 365 days
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try{
      const res: any = await expenseService.fetchExpenseCategories();
      console.log("res", res);
      setCategories(res?.categories);
    }catch(err){
      console.error(err);
    }
  }

  useEffect(() => { fetchCategories(); }, []);

  const fetchExpenses = async () => {
    try{
      const res: any = await expenseService.fetchExpenses(searchTerm, startDate, endDate, expenseAmount.min, expenseAmount.max, expenseCategory);
      console.log("expenseResponse", res);
      setExpenses(res?.expenses);
    }catch(err){
      console.error(err);
      console.error(err?.response?.data?.message);
    }finally{
    
    }
  }
  // useEffect(() => { fetchExpenses(); }, [searchTerm, startDate, endDate, expenseAmount.min, expenseAmount.max, expenseCategory]);
  useEffect(() => { fetchExpenses(); }, []);

  // const categories = ["Food & Dining", "Transportation", "Shopping", "Entertainment", "Utilities", "Healthcare", "Office", "Other"];

  // Filter expenses for summary cards based on time period
  const getTimePeriodCutoff = () => {
    const now = new Date();
    switch (timePeriod) {
      case "30":
        return subDays(now, 30);
      case "90":
        return subDays(now, 90);
      case "365":
        return subYears(now, 1);
      default:
        return subDays(now, 30);
    }
  };

  const timePeriodExpenses = expenses;
  // const timePeriodExpenses = expenses.filter(expense => {
  //   const expenseDate = new Date(expense.date);
  //   const cutoffDate = getTimePeriodCutoff();
  //   return isAfter(expenseDate, cutoffDate);
  // });

  // Filter expenses for table display (existing filters)
  const filteredExpenses = expenses
  // const filteredExpenses = expenses.filter(expense => {
  //   const matchesSearch = expense.name.toLowerCase().includes(searchTerm.toLowerCase()) || expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) || expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    
  //   const expenseDate = new Date(expense.date);
  //   const matchesStartDate = !startDate || expenseDate >= new Date(startDate);
  //   const matchesEndDate = !endDate || expenseDate >= new Date(endDate);
  //   const matchesCategory = !expenseCategory || expense.category === expenseCategory;
  //   const matchesAmount = (!expenseAmount.min || expense.amount >= parseFloat(expenseAmount.min)) && (!expenseAmount.max || expense.amount <= parseFloat(expenseAmount.max));

  //   return matchesSearch && matchesStartDate && matchesEndDate && matchesCategory && matchesAmount;
  // });

  // Summary calculations based on time period
  const summaryTotalAmount = timePeriodExpenses.reduce((sum, expense) => sum + expense.expenseAmount, 0);
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.expenseAmount, 0);

  const handleEdit = (id: string) => console.log("Edit expense:", id)
  const handleDelete = (id: string) => console.log("Delete expense:", id);
  const handleExport = () => console.log("Export expenses")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <List className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Expense List</h1>
            <p className="text-muted-foreground">View and manage your expenses</p>
          </div>
        </div>

        {/* Time Period Selector */}
        {/* <div className="flex items-center justify-end mb-6">
          <div className="flex items-center space-x-4">
            <Clock className="w-12 text-primary" />
            <span className="text-lg font-medium text-foreground whitespace-nowrap !ml-2">Summary Period:</span>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="select select-bordered"
            >
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="365">Last Year</option>
            </select>
          </div>
        </div> */}

        {/* Summary Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-card shadow-card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold text-foreground">{timePeriodExpenses.length}</p>
                  <p className="text-xs text-muted-foreground">
                    {timePeriod === "30" ? "Last 30 days" : timePeriod === "90" ? "Last 90 days" : "Last year"}
                  </p>
                </div>
                <List className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          <div className="card bg-card shadow-card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold text-foreground">${summaryTotalAmount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">
                    {timePeriod === "30" ? "Last 30 days" : timePeriod === "90" ? "Last 90 days" : "Last year"}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-secondary" />
              </div>
            </div>
          </div>

          <div className="card bg-card shadow-card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Average Amount</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${timePeriodExpenses.length ? (summaryTotalAmount / timePeriodExpenses.length).toFixed(2) : "0.00"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {timePeriod === "30" ? "Last 30 days" : timePeriod === "90" ? "Last 90 days" : "Last year"}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-accent" />
              </div>
            </div>
          </div>
        </div> */}

        {/* Filters */}
        <div className="card bg-card shadow-card mb-6">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 mb-4">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Filters</h2>
              </div>
              <button onClick={handleExport} className="btn btn-outline">
                <Download className="w-4 h-4" />
                CSV
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Search</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              {/* Start Date Filter */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Start Date</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* End Date Filter */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">End Date</span>
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Category Filter */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="">All</option>
                  {categories.map(category => (
                    <option key={category?._id} value={category?._id}>{category?.name}</option>
                  ))}
                </select>
              </div>

              {/* Amount Filter */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Min Amount</span>
                </label>
                <input
                  type="number"
                  placeholder="$0"
                  value={expenseAmount.min}
                  onChange={(e) => setAmountFilter({...expenseAmount, min: e.target.value})}
                  className="input input-bordered w-full"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Max Amount</span>
                </label>
                <input
                  type="number"
                  placeholder="$999"
                  value={expenseAmount.max}
                  onChange={(e) => setAmountFilter({...expenseAmount, max: e.target.value})}
                  className="input input-bordered w-full"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Filter Action Buttons */}
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  // setSearchTerm("");
                  // setStartDate("");
                  // setEndDate("");
                  // setCategoryFilter("");
                  // setAmountFilter({ min: "", max: "" });
                }}
                className="btn btn-outline"
              >
                Clear Filters
              </button>
              <button className="btn btn-primary" onClick={fetchExpenses}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Expense Table */}
        <div className="card bg-card shadow-card">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="!pr-0">#</th>
                    <th>Expense Name</th>
                    <th>Category</th>
                    {/* <th>Vendor</th> */}
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((curElem, i) => (
                    <tr key={curElem._id}>
                      <td className="!pr-0">{i + 1}</td>
                      <td>
                        <div className="font-medium">{curElem.title}</div>
                        {curElem.subCategory && (
                          <div className="text-sm text-muted-foreground">{curElem.subCategory}</div>
                        )}
                      </td>
                      <td>
                        <span className="badge badge-outline">{curElem.expenseCategory?.name}</span>
                      </td>
                      {/* <td>{curElem.vendor}</td> */}
                      <td>{new Date(curElem.expenseDate).toLocaleDateString('en-IN', { dateStyle: "medium" })}</td>
                      <td>
                        <span className={`font-semibold px-2 py-1 rounded text-sm whitespace-nowrap ${
                          curElem.transactionType === "credit" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }`}>
                          {curElem.transactionType === "credit" ? "+" : "-"} ₹{curElem.expenseAmount}
                        </span>
                      </td>
                      <td className="max-w-xs truncate">
                        <p className={`line-clamp-1`}>{curElem?.expenseDescription || "-"}</p>
                      </td>
                      <td>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(curElem._id)}
                            className="btn btn-sm btn-ghost"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(curElem._id)}
                            className="btn btn-sm btn-ghost text-error"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredExpenses.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No expenses found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;