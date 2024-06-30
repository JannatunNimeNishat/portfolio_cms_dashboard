/* eslint-disable react/prop-types */
import { Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const { Option } = Select;

const MainMultiSelect = ({ name, label, required = true, placeholder, options = [] }) => {
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
            <Select
              mode="tags"
              placeholder={placeholder}
              style={{ width: '100%', marginTop: "5px" }}
              {...field}
            >
              {options?.map((option) => (
                <Option key={option.key} value={option.value}>
                  {option.value}
                </Option>
              ))}
            </Select>
          </>
        )}
      />
      {errors[name] && <small>This is required.</small>}
    </div>
  );
};

export default MainMultiSelect;
