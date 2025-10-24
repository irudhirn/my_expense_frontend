import { Link, useLocation } from "react-router-dom";
import { Wallet, User, Plus, List, LogOut } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userData");
  }

  return (
    <div className="navbar bg-card shadow-card px-6">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">
          <Wallet className="w-6 h-6" />
          ExpenseTracker
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <li>
            <Link 
              to="/expenses" 
              className={`btn btn-ghost ${isActive("/expenses") ? "btn-primary" : ""}`}
            >
              <List className="w-4 h-4" />
              Expenses
            </Link>
          </li>
          <li>
            <Link 
              to="/add-expense" 
              className={`btn btn-ghost ${isActive("/add-expense") ? "btn-primary" : ""}`}
            >
              <Plus className="w-4 h-4" />
              Add Expense
            </Link>
          </li>
          <li>
            <Link 
              to="/profile" 
              className={`btn btn-ghost ${isActive("/profile") ? "btn-primary" : ""}`}
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="navbar-end">
        <div className="dropdown dropdown-end lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-elevated bg-card rounded-box w-52">
            <li><Link to="/expenses"><List className="w-4 h-4" />Expenses</Link></li>
            <li><Link to="/add-expense"><Plus className="w-4 h-4" />Add Expense</Link></li>
            <li><Link to="/profile"><User className="w-4 h-4" />Profile</Link></li>
          </ul>
        </div>
        
        <Link to="/login" className="btn btn-ghost" onClick={logout}>
          <LogOut className="w-4 h-4" />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;