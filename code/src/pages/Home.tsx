import { Link } from "react-router-dom";
import teste from "../assets/roulette.png";

export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-5 -translate-y-20">
        <img className="w-24" src={teste} alt="Roleta" />

        <Link to={"simple-draw"}>
          <button className="uppercase font-bold text-white bg-orange-500 p-2 rounded-md">
            Sorteio Simples
          </button>
        </Link>

        <Link to={"team-draw"}>
          <button className="uppercase font-bold text-white bg-orange-500 p-2 rounded-md">
            Sorteio de Times
          </button>
        </Link>
      </div>
    </div>
  );
}
