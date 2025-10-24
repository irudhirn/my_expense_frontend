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
import axios from "axios";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const queryClient = new QueryClient();

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  axios.interceptors.request.use((request) => {
    const token = localStorage.getItem("token");

    if(token) request.headers.Authorization = "Bearer " + token;
    
    return request;
  }, (err) => {
    return Promise.reject(err);
  })

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <LoginDialog />
            <ProtectedRoute>
              <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-expense" element={<AddExpense />} />
                <Route path="/expenses" element={<ExpenseList />} />
              </Routes>
            </ProtectedRoute>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
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