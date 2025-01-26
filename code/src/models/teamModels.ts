import { TeamPlayerModel } from "./teamPlayerModels";

export type TeamModel = {
  id: string;
  name: string;
  players: TeamPlayerModel[];
};
