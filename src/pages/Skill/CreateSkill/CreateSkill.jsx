import { useForm } from "react-hook-form";
import MainForm from "../../../components/form/MainForm";
import MainInput from "../../../components/form/MainInput";
import MainMultiSelect from "../../../components/form/MainMultiSelect";
import { Button } from "antd";
import { toast } from "sonner";
import axios from "axios";
import { getAuthToken } from "../../../utils/authServices";

const CreateSkill = () => {
  const methods = useForm();
  const handleCreateSkill = async (values) => {
    
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Creating, please wait...");
    try {
      const skillData = {
        name: values?.name,
        category: values?.category,
        percentage: Number(values?.percentage),
      };

     console.log(skillData);
      const res = await axios.post(`${API_URL}/skill`, skillData, {
        headers: {
          Authorization: getAuthToken(),
        },
      });
      if (res?.data?.message === "Skill created Successfully") {
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
  const skillCategoriesOptions = [
    {
      key: "Web",
      value: "Web",
    },
    {
      key: "Programming",
      value: "Programming",
    },
    {
      key: "Tools",
      value: "Tools",
    },
    {
      key: "Others",
      value: "Others",
    },
  ];
  return (
    <div className="w-10/12 mx-auto my-16 border rounded-lg ">
      <h1 className="text-xl font-semibold p-5">Create Skill Section</h1>
      <MainForm onSubmit={handleCreateSkill} methods={methods}>
        <MainInput
        type={"text"}
          name={"name"}
          label={"Name"}
          placeholder={"Enter skill name"}
          required={true}
        />
        <MainMultiSelect
            name="category"
            label="Category: "
            options={skillCategoriesOptions}
            placeholder={"Select one"}
            mode=""
          />
          <MainInput
          type={"number"}
          name={"percentage"}
          label={"Percentage"}
          placeholder={"Enter skill percentage"}
          required={true}
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

export default CreateSkill;
