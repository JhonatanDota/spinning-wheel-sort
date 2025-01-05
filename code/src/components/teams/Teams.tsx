import { TeamModel } from "../../models/teamModels";

import { generateId } from "../../functions/helpers";

import { FaPlusCircle } from "react-icons/fa";

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

  function removeTeam(teamToRemove: TeamModel): void {
    setTeams(teams.filter((team) => team.id !== teamToRemove.id));
  }

  return (
    <div className="flex flex-col gap-5">
      <button
        className="flex items-center gap-2 text-sm md:text-xl self-center uppercase bg-green-600 px-4 md:px-5 py-2 font-bold text-white rounded-lg"
        onClick={addTeam}
      >
        <FaPlusCircle />
        <span>Time</span>
      </button>

      <div className="grid grid-cols-3 md:flex md:flex-wrap gap-5 md:gap-7">
        {teams.map((team) => (
          <Team
            key={team.id}
            team={team}
            teamReceivePlayer={teamReceivePlayer}
            setTeamReceivePlayer={setTeamReceivePlayer}
            removeTeam={removeTeam}
          />
        ))}
      </div>
    </div>
  );
}
