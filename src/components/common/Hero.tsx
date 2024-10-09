"use client";

import React, { useState } from "react";
import Notification from "./messages/Notification";
import Message from "./messages/Message";
import ButtonLink from "@/components/common/ButtonLink";
import Image from 'next/image'; 
import RadioButton from "../form/buttons/RadioButton";
import Rating from '@/components/form/Rating'
import { FaStar, FaRegStar, FaTimes } from 'react-icons/fa'; 

const Hero: React.FC = () => {
  const [messageVisible, setMessageVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [messageType, setMessageType] = useState<'success' | 'info' | 'warning' | 'error'>('success');
  const [messageText, setMessageText] = useState('This is a success message!');
  const [notificationContent, setNotificationContent] = useState<React.ReactNode>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [rating, setRating] = useState<number>(3);

  const showMessage = (type: 'success' | 'info' | 'warning' | 'error', text: string) => {
    setMessageType(type);
    setMessageText(text);
    setMessageVisible(true);
  };

  const showNotification = (type: 'success' | 'info' | 'warning' | 'error', content: React.ReactNode) => {
    setNotificationContent(content);
    setMessageType(type);
    setNotificationVisible(true);
  };

  const handleShowSuccessMessage = () => {
    showMessage('success', 'Success! Operation completed.');
  };

  const handleShowNotification = () => {
    showNotification('info', (
      <React.Fragment>
        <Image
          alt="avatar"
          src="/images/avatar.png" 
          className="w-10 h-10 rounded-full"
          width={40} // Set a width for the Image component
          height={40} // Set a height for the Image component
        />
        <div className="ml-2">How may I assist you today?</div>
      </React.Fragment>
    ));
  };

  return (
    <section className="relative text-soft dark:text-pale">
      <div className="container mx-auto px-4 py-48">
        <div className="flex flex-wrap -mx-4">
          <div className="mx-auto px-4 text-center w-full lg:w-8/12">
            <p className="font-medium mb-2 text-highlight dark:text-ocean uppercase">
              The Latest
            </p>
            <h1 className="font-extrabold mb-4 text-4xl lg:text-6xl text-deep dark:text-light">
              The Natural Experience
            </h1>
            <p className="font-light mb-6 text-lg">
              Our ability to feel, act and communicate is indistinguishable from
              magic.
            </p>
            <ButtonLink href="#">Get It Now</ButtonLink>

            <div className="p-4">
              <button
                className="bg-green-500 text-white p-2 rounded-md"
                onClick={handleShowSuccessMessage}
              >
                Show Success Message
              </button>
              <button
                className="bg-blue-500 text-white p-2 rounded-md ml-2"
                onClick={handleShowNotification}
              >
                Show Notification
              </button>

              <Notification
                type={messageType}
                visible={notificationVisible}
                onClose={() => setNotificationVisible(false)}
                content={notificationContent}
                position="top-left" // Unique position for this notification
              />
            </div>
            <div>
      <h1>Custom Rating Component</h1>
      
      {/* Basic Example */}
      <Rating
        value={rating}
        onChange={(val) => setRating(val)}
        stars={5}
        cancel={true}
        onIcon="🌟"           // Custom filled icon
        offIcon="🌑"         // Custom unfilled icon
      />

      {/* Read-only Example */}
      <Rating
        value={rating}
        stars={5}
        readonly={true}
        onIcon="🌟"
        offIcon="🌑"
      />

      {/* Disabled Example */}
      <Rating
        value={rating}
        stars={5}
        disabled={true}
        onIcon="🌟"
        offIcon="🌑"
      />
      <Rating
        value={rating}
        onChange={(val) => setRating(val)}
        stars={5}
        cancel={true}
        onIcon={<FaStar />}              // Custom filled star icon
        offIcon={<FaRegStar />}          // Custom empty star icon
        cancelIcon={<FaTimes />}         // Custom cancel icon
        activeColor="#ffd700"            // Custom active (filled) color
        inactiveColor="#dcdcdc"          // Custom inactive (unfilled) color
      />

      {/* Read-only Example */}
      <Rating
        value={rating}
        stars={5}
        readonly={true}
        onIcon={<FaStar />}
        offIcon={<FaRegStar />}
        activeColor="#ffd700"
        inactiveColor="#dcdcdc"
      />

      {/* Disabled Example */}
      <Rating
        value={rating}
        stars={5}
        onIcon={<FaStar />}
        offIcon={<FaRegStar />}
        activeColor="#ffd700"
      />
      <Rating
        value={rating}
        onChange={(val) => setRating(val)}
        stars={5}
        onIcon={<FaStar />}         // Filled icon
        offIcon={<FaRegStar />}     // Empty icon
        activeColor="#ffd700"       // Gold color for active stars
        inactiveColor="#dcdcdc"     // Gray color for inactive stars
      />

      {/* Rating with 7 stars */}
      <Rating
        value={rating}
        onChange={(val) => setRating(val)}
        stars={9}                   // Custom number of stars
        onIcon={<FaStar />}
        offIcon={<FaRegStar />}
        activeColor="#ff4500"        // Custom active color
        inactiveColor="#dcdcdc"
      />
      <Rating
  value={rating}
  onChange={(val) => setRating(val)}
  stars={5}                   // Number of stars
  cancel={false}                // Show the cancel icon before the stars
  activeColor="text-yellow-400"
  inactiveColor="text-gray-400"
/>
    </div>

            <div className="p-4">
              <button
                className="bg-green-500 text-white p-2 rounded-md"
                onClick={() => showMessage('success', 'Success! Operation completed.')}
              >
                Show Unique Success
              </button>
              <button
                className="bg-highlight text-black p-2 rounded-md ml-2"
                onClick={() => showMessage('info', 'Here is some important information for you!')}
              >
                Show Unique Info
              </button>
              <button
                className="bg-gold text-black p-2 rounded-md ml-2"
                onClick={() => showMessage('warning', 'This is a unique warning message!')}
              >
                Show Unique Warning
              </button>
              <button
                className="bg-alert text-white p-2 rounded-md ml-2"
                onClick={() => showMessage('error', 'An error occurred in the process!')}
              >
                Show Unique Error
              </button>

              <Message
                type={messageType}
                message={messageText}
                visible={messageVisible}
                onClose={() => setMessageVisible(false)}
                position="bottom-center" // Unique position for this message
              />
            </div>

            {/* You can add more unique messages or notifications with different positions here */}
            <div className="p-4">
              <button
              type="button"
                className="bg-red-500 text-white p-2 rounded-md"
                onClick={() => showMessage('error', 'This is another error message!')}
              >
                Show Another Error Message
              </button>

              <Message
                type="error"
                message="Another unique error occurred!"
                visible={messageVisible}
                onClose={() => setMessageVisible(false)}
                position="bottom-left" // Unique position for this message
              />
            </div>
            <div>
      <h2 className="mb-4">Select an option:</h2>
      <RadioButton
        name="exampleRadio"
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" },
        ]}
        selectedValue={selectedOption}
        onChange={setSelectedOption}
      />
    </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
