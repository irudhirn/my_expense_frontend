import { useState } from "react";
import { Save, Upload, Plus, Calendar } from "lucide-react";
import Navbar from "../components/Layout/Navbar";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    expenseName: "",
    category: "",
    subCategory: "",
    vendor: "",
    date: "",
    amount: "",
    type: "",
    description: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const categories = [
    { value: "food", label: "Food & Dining", subCategories: ["Restaurants", "Groceries", "Fast Food", "Coffee"] },
    { value: "transportation", label: "Transportation", subCategories: ["Gas", "Public Transit", "Ride Share", "Parking"] },
    { value: "shopping", label: "Shopping", subCategories: ["Clothing", "Electronics", "Home & Garden", "Personal Care"] },
    { value: "entertainment", label: "Entertainment", subCategories: ["Movies", "Concerts", "Games", "Books"] },
    { value: "utilities", label: "Utilities", subCategories: ["Electricity", "Water", "Internet", "Phone"] },
    { value: "healthcare", label: "Healthcare", subCategories: ["Doctor", "Pharmacy", "Insurance", "Dental"] },
    { value: "other", label: "Other", subCategories: ["Miscellaneous"] },
  ];

  const getCurrentCategory = () => categories.find(cat => cat.value === formData.category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle expense submission logic here
    console.log("Expense submitted:", { ...formData, receipt: selectedFile });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // Reset sub-category when category changes
      ...(name === "category" && { subCategory: "" }),
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="card bg-card shadow-elevated">
            <div className="card-body">
              <div className="flex items-center space-x-4 mb-8">
                <Plus className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Add New Expense</h1>
                  <p className="text-muted-foreground">Record your expense details</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Expense Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Expense Name *</span>
                  </label>
                  <input
                    type="text"
                    name="expenseName"
                    value={formData.expenseName}
                    onChange={handleChange}
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
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Sub-category</span>
                    </label>
                    <select
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      className="select select-bordered w-full"
                      disabled={!formData.category}
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
                      <span className="label-text font-medium">Vendor/Paid to *</span>
                    </label>
                    <input
                      type="text"
                      name="vendor"
                      value={formData.vendor}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="e.g., Starbucks"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Date *</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
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
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
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
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
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
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
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
                      onChange={handleFileChange}
                      className="file-input file-input-bordered w-full"
                    />
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </div>
                  {selectedFile && (
                    <div className="mt-2 p-3 bg-muted rounded-lg">
                      <p className="text-sm text-foreground">
                        Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  )}
                  <label className="label">
                    <span className="label-text-alt text-muted-foreground">
                      Upload receipt or invoice (JPG, PNG, PDF, max 10MB)
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    <Save className="w-5 h-5" />
                    Save Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;