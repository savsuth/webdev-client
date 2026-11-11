import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { useAccountContext } from "../../../account/AccountContext";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  const { currentUser } = useAccountContext();
  return (
    <div className="flex items-center gap-2">
      {/* Only faculty rename and delete modules. */}
      {currentUser?.role === "FACULTY" && (
        <>
          <FaPencilAlt
            className="cursor-pointer text-blue-600"
            onClick={() => editModule(moduleId)}
            title="Edit module"
          />
          <FaTrash
            className="cursor-pointer text-red-600"
            onClick={() => deleteModule(moduleId)}
            title="Delete module"
          />
        </>
      )}
      {/* The A3 GreenCheckmark keeps the existing badge look in place of a plain check icon. */}
      <GreenCheckmark />
      <BsPlus className="text-3xl" />
      <IoEllipsisVertical className="text-xl" />
    </div>
  );
}
