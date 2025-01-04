import { useEffect, useState } from "react";
import { ToastContainer, Flip } from "react-toastify";
import { WheelDataType } from "react-custom-roulette";

import { stringShortener } from "./functions/helpers";

import { ParticipantModel } from "./models/participantModels";
import { SpiningVelocityEnum } from "./enums/spinningVelocityEnum";

import Wheel from "./components/wheel/Wheel";
import Participants from "./components/participants/Participants";

function App() {
  const MAX_OPTION_LENGTH = 12;

  const [participants, setParticipants] = useState<ParticipantModel[]>([]);
  const [wheelData, setWheelData] = useState<WheelDataType[]>([{}]);
  const [winners, setWinners] = useState<string[]>([]);

  function onSpinStop(dataIndex: number): void {
    const winner = wheelData.at(dataIndex);

    if (winner && winner.option) setWinners([...winners, winner.option]);
  }

  useEffect(() => {
    if (participants.length) {
      setWheelData(
        participants.map((participant) => ({
          option: stringShortener(participant.name, MAX_OPTION_LENGTH),
          style: { backgroundColor: participant.color },
        }))
      );
    }
  }, [participants]);

  return (
    <div className="flex flex-col items-center p-4">
      <Participants
        participants={participants}
        addParticipant={(participant) =>
          setParticipants((prev) => [...prev, participant])
        }
      />

      <Wheel
        data={wheelData}
        spinningVelocity={SpiningVelocityEnum.FAST}
        onSpinStop={(index: number) => onSpinStop(index)}
      />

      <ToastContainer
        className="font-bold"
        position="bottom-center"
        autoClose={1500}
        theme="dark"
        transition={Flip}
      />
    </div>
  );
}

export default App;
