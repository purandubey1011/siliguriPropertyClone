import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqData = [
  {
    id: 1,
    question: "How do I book a home?",
    answer:
      "You can book a home easily through our website by selecting your preferred property, choosing your dates, and completing the booking form.",
  },
  {
    id: 2,
    question: "What are the payment options?",
    answer:
      "We accept all major credit cards, bank transfers, and various digital payment methods for your convenience.",
  },
  {
    id: 3,
    question: "What is your cancellation policy?",
    answer:
      "Our cancellation policy allows for a full refund if canceled at least 14 days before your booking date. Please check the terms and conditions for more details.",
  },
];

const CommonQuestions = () => {
  const [openAccordionId, setOpenAccordionId] = useState(1);

  const handleAccordionClick = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  return (
    <div className="font-sans px-4 md:px-0">
      <div className="max-w-7xl mx-auto py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left Column: Title */}
          <div className="text-center md:text-left">
            <p className="font-bold bg-pink-600 text-white py-1 px-4 w-fit rounded-full text-sm uppercase tracking-wider mb-3">
              FAQ'S
            </p>
            <h2 className="text-4xl sm:text-5xl font-medium text-black">
              Common Questions
            </h2>
          </div>

          {/* Right Column: Accordion */}
          <div className="space-y-5">
            {faqData.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => handleAccordionClick(faq.id)}
                  className="w-full flex justify-between items-center text-left px-6 py-5 font-medium text-gray-800 hover:bg-gray-50 focus:outline-none text-lg"
                >
                  <span>{faq.question}</span>
                  {openAccordionId === faq.id ? (
                    <FiChevronUp className="text-gray-500" />
                  ) : (
                    <FiChevronDown className="text-gray-500" />
                  )}
                </button>

                {openAccordionId === faq.id && (
                  <div className="px-6 pb-5 text-gray-600 border-t border-gray-100 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonQuestions;
