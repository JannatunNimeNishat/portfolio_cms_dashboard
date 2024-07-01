/* eslint-disable react/prop-types */
import { Checkbox } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const StatusCheckbox = ({ name, label, required = true }) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div style={{ margin: "20px" }}>
      {label ? (
        <label style={{ fontWeight: "500" }} htmlFor={name}>
          {label}
        </label>
      ) : null}
      <Controller
        name={name}
        rules={{
          required: required,
        }}
        render={({ field }) => (
          <>
            <Checkbox
              {...field}
              checked={field.value} // Ensure the checkbox reflects the form value
              id={name}
              style={{ marginTop: "5px" }}
            >
              {field.value ? "Active" : "Inactive"}
            </Checkbox>
          </>
        )}
      />
      {errors[name] && <small>This is required.</small>}
    </div>
  );
};

export default StatusCheckbox;
