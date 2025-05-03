"use client";
import { useState, useEffect } from "react";
import { ChevronDown, MessageSquare, Send } from "lucide-react";
import { CountryPrefix, countryPrefixes } from "@/data/countryPrefixes";

const WhatsAppRedirect = () => {
  // State hooks
  const [selectedPrefix, setSelectedPrefix] = useState<CountryPrefix>(
    countryPrefixes[0]
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [customMessage, setCustomMessage] = useState<string>("");
  const [includeMessage, setIncludeMessage] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  // Validate phone number
  useEffect(() => {
    const phoneNumberRegex = /^\d{7,15}$/;
    setIsValid(phoneNumberRegex.test(phoneNumber));
  }, [phoneNumber]);

  // Handle phone number input
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
  };

  // Generate WhatsApp link
  const generateWhatsAppLink = (): string => {
    const formattedNumber = selectedPrefix.prefix + phoneNumber;
    const baseUrl = "https://wa.me/";
    const messageParam =
      includeMessage && customMessage
        ? `?text=${encodeURIComponent(customMessage)}`
        : "";

    return `${baseUrl}${formattedNumber.replace(/\+/g, "")}${messageParam}`;
  };

  // Open WhatsApp
  const openWhatsApp = () => {
    if (isValid) {
      window.open(generateWhatsAppLink(), "_blank");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black rounded-xl shadow-lg  p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <MessageSquare className="mr-2 text-green-500" />
        WhatsApp Redirect
      </h2>

      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="flex">
            <div className="relative">
              <button
                type="button"
                className="flex items-center justify-between w-28 px-3 py-2 border border-gray-300 rounded-l-md bg-black text-sm font-medium text-gray-700 h-full "
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="flex items-center">
                  <span className="mr-1">{selectedPrefix.flag}</span>
                  <span>{selectedPrefix.prefix}</span>
                </span>
                <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="absolute z-10 mt-1 w-56 bg-black shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
                  <ul className="py-1">
                    {countryPrefixes.map((country) => (
                      <li key={country.code}>
                        <button
                          type="button"
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedPrefix(country);
                            setDropdownOpen(false);
                          }}
                        >
                          <span className="mr-2">{country.flag}</span>
                          <span>{country.name}</span>
                          <span className="ml-2 text-gray-500">
                            {country.prefix}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Enter phone number"
              className="flex-1 min-w-0 block px-3 py-2 border border-l-0 border-gray-300 rounded-r-md   sm:text-sm"
            />
          </div>

          {phoneNumber && !isValid && (
            <p className="text-sm text-red-500 mt-1">
              Please enter a valid phone number
            </p>
          )}
        </div>
        <div className="flex items-center">
          <div className="flex items-center h-5">
            <input
              id="includeMessage"
              name="includeMessage"
              type="checkbox"
              checked={includeMessage}
              onChange={() => setIncludeMessage(!includeMessage)}
              className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="includeMessage"
              className="font-medium text-gray-700"
            >
              Include Custom Message
            </label>
          </div>
        </div>

        {includeMessage && (
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-gray-700"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Type your message here..."
              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border border-gray-300 rounded-md p-4"
            />
          </div>
        )}

        <button
          type="button"
          onClick={openWhatsApp}
          disabled={!isValid}
          className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isValid
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          <Send size={16} className="mr-2" />
          Open in WhatsApp
        </button>
      </div>
    </div>
  );
};

export default WhatsAppRedirect;
