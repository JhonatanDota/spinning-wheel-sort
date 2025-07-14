import { Link } from "react-router-dom";
import roulette from "../assets/roulette.png";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-5 -translate-y-20">
        <img className="w-32 md:w-48" src={roulette} alt="Roleta" />

        <Link className="w-full" to={"simple-draw"}>
          <button className="home-page-button">Sorteio Simples</button>
        </Link>

        <Link className="w-full" to={"team-draw"}>
          <button className="home-page-button">Sorteio de Times</button>
        </Link>

        <span className="text-xs font-bold text-white">by Dotinha</span>
      </div>
    </div>
  );
}
