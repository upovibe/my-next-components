"use client";

import React, { useState, useEffect } from "react";
// import { useRouter } from 'next/router';
import Notification from "../messages/Notification";
import Message from "../messages/Message";
import ButtonLink from "@/components/common/ButtonLink";
import Image from "next/image";
import RadioButton from "../form/buttons/RadioButton";
import Rating from "@/components/form/Rating";
import {
  FaStar,
  FaRegStar,
  FaTimes,
  FaSyncAlt,
  FaTrashAlt,
  FaGlobe,
  FaCloudUploadAlt,
  FaShare,
  FaTrash,
  FaRedo,
  FaEdit,
} from "react-icons/fa";
import SpeedDial from "../form/buttons/SpeedDial";
import CommandButton from "../form/buttons/CommandButton";
import Badge from "./Badge";
import Avatar from "./Avatar";
import ProgressLoader from "../loader/ProgressLoader";
import SpinnerLoader from "../loader/SpinnerLoader";
import SkeletonLoader from "../loader/SkeletonLoader";
import Divider from "./Divider";
import SlidingCheckbox from "./SlidingCheckbox";
import ButtonAction from "../form/buttons/ButtonAction";
import Textarea from "../form/textareas/Textarea";

const Hero: React.FC = () => {
  // const router = useRouter();
  const [messageVisible, setMessageVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [messageType, setMessageType] = useState<
    "success" | "info" | "warning" | "error"
  >("success");
  const [messageText, setMessageText] = useState("This is a success message!");
  const [notificationContent, setNotificationContent] =
    useState<React.ReactNode>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [rating, setRating] = useState<number>(3);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // Local state for the checkbox
  const [textValue, setTextValue] = useState("");

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked); // Update the state when the checkbox changes
    console.log(checked); // Log the new state
  };

  useEffect(() => {
    const simulateLoading = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 3000); // Simulating a page load
    };

    simulateLoading();
  }, []);

  const showMessage = (
    type: "success" | "info" | "warning" | "error",
    text: string
  ) => {
    setMessageType(type);
    setMessageText(text);
    setMessageVisible(true);
  };

  const showNotification = (
    type: "success" | "info" | "warning" | "error",
    content: React.ReactNode
  ) => {
    setNotificationContent(content);
    setMessageType(type);
    setNotificationVisible(true);
  };

  const handleShowSuccessMessage = () => {
    showMessage("success", "Success! Operation completed.");
  };

  const handleShowNotification = () => {
    showNotification(
      "info",
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
    );
  };

  const defaultAction = () => {
    alert("Default Action Triggered");
  };

  const menuItems = [
    {
      label: "Update",
      icon: <FaSyncAlt />,
      action: () => alert("Update Action"),
    },
    {
      label: "Delete",
      icon: <FaTrashAlt />,
      action: () => alert("Delete Action"),
    },
    {
      label: "React Website",
      icon: <FaGlobe />,
      action: () => alert("React Website Action"),
    },
    {
      label: "Upload",
      icon: <FaCloudUploadAlt />,
      action: () => alert("Upload Action"),
    },
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

  // const handleAvatarClick = () => {
  //   router.push('https://primereact.org/avatar/'); // Navigate to the user's profile page
  // };

  return (
    <section className="relative text-soft dark:text-pale">
      <div className="relative">
        {/* <ProgressLoader 
  isLoading={true} 
  colors={['#ff0000', '#00ff00', '#0000ff']} 
  className="my-custom-loader-class"
  height="6px" 
/> */}

        <h1 className="text-center text-3xl font-bold mt-10">
          Welcome to the App
        </h1>
        <p className="text-center mt-4">Content of the page goes here.</p>
      </div>
      <SkeletonLoader width="w-64" height="h-8" />

      <div className="relative">
        <div>
          <h1>Welcome to My App</h1>
          {loading && <SpinnerLoader show={loading} />}
        </div>
        {/* <SpinnerLoader size="h-16 w-16" color="border-red-500" thickness="border-t-8" /> */}

        <h1 className="text-center text-3xl font-bold mt-10">
          Welcome to the App
        </h1>
        <p className="text-center mt-4">Content of the page goes here.</p>
      </div>
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
            <ButtonAction
              onClick={() => console.log("Another action!")}
              className="bg-blue-500 hover:bg-blue-700 text-purple-600 focus:ring-ocean/50"
            >
              Another Button
            </ButtonAction>
            <div>
              <Textarea
                placeholder="Enter your text..."
                label="Your Label"
                floatingLabel
                value={textValue}
                onChange={setTextValue}
                className="mt-4"
                maxLength={200}
              />
            </div>

            <div className="p-4">
              <div className="flex space-x-2">
                {/* Different badges with various props */}

                <Badge text="New" color="bg-green-500" size="small" />
                <Badge text="Sale" color="bg-red-500" size="medium" rounded />
                <Badge text="Updated" color="bg-blue-500" size="large" />
                <Badge text="Beta" color="bg-yellow-500" size="small" />
                <Badge
                  text="2"
                  color="bg-gray-500"
                  size="extra-small"
                  rounded
                  className="size-5"
                />
                <SlidingCheckbox
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  label="Toggle Option"
                />

                {/* Avatars */}
                {/* <Avatar src="/images/user1.jpg" alt="User 1" size="medium" shape="circle" onClick={handleAvatarClick} /> */}
                <Avatar
                  initials="JS"
                  size="small"
                  color="bg-blue-500"
                  shape="square"
                />
                <Avatar size="large" color="bg-gray-400" shape="circle" />
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  className="bg-green-500 text-white p-2 rounded-md"
                  onClick={handleShowSuccessMessage}
                >
                  Show Success Message
                </button>
                <button
                  className="bg-blue-500 text-white p-2 rounded-md"
                  onClick={handleShowNotification}
                >
                  Show Notification
                </button>
              </div>

              <Notification
                type={messageType}
                visible={notificationVisible}
                onClose={() => setNotificationVisible(false)}
                content={notificationContent}
                position="top-left"
              />

              <h2 className="mt-8">Custom Rating Component</h2>
              <Rating
                value={rating}
                onChange={(val) => setRating(val)}
                stars={5}
                cancel={true}
                onIcon="🌟"
                offIcon="🌑"
              />
            </div>

            <div className="p-10">
              <CommandButton
                defaultAction={defaultAction}
                menuItems={menuItems}
                buttonLabel="Save"
              />
            </div>

            <div className="flex justify-center mt-10">
              <SpeedDial menuItems={Items} direction="top-to-bottom" />
            </div>

            <div className="p-4">
              <button
                className="bg-red-500 text-white p-2 rounded-md"
                onClick={() =>
                  showMessage("error", "This is another error message!")
                }
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
