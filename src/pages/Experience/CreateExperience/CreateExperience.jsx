import { useForm } from "react-hook-form";
import MainForm from "../../../components/form/MainForm";
import MainInput from "../../../components/form/MainInput";
import MainTextArea from "../../../components/form/MainTextArea";
import { Button } from "antd";

const CreateExperience = () => {
  const methods = useForm();
  const handleCreateExperience = () => {};
  return (
    <div className="lg:w-10/12 mx-auto my-16 border rounded-lg ">
      <h1 className="text-xl font-semibold p-5">Create Experience Section</h1>
      <MainForm onSubmit={handleCreateExperience} methods={methods}>
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
          Create
        </Button>
      </MainForm>
    </div>
  );
};

export default CreateExperience;
