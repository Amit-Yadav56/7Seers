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
} from "./assets/icons";

const Settings = () => {
  const [selectedSection, setSelectedSection] = useState("my-details");
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

  return (
    <div className="max-w-6xl mx-auto mt-4">
      {/* Navigation Section */}
      <nav className="mb-8 border-b border-gray-200">
        <ul className="flex list-none m-0 p-0 flex-wrap">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                className={`bg-transparent mr-2.5 px-2.5 py-3 cursor-pointer text-sm font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                  selectedSection === item.id
                    ? "text-green-700 border-green-700"
                    : "text-gray-600 border-transparent hover:text-gray-800 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedSection(item.id)}
              >
                {item.label}
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
                <h2 className="text-xl font-semibold text-gray-800 grid ">
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
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  {buttons.save}
                </button>
              </div>
            </div>

            {/* Name Row */}
            <div className="flex flex-col md:flex-row md:items-center py-6 border-b border-gray-200 gap-4 md:gap-0">
              <div className="md:w-48 md:flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700">
                  {formLabels.name}
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
                  {formLabels.email}
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
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors whitespace-nowrap md:ml-4 max-w-sm sm:max-w-md md:max-w-lg">
                {buttons.verify}
              </button>
            </div>

            {/* Your Photo Row */}
            <div className="flex flex-col md:flex-row md:items-start py-6 border-b border-gray-200 gap-4 md:gap-0">
              <div className="md:w-48 md:flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700">
                  {formLabels.yourPhoto}
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
                <label className="block text-sm font-medium text-gray-700">
                  {formLabels.changePassword}
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
                  <button className="px-4 py-2 bg-[#087443] text-white rounded-md hover:bg-green-500 transition-colors">
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
                  <button className="text-green-600 hover:text-green-700 underline ml-1">
                    {formLabels.roleLinkText}
                  </button>
                  .
                </p>
              </div>
            </div>

            {/* Country Row */}
            <div className="flex flex-col md:flex-row md:items-center py-6 border-b border-gray-200 gap-4 md:gap-0">
              <div className="md:w-48 md:flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700">
                  {formLabels.country}
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
                  {formLabels.mobileNumber}
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
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors whitespace-nowrap md:ml-4">
                {buttons.verify}
              </button>
            </div>

            {/* Timezone Row */}
            <div className="flex flex-col md:flex-row md:items-center py-6 border-b border-gray-200 gap-4 md:gap-0">
              <div className="md:w-48 md:flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700">
                  {formLabels.timezone}
                </label>
              </div>
              <div className="flex-1 max-w-sm sm:max-w-md md:max-w-lg">
                <div className="relative">
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm appearance-none"
                  >
                    {timezones.map((timezone) => (
                      <option key={timezone.value} value={timezone.value}>
                        {timezone.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <img src={downArrowIcon} alt="down arrow" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Row */}
            <div className="flex flex-col md:flex-row md:items-start py-6 border-b border-gray-200 gap-4 md:gap-0">
              <div className="md:w-48 md:flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700">
                  {formLabels.bio}
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
                  <div className="flex items-center text-xs text-gray-500 mt-2">
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
    </div>
  );
};

export default Settings;
