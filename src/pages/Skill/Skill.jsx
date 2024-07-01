import { EditFilled, PlusCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import CreateSkill from "./CreateSkill/CreateSkill";
import SkillTable from "./SkillTable/SkillTable";

const Skill = () => {
  const [createEditFormState, setCreateEditFormState] = useState(0);
  const handleCreateEditFormState = (value) => {
    setCreateEditFormState(value);
  };
  return (
    <div className="w-full h-full">
      {/* buttons */}
      <div className={` flex flex-col lg:flex-row items-center justify-center gap-8`}>
        {/*create btn  */}
        <div
          className={`w-[250px] h-[250px] ${
            createEditFormState === 1
              ? "border border-green-500  bg-green-50"
              : "hover:shadow-2xl"
          }  rounded-lg flex flex-col gap-2 items-center justify-center shadow-lg  duration-200 cursor-pointer `}
          onClick={() => handleCreateEditFormState(1)}
        >
          <h2
            className={`text-xl font-semibold ${
              createEditFormState === 1 && "text-green-500"
            } `}
          >
            Create
          </h2>
          <PlusCircleFilled
            className={`text-3xl ${
              createEditFormState === 1 && "text-green-500"
            }`}
          />
        </div>
        {/*create btn  */}
        <div
          className={`w-[250px] h-[250px] ${
            createEditFormState === 2
              ? "border border-green-500 bg-green-100"
              : "hover:shadow-2xl"
          }  rounded-lg flex flex-col gap-2 items-center justify-center shadow-lg  duration-200 cursor-pointer`}
          onClick={() => handleCreateEditFormState(2)}
        >
          <h2
            className={`text-xl font-semibold ${
              createEditFormState === 2 && "text-green-500"
            } `}
          >
            Edit
          </h2>
          <EditFilled
            className={`text-3xl ${
              createEditFormState === 2 && "text-green-500"
            }`}
          />
        </div>
      </div>
      {/* forms */}
      {createEditFormState === 1 && (
        <div className={``}>
          <CreateSkill />
        </div>
      )}

      {/* table */}
      {createEditFormState === 2 && (
        <div className={``}>
          <SkillTable />
        </div>
      )}
    </div>
  );
};

export default Skill;
