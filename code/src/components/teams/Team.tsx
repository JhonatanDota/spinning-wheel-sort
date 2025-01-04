import { TeamModel } from "../../models/teamModels";

interface TeamProps {
  team: TeamModel;
  setTeamReceivePlayer: (team: TeamModel) => void;
}

export default function Team(props: TeamProps) {
  const { team, setTeamReceivePlayer } = props;

  return (
    <div>
      <input
        type="radio"
        name="receive-player-radio"
        onChange={() => setTeamReceivePlayer(team)}
      />
      <h1>{team.id}</h1>
      <h1>{team.name}</h1>
      {team.players.map((player, index) => (
        <h3 key={index}>{player}</h3>
      ))}
    </div>
  );
}
