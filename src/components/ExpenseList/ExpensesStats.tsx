import { expenseService } from '@/services/expenseService';
import { ExpenseCategory } from '@/types&Interfaces/TIExpense';
import { Calendar, Clock, IndianRupee, List } from 'lucide-react';
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Separator } from '../ui/separator';

type StatsTimePeriods = "7" | "30" | "90" |"180" | "365";
type Top5TimePeriods = "5" | "10" | "20" |"30";

interface ExpensesStatsProps {
  categories: ExpenseCategory[];
}

const ExpensesStats: React.FC<ExpensesStatsProps> = memo(({ categories }) => {
  const [fetching, setFetching] = useState({ initial: false, refetch: false });
  const [stats, setStats] = useState({ totalExpenses: null, totalExpenditure: null, averageExpenditure: null });
  const [spendingSnapshots, setSpendingSnapshots] = useState({ topExpenses: [], leastExpenses: [] });
  // const [timePeriod, setTimePeriod] = useState<StatsTimePeriods>("30"); // 7, 30, 90, 180, 365 days

  const fetchStats = useCallback(async (timePeriod: StatsTimePeriods = "30") => {
    try{
      const res = await expenseService.fetchStats(timePeriod);
      // console.log("stats response", res);
      setStats(res?.data?.data?.stats);
    }catch(err){
      console.error(err);
    }finally{
      setFetching((prev) => ({ ...prev, initial: false, refetch: false }));
    }
  // }, [timePeriod])
  }, [])

  useEffect(() => { fetchStats(); }, []);

  const fetchTopExpenses = useCallback(async (timePeriod: Top5TimePeriods = "30") => {
    try{
      const res = await expenseService.fetchTopExpenses(timePeriod);
      // console.log("fetchTopExpenses", res);
      setSpendingSnapshots(res?.data?.data);
    }catch(err){
      console.error(err);
    }finally{
      setFetching((prev) => ({ ...prev, initial: false, refetch: false }));
    }
  // }, [timePeriod])
  }, [])

  useEffect(() => { fetchTopExpenses(); }, []);

  const handleStatsChange = (val: StatsTimePeriods) => {
    // setTimePeriod(val);
    fetchStats(val);
  }

  const handleTop5Change = (val: Top5TimePeriods) => {
    // setTimePeriod(val);
    fetchTopExpenses(val);
  }

  const formatAmount = useCallback((val: number) => {
    return val?.toLocaleString("en-IN");
  }, [])

  return (
    <>
      {/* Summary Heading */}
      <div className="flex gap-4 sm:items-center justify-between mb-6">
        <span className="text-xl font-medium text-foreground whitespace-nowrap !ml-2">Summary</span>
        <div className="flex items-center space-x-3">
          <Clock className="w-6 sm:w-10 text-primary" />
          <span className="text-base font-medium text-foreground whitespace-nowrap !ml-2 hidden sm:block">Period:</span>
          <select
            // value={timePeriod}
            defaultValue={"30"}
            onChange={(e) => handleStatsChange(e.target.value as StatsTimePeriods)}
            className="select select-bordered"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="180">Last 180 Days</option>
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
                <p className="text-2xl font-bold text-foreground">{stats?.totalExpenses ?? stats?.totalExpenses}</p>
                {/* <p className="text-xs text-muted-foreground">
                  {timePeriod === "30" ? "Last 30 days" : timePeriod === "90" ? "Last 90 days" : "Last year"}
                </p> */}
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
                {/* <p className="text-2xl font-bold text-foreground">₹{summaryTotalAmount.toFixed(2)}</p> */}
                <p className="text-2xl font-bold text-foreground">₹{stats?.totalExpenditure != null ? formatAmount(stats?.totalExpenditure) : ""}</p>
                {/* <p className="text-xs text-muted-foreground">
                  {timePeriod === "30" ? "Last 30 days" : timePeriod === "90" ? "Last 90 days" : "Last year"}
                </p> */}
              </div>
              {/* <DollarSign className="w-8 h-8 text-secondary" /> */}
              <IndianRupee className="w-8 h-8 text-secondary" />
            </div>
          </div>
        </div>

        <div className="card bg-card shadow-card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Average Amount</p>
                <p className="text-2xl font-bold text-foreground">
                  {/* ₹{timePeriodExpenses.length ? (summaryTotalAmount / timePeriodExpenses.length).toFixed(2) : "0.00"} */}
                  ₹{stats?.averageExpenditure !== null ? formatAmount(stats?.averageExpenditure) : ""}
                </p>
                {/* <p className="text-xs text-muted-foreground">
                  {timePeriod === "30" ? "Last 30 days" : timePeriod === "90" ? "Last 90 days" : "Last year"}
                </p> */}
              </div>
              <Calendar className="w-8 h-8 text-accent" />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Top Expenses Heading */}
      <div className="flex gap-4 sm:items-center justify-between my-6">
        <span className="text-xl font-medium text-foreground whitespace-nowrap !ml-2">
          {/* Top 5 Expenses */}
          Spending Snapshot
          {/* Expense Insights, Spending Snapshot, Your Top Expenses, Expense Breakdown, Where Your Money Goes */}
        </span>
        <div className="flex items-center space-x-3">
          <Clock className="w-6 sm:w-10 text-primary" />
          <span className="text-base font-medium text-foreground whitespace-nowrap !ml-2 hidden sm:block">In:</span>
          <select
          defaultValue={"30"}
            onChange={(e) => handleTop5Change(e.target.value as Top5TimePeriods)}
            className="select select-bordered"
          >
            <option value="5">Last 5 Days</option>
            <option value="10">Last 10 Days</option>
            <option value="20">Last 20 Days</option>
            <option value="30">Last 30 Days</option>
          </select>
          {/* <span className="text-base font-medium text-foreground whitespace-nowrap !ml-2 hidden sm:block">On:</span>
          <select
            className="select select-bordered"
          >
            <option value="">All</option>
            {categories && categories.map(category => (
              <option key={category?._id} value={category?._id}>{category?.name}</option>
            ))}
          </select> */}
        </div>
      </div>

      {/* Top Expenses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card bg-card shadow-card">
          <div className="card-body">
            <h3 className={`text-lg mb-2 pb-2 border-b`}>
              {/* Top expenses */}
              Biggest Spenders
              {/* Biggest Spenders, Top 5 Outflaws, Major Expenses, Heaviest Hits, High Impact, Where the Funds Went, Spending Peaks */}
            </h3>
            {spendingSnapshots?.topExpenses?.length > 0 ? (
              spendingSnapshots?.topExpenses?.map((curElem) => (
                <div className="flex items-center justify-between" key={curElem?._id}>
                  <p className="text-muted-foreground text-base">{curElem?.title} - <span className={`text-sm`}>({curElem?.expenseCategory?.name})</span></p>
                  <span>₹{formatAmount(curElem?.expenseAmount)}</span>
                </div>
              ))
            ) : (
              <p>No data found</p>
            )}
            {/* <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Utilities</p>
              <span>₹8000</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Grocery</p>
              <span>₹6000</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Automobile</p>
              <span>₹5000</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Food & Dining</p>
              <span>₹1300</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Gifts</p>
              <span>₹800</span>
            </div> */}
          </div>
        </div>

        <div className="card bg-card shadow-card">
          <div className="card-body">
            <h3 className={`text-lg mb-2 pb-2 border-b`}>
              {/* Least expenses */}
              Smallest Transactions
              {/* Lightest Spenders, Bottom 5 Outflows, Minor Expenses, Barely There, Low Impact, Spending Valleys */}
            </h3>
            {spendingSnapshots?.leastExpenses?.length > 0 ? (
              spendingSnapshots?.leastExpenses?.map((curElem) => (
                <div className="flex items-center justify-between" key={curElem?._id}>
                  <p className="text-muted-foreground text-base">{curElem?.title} - <span className={`text-sm`}>({curElem?.expenseCategory?.name})</span></p>
                  <span>₹{formatAmount(curElem?.expenseAmount)}</span>
                </div>
              ))
            ) : (
              <>No data found</>
            )}
            {/* <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Utilities</p>
              <span>₹8000</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Grocery</p>
              <span>₹6000</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Automobile</p>
              <span>₹5000</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Food & Dining</p>
              <span>₹1300</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Gifts</p>
              <span>₹800</span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
})

export default ExpensesStats;