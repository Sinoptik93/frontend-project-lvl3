import { string } from "yup";

const validateUrl = (url) => {
  const userSchema = string().url("tttt");

  return userSchema.validate(url);
};

export default validateUrl;
