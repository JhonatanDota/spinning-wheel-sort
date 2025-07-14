import { useState, useEffect } from "react";

import Wheel from "../components/wheel/Wheel";
import Participants from "../components/participants/Participants";
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
  const [losers, setLosers] = useState<string[]>([]);

  function onSpinStop(drawnIndex: number) {
    const drawParticipant = wheelData.at(drawnIndex);

    if (drawParticipant && drawParticipant.option) {
      setLosers([...losers, drawParticipant.option]);

      setTimeout(() => {
        setParticipants(participants.filter((_, i) => i !== drawnIndex));
      }, AVOID_WHEEL_BLINK_DELAY_MS);
    }

    setTimeout(() => {
      setCanSpinWheel(true);
    }, AVOID_WHEEL_BLINK_DELAY_MS);
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
    <div className="flex flex-col items-center gap-5 p-4">
      <Participants
        participants={participants}
        setParticipants={setParticipants}
        canSpinWheel={true}
      />

      <Wheel
        canSpinWheel={canSpinWheel}
        setCanSpinWheel={setCanSpinWheel}
        data={wheelData}
        spinningVelocity={SpiningVelocityEnum.FAST}
        onSpinStop={(index: number) => onSpinStop(index)}
      />

      <div className="flex">
        {losers.map((loser) => (
          <span className="text-white">{loser}</span>
        ))}
      </div>
    </div>
  );
}
