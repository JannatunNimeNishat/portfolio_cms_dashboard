import { useForm } from "react-hook-form";
import MainForm from "../../../components/form/MainForm";
import MainInput from "../../../components/form/MainInput";
import MainMultiSelect from "../../../components/form/MainMultiSelect";
import { Button } from "antd";
import { toast } from "sonner";
import axios from "axios";
import { getAuthToken } from "../../../utils/authServices";

const CreateHero = () => {
  const methods = useForm();
  const handleCreateHero = async (value) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Creating, please wait...");

    methods.reset();
    try {
      const res = await axios.post(`${API_URL}/hero`, value, {
        headers: {
          Authorization: getAuthToken(),
        },
      });

      if (res?.data?.message === "Hero created Successfully") {
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };
  const tagOptions = [
    {
      key: "Web Developer",
      value: "Web Developer",
    },
    {
      key: "Programmer",
      value: "Programmer",
    },
    {
      key: "Software Engineer",
      value: "Software Engineer",
    },
  ];
  return (
    <div className="lg:w-10/12 mx-auto my-16 border rounded-lg ">
      <h1 className="text-xl font-semibold p-5">Create Hero Section</h1>
      <div className="">
        <MainForm onSubmit={handleCreateHero} methods={methods}>
          <MainInput
            name="greetings"
            type="text"
            label="Greetings: "
            placeholder={"Type here"}
          />
          <MainInput
            name="name"
            type="text"
            label="Name: "
            placeholder={"Type here"}
          />
          <MainInput
            name="dentation"
            type="text"
            label="Designation: "
            placeholder={"Type here"}
          />
          <MainMultiSelect
            name="tags"
            label="Tags: "
            options={tagOptions}
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
    </div>
  );
};

export default CreateHero;
