import React, { useState } from "react";
import InputBox from "./components/InputBox";
import ImageUpload from "./components/ImageUpload";
import settingsData from "./data/settingsData.json";
import {
  downArrowIcon,
  boldIcon,
  italicIcon,
  linkIcon,
  dottedListIcon,
  numberedListIcon,
  helpIcon,
  timeIcon,
} from "./assets/icons";

const Settings = () => {
  const [selectedSection, setSelectedSection] = useState("my-details");
  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
  const [showTimezoneTooltip, setShowTimezoneTooltip] = useState(false);
  const [showPhotoTooltip, setShowPhotoTooltip] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    profileImage: null,
    role: "",
    country: "",
    countryCode: "US",
    mobileNumber: "",
    timezone: "",
    bio: "",
    fontFamily: "regular",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      profileImage: imageUrl,
    }));
  };

  const {
    navigationItems,
    countries,
    countryCodes,
    timezones,
    textFormats,
    passwordRequirements,
    formLabels,
    placeholders,
    buttons,
  } = settingsData;

  const getSelectedCountryCode = () => {
    const selectedCountry = countryCodes.find(
      (country) => country.value === formData.countryCode
    );
    return selectedCountry ? selectedCountry.code : "+1";
  };

  const getWordCount = (text) => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  };

  const bioWordCount = getWordCount(formData.bio);
  const maxWords = 250;
  const remainingWords = maxWords - bioWordCount;

  const formatTimezoneLabel = (timezone) => {
    if (timezone.value === "")
      return { name: timezone.label, abbreviation: "", utc: "" };

    return {
      name: timezone.name || timezone.label,
      abbreviation: timezone.abbreviation || "",
      utc: timezone.utc || timezone.value,
    };
  };

  const getSelectedTimezoneDisplay = () => {
    const selectedTimezone = timezones.find(
      (tz) => tz.value === formData.timezone
    );
    if (!selectedTimezone || selectedTimezone.value === "") {
      return "Select Timezone";
    }
    const formatted = formatTimezoneLabel(selectedTimezone);
    return `${formatted.name} ${
      formatted.abbreviation ? `(${formatted.abbreviation})` : ""
    } ${formatted.utc}`;
  };

  return (
    <div className="mx-auto mt-4">
      {/* Navigation Section */}
      <nav className="mb-8 border-b border-gray-200">
        <ul className="flex list-none m-0 p-0 flex-wrap">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                className={`bg-transparent mr-2.5 px-2.5 py-3 cursor-pointer text-sm font-semibold transition-all duration-300 border-b-2 whitespace-nowrap flex items-center gap-2 max-h-[46px] ${
                  selectedSection === item.id
                    ? "text-[#087443] border-[#087443]"
                    : "text-[#717680] border-transparent hover:text-gray-800 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedSection(item.id)}
              >
                <span>{item.label}</span>
                {item.notificationCount && (
                  <div
                    className="w-6 h-6 bg-[#FAFAFA] text-[#414651] rounded-full flex items-center justify-center text-xs font-medium
                  border border-[#E9EAEB]"
                  >
                    {item.notificationCount}
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content Section */}
      <div className="pb-5">
        {selectedSection === "my-details" ? (
          <div>
            {/* Header Row - Personal Information and Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 border-b border-gray-200 gap-4 sm:gap-0">
              <div className="flex-1 md:mr-8">
                <h2 className="text-lg font-semibold text-gray-800 grid ">
                  {formLabels.personalInformation}
                  <span className="text-sm text-[#535862] font-normal">
                    {formLabels.personalInformationSubtext}
                  </span>
                </h2>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  {buttons.cancel}
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-[#099250] transition-colors">
                  {buttons.save}
                </button>
              </div>
            </div>

            {/* Name Row */}
            <div className="flex flex-col md:flex-row md:items-center py-6 border-b border-gray-200 gap-4 md:gap-0">
              <div className="md:w-48 md:flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700">
                  {formLabels.name} <span className="text-[#099250]">*</span>
                </label>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-sm sm:max-w-md md:max-w-lg">
                <InputBox
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder={placeholders.firstName}
                />
                <InputBox
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder={placeholders.lastName}
                />
              </div>
            </div>

            {/* Email Row */}
            <div className="flex flex-col md:flex-row md:items-center py-6 border-b border-gray-200 gap-4 md:gap-0">
              <div className="md:w-48 md:flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700">
                  {formLabels.email} <span className="text-[#099250]">*</span>
                </label>
              </div>
              <div className="flex-1 max-w-sm sm:max-w-md md:max-w-lg">
                <InputBox
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={placeholders.email}
                  required
                />
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-[#099250] transition-colors whitespace-nowrap md:ml-4 max-w-sm sm:max-w-md md:max-w-lg">
                {buttons.verify}
              </button>
            </div>

            {/* Your Photo Row */}
            <div className="flex flex-col md:flex-row md:items-start py-6 border-b border-gray-200 gap-4 md:gap-0">
              <div className="md:w-48 md:flex-shrink-0">
                <label className="flex gap-1 text-sm font-medium text-gray-700">
                  {formLabels.yourPhoto}{" "}
                  <span className="text-[#099250]">*</span>
                  <div
                    className="relative"
                    onMouseEnter={() => setShowPhotoTooltip(true)}
                    onMouseLeave={() => setShowPhotoTooltip(false)}
                  >
                    <img
                      src={helpIcon}
                      className="hover:cursor-pointer"
                      alt=""
                    />
                    {showPhotoTooltip && (
                      <div className="absolute top-0 left-0 transform -translate-y-full z-50">
                        <div className="bg-black text-white text-xs px-3 py-2 rounded shadow-lg w-[150px] text-center">
                          Please Upload your photo
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 border-4 border-transparent border-t-black"></div>
                      </div>
                    )}
                  </div>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  {formLabels.yourPhotoSubtext}
                </p>
              </div>
              <div className="flex-1">
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  currentImage={formData.profileImage}
                />
              </div>
            </div>

            {/* Change Password Row */}
            <div className="flex flex-col md:flex-row py-6 border-b border-gray-200 gap-4 md:gap-0">
              <div className="md:w-48 md:flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700 w-[90%]">
                  {formLabels.changePassword}
                  <br />
                  <span className="text-[#535862]  font-normal">
                    {formLabels.changePasswordNote}
                  </span>
                </label>
              </div>
              <div className="flex-1 space-y-4 max-w-sm sm:max-w-md md:max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formLabels.oldPassword}
                  </label>
                  <InputBox
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                    placeholder={placeholders.oldPassword}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formLabels.newPassword}
                  </label>
                  <InputBox
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder={placeholders.newPassword}
                  />

                  {/* Password Tips */}
                  <div className="mt-3 space-y-2">
                    {passwordRequirements.map((requirement) => (
                      <div
                        key={requirement.id}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <span className="mr-2 text-green-500">✓</span>
                        {requirement.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reset Button */}
                <div className="pt-2">
                  <button className="w-full px-4 py-2 bg-[#087443] text-white rounded-md hover:bg-green-500 transition-colors">
                    {buttons.resetPassword}
                  </button>
                </div>
              </div>
            </div>

            {/* Role Row */}
            <div className="flex flex-col md:flex-row md:items-start py-6 border-b border-gray-200 gap-4 md:gap-0">
              <div className="md:w-48 md:flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700">
                  {formLabels.role}
                </label>
              </div>
              <div className="flex-1 max-w-sm sm:max-w-md md:max-w-lg">
                <InputBox
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder={placeholders.role}
                />
                <p className="text-xs text-gray-500 mt-2">
                  {formLabels.roleNote}
                  <span className="font-bold">
                    {" Settings>Team>Edit Roles,"}
                  </span>
                  <button>
                    <span className="text-[#535862] font-bold underline ml-1">
                      {formLabels.roleLinkText}
                    </span>
                    to change the role
                  </button>
                  .
                </p>
              </div>
            </div>

            {/* Country Row */}
            <div className="flex flex-col md:flex-row md:items-center py-6 border-b border-gray-200 gap-4 md:gap-0">
              <div className="md:w-48 md:flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700">
                  {formLabels.country} <span className="text-[#099250]">*</span>
                </label>
              </div>
              <div className="flex-1 max-w-sm sm:max-w-md md:max-w-lg">
                <div className="relative">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm appearance-none"
                  >
                    {countries.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <img src={downArrowIcon} alt="down arrow" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Number Row */}
            <div className="flex flex-col md:flex-row md:items-center py-6 border-b border-gray-200 gap-4 md:gap-0">
              <div className="md:w-48 md:flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700">
                  {formLabels.mobileNumber}{" "}
                  <span className="text-[#099250]">*</span>
                </label>
              </div>
              <div className="flex-1 max-w-sm sm:max-w-md md:max-w-lg">
                <div className="relative">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none focus:outline-none text-sm text-gray-700 z-10 cursor-pointer pr-6 w-auto min-w-[85px] appearance-none px-3 py-2"
                  >
                    {countryCodes.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.value}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-14 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <img src={downArrowIcon} alt="down arrow" />
                  </div>
                  <div className="absolute left-20 top-1/2 transform -translate-y-1/2 pointer-events-none text-sm text-gray-700">
                    {getSelectedCountryCode()}
                  </div>
                  <InputBox
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                    className="pl-28"
                  />
                </div>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-[#099250] transition-colors whitespace-nowrap md:ml-4">
                {buttons.verify}
              </button>
            </div>

            {/* Timezone Row */}
            <div className="flex flex-col md:flex-row md:items-center py-6 border-b border-gray-200 gap-4 md:gap-0">
              <div className="md:w-48 md:flex-shrink-0">
                <label className="flex gap-1 text-sm font-medium text-gray-700">
                  {formLabels.timezone}{" "}
                  <div
                    className="relative"
                    onMouseEnter={() => setShowTimezoneTooltip(true)}
                    onMouseLeave={() => setShowTimezoneTooltip(false)}
                  >
                    <img
                      src={helpIcon}
                      className="hover:cursor-pointer"
                      alt=""
                    />
                    {showTimezoneTooltip && (
                      <div className="absolute top-0 left-0 transform -translate-y-full z-50">
                        <div className="bg-black text-white text-xs px-3 py-2 rounded shadow-lg w-[150px] text-center">
                          Please enter your current timezone
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 border-4 border-transparent border-t-black"></div>
                      </div>
                    )}
                  </div>
                </label>
              </div>
              <div className="flex-1 max-w-sm sm:max-w-md md:max-w-lg">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}
                    className="w-full px-3 py-2 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm text-left bg-white flex items-center"
                  >
                    <img
                      src={timeIcon}
                      alt="time"
                      className="w-4 h-4 mr-2 flex-shrink-0"
                    />
                    <span className="truncate">
                      {getSelectedTimezoneDisplay()}
                    </span>
                  </button>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <img src={downArrowIcon} alt="down arrow" />
                  </div>

                  {isTimezoneOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {timezones.map((timezone) => {
                        const formatted = formatTimezoneLabel(timezone);
                        return (
                          <button
                            key={timezone.value}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                timezone: timezone.value,
                              }));
                              setIsTimezoneOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 flex items-center text-sm"
                          >
                            <img
                              src={timeIcon}
                              alt="time"
                              className="w-4 h-4 mr-2 flex-shrink-0"
                            />
                            {timezone.value === "" ? (
                              <span>{timezone.label}</span>
                            ) : (
                              <span>
                                <span className="font-medium">
                                  {formatted.name}
                                </span>
                                {formatted.abbreviation && (
                                  <span className="font-medium">
                                    {" "}
                                    ({formatted.abbreviation})
                                  </span>
                                )}
                                <span className="text-gray-600">
                                  {" "}
                                  {formatted.utc}
                                </span>
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bio Row */}
            <div className="flex flex-col md:flex-row md:items-start py-6 border-b border-gray-200 gap-4 md:gap-0">
              <div className="md:w-48 md:flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700">
                  {formLabels.bio} <span className="text-[#099250]">*</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  {formLabels.bioSubtext}
                </p>
              </div>
              <div className="flex-1 max-w-sm sm:max-w-md md:max-w-lg">
                <div className="space-y-3">
                  {/* Text Format Controls */}
                  <div className="flex items-center gap-3">
                    {/* Font Family Dropdown */}
                    <div className="relative flex-1">
                      <select
                        name="fontFamily"
                        value={formData.fontFamily}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm appearance-none bg-white"
                      >
                        {textFormats.map((format) => (
                          <option key={format.value} value={format.value}>
                            {format.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <img
                          src={downArrowIcon}
                          alt="down arrow"
                          className="w-3 h-3"
                        />
                      </div>
                    </div>

                    {/* Format Buttons */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        className="px-2 py-2 rounded-md hover:bg-gray-50 transition-colors"
                        title="Bold"
                      >
                        <img src={boldIcon} alt="Bold" />
                      </button>
                      <button
                        type="button"
                        className="px-2 py-2 rounded-md hover:bg-gray-50 transition-colors"
                        title="Italic"
                      >
                        <img src={italicIcon} alt="Italic" />
                      </button>
                      <button
                        type="button"
                        className="px-2 py-2 rounded-md hover:bg-gray-50 transition-colors"
                        title="Link"
                      >
                        <img src={linkIcon} alt="Link" />
                      </button>
                      <button
                        type="button"
                        className="px-2 py-2 rounded-md hover:bg-gray-50 transition-colors"
                        title="Bullet List"
                      >
                        <img src={dottedListIcon} alt="Bullet List" />
                      </button>
                      <button
                        type="button"
                        className="px-2 py-2 rounded-md hover:bg-gray-50 transition-colors"
                        title="Numbered List"
                      >
                        <img src={numberedListIcon} alt="Numbered List" />
                      </button>
                    </div>
                  </div>

                  {/* Bio Textarea */}
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder={placeholders.bio}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
                  />

                  {/* Word Counter */}
                  <div className="flex items-center text-xs text-gray-500">
                    <span className={remainingWords < 0 ? "text-red-500" : ""}>
                      {remainingWords < 0
                        ? `${Math.abs(remainingWords)} words over limit`
                        : `${remainingWords} words remaining`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-10 text-center bg-gray-50 rounded-lg text-gray-600 text-base">
            Content for{" "}
            {navigationItems.find((item) => item.id === selectedSection)?.label}
          </div>
        )}
      </div>
      <div className="flex gap-3 flex-shrink-0 justify-end">
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          {buttons.cancel}
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-[#099250] transition-colors">
          {buttons.save}
        </button>
      </div>
    </div>
  );
};

export default Settings;
