import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
/*

Build a UI for an expense tracker app which will have pages for Signup, Login, Profile, Add Expense, View Expense list by user. Signup page will have input fields like First Name, Last Name, Username, Email, Password, Confirm Password. Login page will have 2 input fields - Username OR Email & Password. Add Expense page will have a form with input fields - Expense name, Category dropdown, Sub-category dropdown (optional field), Vendor/Paid to, Date, Amount, Short description (optional field), File input field for Receipt/Invoice upload. Profile page will have input fields for - Update Profile Picture, First Name, Last Name, Username, Email(read only), Password (Need Confirm password too). Expense list page should have table to show expense, should have filters for date, search bar, amount.

Generate a beautiful UI for the above requirements. Use tailwind css, daisy-ui, typescript

https://lovable.dev/projects/9e3d4921-6ae3-4dc4-973e-4fa43d6a4070

*/