import { Droppable, Draggable } from "react-beautiful-dnd";

import { TeamModel } from "../../models/teamModels";

import { FaTrashAlt, FaEdit } from "react-icons/fa";

interface TeamProps {
  team: TeamModel;
  teamReceivePlayer: TeamModel | null;
  setTeamReceivePlayer: (team: TeamModel) => void;
  removeTeam: (team: TeamModel) => void;
  removeTeamPlayer: (team: TeamModel, playerIndex: number) => void;
  setSelectedTeamModal: (team: TeamModel) => void;
  canSpinWheel: boolean;
}

export default function Team(props: TeamProps) {
  const {
    team,
    teamReceivePlayer,
    setTeamReceivePlayer,
    removeTeam,
    removeTeamPlayer,
    setSelectedTeamModal,
    canSpinWheel,
  } = props;

  return (
    <div className="flex flex-col items-center gap-1 rounded-md w-32 md:w-52">
      <div
        onClick={() => canSpinWheel && setTeamReceivePlayer(team)}
        className={`w-full flex justify-center text-center px-3 md:px-5 py-0.5 md:py-2 rounded-md ${
          team.id === teamReceivePlayer?.id
            ? "bg-green-700 text-white"
            : "bg-blue-200 text-gray-800"
        } ${canSpinWheel ? "cursor-pointer" : "cursor-not-allowed"}`}
      >
        <span className="uppercase text-lg font-bold overflow-hidden">
          {team.name}
        </span>
      </div>

      <Droppable droppableId={team.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="w-full flex flex-col items-center gap-2 text-base md:text-xl font-medium text-white m-1"
          >
            {team.players.map((player, index) => (
              <Draggable key={player.id} draggableId={player.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex justify-between items-center gap-1 px-2 py-1 bg-orange-600 rounded-md w-full"
                  >
                    <span className="overflow-hidden">{player.name}</span>
                    <button
                      onClick={() => removeTeamPlayer(team, index)}
                      className="text-sm p-1"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="w-full grid grid-cols-2 gap-2">
        <button
          onClick={() => setSelectedTeamModal(team)}
          className="flex justify-center p-1.5 mt-1 bg-yellow-600 text-white rounded-md disabled:opacity-55"
          disabled={!canSpinWheel}
        >
          <FaEdit />
        </button>

        <button
          onClick={() => removeTeam(team)}
          className="flex justify-center p-1.5 mt-1 bg-red-600 text-white rounded-md disabled:opacity-55"
          disabled={!canSpinWheel}
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}
