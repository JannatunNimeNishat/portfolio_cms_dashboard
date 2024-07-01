/* eslint-disable react/prop-types */
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { Controller } from "react-hook-form";




const MainFileInput = ({label,name,required=true}) => {
  return (
    <div className="flex flex-col" style={{ margin: "20px" }}>
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
            <Upload {...field} className="w-full" >
              <Button icon={<UploadOutlined />} className="w-full" style={{ marginTop: "5px" }}>Click to Upload</Button>
            </Upload>
          </>
        )}
      />
      {/* {errors.name && <small>'This is required.'</small>} */}
    </div>
  );
};

export default MainFileInput;
