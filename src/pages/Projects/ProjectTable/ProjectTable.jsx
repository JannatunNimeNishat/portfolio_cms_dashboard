import { useState } from "react";
import useGetData from "../../../hooks/useGetData";
import { toast } from "sonner";
import axios from "axios";
import { getAuthToken } from "../../../utils/authServices";
import { Popconfirm, Space, Table } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import EditProject from "../EditProject/EditProject";

const ProjectTable = () => {
  const {
    data: projectTableData,
    dataLoading: projectTableDataLoading,
    refetch: projectTableDataRefetch,
  } = useGetData({ url: "/project" });
  console.log(projectTableData);
  const [editFromState, setEditFromState] = useState(false);

  const [selectedProjectData, setSelectedProjectData] = useState();

  const handleDelete = async (data) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const toastId = toast.loading("Deleting, please wait...");
    try {
      const res = await axios.delete(`${API_URL}/project/${data?._id}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      });
      if (res?.data?.message === "Project deleted Successfully") {
        projectTableDataRefetch();
        toast.success(res?.data?.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handelEditFromState = (data) => {
    setEditFromState(true);
    setSelectedProjectData(data);
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
      title: "Photo",
      dataIndex: "projectImg.projectHero",
      render: (_, record) => {
        return (
          <>
            <img
              className="h-8 w-8"
              src={record?.projectImg?.projectHero}
              alt=""
            />
          </>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Technology Used",
      dataIndex: "technologyUsed",
      render: (_, record) => {
        return <span className="">{record?.technologyUsed?.join(", ")}</span>;
      },
    },
    {
      title: "Live client",
      dataIndex: "liveLink.client",
      render: (_, record) => {
        return (
          <Link to={`${record?.liveLink?.client}`} target="_blank" className="">
            {record?.liveLink?.client}
          </Link>
        );
      },
    },
    {
      title: "Live server",
      dataIndex: "liveLink.server",
      render: (_, record) => {
        return (
          <Link to={`${record?.liveLink?.server}`} target="_blank" className="">
            {record?.liveLink?.server}
          </Link>
        );
      },
    },
    {
      title: "Git client",
      dataIndex: "gitLinks.client",
      render: (_, record) => {
        return (
          <Link to={`${record?.gitLinks?.client}`} target="_blank" className="">
            {record?.gitLinks?.client}
          </Link>
        );
      },
    },
    {
      title: "Git server",
      dataIndex: "gitLinks.server",
      render: (_, record) => {
        return (
          <Link to={`${record?.gitLinks?.server}`} target="_blank" className="">
            {record?.gitLinks?.server}
          </Link>
        );
      },
    },

    {
      title: "Desc",
      dataIndex: "desc",
    },
  ];

  return (
    <div className="lg:w-10/12 mx-auto my-16 border rounded-lg ">
      <h1 className="text-xl font-semibold p-5">Projects Section</h1>
      <div className="mt-5">
        {/* hero table */}
        {!editFromState && (
          <Table
            loading={projectTableDataLoading}
            columns={columns}
            dataSource={projectTableData?.data}
            scroll={{ x: "max-content" }}
          />
        )}
        {/* hero form */}
        {editFromState && (
          <EditProject
            setEditFromState={setEditFromState}
            selectedProjectData={selectedProjectData}
            projectTableDataRefetch={projectTableDataRefetch}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectTable;
