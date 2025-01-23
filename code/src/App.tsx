import { useEffect, useState } from "react";
import { ToastContainer, Flip } from "react-toastify";
import { WheelDataType } from "react-custom-roulette";

import { generateId, stringShortener } from "./functions/helpers";

import { ParticipantModel } from "./models/participantModels";
import { TeamModel } from "./models/teamModels";
import { SpiningVelocityEnum } from "./enums/spinningVelocityEnum";

import Wheel from "./components/wheel/Wheel";
import Participants from "./components/participants/Participants";
import Teams from "./components/teams/Teams";

function App() {
  const MAX_OPTION_LENGTH = 12;
  const AVOID_WHEEL_BLINK_DELAY_MS = 250;

  const [participants, setParticipants] = useState<ParticipantModel[]>([]);
  const [canSpinWheel, setCanSpinWheel] = useState<boolean>(true);
  const [wheelData, setWheelData] = useState<WheelDataType[]>([{}]);
  const [teams, setTeams] = useState<TeamModel[]>([]);
  const [teamReceivePlayer, setTeamReceivePlayer] = useState<TeamModel | null>(
    null
  );

  function onSpinStop(drawnIndex: number): void {
    const drawn = wheelData.at(drawnIndex);

    if (drawn && drawn.option && teamReceivePlayer) {
      const playerName = drawn.option;

      teams
        .find((team) => team.id === teamReceivePlayer.id)
        ?.players.push({
          id: generateId(),
          name: playerName,
        });

      setTimeout(() => {
        setParticipants((prev) => {
          return prev.filter((_, i) => i !== drawnIndex);
        });
        setTeams(teams);
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

  useEffect(() => {
    const teamReceivePlayerExists = teams.some(
      (team) => team.id === teamReceivePlayer?.id
    );

    if (!teamReceivePlayerExists) {
      setTeamReceivePlayer(null);
    }
  }, [teams, teamReceivePlayer]);

  return (
    <div className="flex flex-col items-center md:grid md:grid-cols-2 md:items-start gap-5 p-4 overflow-x-hidden">
      <div className="flex flex-col items-center gap-3">
        <Participants
          participants={participants}
          setParticipants={setParticipants}
          canSpinWheel={canSpinWheel}
        />

        <Wheel
          canSpinWheel={canSpinWheel}
          setCanSpinWheel={setCanSpinWheel}
          data={wheelData}
          spinningVelocity={SpiningVelocityEnum.FAST}
          onSpinStop={(index: number) => onSpinStop(index)}
        />
      </div>

      <Teams
        teams={teams}
        setTeams={setTeams}
        teamReceivePlayer={teamReceivePlayer}
        setTeamReceivePlayer={setTeamReceivePlayer}
        canSpinWheel={canSpinWheel}
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
