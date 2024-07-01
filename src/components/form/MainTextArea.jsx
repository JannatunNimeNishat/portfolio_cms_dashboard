/* eslint-disable react/prop-types */
import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const { TextArea } = Input;

const MainTextArea = ({ name, label, required = true, placeholder }) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div style={{ margin: "20px" }}>
      {label ? (
        <label style={{ fontWeight: "500" }} htmlFor={name}>
          {label}:
        </label>
      ) : null}
      <Controller
        name={name}
        rules={{
          required: required,
        }}
        render={({ field }) => (
          <>
            <TextArea
              placeholder={placeholder}
              style={{ marginTop: "5px" }}
              {...field}
              id={name}
            />
          </>
        )}
      />
      {errors[name] && <small>This is required.</small>}
    </div>
  );
};

export default MainTextArea;
