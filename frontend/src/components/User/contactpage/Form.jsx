import React, { useState } from 'react';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

const FormField = ({ label, children }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center py-5 border-b border-gray-300">
    <label className="w-full sm:w-1/4 text-gray-500 mb-2 sm:mb-0 pr-4 flex-shrink-0">{label}</label>
    <div className="w-full sm:w-3/4">{children}</div>
  </div>
);

const RadioInput = ({ name, value, label, selectedValue, onChange }) => {
  const isSelected = value === selectedValue;
  return (
    <label className="flex items-center cursor-pointer space-x-3">
      <input
        type="radio"
        name={name}
        value={value}
        checked={isSelected}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          isSelected ? 'border-pink-500 bg-pink-500' : 'border-gray-400'
        }`}
      >
        {isSelected && <FiCheck className="text-white text-sm" />}
      </div>
      <span className={`transition-colors duration-300 ${isSelected ? 'text-pink-500' : 'text-gray-600'}`}>
        {label}
      </span>
    </label>
  );
};

const Form = () => {
  const [subject, setSubject] = useState('Booking Inquiry');
  const subjectOptions = ['Booking Inquiry', 'General Question', 'Complaint/Feedback', 'Other'];

  return (
    <div className="font-sans bg-white text-gray-900 py-14 px-6 md:px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-gray-700 mb-16">
          Send Us a Message
        </h2>

        <form>
          <div className="space-y-4">
            <FormField label="Full Name">
              <input
                type="text"
                placeholder="Please enter your name."
                className="w-full bg-transparent focus:outline-none placeholder:text-gray-400 "
              />
            </FormField>

            <FormField label="Email Address">
              <input
                type="email"
                placeholder="Please enter your email ID."
                className="w-full bg-transparent focus:outline-none placeholder:text-gray-400 "
              />
            </FormField>

            <FormField label="Phone Number">
              <input
                type="tel"
                placeholder="Share your mobile number."
                className="w-full bg-transparent focus:outline-none placeholder:text-gray-400 "
              />
            </FormField>

            <FormField label="Subject">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {subjectOptions.map((option) => (
                  <RadioInput
                    key={option}
                    name="subject"
                    value={option}
                    label={option}
                    // selectedValue={subject}
                    // onChange={(e) => setSubject(e.target.value)}
                  />
                ))}
              </div>
            </FormField>

            <FormField label="Message">
              <textarea
                placeholder="Please write your message here."
                rows="3"
                className="w-full bg-transparent focus:outline-none placeholder:text-gray-400  resize-none"
              ></textarea>
            </FormField>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-10">
            <button
              type="submit"
              className="bg-pink-600 text-white font-semibold rounded-full px-10 py-4 inline-flex items-center space-x-3 transition-all duration-300 hover:bg-pink-700 shadow-md shadow-pink-500/20"
            >
              <span>Send Message</span>
              <FiArrowRight />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
