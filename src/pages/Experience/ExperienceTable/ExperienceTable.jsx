import { DeleteFilled, EditFilled } from "@ant-design/icons";
import useGetData from "../../../hooks/useGetData";
import { Popconfirm, Space, Table } from "antd";
import axios from "axios";
import { toast } from "sonner";
import { getAuthToken } from "../../../utils/authServices";
import { useState } from "react";
import EditExperience from "../EditExperience/EditExperience";


const ExperienceTable = () => {
    const {
        data: experienceTableData,
        dataLoading: experienceTableDataLoading,
        refetch: experienceTableDataRefetch,
      } = useGetData({ url: "/experience" });


      const [editFromState, setEditFromState] = useState(false);

  const [selectedExperienceData, setSelectedExperienceData] = useState();

  const handleDelete = async (data) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Deleting, please wait...");
    try {
      const res = await axios.delete(`${API_URL}/experience/${data?._id}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      });
      if (res?.data?.message === "Experience deleted Successfully") {
        experienceTableDataRefetch();
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete", { id: toastId, duration: 2000 });
    }
  };
  const handelEditFromState = (data) => {
    setEditFromState(true);
    setSelectedExperienceData(data);
  };
  const columns = [
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <EditFilled
              className="cursor-pointer"
              style={{ color: "blue" }}
              onClick={() => handelEditFromState(record)}
            />
  
            <Popconfirm
              title="Are you sure you want to delete this?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <p style={{ color: "red", cursor: "pointer" }}>
                <DeleteFilled />
              </p>
            </Popconfirm>
          </Space>
        ),
      },
    {
      title: "Company Name",
      dataIndex: "companyName",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Desc",
      dataIndex: "desc",
    },
  ];

    return (
        <div className="lg:w-10/12 mx-auto my-16 border rounded-lg ">
        <h1 className="text-xl font-semibold p-5">Education Section</h1>
        <div className="mt-5">
        {!editFromState && (
            <Table
              loading={experienceTableDataLoading}
              columns={columns}
              dataSource={experienceTableData?.data}
              scroll={{ x: "max-content" }}
            />
          )}
           {/* edit form */}
           {editFromState && (
            <EditExperience
              setEditFromState={setEditFromState}
              selectedExperienceData={selectedExperienceData}
              experienceTableDataRefetch={experienceTableDataRefetch}
            />
          )}
        </div>
      </div>
    );
};

export default ExperienceTable;