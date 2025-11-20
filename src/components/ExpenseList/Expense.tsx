import React, { useEffect, useState } from 'react';
import { Search, Filter, Download, Edit, Trash2, List, Calendar, DollarSign, Clock, LogIn, Save, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { expenseService } from '@/services/expenseService';

type ExpenseFormData = {
  _id: string;
  title: string;
  expenseCategory: string;
  expenseSubCategory: string;
  vendor: string;
  expenseDate: string;
  expenseAmount: number;
  transactionType: string;
  expenseDescription: string;
}

type Expense = {
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

interface ExpenseProps {
  i: number;
  curElem: Expense;
  categories: any;
  handleDeleteCurExpense: (expense: Expense) => void;
}

const Expense: React.FC<ExpenseProps> = ({ i, curElem, categories, handleDeleteCurExpense }) => {
  const [showEditExpense, setShowEditExpense] = useState(false);
  const [expense, setExpense] = useState<Expense | undefined>();
  const [curExpense, setCurExpense] = useState<ExpenseFormData>({
    _id: "",
    title: "",
    expenseCategory: "",
    expenseSubCategory: "",
    vendor: "",
    expenseDate: "",
    expenseAmount: 0,
    transactionType: "",
    expenseDescription: "",
  });

  useEffect(() => {
    if(!expense) setExpense(curElem);
  }, [curElem]);

  const getCurrentCategory = () => categories.find(cat => cat.value === curExpense.expenseCategory);

  function toLocalDateString(date: string | Date | null | undefined): string {
    // const tzOffsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    // return tzOffsetDate.toISOString().slice(0, 10);

    if (!date) return ""; // or return some default

    const d = typeof date === "string" ? new Date(date) : date;

    if (isNaN(d.getTime())) {
      console.warn("Invalid date:", date);
      return "";
    }

    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  function handleEditCurExpense(expense: Expense){
    let tempExpense: ExpenseFormData = {
      _id: expense?._id,
      title: expense?.title,
      expenseCategory: expense?.expenseCategory?._id,
      expenseSubCategory: "",
      vendor: "",
      expenseDate: toLocalDateString(expense?.expenseDate),
      expenseAmount: expense?.expenseAmount,
      transactionType: expense?.transactionType,
      expenseDescription: expense?.expenseDescription,
    }
    setCurExpense(tempExpense);
    setShowEditExpense(true);
  }

  const handleEditExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      const res = await expenseService.updateExpense(curExpense);
      console.log("handleEditExpense", res);
      setExpense(res?.data?.data?.expense);
      setShowEditExpense(false);
    }catch(err){
      console.error(err);
    }finally{
    
    }
  }

  const handleChangeExpense = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurExpense((prev) => ({ ...prev, [name]: value?.trim() }));
  }
  
  const resetForm = () => {
    
  }

  const handleDelete = (id: string) => console.log("Delete expense:", id);

  return (
    <>
      {expense && (
        <tr>
          <td className="!pr-0">{i + 1}</td>
          <td>
            <div className="font-medium">{expense.title}</div>
            {expense.subCategory && (
              <div className="text-sm text-muted-foreground">{expense.subCategory}</div>
            )}
          </td>
          <td>
            <span className="badge badge-outline">{expense.expenseCategory?.name}</span>
          </td>
          {/* <td>{expense.vendor}</td> */}
          <td>{new Date(expense.expenseDate).toLocaleDateString('en-IN', { dateStyle: "medium" })}</td>
          <td>
            <span className={`font-semibold px-2 py-1 rounded text-sm whitespace-nowrap ${
              expense.transactionType === "credit" 
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
            }`}>
              {expense.transactionType === "credit" ? "+" : "-"} ₹{expense.expenseAmount}
            </span>
          </td>
          <td className="max-w-xs truncate">
            <p className={`line-clamp-1`}>{expense?.expenseDescription || "-"}</p>
          </td>
          <td>
            <div className="flex space-x-2">
              <button
                onClick={() => { handleEditCurExpense(expense); }}
                className="btn btn-sm btn-ghost"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                // onClick={() => handleDelete(expense._id)}
                onClick={() => handleDeleteCurExpense(expense)}
                className="btn btn-sm btn-ghost text-error"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
      )}

      <Dialog open={showEditExpense} onOpenChange={setShowEditExpense}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Edit Expense
            </DialogTitle>
          </DialogHeader>

          {curExpense && (
            <div className="text-left space-y-6 mt-4 text-sm">
              <form onSubmit={handleEditExpense} className="space-y-6">
                {/* Expense Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Expense Name *</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={curExpense?.title}
                    onChange={handleChangeExpense}
                    className="input input-bordered w-full"
                    placeholder="e.g., Lunch at Restaurant"
                    required
                  />
                </div>

                {/* Category and Sub-category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Category *</span>
                    </label>
                    <select
                      name="expenseCategory"
                      value={curExpense.expenseCategory}
                      onChange={handleChangeExpense}
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Sub-category</span>
                    </label>
                    <select
                      name="expenseSubCategory"
                      value={curExpense.expenseSubCategory}
                      onChange={handleChangeExpense}
                      className="select select-bordered w-full"
                      // disabled={!curExpense.expenseCategory}
                    >
                      <option value="">Select Sub-category</option>
                      {getCurrentCategory()?.subCategories.map(subCat => (
                        <option key={subCat} value={subCat}>
                          {subCat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Vendor and Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Vendor/Paid to</span>
                    </label>
                    <input
                      type="text"
                      name="vendor"
                      value={curExpense.vendor}
                      onChange={handleChangeExpense}
                      className="input input-bordered w-full"
                      placeholder="e.g., Starbucks"
                      // required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Date *</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="expenseDate"
                        value={curExpense.expenseDate}
                        onChange={handleChangeExpense}
                        // onChange={(e) => console.log(e.target.value)}
                        className="input input-bordered w-full"
                        required
                      />
                      {/* <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" /> */}
                    </div>
                  </div>
                </div>

                {/* Amount and Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Amount *</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                      <input
                        type="number"
                        name="expenseAmount"
                        value={curExpense.expenseAmount}
                        onChange={handleChangeExpense}
                        className="input input-bordered w-full pl-8"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Type *</span>
                    </label>
                    <select
                      name="transactionType"
                      value={curExpense.transactionType}
                      onChange={handleChangeExpense}
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="debit">Debit (-)</option>
                      <option value="credit">Credit (+)</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Short Description</span>
                  </label>
                  <textarea
                    name="expenseDescription"
                    value={curExpense.expenseDescription}
                    onChange={handleChangeExpense}
                    className="textarea textarea-bordered w-full"
                    placeholder="Optional notes about this expense..."
                    rows={3}
                  />
                </div>

                {/* File Upload */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Receipt/Invoice</span>
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      // onChange={handleFileChange}
                      className="file-input file-input-bordered w-full"
                    />
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </div>
                  {/* {selectedFile && (
                    <div className="mt-2 p-3 bg-muted rounded-lg">
                      <p className="text-sm text-foreground">
                        Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  )} */}
                  <label className="label">
                    <span className="label-text-alt text-muted-foreground">
                      Upload receipt or invoice (JPG, PNG, PDF, max 10MB)
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4 space-x-3">
                  <button type="button" className="btn btn-outline btn-lg" onClick={resetForm}>
                    {/* <Save className="w-5 h-5" /> */}
                    Clear
                  </button>
                  <button type="submit" className="btn btn-primary btn-lg">
                    <Save className="w-5 h-5" />
                    Update
                  </button>
                </div>
              </form>
              
              {/* <Button
                type="submit"
                className="w-full"
                size="lg"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Edit
              </Button> */}
            </div>
          )}
        </DialogContent>
      </Dialog>

    </>
  )
}

export default Expense;