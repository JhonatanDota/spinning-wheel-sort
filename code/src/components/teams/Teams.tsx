import { TeamModel } from "../../models/teamModels";

import Team from "./Team";

interface TeamsProps {
  teams: TeamModel[];
  setTeamReceivePlayer: (team: TeamModel) => void;
}

export default function Teams(props: TeamsProps) {
  const { teams, setTeamReceivePlayer } = props;

  return (
    <div className="flex gap-2">
      {teams.map((team) => (
        <Team
          key={team.id}
          team={team}
          setTeamReceivePlayer={setTeamReceivePlayer}
        />
      ))}
    </div>
  );
}
