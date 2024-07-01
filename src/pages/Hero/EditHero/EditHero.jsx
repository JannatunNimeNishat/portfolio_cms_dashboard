/* eslint-disable react/prop-types */

import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getAuthToken } from "../../../utils/authServices";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MainForm from "../../../components/form/MainForm";
import MainInput from "../../../components/form/MainInput";
import MainMultiSelect from "../../../components/form/MainMultiSelect";
import { Button } from "antd";
import StatusRadio from "../../../components/form/MainRadio";

const EditHero = ({
  setEditFromState,
  selectedHeroData,
  heroTableDataRefetch,
}) => {
  const defaultValues = {
    greetings: selectedHeroData.greetings,
    name: selectedHeroData.name,
    dentation: selectedHeroData.dentation,
    tags: selectedHeroData.tags,
    status: selectedHeroData.status,
  };
  
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const handleEditHero = async (value) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Updating, please wait...");

    try {
      const res = await axios.put(
        `${API_URL}/hero/status/${selectedHeroData._id}`,
        value,
        {
          headers: {
            Authorization: getAuthToken(),
          },
        }
      );
      if (res?.data?.message === "Status Changed Successfully") {
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
        heroTableDataRefetch();
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
    <div>
      {/* back */}
      <div
        className="flex items-center gap-1 cursor-pointer pl-5"
        onClick={() => setEditFromState(false)}
      >
        <ArrowLeftOutlined className="text-xl" />
        <p className="">Back</p>
      </div>
      <div className="mt-5">
        <MainForm onSubmit={handleEditHero} methods={methods}>
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
          <StatusRadio
            name="status"
            label="Status"
            required={false}
            options={[
              { label: "Active", value: true },
              { label: "Inactive", value: false },
            ]}
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
    </div>
  );
};

export default EditHero;
