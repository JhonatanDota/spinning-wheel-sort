import { useState } from "react";
import { toast } from "react-toastify";

import { participantMessages } from "../../extra/participantEasterEgg";

import { ParticipantModel } from "../../models/participantModels";

import { randomHexColor } from "../../functions/helpers";

interface ParticipantsProps {
  participants: ParticipantModel[];
  addParticipant: (participant: ParticipantModel) => void;
}

export default function Participants(props: ParticipantsProps) {
  const MAX_NAME_LENGTH = 18;

  const KEYBOARD_KEY_ADD_PARTICIPANT = "Enter";

  const { participants, addParticipant } = props;

  const [participantName, setParticipantName] = useState<string>("");

  function handleAddParticipant(): void {
    const participant: ParticipantModel = {
      name: participantName,
      color: randomHexColor(),
    };

    try {
      addParticipantValidations(participant);
      addParticipant(participant);
      handleParticipantEasterEgg(participant);

      setParticipantName("");
    } catch (error) {}
  }

  function addParticipantValidations(participant: ParticipantModel): void {
    if (!participant.name.length) {
      toast("Digita alguma coisa PCD", {
        type: "warning",
      });

      throw new Error();
    }

    if (participant.name.length > MAX_NAME_LENGTH) {
      toast("Nick grande da porra, diminui isso ai", {
        type: "warning",
      });

      throw new Error();
    }

    if (
      participants.some(
        (p) => p.name.toLowerCase() === participant.name.toLocaleLowerCase()
      )
    ) {
      toast("O arrombado já tá ai", {
        type: "warning",
      });

      throw new Error();
    }
  }

  function handleParticipantEasterEgg(participant: ParticipantModel): void {
    const participantMessage: string | undefined =
      participantMessages[participant.name.toUpperCase()];

    if (participantMessage) {
      toast(participantMessage);
    }
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
