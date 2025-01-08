import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getCurrentUser } from "../../../api/userApi";
import "./UserSettings.scss";

export default function UserSettings() {
  const [originalUserInfo, setOriginalUserInfo] = useState(null);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { id, ...userData } = await getCurrentUser();

        setUserInfo(userData);
        setOriginalUserInfo(userData);
        console.log("User Test:", userData);
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
  }, []);

  const handleFormInput = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      // Remove non-numeric characters
      const numericInput = value.replace(/\D/g, "");

      // Format as (123)-456-7890
      let formattedInput = numericInput;
      if (numericInput.length > 3 && numericInput.length <= 6) {
        formattedInput = `(${numericInput.slice(0, 3)})-${numericInput.slice(
          3
        )}`;
      } else if (numericInput.length > 6) {
        formattedInput = `(${numericInput.slice(0, 3)})-${numericInput.slice(
          3,
          6
        )}-${numericInput.slice(6, 10)}`;
      }

      setUserInfo({ ...userInfo, [name]: formattedInput });
    } else {
      setUserInfo({ ...userInfo, [name]: value });
    }
  };

  const handleReset = () => {
    if (originalUserInfo) {
      setUserInfo(originalUserInfo);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
  };

  return (
    <div className="user-settings">
      <div className="user-settings__heading">
        <FaUserCircle
          size={100}
          onSubmit={handleFormSubmit}
          className="user-settings__user-image"
        />
        <div className="user-settings__upload">
          <label
            className="image-input-label"
            htmlFor="image-input"
            title="Upload an image"
          >
            Upload New
          </label>
          <input type="file" id="image-input" />
        </div>
        <button
          className="user-settings-delete-image"
          title="Delete existing image"
        >
          Delete Image
        </button>
      </div>
      <form className="user-settings-form">
        <div className="user-settings-form__label-input">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            value={userInfo.firstName || ""}
            placeholder="First Name"
            id="firstName"
            onChange={(e) => handleFormInput(e)}
            name="firstName"
          />
        </div>
        <div className="user-settings-form__label-input">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            value={userInfo.lastName || ""}
            placeholder="Last Name"
            id="lastName"
            onChange={(e) => handleFormInput(e)}
            name="lastName"
          />
        </div>
        <div className="user-settings-form__label-input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={userInfo.email || ""}
            placeholder="email@email.com"
            id="email"
            onChange={(e) => handleFormInput(e)}
            name="email"
          />
        </div>
        <div className="user-settings-form__label-input">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            value={userInfo.phoneNumber || ""}
            placeholder="(123)-456-7890"
            pattern="\(\d{3}\)-\d{3}-\d{4}"
            title="Phone number must match the format (123)-456-7890"
            id="phone"
            maxLength={14}
            onChange={(e) => handleFormInput(e)}
            name="phoneNumber"
          />
        </div>
        <div className="user-settings-form__footer">
          <button type="submit" className="user-settings-save">
            Save
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="user-settings-reset"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
