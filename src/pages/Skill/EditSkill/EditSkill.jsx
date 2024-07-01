/* eslint-disable react/prop-types */
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getAuthToken } from "../../../utils/authServices";
import MainForm from "../../../components/form/MainForm";
import MainInput from "../../../components/form/MainInput";
import MainMultiSelect from "../../../components/form/MainMultiSelect";
import { Button } from "antd";

const EditSkill = ({
  setEditFromState,
  selectedSkillData,
  skillTableDataRefetch,
}) => {
  const defaultValues = {
    name: selectedSkillData?.name,
    category: selectedSkillData?.category,
    percentage: selectedSkillData?.percentage,
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });

  const handleEditSkill = async (values) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Editing, please wait...");
    try {
      const res = await axios.put(
        `${API_URL}/skill/${selectedSkillData._id}`,
        values,
        {
          headers: {
            Authorization: getAuthToken(),
          },
        }
      );
      if (res?.data?.message === "Skill updated Successfully") {
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
        skillTableDataRefetch();
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
    <div>
      {/* back */}
      <div
        className="flex items-center gap-1 cursor-pointer pl-5"
        onClick={() => setEditFromState(false)}
      >
        <ArrowLeftOutlined className="text-xl" />
        <p className="">Back</p>
      </div>
      <MainForm onSubmit={handleEditSkill} methods={methods}>
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
          Update
        </Button>
      </MainForm>
    </div>
  );
};

export default EditSkill;
