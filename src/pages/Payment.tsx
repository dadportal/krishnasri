import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UpiQrCode } from "@/components/payment/UpiQrCode";
import { 
  CreditCard, 
  Shield, 
  Check, 
  Sparkles,
  Loader2,
  QrCode
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const plans = [
  { id: "starter", name: "Starter", price: 29, features: ["5 AI generations/day", "Basic templates", "Email support"] },
  { id: "pro", name: "Pro", price: 79, features: ["Unlimited generations", "All templates", "Priority support", "API access"], popular: true },
  { id: "enterprise", name: "Enterprise", price: 199, features: ["Everything in Pro", "Custom AI training", "Dedicated support", "SLA"] },
];

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const plan = plans.find((p) => p.id === selectedPlan)!;
      
      // Create payment record
      const { error } = await supabase.from("payments").insert({
        user_id: user?.id,
        amount: plan.price,
        currency: "USD",
        payment_method: "upi",
        metadata: { plan: selectedPlan },
      });

      if (error) throw error;

      // Open UPI payment (masked as GuideSoft Pay)
      const upiId = "8884162999-4@ybl";
      const amount = plan.price * 83; // Convert to INR
      const upiLink = `upi://pay?pa=${upiId}&pn=GuideSoft&am=${amount}&cu=INR&tn=GuideSoft%20${plan.name}%20Plan`;
      
      // For mobile, try to open UPI app
      if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
        window.location.href = upiLink;
      } else {
        toast({
          title: "Payment Instructions",
          description: `Pay ₹${amount.toLocaleString()} to GuideSoft Pay to activate your ${plan.name} plan.`,
        });
      }
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Complete Your <span className="gradient-text">Purchase</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose your plan and complete payment securely
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Plan Selection */}
            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="font-display text-xl font-bold mb-6">Select Your Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <motion.button
                    key={plan.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative p-6 rounded-xl text-left transition-all ${
                      selectedPlan === plan.id
                        ? "bg-primary/10 border-2 border-primary"
                        : "bg-secondary/30 border-2 border-transparent hover:border-border"
                    }`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 right-4">Popular</Badge>
                    )}
                    <div className="font-display text-lg font-bold">{plan.name}</div>
                    <div className="text-3xl font-bold mt-2">${plan.price}<span className="text-sm text-muted-foreground">/mo</span></div>
                    <ul className="mt-4 space-y-2">
                      {plan.features.map((f) => (
                        <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                          <Check className="w-4 h-4 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="glass rounded-2xl p-8">
              <h2 className="font-display text-xl font-bold mb-6">Payment Method</h2>
              
              <div className="space-y-4">
                {/* UPI Payment with QR */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-6 bg-secondary/30 rounded-xl border-2 border-primary"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <QrCode className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">GuideSoft Pay (UPI)</div>
                      <div className="text-sm text-muted-foreground">Scan QR code with any UPI app</div>
                    </div>
                  </div>
                  
                  <UpiQrCode
                    upiId="8884162999-4@ybl"
                    amount={(plans.find((p) => p.id === selectedPlan)?.price || 0) * 83}
                    name="GuideSoft"
                    note={`GuideSoft ${plans.find((p) => p.id === selectedPlan)?.name} Plan`}
                    size={220}
                  />
                </motion.div>

                {/* Card Payment (Coming Soon) */}
                <div className="p-4 bg-secondary/20 rounded-xl opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-muted-foreground">Coming soon</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-8 p-4 bg-secondary/30 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span>Plan</span>
                  <span className="font-medium">{plans.find((p) => p.id === selectedPlan)?.name}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Price (USD)</span>
                  <span>${plans.find((p) => p.id === selectedPlan)?.price}/month</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-border">
                  <span>Total (INR)</span>
                  <span>₹{((plans.find((p) => p.id === selectedPlan)?.price || 0) * 83).toLocaleString()}</span>
                </div>
              </div>

              <Button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full mt-6 h-14 text-lg gap-2"
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Shield className="w-5 h-5" />
                )}
                {isProcessing ? "Processing..." : "Pay Securely"}
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                🔒 Secured by 256-bit encryption
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
