"use client";

import React, { useState } from "react";
import { Check, Star } from "lucide-react";
import toast from "react-hot-toast";
import { useMembershipPlans, type MembershipPlan } from "../actions/membership";
import { initiatePayment, type PaymentRequest } from "../actions/payment";

export default function Membership() {
  const { data: plans = [], isLoading: loading, error } = useMembershipPlans();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  if (error) {
    console.error('Error fetching membership plans:', error);
  }


  const handleJoinPlan = async (planName: string, price: number) => {
    setSelectedPlan(planName);
    
    if (price === 0) {
      // Free plan - immediate access
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing
      toast.success(`🎉 Welcome to GoWomen! Your ${planName} membership has been activated.`);
      setSelectedPlan(null);
      return;
    }

    // For paid plans, initiate payment
    const paymentData: PaymentRequest = {
      user_id: 1, // Demo user ID - in real app, use actual user ID from auth
      amount: price,
      payment_method: "card", // or "mpesa", "paypal"
      plan_type: planName.toLowerCase()
    };

    try {

      const result = await initiatePayment(paymentData);

      if (result.success) {
        toast.success(`💰 Payment initiated for ${planName} plan! Reference: ${result.data.reference} Amount: $${price}`);
        // In real app, redirect to payment page or show payment modal
      } else {
        toast.error(`❌ Failed to initiate payment: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(`🔴 Payment service temporarily unavailable. Please ensure backend is running and properly configured.`);
    } finally {
      setSelectedPlan(null);
    }
  };

  if (loading) {
    return (
      <section id="membership" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <div className="text-gray-600">Loading membership plans...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="membership" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Membership
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our community with a plan that fits your goals and budget. 
            All plans include access to our supportive network of women in tech.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 border-2 transition-all duration-300 transform hover:-translate-y-2 ${
                index === 1 
                  ? 'border-primary shadow-xl scale-105 relative' 
                  : 'border-gray-200 hover:border-primary'
              }`}
            >
              {index === 1 && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-white" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                {plan.name}
              </h3>
              
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-gray-600">/month</span>
                {plan.price === 0 && (
                  <div className="text-sm text-green-600 font-semibold mt-1">
                    Forever Free
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-center mb-6 text-sm">
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleJoinPlan(plan.name, plan.price)}
                disabled={selectedPlan === plan.name}
                className={`w-full py-3 px-6 rounded-full font-medium transition-all duration-200 relative overflow-hidden group ${
                  index === 1
                    ? 'bg-primary hover:bg-primary-dark text-white hover:shadow-lg hover:shadow-primary/30'
                    : plan.price === 0
                    ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg hover:shadow-green-600/30'
                    : 'bg-gray-900 hover:bg-gray-800 text-white hover:shadow-lg'
                } ${selectedPlan === plan.name ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
              >
                {selectedPlan === plan.name ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">
                      {plan.price === 0 ? 'Get Started Free' : `Join ${plan.name}`}
                    </span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              💰 Money-Back Guarantee
            </h4>
            <p className="text-gray-600">
              Try any paid plan risk-free. If you&apos;re not satisfied within 30 days, 
              we&apos;ll give you a full refund. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}