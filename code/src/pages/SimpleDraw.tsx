import { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";

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
  const [losers, setLosers] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [winnerName, setWinnerName] = useState<string>("");

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

  function handleLastDrawnWinner(
    drawIndex: number,
    drawParticipantName: string
  ) {
    const filteredParticipants = participants.filter((_, i) => i !== drawIndex);

    if (filteredParticipants.length === 1) {
      handleWinner(filteredParticipants[0].name);
    }

    if (filteredParticipants.length >= 1) {
      setLosers([...losers, drawParticipantName]);
      setParticipants(filteredParticipants);
    }
  }

  function handleWinner(winner: string) {
    setShowConfetti(true);
    setWinnerName(winner);

    setTimeout(() => {
      setLosers([]);
      setShowConfetti(false);
      setWinnerName("");
    }, 3000);
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
      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center items-center gap-1">
          <Toggle
            checked={lastDrawnWins}
            setChecked={setLastDrawnWins}
            disabled={!canSpinWheel}
          />
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

        {lastDrawnWins && losers.length > 0 && (
          <div className="flex flex-col items-center font-bold w-full">
            <p className="text-base md:text-lg text-white">Nomes Removidos</p>
            <div className="flex flex-wrap p-1 gap-2">
              {losers.map((loser) => (
                <span className="text-sm md:text-base text-yellow-500">
                  {loser}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <Wheel
        canSpinWheel={canSpinWheel}
        setCanSpinWheel={setCanSpinWheel}
        data={wheelData}
        spinningVelocity={SpiningVelocityEnum.FAST}
        onSpinStop={(index: number) => onSpinStop(index)}
      />

      {showConfetti && winnerName && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm text-white">
          <ConfettiExplosion />

          <div className="text-3xl md:text-5xl font-bold animate-bounce mt-6">
            🎉 {winnerName} venceu! 🎉
          </div>
        </div>
      )}
    </div>
  );
}
