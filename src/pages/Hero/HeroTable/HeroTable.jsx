import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Popconfirm, Space, Table } from "antd";
import useGetData from "../../../hooks/useGetData";
import axios from "axios";
import { toast } from "sonner";
import { getAuthToken } from "../../../utils/authServices";
import { useState } from "react";
import EditHero from "../EditHero/EditHero";

const HeroTable = () => {
  const {
    data: heroTableData,
    dataLoading: heroTableDataLoading,
    refetch: heroTableDataRefetch,
  } = useGetData({ url: "/hero" });

  const [editFromState, setEditFromState] = useState(false);

  const [selectedHeroData, setSelectedHeroData] = useState();

  const handleDelete = async (data) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Deleting, please wait...");
    try {
      const res = await axios.delete(`${API_URL}/hero/${data?._id}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      });
      if (res?.data?.message === "Hero deleted Successfully") {
        heroTableDataRefetch();
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelEditFromState = (data) => {
    setEditFromState(true);
    setSelectedHeroData(data);
  };
  const columns = [
    {
      title: "Greetings",
      dataIndex: "greetings",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Designation",
      dataIndex: "dentation",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, record) => {
        return (
          <p>
            {record.status ? (
              <span className="text-green-500">active</span>
            ) : (
              <span className="text-red-500">inactive</span>
            )}
          </p>
        );
      },
    },
    {
      title: "Tags",
      dataIndex: "tags",
      render: (_, record) => {
        return <span className="">{record.tags.join(", ")}</span>;
      },
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
      <h1 className="text-xl font-semibold p-5">Hero Sections</h1>
      <div className="mt-5">
        {/* hero table */}
        {!editFromState && (
          <Table
            loading={heroTableDataLoading}
            columns={columns}
            dataSource={heroTableData?.data}
            scroll={{ x: "max-content" }}
          />
        )}
        {/* edit form */}
        {editFromState && (
          <EditHero
            setEditFromState={setEditFromState}
            selectedHeroData={selectedHeroData}
            heroTableDataRefetch={heroTableDataRefetch}
          />
        )}
      </div>
    </div>
  );
};

export default HeroTable;
