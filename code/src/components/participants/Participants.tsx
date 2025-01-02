import { useState } from "react";

import { ParticipantModel } from "../../models/participantModels";

import randomHexColor from "../../functions/helpers";

interface ParticipantsProps {
  participants: ParticipantModel[];
  addParticipant: (participant: ParticipantModel) => void;
}

export default function Participants(props: ParticipantsProps) {
  const KEYBOARD_KEY_ADD_PARTICIPANT = "Enter";

  const { participants, addParticipant } = props;

  const [participantName, setParticipantName] = useState<string>("");

  function handleAddParticipant(): void {
    

    addParticipant({
      name: participantName,
      color: randomHexColor(),
    });

    setParticipantName("");
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2">
        <input
          className="border-2 p-2 rounded-lg focus:outline-none"
          type="text"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === KEYBOARD_KEY_ADD_PARTICIPANT) handleAddParticipant();
          }}
        />

        <button
          onClick={handleAddParticipant}
          className="border-2 px-4 py-1 rounded-lg"
        >
          ADD
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {participants.map((participant, index) => (
          <div key={index} className="border-[1px] rounded-md px-2 py-0.5">
            <h3 className="text-red-400">{participant.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
