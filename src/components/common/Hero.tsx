"use client";

import React, { useState } from "react";
import Notification from "../messages/Notification";
import Message from "../messages/Message";
import ButtonLink from "@/components/common/ButtonLink";
import Image from 'next/image'; 
import RadioButton from "../form/buttons/RadioButton";
import Rating from '@/components/form/Rating';
import { FaStar, FaRegStar, FaTimes, FaSyncAlt, FaTrashAlt, FaGlobe, FaCloudUploadAlt, FaShare, FaTrash, FaRedo, FaEdit } from 'react-icons/fa';
import SpeedDial from "../form/buttons/SpeedDial";
import CommandButton from "../form/buttons/CommandButton";
import Badge from "./Badge";

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
          width={40} 
          height={40} 
        />
        <div className="ml-2">How may I assist you today?</div>
      </React.Fragment>
    ));
  };

  const defaultAction = () => {
    alert('Default Action Triggered');
  };

  const menuItems = [
    { label: 'Update', icon: <FaSyncAlt />, action: () => alert('Update Action') },
    { label: 'Delete', icon: <FaTrashAlt />, action: () => alert('Delete Action') },
    { label: 'React Website', icon: <FaGlobe />, action: () => alert('React Website Action') },
    { label: 'Upload', icon: <FaCloudUploadAlt />, action: () => alert('Upload Action') }
  ];

  const Items = [
    {
      label: "Share",
      icon: FaShare,
      action: () => alert("Share Action"),
    },
    {
      label: "Delete",
      icon: FaTrash,
      action: () => alert("Delete Action"),
    },
    {
      label: "Redo",
      icon: FaRedo,
      action: () => alert("Redo Action"),
    },
    {
      label: "Edit",
      icon: FaEdit,
      action: () => alert("Edit Action"),
    },
  ];

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
              Our ability to feel, act and communicate is indistinguishable from magic.
            </p>
            <ButtonLink href="#">Get It Now</ButtonLink>

            <div className="p-4">
            <div className="flex space-x-2">
      {/* Different badges with various props */}
      <Badge text="New" color="bg-green-500" size="small" />
      <Badge text="Sale" color="bg-red-500" size="medium" rounded />
      <Badge text="Updated" color="bg-blue-500" size="large" />
      <Badge text="Beta" color="bg-yellow-500" size="small"  />
      <div className="size-5">
        
      <Badge text="2e4r" color="bg-gray-500" size="extra-small" rounded/></div> {/* Extra small badge for notifications */}
    </div>
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
                position="top-left"
              />
            </div>

            <div>
              <h1>Custom Rating Component</h1>
              <Rating
                value={rating}
                onChange={(val) => setRating(val)}
                stars={5}
                cancel={true}
                onIcon="🌟"
                offIcon="🌑"
              />

              <Rating
                value={rating}
                stars={5}
                readonly={true}
                onIcon="🌟"
                offIcon="🌑"
              />

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
                onIcon={<FaStar />}
                offIcon={<FaRegStar />}
                cancelIcon={<FaTimes />}
                activeColor="#ffd700"
                inactiveColor="#dcdcdc"
              />

              <Rating
                value={rating}
                stars={5}
                readonly={true}
                onIcon={<FaStar />}
                offIcon={<FaRegStar />}
                activeColor="#ffd700"
                inactiveColor="#dcdcdc"
              />

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
                onIcon={<FaStar />}
                offIcon={<FaRegStar />}
                activeColor="#ffd700"
                inactiveColor="#dcdcdc"
              />

              <Rating
                value={rating}
                onChange={(val) => setRating(val)}
                stars={9}
                onIcon={<FaStar />}
                offIcon={<FaRegStar />}
                activeColor="#ff4500"
                inactiveColor="#dcdcdc"
              />

              <Rating
                value={rating}
                onChange={(val) => setRating(val)}
                stars={5}
                activeColor="text-yellow-400"
                inactiveColor="text-gray-400"
              />
            </div>

            <div className="space-y-10">
              <div className="p-10">
                <CommandButton
                  defaultAction={defaultAction}
                  menuItems={menuItems}
                  buttonLabel="Save"
                />
              </div>

              <div className="p-10">
                <CommandButton
                  defaultAction={defaultAction}
                  menuItems={menuItems}
                  buttonLabel="Save"
                />
              </div>

              <section className="relative text-soft dark:text-pale">
      <div className="container mx-auto px-4 py-48">
        <div className="flex justify-center">
          <SpeedDial menuItems={Items} direction="top-to-bottom" />
        </div>
      </div>
    </section>
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
                position="bottom-center"
              />
            </div>

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
                position="bottom-left"
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
