import { useEffect, useState } from "react";
import API from "@/api/api";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);

  const fetchFaqs = async () => {
    try {
      const res = await API.get("/faqs");

      console.log("FAQ API:", res.data);

      setFaqs(res.data?.data || []);
    } catch (error) {
      console.log("FAQ ERROR:", error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <h2 className="mb-8 text-center text-2xl sm:text-3xl md:text-4xl font-bold">
        Andaman Tour FAQ's
      </h2>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.length === 0 ? (
          <p className="text-center text-gray-500">No FAQs Found</p>
        ) : (
          faqs.map((item) => (
            <AccordionItem
              key={item._id}
              value={String(item._id)}
              className="bg-gray-100 px-4 sm:px-6 shadow-sm border-none"
            >
              <AccordionTrigger className="text-left text-sm sm:text-base md:text-lg font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>

              <AccordionContent className="text-gray-600 leading-6 pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))
        )}
      </Accordion>
    </div>
  );
};

export default FAQs;
