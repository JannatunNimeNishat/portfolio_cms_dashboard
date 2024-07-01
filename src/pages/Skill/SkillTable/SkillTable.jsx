import { useState } from "react";
import useGetData from "../../../hooks/useGetData";
import { toast } from "sonner";
import axios from "axios";
import { getAuthToken } from "../../../utils/authServices";
import { Popconfirm, Space, Table } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import EditSkill from "../EditSkill/EditSkill";

const SkillTable = () => {
  const {
    data: skillTableData,
    dataLoading: skillTableDataLoading,
    refetch: skillTableDataRefetch,
  } = useGetData({ url: "/skill" });
 
  const [editFromState, setEditFromState] = useState(false);

  const [selectedSkillData, setSelectedSkillData] = useState();

  const handleDelete = async (data) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Deleting, please wait...");
    try {
      const res = await axios.delete(`${API_URL}/skill/${data?._id}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      });
      if (res?.data?.message === "Skill deleted Successfully") {
        skillTableDataRefetch();
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handelEditFromState = (data) => {
    setEditFromState(true);
    setSelectedSkillData(data);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
    },
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
  ];

  return (
    <div className="w-10/12 mx-auto my-16 border rounded-lg ">
      <h1 className="text-xl font-semibold p-5">Skill Section</h1>
      {/* skill table */}
      {!editFromState && (
        <Table
          loading={skillTableDataLoading}
          columns={columns}
          dataSource={skillTableData?.data}
          scroll={{ x: "max-content" }}
        />
      )}

      {/* skill form */}
      {editFromState && (
        <EditSkill
          setEditFromState={setEditFromState}
          selectedSkillData={selectedSkillData}
          skillTableDataRefetch={skillTableDataRefetch}
        />
      )}
    </div>
  );
};

export default SkillTable;
