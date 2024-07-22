import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup
    .string()
    .test("validate_description", "Description is invalid", (description) => {
      if (!description) return false;
      return description.length < 200;
    })
    .required("Description is required"),
  type: yup.string().required("Type is required"),
});
