import { useEffect, useState } from "react";
import { ToastContainer, Flip } from "react-toastify";
import { WheelDataType } from "react-custom-roulette";

import { generateId } from "./functions/helpers";
import { stringShortener } from "./functions/helpers";

import { ParticipantModel } from "./models/participantModels";
import { TeamModel } from "./models/teamModels";
import { SpiningVelocityEnum } from "./enums/spinningVelocityEnum";

import Wheel from "./components/wheel/Wheel";
import Participants from "./components/participants/Participants";
import Teams from "./components/teams/Teams";

function App() {
  const MAX_OPTION_LENGTH = 12;

  const [participants, setParticipants] = useState<ParticipantModel[]>([]);
  const [wheelData, setWheelData] = useState<WheelDataType[]>([{}]);
  const [teams, setTeams] = useState<TeamModel[]>([]);
  const [teamReceivePlayer, setTeamReceivePlayer] = useState<TeamModel>();

  function onSpinStop(dataIndex: number): void {
    const draw = wheelData.at(dataIndex);

    if (draw && draw.option && teamReceivePlayer) {
      const playerName = draw.option;
      const updatedTeams = teams.map((team) => {
        if (team.id === teamReceivePlayer.id) team.players.push(playerName);

        return team;
      });

      setTeams(updatedTeams);
    }
  }

  useEffect(() => {
    if (participants.length) {
      setWheelData(
        participants.map((participant) => ({
          option: stringShortener(participant.name, MAX_OPTION_LENGTH),
          style: { backgroundColor: participant.color },
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
      />

      <Wheel
        data={wheelData}
        spinningVelocity={SpiningVelocityEnum.FAST}
        onSpinStop={(index: number) => onSpinStop(index)}
      />

      <Teams
        teams={teams}
        setTeams={setTeams}
        teamReceivePlayer={teamReceivePlayer}
        setTeamReceivePlayer={setTeamReceivePlayer}
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
