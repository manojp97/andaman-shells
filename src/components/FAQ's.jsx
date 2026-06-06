import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    value: "item-1",
    trigger: "Q1. How do I reset my password?",
    content:
      "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours.",
  },
  {
    value: "item-2",
    trigger: "Q2. Can I change my subscription plan?",
    content:
      "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.",
  },
  {
    value: "item-3",
    trigger: "Q3. What payment methods do you accept?",
    content:
      "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
  },
  {
    value: "item-4",
    trigger: "Q4. How do I reset my password?",
    content:
      "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours.",
  },
  {
    value: "item-5",
    trigger: "Q5. Can I change my subscription plan?",
    content:
      "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.",
  },
  {
    value: "item-6",
    trigger: "Q6. What payment methods do you accept?",
    content:
      "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
  },
];

const FAQs = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <h2 className="mb-8 text-center text-2xl sm:text-3xl md:text-4xl font-bold">
        Andaman Tour FAQ's
      </h2>

      <Accordion type="single" collapsible className="w-full space-y-4">

        {items.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            className="bg-gray-100 px-4 sm:px-6 shadow-sm border-none"
          >
            <AccordionTrigger className="text-left text-sm sm:text-base md:text-lg font-semibold hover:no-underline">
              {item.trigger}
            </AccordionTrigger>

            <AccordionContent className="text-gray-600 leading-6 pb-4">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}

      </Accordion>

    </div>
  );
};

export default FAQs;