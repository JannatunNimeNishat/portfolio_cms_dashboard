import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getAuthToken } from "../../../utils/authServices";
import MainForm from "../../../components/form/MainForm";
import MainInput from "../../../components/form/MainInput";
import MainMultiSelect from "../../../components/form/MainMultiSelect";
import { Button } from "antd";

const CreateEducation = () => {
  const methods = useForm();
  const handleCreateEducation = async (values) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Creating, please wait...");
    try {
      const projectData = {
        ...values,
      };
      const res = await axios.post(`${API_URL}/education`, projectData, {
        headers: {
          Authorization: getAuthToken(),
        },
      });
      if (res?.data?.message === "Education created Successfully") {
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
        methods.reset();
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
  return (
    <div className="lg:w-10/12 mx-auto my-16 border rounded-lg ">
      <h1 className="text-xl font-semibold p-5">Create Education Section</h1>
      <MainForm onSubmit={handleCreateEducation} methods={methods}>
        <MainInput
          type={"text"}
          name={"degreeName"}
          label={"Degree Name"}
          placeholder={"Enter your degree name"}
          required={true}
        />
        <MainInput
          type={"text"}
          name={"institute"}
          label={"Institute Name"}
          placeholder={"Enter your institute name"}
          required={true}
        />
        <MainInput
          type={"text"}
          name={"duration"}
          label={"Duration"}
          placeholder={"Enter duration"}
          required={true}
        />
        <MainInput
          type={"text"}
          name={"result"}
          label={"Result"}
          placeholder={"Enter your result"}
          required={true}
        />
        <MainMultiSelect
          name="skills"
          label="Skills"
          options={skillOptions}
          placeholder={"Select one"}
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
    </div>
  );
};

export default CreateEducation;
