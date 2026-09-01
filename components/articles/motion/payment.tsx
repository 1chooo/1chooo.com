"use client"

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const recipients = [
  {
    name: "Hugo 1",
    avatar: "https://github.com/1chooo.png",
  },
  {
    name: "Hugo 2",
    avatar: "https://github.com/1chooo.png",
  },
  {
    name: "Hugo 3",
    avatar: "https://github.com/1chooo.png",
  },
];

function Payment() {
  const [selectedRecipient, setSelectedRecipient] = useState<{ name: string, avatar: string } | null>(null);
  const [showPopover, setShowPopover] = useState(false);
  const [btnVal, setBtnVal] = useState("Make Payment");
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = () => {
    if (btnVal === "Sent") {
      // Reset to initial state
      setBtnVal("Make Payment");
      setShowCheckIcon(false);
      setSelectedRecipient(null);
      setAmount("");
      setMessage("");
    } else if (showModal) {
      // Complete payment
      setBtnVal("Sent");
      setShowCheckIcon(true);
      setShowModal(false);

      // Auto reset after 2 seconds
      setTimeout(() => {
        setBtnVal("Make Payment");
        setShowCheckIcon(false);
        setSelectedRecipient(null);
        setAmount("");
        setMessage("");
      }, 2000);
    } else {
      // Open payment modal
      setShowModal(true);
      setBtnVal("Send");
    }
  };

  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] py-8 px-6 sm:py-10 sm:px-10 flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <AnimatePresence initial={true}>
          {showModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, type: "tween", stiffness: 300 }}
              exit={{ opacity: 0, scale: 0 }}
              key="box"
              className="w-87.5 h-75 rounded-3xl p-5"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h1 className=" font-bold">Payment</h1>
                  <img
                    src="https://github.com/1chooo.png"
                    alt="logo"
                    className="w-8 h-8"
                  />
                </div>
                <p className=" font-medium text-sm">
                  Please enter the details
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                {/* Recipient Selection using Popover */}
                <Popover open={showPopover} onOpenChange={setShowPopover}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-[1.5px] border-gray-200 rounded-3xl px-3 py-2 h-auto hover:bg-gray-50"
                    >
                      {selectedRecipient ? (
                        <div className="flex items-center gap-3">
                          <img
                            src={selectedRecipient.avatar}
                            alt={selectedRecipient.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-base">
                            {selectedRecipient.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">To</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-77.5 p-0" align="start">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md">
                      {recipients.map((recipient, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSelectedRecipient(recipient);
                            setShowPopover(false);
                          }}
                          className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                        >
                          <img
                            src={recipient.avatar}
                            alt={recipient.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm">{recipient.name}</span>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Amount Input */}
                <input
                  type="number"
                  placeholder="$25"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border-[1.5px] border-gray-200 rounded-3xl px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                  style={{
                    appearance: 'textfield',
                    MozAppearance: 'textfield',
                    WebkitAppearance: 'none'
                  }}
                />

                {/* Message Input */}
                <input
                  type="text"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border-[1.5px] border-gray-200 rounded-3xl px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment Button */}
        <Button
          ref={btnRef}
          onClick={handleClick}
          variant="outline"
          className={`bg-white hover:bg-gray-50 shadow-sm ${btnVal === "Sent" ? "text-green-500" : "text-blue-600"
            } font-medium flex items-center justify-center border-[1.5px] border-white px-8 py-1.5 w-fit min-w-25 rounded-3xl gap-2 h-auto`}
        >
          <AnimatePresence>
            {showCheckIcon && (
              <motion.svg
                key="check-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{ duration: 0.5 }}
                className="w-5 h-5 text-green-500"
              >
                <motion.path d="M20 6L9 17l-5-5" />
              </motion.svg>
            )}
          </AnimatePresence>
          {btnVal}
        </Button>
      </div>
    </div>
  );
}

export { Payment };
