import { useState } from "react";
import { Search, Filter, Download, Edit, Trash2, List, Calendar, DollarSign, Clock } from "lucide-react";
import { subDays, subMonths, subYears, isAfter } from "date-fns";
import Navbar from "../components/Layout/Navbar";

interface Expense {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  vendor: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
  description?: string;
  receipt?: string;
}

const ExpenseList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState({ min: "", max: "" });
  const [timePeriod, setTimePeriod] = useState("30"); // 30, 90, 365 days

  // Mock data - updated with more recent dates for better demonstration
  const [expenses] = useState<Expense[]>([
    {
      id: "1",
      name: "Lunch at Italian Restaurant",
      category: "Food & Dining",
      subCategory: "Restaurants",
      vendor: "Tony's Pizzeria",
      date: "2024-12-15",
      amount: 28.50,
      type: "debit",
      description: "Team lunch meeting",
    },
    {
      id: "2",
      name: "Gas Station Fill-up",
      category: "Transportation",
      subCategory: "Gas",
      vendor: "Shell",
      date: "2024-12-10",
      amount: 45.20,
      type: "debit",
    },
    {
      id: "3",
      name: "Grocery Shopping",
      category: "Food & Dining",
      subCategory: "Groceries",
      vendor: "Whole Foods",
      date: "2024-11-28",
      amount: 127.85,
      type: "debit",
      description: "Weekly groceries",
    },
    {
      id: "4",
      name: "Cash Back Reward",
      category: "Entertainment",
      vendor: "Netflix",
      date: "2024-10-12",
      amount: 15.99,
      type: "credit",
      description: "Monthly subscription cashback",
    },
    {
      id: "5",
      name: "Coffee",
      category: "Food & Dining",
      subCategory: "Coffee",
      vendor: "Starbucks",
      date: "2024-08-11",
      amount: 5.75,
      type: "debit",
    },
    {
      id: "6",
      name: "Office Supplies",
      category: "Office",
      vendor: "Staples",
      date: "2024-12-05",
      amount: 89.99,
      type: "debit",
      description: "Printer paper and pens",
    },
    {
      id: "7",
      name: "Freelance Payment",
      category: "Utilities",
      vendor: "Client Inc",
      date: "2024-11-01",
      amount: 750.00,
      type: "credit",
      description: "Project payment received",
    },
  ]);

  const categories = ["Food & Dining", "Transportation", "Shopping", "Entertainment", "Utilities", "Healthcare", "Office", "Other"];

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

  const timePeriodExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const cutoffDate = getTimePeriodCutoff();
    return isAfter(expenseDate, cutoffDate);
  });

  // Filter expenses for table display (existing filters)
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !dateFilter || expense.date === dateFilter;
    const matchesCategory = !categoryFilter || expense.category === categoryFilter;
    const matchesAmount = (!amountFilter.min || expense.amount >= parseFloat(amountFilter.min)) &&
                         (!amountFilter.max || expense.amount <= parseFloat(amountFilter.max));

    return matchesSearch && matchesDate && matchesCategory && matchesAmount;
  });

  // Summary calculations based on time period
  const summaryTotalAmount = timePeriodExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleEdit = (id: string) => {
    console.log("Edit expense:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete expense:", id);
  };

  const handleExport = () => {
    console.log("Export expenses");
  };

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
        <div className="flex items-center justify-end mb-6">
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
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
        </div>

        {/* Filters */}
        <div className="card bg-card shadow-card mb-6">
          <div className="card-body">
            <div className="flex items-center space-x-4 mb-4">
              <Filter className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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

              {/* Date Filter */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Category Filter */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
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
                  value={amountFilter.min}
                  onChange={(e) => setAmountFilter({...amountFilter, min: e.target.value})}
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
                  value={amountFilter.max}
                  onChange={(e) => setAmountFilter({...amountFilter, max: e.target.value})}
                  className="input input-bordered w-full"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button onClick={handleExport} className="btn btn-outline">
                <Download className="w-4 h-4" />
                Export CSV
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
                    <th>Expense Name</th>
                    <th>Category</th>
                    <th>Vendor</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>
                        <div className="font-medium">{expense.name}</div>
                        {expense.subCategory && (
                          <div className="text-sm text-muted-foreground">{expense.subCategory}</div>
                        )}
                      </td>
                      <td>
                        <span className="badge badge-outline">{expense.category}</span>
                      </td>
                      <td>{expense.vendor}</td>
                      <td>{new Date(expense.date).toLocaleDateString()}</td>
                      <td>
                        <span className={`font-semibold px-2 py-1 rounded text-sm ${
                          expense.type === "credit" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }`}>
                          {expense.type === "credit" ? "+" : "-"}${expense.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="max-w-xs truncate">{expense.description || "-"}</td>
                      <td>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(expense.id)}
                            className="btn btn-sm btn-ghost"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(expense.id)}
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