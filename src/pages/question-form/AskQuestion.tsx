import { ChevronLeft } from "lucide-react";
import { useState } from "react";

export default function AskQuestion() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    question: "",
    options: [] as string[],
  });

  const options = [
    "I am under 18 years old",
    "I am between 18 and 30 years old",
    "I am over 30 years old",
    "Tax has recently appeared",
    "I have never been to a Advisor",
    "I have been facing for years",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (value: string) => {
    if (form.options.includes(value)) {
      setForm({
        ...form,
        options: form.options.filter((v) => v !== value),
      });
    } else {
      setForm({
        ...form,
        options: [...form.options, value],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="w-full max-w-[874px] bg-white rounded-[26px] shadow-lg  p-8 m-6">
      <button className="flex items-center  text-[18px] text-[#5F6057] mb-4">
        <ChevronLeft size={18} className="mr-1 text-[#5F6057]" />
        Back
      </button>
      <div className="w-full p-8 m-6">
        <h1 className="font-bricolage sub-heading font-extrabold text-center mb-8">
          Ask a Question
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full h-[60px] max-w-[690px] bg-[#FBFBFA] border border-[#E6E6E1] rounded-[14px] text-[18px] text-[#9D9E98] px-4 py-3 outline-none"
          />

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="max-w-[690px] h-[60px] w-full bg-[#FBFBFA] text-[18px] text-[#9D9E98] border border-[#E6E6E1] rounded-[14px] px-4 py-3"
          />

          <textarea
            name="question"
            placeholder="Write your question"
            rows={5}
            value={form.question}
            onChange={handleChange}
            className="max-w-[690px] w-full bg-[#FBFBFA] text-[18px] placeholder:text-[#9D9E98] border border-[#E6E6E1] rounded-[14px] px-4 py-3"
          />

          <p className="text-sm text-gray-600 mt-4">
            Help us better understand your situation
          </p>

          <div className="grid grid-cols-2 gap-3 text-[16px] text-[#9D9E98] mb-6">
            {options.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={() => handleCheckbox(option)}
                  checked={form.options.includes(option)}
                  className="accent-[#007BFF]"
                />
                {option}
              </label>
            ))}
          </div>
        </form>{" "}
        <button
          type="submit"
          className="max-w-[690px] h-[60px] w-full mt-6 py-3 font-bricolage rounded-full text-[24px] text-[#FFFFFF] font-extrabold border border-[#34352E47] bg-[linear-gradient(180deg,#54564A_0%,#34352E_44.72%)] shadow-[0px_-3px_3px_0px_#272822_inset,0px_5px_8px_0px_#2E2F289E_inset,0px_6px_10px_0px_#34352E26] hover:opacity-90 transition
  "
        >
          Submit Question
        </button>
      </div>
    </div>
  );
}
