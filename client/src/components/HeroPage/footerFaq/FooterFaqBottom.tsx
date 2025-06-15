import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Type definitions
interface Answer {
  text: string;
  link: string;
}

interface FAQ {
  question: string;
  answers: Answer[];
}

const FooterFaqBottom: React.FC = () => {
  const faqs: FAQ[] = [
    {
      question: "Popular events and sports news",
      answers: [
        { text: "Casino Blackjack", link: "" },
        { text: "Lucky Plinko", link: "" },
        { text: "VIP Roulette", link: "" },
        { text: "Lucky Slots", link: "" },
        { text: "Dice", link: "" },
        { text: "Crash", link: "" },
      ],
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="text-sm text-white bg-[#212121] rounded-md">
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="py-3 px-4">
            <button
              className="flex justify-between w-full font-[500] text-[14px] lg:text-[19px] outline-0 cursor-pointer uppercase"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openIndex === index && (
              <div className="mt-2 text-sm border-t border-black p-2">
                <h1 className="text-md font-bold uppercase">main</h1>
                {faq.answers.map((answer, answerIndex) => (
                  <div key={answerIndex}>
                    <a
                      href={answer.link}
                      className="block py-1 text-[#c2c2c2] hover:text-white duration-300"
                    >
                      {answer.text}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterFaqBottom;
