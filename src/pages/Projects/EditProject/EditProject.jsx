/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { imageUploader } from "../../../utils/imageUploader";
import axios from "axios";
import { getAuthToken } from "../../../utils/authServices";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MainForm from "../../../components/form/MainForm";
import MainInput from "../../../components/form/MainInput";
import MainTextArea from "../../../components/form/MainTextArea";
import MainMultiSelect from "../../../components/form/MainMultiSelect";
import MainFileInput from "../../../components/form/MainFileInput";
import { Button } from "antd";

const EditProject = ({
  setEditFromState,
  selectedProjectData,
  projectTableDataRefetch,
}) => {
  const defaultValues = {
    desc: selectedProjectData?.desc,
    title: selectedProjectData?.title,
    technologyUsed: selectedProjectData?.technologyUsed,
    liveLinkClient: selectedProjectData?.liveLink.client,
    liveLinkServer: selectedProjectData?.liveLink.server,
    gitLinksClient: selectedProjectData?.gitLinks.client,
    gitLinksServer: selectedProjectData?.gitLinks.server,
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });

  const handleEditProject = async (values) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Editing, please wait...");
    try {
      const projectData = {
        title: values.title,
        desc: values.desc,
        technologyUsed: values.technologyUsed,
        liveLink: {
          client: values.liveLinkClient,
          server: values.liveLinkServer,
        },
        gitLinks: {
          client: values.gitLinksClient,
          server: values.gitLinksServer,
        },
        projectImg: {
          projectHero: selectedProjectData?.projectImg?.projectHero,
        },
      };

      if (values?.projectImg?.projectHero !== undefined) {
        const uploadedImage = await imageUploader(
          values?.projectImg?.projectHero?.fileList[0].originFileObj
        );

        projectData.projectImg.projectHero = uploadedImage?.url;
      }

      const res = await axios.put(
        `${API_URL}/project/${selectedProjectData._id}`,
        projectData,
        {
          headers: {
            Authorization: getAuthToken(),
          },
        }
      );
      console.log(res?.data);
      if (res?.data?.message === "Project updated Successfully") {
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
        projectTableDataRefetch();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const technologyUsedOptions = [
    { key: "React", value: "React" },
    { key: "Next.Js", value: "Next.Js" },
    { key: "Express.js", value: "Express.js" },
    { key: "Tailwind Css", value: "Tailwind Css" },
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

      <MainForm onSubmit={handleEditProject} methods={methods}>
        <MainInput
          type={"text"}
          name={"title"}
          label={"Title"}
          placeholder={"Enter project title"}
          required={false}
        />
        <MainTextArea
          name="desc"
          label="Description"
          required={false}
          placeholder="Enter a brief description about your project"
        />
        <MainMultiSelect
          name="technologyUsed"
          label="Technology used: "
          options={technologyUsedOptions}
          placeholder={"Select one"}
          required={false}
        />
        {/* links */}
        <MainInput
          type={"text"}
          name={"liveLinkClient"}
          label={"Live link client"}
          placeholder={"Enter project's client live link"}
          required={false}
        />
        <MainInput
          type={"text"}
          name={"liveLinkServer"}
          label={"Live link server"}
          placeholder={"Enter project's server live link"}
          required={false}
        />
        <MainInput
          type={"text"}
          name={"gitLinksClient"}
          label={"GitHub link client"}
          placeholder={"Enter project's client GitHub link"}
          required={false}
        />
        <MainInput
          type={"text"}
          name={"gitLinksServer"}
          label={"GitHub link server"}
          placeholder={"Enter project's server GitHub link"}
          required={false}
        />
        <MainFileInput
          name={"projectImg.projectHero"}
          label={"Choose a photo of your project"}
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
          Update
        </Button>
      </MainForm>
    </div>
  );
};

export default EditProject;
