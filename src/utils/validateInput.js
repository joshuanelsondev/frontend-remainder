const validateInput = (fieldName, value) => {
  const errors = {};

  if (["firstName", "lastName"].includes(fieldName)) {
    if (!value.trim()) {
      errors[fieldName] = `Name field is required.`;
    } else if (!/^[A-Za-z\s-]+$/.test(value)) {
      errors[fieldName] = `Name can only contain letters, spaces, or hyphens.`;
    }
  }

  if (fieldName === "email") {
    if (!value.trim()) {
      errors.email = "Email is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ) {
      errors.email = "Invalid email format.";
    }
  }

  if (fieldName === "password") {
    if (!value.trim()) {
      errors.password = "Password is required.";
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(
        value
      )
    ) {
      errors.password = "Password requirements not met.";
    }
  }

  if (fieldName === "confirmPassword") {
    if (!value.trim()) {
      errors.confirmPassword = "Password is required.";
    }
  }

  return errors;
};

export default validateInput;
