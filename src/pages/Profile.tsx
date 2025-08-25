import { useState } from "react";
import { Eye, EyeOff, Camera, Save, User } from "lucide-react";
import Navbar from "../components/Layout/Navbar";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john@example.com",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Handle profile update logic here
    console.log("Profile update:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle image upload logic here
      console.log("Image uploaded:", file);
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
                <User className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
                  <p className="text-muted-foreground">Manage your account information</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Picture */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Profile Picture</span>
                  </label>
                  <div className="flex items-center space-x-4">
                    {/* <div className="avatar"> */}
                    <div className="">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file-input file-input-bordered file-input-sm"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Upload a new profile picture (JPG, PNG, max 5MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">First Name</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Last Name</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>

                {/* Username and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Username</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      className="input input-bordered w-full bg-muted"
                      readOnly
                    />
                    <label className="label">
                      <span className="label-text-alt text-muted-foreground">
                        Email cannot be changed
                      </span>
                    </label>
                  </div>
                </div>

                {/* Password Fields */}
                <div className="divider">Change Password (Optional)</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">New Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input input-bordered w-full pr-12"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <Eye className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Confirm New Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="input input-bordered w-full pr-12"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <Eye className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button type="submit" className="btn btn-primary">
                    <Save className="w-4 h-4" />
                    Save Changes
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

export default Profile;