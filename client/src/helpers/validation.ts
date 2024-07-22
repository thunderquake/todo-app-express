import * as yup from "yup";

export const schema = yup
  .object()
  .shape(
    {
      name: yup.string().required("Name is required"),
      description: yup
        .string()
        .max(200, "Description must be less than 200 characters")
        .when("description", (description, schema) => {
          return description.length > 0 ? schema : schema.required();
        }),
      type: yup.string().required("Type is required"),
    },
    [["description", "description"]]
  )
  .required();
