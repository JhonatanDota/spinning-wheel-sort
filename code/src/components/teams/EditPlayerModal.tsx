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

  return (
    <BaseModal title="EDITAR JOGADOR" setIsOpen={setIsOpen}>
      <input
        className="font-medium my-1 rounded-md p-1.5 focus:outline-none"
        type="text"
        onChange={(e) => editPlayerName(team, player, e.target.value)}
        value={player.name}
      />
    </BaseModal>
  );
}
