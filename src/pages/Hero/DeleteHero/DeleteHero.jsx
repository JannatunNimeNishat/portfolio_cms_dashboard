import { Modal } from "antd";
import { useState } from "react";

const DeleteHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteHero = ()=>{
    
  }

  return (
    <>
      <div className="text-right">
        <button
          className="px-3 py-2 border rounded-lg bg-red-500 text-white hover:bg-red-600"
          onClick={showModal}
        >
          Delete
        </button>
      </div>
      <Modal
        title="Confirm Deletion"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={400}
        footer
        className="rounded-xl "
      >
        <div className=" ">
        {/* body */}
        <div className="my-[45px] text-center">
          <p className="text-gray-400 text-[14px] font-semibold leading-[20px]">
            Do you really want to delete this section?
          </p>
        </div>
        {/* footer */}
        <div className="flex justify-between   ">
          <button
            className="px-3 py-1 bg-gray-400 hover:bg-gray-500 rounded-lg text-white "
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            onClick={handleDeleteHero}
          >
            Delete
          </button>
        </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteHero;
