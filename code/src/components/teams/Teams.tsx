import { TeamModel } from "../../models/teamModels";

import { generateId } from "../../functions/helpers";

import Team from "./Team";

interface TeamsProps {
  teams: TeamModel[];
  setTeams: (teams: TeamModel[]) => void;
  teamReceivePlayer?: TeamModel;
  setTeamReceivePlayer: (team: TeamModel) => void;
}

export default function Teams(props: TeamsProps) {
  const { teams, setTeams, teamReceivePlayer, setTeamReceivePlayer } = props;

  function addTeam(): void {
    const team: TeamModel = {
      id: generateId(),
      name: `Time ${teams.length + 1}`,
      players: [],
    };

    setTeams([...teams, team]);
    setTeamReceivePlayer(team);
  }

  return (
    <div className="flex flex-col gap-5">
      <button
        className="uppercase bg-green-600 p-2 font-bold text-white rounded-md"
        onClick={addTeam}
      >
        + Time
      </button>

      <div className="flex flex-wrap gap-7">
        {teams.map((team) => (
          <Team
            key={team.id}
            team={team}
            teamReceivePlayer={teamReceivePlayer}
            setTeamReceivePlayer={setTeamReceivePlayer}
          />
        ))}
      </div>
    </div>
  );
}
