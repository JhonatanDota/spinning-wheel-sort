import { useEffect, useState } from "react";
import { ToastContainer, Flip } from "react-toastify";
import { WheelDataType } from "react-custom-roulette";

import {
  generateId,
  stringShortener,
  randomizeIndex,
} from "./functions/helpers";

import { ParticipantModel } from "./models/participantModels";
import { TeamModel } from "./models/teamModels";
import { SpiningVelocityEnum } from "./enums/spinningVelocityEnum";

import Wheel from "./components/wheel/Wheel";
import Participants from "./components/participants/Participants";
import TeamMaxPlayers from "./components/teams/TeamMaxPlayers";
import Teams from "./components/teams/Teams";

function App() {
  const MAX_OPTION_LENGTH = 12;
  const AVOID_WHEEL_BLINK_DELAY_MS = 250;

  const [participants, setParticipants] = useState<ParticipantModel[]>([]);
  const [canSpinWheel, setCanSpinWheel] = useState<boolean>(true);
  const [wheelData, setWheelData] = useState<WheelDataType[]>([{}]);
  const [teamMaxPlayer, setTeamMaxPlayer] = useState<number | null>(null);
  const [teams, setTeamsBase] = useState<TeamModel[]>([]);

  function setTeams(teams: TeamModel[]) {
    setTeamsBase(
      teams.map((team) => {
        const locked =
          teamMaxPlayer !== null && team.players.length >= teamMaxPlayer;

        return {
          ...team,
          locked,
        };
      })
    );
  }

  function onSpinStop(drawnIndex: number): void {
    const drawnPlayer = wheelData.at(drawnIndex);
    const drawnTeam = drawnUnlockedTeam();

    if (drawnPlayer && drawnPlayer.option && drawnTeam) {
      const updatedTeams = teams.map((team) => {
        if (team.id === drawnTeam.id) {
          return {
            ...team,
            players: [
              ...team.players,
              {
                id: generateId(),
                name: drawnPlayer.option ?? "Player",
              },
            ],
          };
        }
        return team;
      });

      setTimeout(() => {
        setParticipants((prev) => {
          return prev.filter((_, i) => i !== drawnIndex);
        });
        setTeams(updatedTeams);
      }, AVOID_WHEEL_BLINK_DELAY_MS);
    }

    setTimeout(() => {
      setCanSpinWheel(true);
    }, AVOID_WHEEL_BLINK_DELAY_MS);
  }

  function drawnUnlockedTeam(): TeamModel | null {
    const unlockedTeams = teams.filter((team) => !team.locked);

    return unlockedTeams.at(randomizeIndex(unlockedTeams.length)) ?? null;
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
    setTeams(teams);
  }, [teamMaxPlayer]);

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

      <div className="flex flex-col items-center gap-5">
        <Teams teams={teams} setTeams={setTeams} canSpinWheel={canSpinWheel} />
        {teams.length > 0 && (
          <TeamMaxPlayers
            maxPlayers={teamMaxPlayer}
            setMaxPlayers={setTeamMaxPlayer}
          />
        )}
      </div>

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
