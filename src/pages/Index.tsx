import { Link } from "react-router-dom";
import { Wallet, Plus, TrendingUp, Receipt, ArrowRight, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                <Wallet className="w-16 h-16 text-primary" />
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Master Your
              <span className="text-primary block">Finances</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform your financial life with intelligent expense tracking, 
              powerful analytics, and seamless receipt management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button asChild size="lg" className="text-lg px-8 py-6 rounded-xl shadow-elevated">
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl">
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span>Setup in 2 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Everything you need
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Powerful Financial Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Streamline your expense management with our comprehensive suite of tools 
              designed for modern financial tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-elevated transition-smooth border-0 shadow-card">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-smooth">
                    <Plus className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">Smart Expense Entry</CardTitle>
                <CardDescription className="text-base">
                  Add expenses instantly with AI-powered categorization and intelligent receipt scanning.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-elevated transition-smooth border-0 shadow-card">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-smooth">
                    <TrendingUp className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">Advanced Analytics</CardTitle>
                <CardDescription className="text-base">
                  Gain insights with beautiful charts, spending trends, and personalized financial recommendations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-elevated transition-smooth border-0 shadow-card">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-smooth">
                    <Receipt className="w-8 h-8 text-accent" />
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">Digital Receipts</CardTitle>
                <CardDescription className="text-base">
                  Store, organize, and search through all your receipts with cloud backup and sync.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-card"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Join thousands of users who have taken control of their financial future 
              with ExpenseTracker's powerful and intuitive tools.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6 rounded-xl shadow-elevated">
              <Link to="/signup">
                Start Your Journey Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-xl bg-primary/10">
              <Wallet className="w-8 h-8 text-primary" />
            </div>
          </div>
          <p className="text-lg font-semibold text-foreground mb-2">
            ExpenseTracker
          </p>
          <p className="text-muted-foreground">
            Your trusted financial companion since 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;


// import { Link } from "react-router-dom";
// import { Wallet, Plus, List, User, TrendingUp, DollarSign, Receipt } from "lucide-react";

// const Index = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <div className="hero min-h-screen gradient-primary text-white">
//         <div className="hero-content text-center">
//           <div className="max-w-md">
//             <div className="flex justify-center mb-8">
//               <Wallet className="w-20 h-20" />
//             </div>
//             <h1 className="text-5xl font-bold mb-6">ExpenseTracker</h1>
//             <p className="text-xl mb-8 opacity-90">
//               Take control of your finances. Track, analyze, and optimize your spending with our intuitive expense management platform.
//             </p>
//             <div className="space-y-4">
//               <Link to="/signup" className="btn btn-lg btn-secondary text-white w-full">
//                 Get Started Free
//               </Link>
//               <Link to="/login" className="btn btn-lg btn-outline btn-secondary w-full">
//                 Sign In
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="py-20 bg-base-200">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-foreground mb-4">
//               Everything You Need to Manage Expenses
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Powerful tools to help you track, categorize, and analyze your spending patterns.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <div className="card bg-card shadow-card">
//               <div className="card-body text-center">
//                 <div className="flex justify-center mb-4">
//                   <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
//                     <Plus className="w-8 h-8 text-primary" />
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">Easy Expense Entry</h3>
//                 <p className="text-muted-foreground">
//                   Quickly add expenses with smart categorization and receipt upload capabilities.
//                 </p>
//               </div>
//             </div>

//             <div className="card bg-card shadow-card">
//               <div className="card-body text-center">
//                 <div className="flex justify-center mb-4">
//                   <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
//                     <TrendingUp className="w-8 h-8 text-secondary" />
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">Smart Analytics</h3>
//                 <p className="text-muted-foreground">
//                   Visualize your spending patterns with detailed reports and insights.
//                 </p>
//               </div>
//             </div>

//             <div className="card bg-card shadow-card">
//               <div className="card-body text-center">
//                 <div className="flex justify-center mb-4">
//                   <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
//                     <Receipt className="w-8 h-8 text-accent" />
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">Receipt Management</h3>
//                 <p className="text-muted-foreground">
//                   Store and organize receipts digitally for easy expense verification.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="py-20 bg-card">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-4xl font-bold text-foreground mb-4">
//             Ready to Take Control?
//           </h2>
//           <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
//             Join thousands of users who have simplified their expense tracking with ExpenseTracker.
//           </p>
//           <Link to="/signup" className="btn btn-lg btn-primary">
//             Start Tracking Today
//           </Link>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="footer footer-center p-10 bg-base-200">
//         <aside>
//           <Wallet className="w-12 h-12 text-primary" />
//           <p className="font-bold text-foreground">
//             ExpenseTracker
//           </p>
//           <p className="text-muted-foreground">Your personal finance companion since 2024</p>
//         </aside>
//       </footer>
//     </div>
//   );
// };

// export default Index;

