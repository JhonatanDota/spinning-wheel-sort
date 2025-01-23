import { TeamModel } from "../../models/teamModels";
import BaseModal from "../commom/modals/BaseModal";

interface EditTeamModalProps {
  team: TeamModel;
  editTeamName: (team: TeamModel, name: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export default function EditTeamModal(props: EditTeamModalProps) {
  const { team, editTeamName, setIsOpen } = props;

  return (
    <BaseModal title="EDITAR TIME" setIsOpen={setIsOpen}>
      <input
        className="font-medium my-1 rounded-md p-1.5 bg-green-800 text-white focus:outline-none"
        type="text"
        onChange={(e) => editTeamName(team, e.target.value)}
        value={team.name.toUpperCase()}
      />
    </BaseModal>
  );
}
