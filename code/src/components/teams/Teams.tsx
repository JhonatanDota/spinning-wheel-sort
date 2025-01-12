import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { TeamModel } from "../../models/teamModels";

import { generateId } from "../../functions/helpers";

import { FaPlusCircle } from "react-icons/fa";

import Team from "./Team";

interface TeamsProps {
  teams: TeamModel[];
  setTeams: (teams: TeamModel[]) => void;
  teamReceivePlayer: TeamModel | null;
  setTeamReceivePlayer: (team: TeamModel) => void;
  canSpinWheel: boolean;
}

export default function Teams(props: TeamsProps) {
  const {
    teams,
    setTeams,
    teamReceivePlayer,
    setTeamReceivePlayer,
    canSpinWheel,
  } = props;

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

  function addTeamPlayer(
    team: TeamModel,
    player: string,
    destinationIndex: number
  ): void {
    const updatedTeams = teams.map((teamItem) => {
      if (teamItem.id === team.id)
        teamItem.players.splice(destinationIndex, 0, player);
      return teamItem;
    });

    setTeams(updatedTeams);
  }

  function removeTeamPlayer(team: TeamModel, playerIndex: number): void {
    const updatedTeams = teams.map((teamItem) => {
      if (teamItem.id === team.id) teamItem.players.splice(playerIndex, 1);
      return teamItem;
    });

    setTeams(updatedTeams);
  }

  function onDragEnd(result: DropResult): void {
    if (!result.destination) return;

    const sourceTeam = teams.find(
      (team) => team.id === result.source.droppableId
    );
    const sourcePlayerIndex = result.source.index;

    const destinationTeam = teams.find(
      (team) => team.id === result.destination?.droppableId
    );
    const destinationPlayerIndex = result.destination.index;

    if (!sourceTeam || !destinationTeam) {
      return;
    }

    removeTeamPlayer(sourceTeam, sourcePlayerIndex);
    addTeamPlayer(destinationTeam, result.draggableId, destinationPlayerIndex);
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <button
        className="flex items-center gap-2 text-sm md:text-xl self-center uppercase bg-green-600 px-4 md:px-5 py-2 font-bold text-white rounded-lg disabled:opacity-55"
        onClick={addTeam}
        disabled={!canSpinWheel}
      >
        <FaPlusCircle />
        <span>Time</span>
      </button>

      <DragDropContext onDragEnd={(result: DropResult) => onDragEnd(result)}>
        <div className="flex flex-wrap justify-center gap-5 md:gap-10">
          {teams.map((team) => (
            <Team
              key={team.id}
              team={team}
              teamReceivePlayer={teamReceivePlayer}
              setTeamReceivePlayer={setTeamReceivePlayer}
              removeTeam={removeTeam}
              removeTeamPlayer={removeTeamPlayer}
              canSpinWheel={canSpinWheel}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
