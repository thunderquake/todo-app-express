import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name is required"),
    description: yup
      .string()
      .when("description", {
        is: (exists: boolean) => !!exists,
        then: (schema) =>
          schema.test("validate_phone", "Phone is invalid", (description) =>
            description ? description.length < 200 : true
          ),
      })
      .required("Description is required"),
    type: yup.string().required("Type is required"),
  })
  .required("Field is required");
