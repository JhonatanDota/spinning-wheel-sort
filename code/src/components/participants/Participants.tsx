import { useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

import { FaPlusCircle } from "react-icons/fa";

import { ParticipantModel } from "../../models/participantModels";

import { participantMessages } from "../../extra/participantEasterEgg";

import Participant from "./Participant";

interface ParticipantsProps {
  participants: ParticipantModel[];
  setParticipants: (participants: ParticipantModel[]) => void;
  canSpinWheel: boolean;
}

export default function Participants(props: ParticipantsProps) {
  const MAX_NAME_LENGTH = 18;

  const KEYBOARD_KEY_ADD_PARTICIPANT = "Enter";

  const { participants, setParticipants, canSpinWheel } = props;

  const [participantName, setParticipantName] = useState<string>("");

  function handleAddParticipant(): void {
    const participant: ParticipantModel = {
      name: participantName,
    };

    try {
      addParticipantValidations(participant);
      addParticipant(participant);
      handleParticipantEasterEgg(participant);

      setParticipantName("");
    } catch (error) {}
  }

  function addParticipant(participant: ParticipantModel): void {
    setParticipants([...participants, participant]);
  }

  function removeParticipant(indexToRemove: number): void {
    const updatedParticipants = [...participants];

    updatedParticipants.splice(indexToRemove, 1);
    setParticipants(updatedParticipants);
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
      <div className="flex gap-2 m-auto">
        <input
          className="text-sm md:text-xl font-medium px-3 md:px-4 py-1.5 md:py-3 rounded-md focus:outline-none"
          type="text"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === KEYBOARD_KEY_ADD_PARTICIPANT) handleAddParticipant();
          }}
          placeholder="Participante"
        />

        <button
          onClick={handleAddParticipant}
          className="flex items-center text-base md:text-2xl px-4 md:px-3 py-3 rounded-md bg-green-600 text-white disabled:opacity-55"
          disabled={!canSpinWheel}
        >
          <FaPlusCircle />
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <AnimatePresence>
          {participants.map((participant, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Participant
                key={index}
                participant={participant}
                removeParticipant={() => removeParticipant(index)}
                canSpinWheel={canSpinWheel}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
