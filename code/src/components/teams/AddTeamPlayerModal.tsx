import { useState } from "react";
import BaseModal from "../commom/modals/BaseModal";

import { TeamModel } from "../../models/teamModels";
import { TeamPlayerModel } from "../../models/teamPlayerModels";

import { generateId } from "../../functions/helpers";

import { FaPlus } from "react-icons/fa";

interface AddTeamPlayerModalProps {
  team: TeamModel;
  addTeamPlayer: (
    team: TeamModel,
    player: TeamPlayerModel,
    destinationIndex: number
  ) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export default function AddTeamPlayerModal(props: AddTeamPlayerModalProps) {
  const { team, addTeamPlayer, setIsOpen } = props;

  const [playerName, setPlayerName] = useState<string>("");

  function addNewTeamPlayer(): void {
    addTeamPlayer(
      team,
      {
        id: generateId(),
        name: playerName === "" ? "Mendigo" : playerName,
      },
      0
    );

    setPlayerName("");
  }

  return (
    <BaseModal title="ADICIONAR JOGADOR" setIsOpen={setIsOpen}>
      <div className="flex flex-col gap-1">
        <input
          className="font-medium my-1 rounded-md p-1.5 focus:outline-none"
          type="text"
          onChange={(e) => setPlayerName(e.target.value)}
          value={playerName}
        />

        <button
          onClick={addNewTeamPlayer}
          disabled={!playerName}
          className="self-end p-2 rounded-md bg-green-600 disabled:opacity-55"
        >
          <FaPlus fill="white" />
        </button>

        <p className="text-white font-bold">
          Time - <span className="text-yellow-400">{team.name}</span>
        </p>
      </div>
    </BaseModal>
  );
}
