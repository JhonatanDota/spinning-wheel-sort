import { Link } from "react-router-dom";

import roulette from "../assets/roulette.png";

export default function BackHome() {
  return (
    <Link to={"/"}>
      <button className="w-12">
        <img className="w-full" src={roulette} alt="" />
      </button>
    </Link>
  );
}
