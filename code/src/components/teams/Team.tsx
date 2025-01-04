import { TeamModel } from "../../models/teamModels";

import { FaTrashAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";

interface TeamProps {
  team: TeamModel;
  teamReceivePlayer?: TeamModel;
  setTeamReceivePlayer: (team: TeamModel) => void;
}

export default function Team(props: TeamProps) {
  const { team, teamReceivePlayer, setTeamReceivePlayer } = props;

  return (
    <div className="flex flex-col items-center gap-1 rounded-md">
      <div
        onClick={() => setTeamReceivePlayer(team)}
        className={`flex px-4 py-1 rounded-md cursor-pointer ${
          team.id === teamReceivePlayer?.id
            ? "bg-green-700 text-white"
            : "bg-blue-200 text-gray-900"
        }`}
      >
        <span className="uppercase text-lg font-bold">{team.name}</span>
      </div>

      <div className="flex flex-col items-center font-medium text-white">
        {team.players.map((player, index) => (
          <h3 key={index}>{player}</h3>
        ))}
      </div>

      <button className="flex justify-center p-2 bg-red-600 text-white rounded-md w-full">
        <FaTrashAlt />
      </button>
    </div>
  );
}
