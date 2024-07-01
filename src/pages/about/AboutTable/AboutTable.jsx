import { Popconfirm, Space, Table } from "antd";
import useGetData from "../../../hooks/useGetData";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { getAuthToken } from "../../../utils/authServices";
import EditAbout from "../EditAbout/EditAbout";

const AboutTable = () => {
  const {
    data: aboutTableData,
    dataLoading: aboutTableDataLoading,
    refetch: aboutTableDataRefetch,
  } = useGetData({ url: "/about" });

  const [editFromState, setEditFromState] = useState(false);

  const [selectedAboutData, setSelectedAboutData] = useState();

  const handleDelete = async (data) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Deleting, please wait...");
    try {
      const res = await axios.delete(`${API_URL}/about/${data?._id}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      });
      if (res?.data?.message === "About deleted Successfully") {
        aboutTableDataRefetch();
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handelEditFromState = (data) => {
    setEditFromState(true);
    setSelectedAboutData(data);
  };

  const handleStatusChange = async(id)=> {
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Updating, please wait...");
    try {
      const res = await axios.put(
        `${API_URL}/about/status/${id}`,{},
        {
          headers: {
            Authorization: getAuthToken(),
          },
        }
      );
      if (res?.data?.message === "Status Changed Successfully") {
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
        aboutTableDataRefetch();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        id: toastId,
        duration: 2000,
      });
    }
  }



  const columns = [
    {
      title: "Photo",
      dataIndex: "photoUrl",
      render: (_, record) => {
        return (
          <>
            <img className="h-8 w-8" src={record?.photoUrl} alt="" />
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title={`Are you sure you want to ${record?.status ? "inactive":"activate"} this?`}
          onConfirm={() => handleStatusChange(record?._id)}
            okText="Yes"
            cancelText="No"
          >
            {
              record?.status ? <p className="text-green-500 cursor-pointer">active</p>: <p className="text-red-500 cursor-pointer">inactive</p>
            }
          
          </Popconfirm>
        </Space>
      ),
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
    
    {
      title: "Desc",
      dataIndex: "desc",
    },
    
   
  ];

  return (
    <div className="w-10/12 mx-auto my-16 border rounded-lg ">
      <h1 className="text-xl font-semibold p-5">About Sections</h1>
      <div className="mt-5">
        {/* hero table */}
        {!editFromState && (
          <Table
            loading={aboutTableDataLoading}
            columns={columns}
            dataSource={aboutTableData?.data}
            scroll={{ x: "max-content" }}
          />
        )}
        {/* hero form */}
        {editFromState && (
          <EditAbout
            setEditFromState={setEditFromState}
            selectedAboutData={selectedAboutData}
            aboutTableDataRefetch={aboutTableDataRefetch}
          />
        )}
      </div>
    </div>
  );
};

export default AboutTable;
