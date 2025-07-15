import { useState, useEffect } from "react";

import Wheel from "../components/wheel/Wheel";
import Participants from "../components/participants/Participants";
import Toggle from "../components/commom/Toggle";

import { WheelDataType } from "react-custom-roulette";
import { ParticipantModel } from "../models/participantModels";
import { stringShortener } from "../functions/helpers";
import {
  AVOID_WHEEL_BLINK_DELAY_MS,
  MAX_OPTION_LENGTH,
  SpiningVelocityEnum,
} from "../constants/wheel";

export default function SimpleDraw() {
  const [participants, setParticipants] = useState<ParticipantModel[]>([]);
  const [canSpinWheel, setCanSpinWheel] = useState<boolean>(true);
  const [wheelData, setWheelData] = useState<WheelDataType[]>([{}]);
  const [lastDrawnWins, setLastDrawnWins] = useState<boolean>(false);

  function onSpinStop(drawnIndex: number) {
    const drawParticipant = wheelData.at(drawnIndex);
    const drawParticipantName = drawParticipant?.option;

    setTimeout(() => {
      if (drawParticipantName) {
        if (lastDrawnWins) {
          handleLastDrawnWinner(drawnIndex, drawParticipantName);
        } else {
          handleFirstDrawnWinner(drawParticipantName);
        }
      }

      setCanSpinWheel(true);
    }, AVOID_WHEEL_BLINK_DELAY_MS);
  }

  function handleFirstDrawnWinner(winner: string) {
    handleWinner(winner);
  }

  function handleLastDrawnWinner(drawIndex: number, loser: string) {
    setTimeout(() => {
      const filteredParticipants = participants.filter(
        (_, i) => i !== drawIndex
      );

      if (filteredParticipants.length === 1) {
        handleWinner(filteredParticipants[0].name);
      }

      if (filteredParticipants.length >= 1) {
        setParticipants(filteredParticipants);
      }
    }, AVOID_WHEEL_BLINK_DELAY_MS);
  }

  function handleWinner(winner: string) {
    alert(winner);
  }

  useEffect(() => {
    if (participants.length) {
      setWheelData(
        participants.map((participant) => ({
          option: stringShortener(participant.name, MAX_OPTION_LENGTH),
        }))
      );
    } else {
      setWheelData([{}]);
    }
  }, [participants]);

  return (
    <div className="grid md:grid-cols-2 justify-center gap-4 p-4">
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-center items-center gap-1">
          <Toggle checked={lastDrawnWins} setChecked={setLastDrawnWins} />
          <span className="uppercase text-xs md:text-sm font-bold text-white">
            O último sorteado vence
          </span>
        </div>

        <Participants
          participants={participants}
          setParticipants={setParticipants}
          canSpinWheel={canSpinWheel}
          allowDuplicatedNames={true}
        />
      </div>

      <Wheel
        canSpinWheel={canSpinWheel}
        setCanSpinWheel={setCanSpinWheel}
        data={wheelData}
        spinningVelocity={SpiningVelocityEnum.FAST}
        onSpinStop={(index: number) => onSpinStop(index)}
      />
    </div>
  );
}
