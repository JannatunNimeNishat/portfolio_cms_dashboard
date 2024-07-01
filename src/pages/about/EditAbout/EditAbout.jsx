import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { imageUploader } from "../../../utils/imageUploader";
import axios from "axios";
import { getAuthToken } from "../../../utils/authServices";
import MainForm from "../../../components/form/MainForm";
import MainTextArea from "../../../components/form/MainTextArea";
import MainFileInput from "../../../components/form/MainFileInput";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";


/* eslint-disable react/prop-types */
const EditAbout = ({
  setEditFromState,
  selectedAboutData,
  aboutTableDataRefetch,
}) => {
  const defaultValues = {
    desc: selectedAboutData?.desc,
    status: selectedAboutData?.status,
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const handleEditAbout = async (values) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Editing, please wait...");
    try {
      const aboutData = {
        desc: values?.desc,
        status: values.status,
      };

      let uploadedImage;
      if (values?.photoUrl !== undefined) {
        uploadedImage = await imageUploader(
          values?.photoUrl?.fileList[0].originFileObj
        );
        aboutData.photoUrl = uploadedImage.url;
      }

      const res = await axios.put(
        `${API_URL}/about/${selectedAboutData._id}`,
        aboutData,
        {
          headers: {
            Authorization: getAuthToken(),
          },
        }
      );
      if (res?.data?.message === "About updated Successfully") {
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
        aboutTableDataRefetch();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <div className=" ">
      {/* back */}
      <div
        className="flex items-center gap-1 cursor-pointer pl-5"
        onClick={() => setEditFromState(false)}
      >
        <ArrowLeftOutlined className="text-xl" />
        <p className="">Back</p>
      </div>
      <MainForm onSubmit={handleEditAbout} methods={methods}>
        <MainTextArea
          name="desc"
          label="Description"
          required={false}
          placeholder="Enter a brief description about you here"
        />

        <MainFileInput name={"photoUrl"} label={"Choose a photo of yours"}  required={false}/>
        
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

export default EditAbout;
