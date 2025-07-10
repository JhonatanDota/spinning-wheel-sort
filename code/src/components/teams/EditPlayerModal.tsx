import { useState } from "react";
import { TeamModel } from "../../models/teamModels";
import { TeamPlayerModel } from "../../models/teamPlayerModels";

import BaseModal from "../commom/modals/BaseModal";

interface EditPlayerModalProps {
  team: TeamModel;
  player: TeamPlayerModel;
  editPlayerName: (
    team: TeamModel,
    player: TeamPlayerModel,
    newName: string
  ) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export default function EditPlayerModal(props: EditPlayerModalProps) {
  const { team, player, editPlayerName, setIsOpen } = props;

  const [name, setName] = useState<string>(player.name);

  return (
    <BaseModal title="EDITAR JOGADOR" setIsOpen={setIsOpen}>
      <input
        className="font-medium my-1 rounded-md p-1.5 focus:outline-none"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <button
        onClick={() => editPlayerName(team, player, name)}
        className="uppercase self-end text-sm px-1 py-1.5 bg-green-600 text-white font-bold mt-2 rounded-md"
      >
        Confirmar
      </button>
    </BaseModal>
  );
}
