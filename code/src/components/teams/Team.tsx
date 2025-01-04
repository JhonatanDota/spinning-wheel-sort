import { TeamModel } from "../../models/teamModels";

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
        <p className="uppercase text-lg font-bold">{team.name}</p>
      </div>

      {team.players.map((player, index) => (
        <h3 key={index}>{player}</h3>
      ))}
    </div>
  );
}
