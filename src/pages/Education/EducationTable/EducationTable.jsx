import { useState } from "react";
import useGetData from "../../../hooks/useGetData";
import { getAuthToken } from "../../../utils/authServices";
import axios from "axios";
import { toast } from "sonner";
import { Popconfirm, Space, Table } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import EditEducation from "../EditEducation/EditEducation";

const EducationTable = () => {
  const {
    data: educationTableData,
    dataLoading: educationTableDataLoading,
    refetch: educationTableDataRefetch,
  } = useGetData({ url: "/education" });
  console.log(educationTableData);
  const [editFromState, setEditFromState] = useState(false);

  const [selectedEducationData, setSelectedEducationData] = useState();

  const handleDelete = async (data) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Deleting, please wait...");
    try {
      const res = await axios.delete(`${API_URL}/education/${data?._id}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      });
      if (res?.data?.message === "Education deleted Successfully") {
        educationTableDataRefetch();
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handelEditFromState = (data) => {
    setEditFromState(true);
    setSelectedEducationData(data);
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
      title: "DegreeName",
      dataIndex: "degreeName",
    },
    {
      title: "Institute",
      dataIndex: "institute",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Result",
      dataIndex: "result",
    },
    {
      title: "Skills",
      dataIndex: "skills",
    },
  ];
  return (
    <div className="lg:w-10/12 mx-auto my-16 border rounded-lg ">
      <h1 className="text-xl font-semibold p-5">Education Section</h1>
      <div className="mt-5">
      {!editFromState && (
          <Table
            loading={educationTableDataLoading}
            columns={columns}
            dataSource={educationTableData?.data}
            scroll={{ x: "max-content" }}
          />
        )}
         {/* edit form */}
         {editFromState && (
          <EditEducation
            setEditFromState={setEditFromState}
            selectedEducationData={selectedEducationData}
            educationTableDataRefetch={educationTableDataRefetch}
          />
        )}
      </div>
    </div>
  );
};

export default EducationTable;
