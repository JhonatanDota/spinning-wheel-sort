import { TeamModel } from "../../models/teamModels";

import { FaTrashAlt } from "react-icons/fa";

interface TeamProps {
  team: TeamModel;
  teamReceivePlayer?: TeamModel;
  setTeamReceivePlayer: (team: TeamModel) => void;
  removeTeam: (team: TeamModel) => void;
}

export default function Team(props: TeamProps) {
  const { team, teamReceivePlayer, setTeamReceivePlayer, removeTeam } = props;

  return (
    <div className="flex flex-col items-center gap-1 md:gap-3 rounded-md md:max-w-[200px]">
      <div
        onClick={() => setTeamReceivePlayer(team)}
        className={`flex px-3 md:px-5 py-0.5 md:py-2 rounded-md cursor-pointer transition-colors ${
          team.id === teamReceivePlayer?.id
            ? "bg-green-700 text-white"
            : "bg-blue-200 text-gray-800"
        }`}
      >
        <span className="uppercase text-lg font-bold">{team.name}</span>
      </div>

      <div className="flex flex-col items-center md:flex-row md:flex-wrap md:gap-3 text-base md:text-xl font-medium text-white">
        {team.players.map((player, index) => (
          <span key={index}>{player}</span>
        ))}
      </div>

      <button
        onClick={() => removeTeam(team)}
        className="flex justify-center p-1.5 bg-red-600 text-white rounded-md w-full"
      >
        <FaTrashAlt />
      </button>
    </div>
  );
}
