import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Page = () => {
  const questions = [
    "What types of food do you offer?",
    "How can I place an order?",
    "Do you offer home delivery?",
    "What are the restaurant’s operating hours?",
    "Can I customize my order?",
    "Do you have vegan or vegetarian options?",
    "Are there any special offers or discounts?",
    "How do I contact customer support?",
  ];

  const answers = [
    "We offer a variety of dishes including Indian, Continental, and Chinese cuisines.",
    "You can place an order through our website or mobile app.",
    "Yes, we offer home delivery services within a certain radius from our restaurant.",
    "Our restaurant is open from 10 AM to 10 PM every day.",
    "Yes, you can customize most dishes by adding or removing ingredients.",
    "Yes, we have a wide range of vegan and vegetarian dishes available.",
    "Yes, we offer special discounts during holidays and festive seasons. Check our offers page for updates.",
    "You can contact customer support through our website or by calling our helpline number.",
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50 mt-0">
      <div className="w-full md:w-3/4 lg:w-1/2 px-4 py-4 sm:py-6">
        <Accordion type="single" collapsible>
          {questions.map((question, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-lg sm:text-xl font-light text-gray-800">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base font-light text-gray-600">
                {answers[index]}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Page;
