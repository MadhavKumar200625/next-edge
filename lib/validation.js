const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(?:\+?\d{1,4}[\s-]?)?(?:\d[\s-]?){6,14}\d$/;
const websiteRegex = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([\/?#][^\s]*)?$/i;
const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export function validateEmail(value) {
  return Boolean(value && emailRegex.test(String(value).trim()));
}

export function validatePhone(value) {
  if (!value) return false;
  const normalized = String(value).trim().replace(/[\s-.]/g, "");
  return phoneRegex.test(normalized);
}

export function validateName(value) {
  const text = String(value || "").trim();
  return text.length >= 2 && text.length <= 80;
}

export function validateText(value, min = 2, max = 1000) {
  const text = String(value || "").trim();
  return text.length >= min && text.length <= max;
}

export function validateDate(value) {
  return Boolean(value && !Number.isNaN(Date.parse(value)));
}

export function validatePassword(value, minLength = 8) {
  const password = String(value || "").trim();
  return password.length >= minLength;
}

export function validatePasswordStrength(value) {
  return Boolean(value && passwordStrengthRegex.test(String(value)));
}

export function validateOtp(value) {
  return Boolean(value && /^\d{4,6}$/.test(String(value).trim()));
}

export function validateWebsite(value) {
  if (!value) return true;
  return Boolean(websiteRegex.test(String(value).trim()));
}

export function validateCandidateSignupData(form) {
  const errors = {};
  if (!validateName(form.fullName)) {
    errors.fullName = "Enter your full name with at least 2 characters.";
  }
  if (!validateEmail(form.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!validatePhone(form.phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!validatePasswordStrength(form.password)) {
    errors.password = "Password must be at least 8 characters and include letters and numbers.";
  }
  if (!validateDate(form.dateOfBirth)) {
    errors.dateOfBirth = "Enter a valid date of birth.";
  }
  if (!validateText(form.class10, 1, 100)) {
    errors.class10 = "Enter your Class 10 results.";
  }
  if (!validateText(form.class12, 1, 100)) {
    errors.class12 = "Enter your Class 12 results.";
  }
  if (!validateText(form.languagesKnown, 1, 250)) {
    errors.languagesKnown = "Enter the languages you know.";
  }
  if (!validateText(form.keySkills, 2, 250)) {
    errors.keySkills = "Enter your key skills.";
  }
  if (!validateText(form.currentLocation, 1, 120)) {
    errors.currentLocation = "Enter your current location.";
  }
  if (!validateText(form.currentOrganization, 1, 120)) {
    errors.currentOrganization = "Enter your current organization.";
  }
  if (!validateText(form.totalExperience, 1, 50)) {
    errors.totalExperience = "Enter your total experience.";
  }
  if (!validateText(form.currentCTC, 1, 50)) {
    errors.currentCTC = "Enter your current CTC.";
  }
  if (!validateText(form.expectedCTC, 1, 50)) {
    errors.expectedCTC = "Enter your expected CTC.";
  }
  if (!validateText(form.noticePeriod, 1, 50)) {
    errors.noticePeriod = "Enter your notice period.";
  }
  if (!validateText(form.reasonForJobChange, 10, 500)) {
    errors.reasonForJobChange = "Enter a reason for job change.";
  }
  if (!validateText(form.resumeFile, 2, 300)) {
    errors.resumeFile = "Provide your resume information.";
  }
  if (!validateText(form.referralCode, 1, 50)) {
    errors.referralCode = "Enter a referral code.";
  }
  return errors;
}

export function validateAuthRequest(email, password) {
  const errors = {};
  if (!validateEmail(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!validatePassword(password, 6)) {
    errors.password = "Enter your password.";
  }
  return errors;
}

export function validateContactData({ fullName, email, phone, topic, message }) {
  const errors = {};
  if (!validateName(fullName)) {
    errors.fullName = "Enter your full name.";
  }
  if (!validateEmail(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (phone && !validatePhone(phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!validateText(topic, 3, 80)) {
    errors.topic = "Select a valid topic.";
  }
  if (!validateText(message, 20, 2000)) {
    errors.message = "Enter a message between 20 and 2000 characters.";
  }
  return errors;
}

export function validateEmployerCreateData(form) {
  const errors = {};
  if (!validateName(form.fullName)) {
    errors.fullName = "Enter the employer name.";
  }
  if (!validateEmail(form.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!validatePhone(form.phone)) {
    errors.phone = "Enter a valid contact number.";
  }
  if (!validateText(form.companyName, 2, 100)) {
    errors.companyName = "Enter the company name.";
  }
  if (!validateText(form.designation, 2, 80)) {
    errors.designation = "Enter the designation.";
  }
  if (form.companyWebsite && !validateWebsite(form.companyWebsite)) {
    errors.companyWebsite = "Enter a valid website URL.";
  }
  if (!validateText(form.industryType, 2, 80)) {
    errors.industryType = "Enter the industry type.";
  }
  if (form.hiringManagerPhone && !validatePhone(form.hiringManagerPhone)) {
    errors.hiringManagerPhone = "Enter a valid hiring manager contact number.";
  }
  if (form.hiringManagerName && !validateName(form.hiringManagerName)) {
    errors.hiringManagerName = "Enter a valid hiring manager name.";
  }
  return errors;
}

export function validateResetRequest(email, otp, newPassword) {
  const errors = {};
  if (!validateEmail(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!validateOtp(otp)) {
    errors.otp = "Enter the 4-6 digit OTP.";
  }
  if (!validatePasswordStrength(newPassword)) {
    errors.newPassword = "Password must be at least 8 characters and contain letters and numbers.";
  }
  return errors;
}

export function validatePaymentSubmission({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
  const errors = {};
  if (!razorpay_order_id) {
    errors.razorpay_order_id = "Order ID is required.";
  }
  if (!razorpay_payment_id) {
    errors.razorpay_payment_id = "Payment ID is required.";
  }
  if (!razorpay_signature) {
    errors.razorpay_signature = "Payment signature is required.";
  }
  return errors;
}

export function validateReferralCode(value) {
  return validateText(value, 1, 50);
}
