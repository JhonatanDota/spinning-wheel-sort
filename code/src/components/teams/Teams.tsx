import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { FaPlusCircle } from "react-icons/fa";

import { generateId } from "../../functions/helpers";

import { TeamPlayer } from "../../models/teamPlayerModels";
import { TeamModel } from "../../models/teamModels";

import Team from "./Team";
import EditTeamModal from "./EditTeamModal";
import { useState } from "react";

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

  const [openEditTeamModal, setOpenEditTeamModal] = useState<boolean>(false);
  const [selectedEditTeam, setSelectedEditTeam] = useState<TeamModel | null>(
    null
  );

  function addTeam(): void {
    const team: TeamModel = {
      id: generateId(),
      name: `Time ${teams.length + 1}`,
      players: [],
    };

    setTeams([...teams, team]);
    setTeamReceivePlayer(team);
  }

  function removeTeam(targetTeam: TeamModel): void {
    setTeams(teams.filter((team) => team.id !== targetTeam.id));
  }

  function editTeamName(targetTeam: TeamModel, name: string) {
    const team = teams.find((team) => team.id === targetTeam.id);
    if (team) {
      team.name = name;
      setTeams([...teams]);
    }
  }

  function addTeamPlayer(
    team: TeamModel,
    player: TeamPlayer,
    destinationIndex: number
  ): void {
    const teamToUpdate = teams.find((teamItem) => teamItem.id === team.id);
    if (teamToUpdate) {
      teamToUpdate.players.splice(destinationIndex, 0, player);
      setTeams([...teams]);
    }
  }

  function removeTeamPlayer(targetTeam: TeamModel, playerIndex: number): void {
    const teamToUpdate = teams.find((team) => team.id === targetTeam.id);
    if (teamToUpdate) {
      teamToUpdate.players.splice(playerIndex, 1);
      setTeams([...teams]);
    }
  }

  function onDragEnd(result: DropResult): void {
    if (!result.destination) return;

    const sourceTeam = teams.find(
      (team) => team.id === result.source.droppableId
    );
    const sourcePlayerIndex = result.source.index;
    const teamPlayer = sourceTeam?.players.at(sourcePlayerIndex);

    const destinationTeam = teams.find(
      (team) => team.id === result.destination?.droppableId
    );
    const destinationPlayerIndex = result.destination.index;

    if (!sourceTeam || !destinationTeam || !teamPlayer) {
      return;
    }

    removeTeamPlayer(sourceTeam, sourcePlayerIndex);
    addTeamPlayer(destinationTeam, teamPlayer, destinationPlayerIndex);
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
              setSelectedTeamModal={(team) => {
                setSelectedEditTeam(team);
                setOpenEditTeamModal(true);
              }}
              canSpinWheel={canSpinWheel}
            />
          ))}
        </div>
      </DragDropContext>

      {selectedEditTeam && openEditTeamModal && (
        <EditTeamModal
          team={selectedEditTeam}
          editTeamName={editTeamName}
          setIsOpen={setOpenEditTeamModal}
        />
      )}
    </div>
  );
}
