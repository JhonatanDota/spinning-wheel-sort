import { useState } from "react";
import { TeamModel } from "../../models/teamModels";
import BaseModal from "../commom/modals/BaseModal";

interface EditTeamModalProps {
  team: TeamModel;
  editTeamName: (team: TeamModel, name: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export default function EditTeamModal(props: EditTeamModalProps) {
  const { team, editTeamName, setIsOpen } = props;

  const [name, setName] = useState<string>(team.name);

  return (
    <BaseModal title="EDITAR TIME" setIsOpen={setIsOpen}>
      <input
        className="font-medium my-1 rounded-md p-1.5 focus:outline-none"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <button
        onClick={() => editTeamName(team, name)}
        className="uppercase self-end text-sm px-1 py-1.5 bg-green-600 text-white font-bold mt-2 rounded-md"
      >
        Confirmar
      </button>
    </BaseModal>
  );
}
