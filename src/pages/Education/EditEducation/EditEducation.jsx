import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getAuthToken } from "../../../utils/authServices";
import MainForm from "../../../components/form/MainForm";
import MainInput from "../../../components/form/MainInput";
import MainMultiSelect from "../../../components/form/MainMultiSelect";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

/* eslint-disable react/prop-types */
const EditEducation = ({
  setEditFromState,
  selectedEducationData,
  educationTableDataRefetch,
}) => {
    const defaultValues = {
        degreeName: selectedEducationData?.degreeName,
        institute: selectedEducationData?.institute,
        duration: selectedEducationData?.duration,
        result: selectedEducationData?.result,
        skills: selectedEducationData?.skills,
      };
      const methods = useForm({
        defaultValues: defaultValues,
      });

      const handleEditEducation = async (values) => {
        const API_URL = import.meta.env.VITE_API_URL;
        const toastId = toast.loading("Editing, please wait...");
        try {
          const projectData = {
            ...values,
          };
          const res = await axios.put(`${API_URL}/education/${selectedEducationData?._id}`, projectData, {
            headers: {
              Authorization: getAuthToken(),
            },
          });
          if (res?.data?.message === "Education updated Successfully") {
            toast.success(res?.data?.message, { id: toastId, duration: 2000 });
            educationTableDataRefetch()
          }
        } catch (error) {
          toast.error(error?.response?.data?.message, {
            id: toastId,
            duration: 2000,
          });
        }
      };

      const skillOptions = [
        {
          key: "C",
          value: "C",
        },
        {
          key: "C++",
          value: "C++",
        },
        {
          key: "Next.Js",
          value: "Next.Js",
        },
        {
          key: "Express.js",
          value: "Express.js",
        },
        {
          key: "Tailwind Css",
          value: "Tailwind Css",
        },
        {
          key: "Algorithms",
          value: "Algorithms",
        },
        {
          key: "DBMS",
          value: "DBMS",
        },
      ];
  return <div >
      <div
        className="flex items-center gap-1 cursor-pointer pl-5"
        onClick={() => setEditFromState(false)}
      >
        <ArrowLeftOutlined className="text-xl" />
        <p className="">Back</p>
      </div>
      <MainForm onSubmit={handleEditEducation} methods={methods}>
        <MainInput
          type={"text"}
          name={"degreeName"}
          label={"Degree Name"}
          placeholder={"Enter your degree name"}
          required={false}
        />
        <MainInput
          type={"text"}
          name={"institute"}
          label={"Institute Name"}
          placeholder={"Enter your institute name"}
          required={false}
        />
        <MainInput
          type={"text"}
          name={"duration"}
          label={"Duration"}
          placeholder={"Enter duration"}
          required={false}
        />
        <MainInput
          type={"text"}
          name={"result"}
          label={"Result"}
          placeholder={"Enter your result"}
          required={false}
        />
        <MainMultiSelect
          name="skills"
          label="Skills"
          options={skillOptions}
          placeholder={"Select one"}
          required={false}
        />
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
          Create
        </Button>
      </MainForm>
  </div>;
};

export default EditEducation;
