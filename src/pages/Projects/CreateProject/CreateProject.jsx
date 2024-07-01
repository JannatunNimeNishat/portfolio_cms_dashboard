import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { imageUploader } from "../../../utils/imageUploader";
import axios from "axios";
import { getAuthToken } from "../../../utils/authServices";
import MainForm from "../../../components/form/MainForm";
import MainInput from "../../../components/form/MainInput";
import MainTextArea from "../../../components/form/MainTextArea";
import MainMultiSelect from "../../../components/form/MainMultiSelect";
import MainFileInput from "../../../components/form/MainFileInput";
import { Button } from "antd";

const CreateProject = () => {
  const methods = useForm();
  const handleCreateProject = async (values) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Creating, please wait...");
    try {
      const projectData = {
        ...values,
      };

      let uploadedImage;
      if (values?.projectImg?.projectHero !== undefined) {
        uploadedImage = await imageUploader(
          values?.projectImg?.projectHero?.fileList[0].originFileObj
        );
        projectData.projectImg.projectHero = uploadedImage.url;
      }

      const res = await axios.post(`${API_URL}/project`, projectData, {
        headers: {
          Authorization: getAuthToken(),
        },
      });
      console.log(res?.data);
      if (res?.data?.message === "Project created Successfully") {
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
  const technologyUsedOptions = [
    {
      key: "React",
      value: "React",
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
  ];
  return (
    <div className="w-10/12 mx-auto my-16 border rounded-lg ">
      <h1 className="text-xl font-semibold p-5">Create Project Section</h1>
      <MainForm onSubmit={handleCreateProject} methods={methods}>
        <MainInput
          type={"text"}
          name={"title"}
          label={"Title"}
          placeholder={"Enter project title"}
          required={true}
        />
        <MainTextArea
          name="desc"
          label="Description"
          required={true}
          placeholder="Enter a brief description about your project"
        />
        <MainMultiSelect
          name="technologyUsed"
          label="technology used: "
          options={technologyUsedOptions}
          placeholder={"Select one"}
        />
        {/* links */}
        <MainInput
          type={"text"}
          name={"liveLink.client"}
          label={"Live link client"}
          placeholder={"Enter projects client live link"}
          required={true}
        />
        <MainInput
          type={"text"}
          name={"liveLink.server"}
          label={"Live link server"}
          placeholder={"Enter projects server live link"}
          required={true}
        />
        <MainInput
          type={"text"}
          name={"gitLinks.client"}
          label={"GitHub link client"}
          placeholder={"Enter projects client live link"}
          required={true}
        />
        <MainInput
          type={"text"}
          name={"gitLinks.server"}
          label={"GitHub link server"}
          placeholder={"Enter projects server live link"}
          required={true}
        />
        <MainFileInput
          name={"projectImg.projectHero"}
          label={"Choose a photo of your project"}
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

export default CreateProject;
