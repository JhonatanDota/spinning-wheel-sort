import { ParticipantModel } from "../../models/participantModels";

import { FaTrashAlt } from "react-icons/fa";

interface ParticipantProps {
  participant: ParticipantModel;
  removeParticipant: () => void;
}

export default function Participant(props: ParticipantProps) {
  const { participant, removeParticipant } = props;

  return (
    <div className="flex items-center gap-2 md:gap-4 rounded-md px-2 md:px-4 py-1 bg-orange-600 text-white">
      <span className="text-base md:text-lg font-bold">{participant.name}</span>
      <button onClick={removeParticipant}>
        <FaTrashAlt />
      </button>
    </div>
  );
}
