/* eslint-disable react/prop-types */

import { ArrowLeftOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import MainForm from "../../../components/form/MainForm";
import MainInput from "../../../components/form/MainInput";
import MainTextArea from "../../../components/form/MainTextArea";
import { Button } from "antd";
import { toast } from "sonner";
import axios from "axios";
import { getAuthToken } from "../../../utils/authServices";

const EditExperience = ({
  setEditFromState,
  selectedExperienceData,
  experienceTableDataRefetch,
}) => {
  const defaultValues = {
    companyName: selectedExperienceData?.companyName,
    duration: selectedExperienceData?.duration,
    desc: selectedExperienceData?.desc,
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });

  const handleEditExperience = async (values) => {
    console.log(values);
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Editing, please wait...");
    try {
      const res = await axios.put(
        `${API_URL}/experience/${selectedExperienceData._id}`,
        values,
        {
          headers: {
            Authorization: getAuthToken(),
          },
        }
      );
      console.log(res?.data);
      if (res?.data?.message === "Experience updated Successfully") {
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
        experienceTableDataRefetch();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div>
      {/* back */}
      <div
        className="flex items-center gap-1 cursor-pointer pl-5"
        onClick={() => setEditFromState(false)}
      >
        <ArrowLeftOutlined className="text-xl" />
        <p className="">Back</p>
      </div>
      <MainForm onSubmit={handleEditExperience} methods={methods}>
        <MainInput
          type={"text"}
          name={"companyName"}
          label={"Company Name"}
          placeholder={"Please Enter Company Name"}
          required={true}
        />
        <MainInput
          type={"text"}
          name={"duration"}
          label={"Duration"}
          placeholder={"Please Enter duration (Dec 2023 - Present)"}
          required={true}
        />
        <MainTextArea label={"Description"} name={"desc"} />
        <Button
          className="ml-5 mb-5"
          style={{
            width: "150px",
            backgroundColor: "lightblue",
            fontWeight: "600",
            color: "black",
          }}
          htmlType="submit"
        >
          Update
        </Button>
      </MainForm>
    </div>
  );
};

export default EditExperience;
