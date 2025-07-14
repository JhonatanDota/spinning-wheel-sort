import { Route, Routes as RouterDomRoutes } from "react-router-dom";

import Home from "./pages/Home";
import TeamDraw from "./pages/TeamDraw";
import SimpleDraw from "./pages/SimpleDraw";

export default function Routes() {
  return (
    <RouterDomRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/team-draw" element={<TeamDraw />} />
      <Route path="/simple-draw" element={<SimpleDraw />} />
    </RouterDomRoutes>
  );
}
