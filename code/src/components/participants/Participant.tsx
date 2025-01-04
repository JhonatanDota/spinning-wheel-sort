import { ParticipantModel } from "../../models/participantModels";

interface ParticipantProps {
  participant: ParticipantModel;
  removeParticipant: () => void;
}

export default function Participant(props: ParticipantProps) {
  const { participant, removeParticipant } = props;

  return (
    <div className="flex items-center gap-2 border-[1px] rounded-md px-2 py-0.5">
      <h3 className="font-bold text-red-400">{participant.name}</h3>
      <button onClick={removeParticipant}>X</button>
    </div>
  );
}
