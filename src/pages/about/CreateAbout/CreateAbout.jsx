import { useForm } from "react-hook-form";
import MainForm from "../../../components/form/MainForm";
import MainTextArea from "../../../components/form/MainTextArea";
import MainFileInput from "../../../components/form/MainFileInput";
import { Button } from "antd";
import { toast } from "sonner";
import { imageUploader } from "../../../utils/imageUploader";
import axios from "axios";
import { getAuthToken } from "../../../utils/authServices";

const CreateAbout = () => {
  const methods = useForm();
  const handleCreateAbout = async (values) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Creating, please wait...");
    try {
      const aboutData = {
        desc: values?.desc,
      };

      let uploadedImage;
      if (values?.photoUrl !== undefined) {
        uploadedImage = await imageUploader(
          values?.photoUrl?.fileList[0].originFileObj
        );
        aboutData.photoUrl = uploadedImage.url;
      }

      const res = await axios.post(`${API_URL}/about`, aboutData, {
        headers: {
          Authorization: getAuthToken(),
        },
      });
      if (res?.data?.message === "About created Successfully") {
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
  return (
    <div className="lg:w-10/12 mx-auto my-16 border rounded-lg ">
      <h1 className="text-xl font-semibold p-5">Create About Section</h1>
      
        <MainForm onSubmit={handleCreateAbout} methods={methods}>
          <MainTextArea
            name="desc"
            label="Description"
            required={true}
            placeholder="Enter a brief description about you here"
          />
          <MainFileInput name={"photoUrl"} label={"Choose a photo of yours"} />
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

export default CreateAbout;
