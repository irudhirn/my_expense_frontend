// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import LoginDialog from "@/components/Auth/LoginDialog";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import AddExpense from "./pages/AddExpense";
import ExpenseList from "./pages/ExpenseList";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AdminRoute from "./components/Auth/AdminRoute";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminExpenses from "./pages/Admin/AdminExpenses";
import AdminExpenseCategories from "./pages/Admin/AdminExpenseCategories";
import AdminExpenseSubCategories from "./pages/Admin/AdminExpenseSubCategories";

const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <LoginDialog />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-expense" element={<AddExpense />} />
                <Route path="/expenses" element={<ExpenseList />} />
              </Route>
              <Route path="*" element={<NotFound />} />
              <Route path="/admin" element={<AdminRoute />}>
                <Route path="users" element={<AdminUsers />} />
                <Route path="expenses" element={<AdminExpenses />} />
                <Route path="expense-categories" element={<AdminExpenseCategories />} />
                <Route path="expense-sub-categories" element={<AdminExpenseSubCategories />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* <ProtectedRoute>
              <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-expense" element={<AddExpense />} />
                <Route path="/expenses" element={<ExpenseList />} />
              </Routes>
            </ProtectedRoute> */}
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App;

/*

I'm building fullstack mern app. I need to implement search functionality in some pages. Search is working data found matching exact search term.

In normal google search, if I want to search "Account" & I misspelled "Accunt", I'll still see search suggestion "Account", but in suggestion dropdown, characters "Acc" & "unt" will be bold because those character collection matches my search term & missing "o" in my search term will have normal font weight because it's not in my search term.

What type of search is this? How can I implement this kind of search even when user has misspelled? (Making characters bold is not necessary in UI.)

*/