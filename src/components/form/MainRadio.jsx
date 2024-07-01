/* eslint-disable react/prop-types */
import { Radio } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const MainRadio = ({ name, label, required = true, options }) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div style={{ margin: "20px" }}>
      {label ? (
        <label className="mr-3" style={{ fontWeight: "500" }} htmlFor={name}>
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
            <Radio.Group {...field} id={name} options={options} />
          </>
        )}
      />
      {errors[name] && <small>This is required.</small>}
    </div>
  );
};

export default MainRadio;
