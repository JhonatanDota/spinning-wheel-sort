import { FaQuestionCircle } from "react-icons/fa";

import Tooltip from "../commom/Tooltip";
interface TeamsMaxPlayersProps {
  maxPlayers: number | null;
  setMaxPlayers: (value: number | null) => void;
  disabled: boolean;
}

export default function TeamMaxPlayers(props: TeamsMaxPlayersProps) {
  const { maxPlayers, setMaxPlayers, disabled } = props;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const numbers = event.target.value.replace(/\D/g, "");
    const parsed = parseInt(numbers);

    setMaxPlayers(Number.isNaN(parsed) || parsed <= 0 ? null : parsed);
  }

  return (
    <div className="flex flex-col items-center gap-1 md:gap-1.5">
      <div className="flex flex-col md:flex-row items-center gap-1">
        <label className="text-white text-xs md:text-base font-bold uppercase">
          Limite de Players por Time
        </label>

        <Tooltip content="O limite máximo afeta apenas os sorteios da roleta. Por exemplo, se um time já estiver completo, ele não poderá receber jogadores sorteados. No entanto, jogadores adicionados manualmente ou movidos entre times serão aceitos normalmente, mesmo que o limite já tenha sido atingido.">
          <FaQuestionCircle className="fill-yellow-500" />
        </Tooltip>
      </div>

      <input
        className="max-w-24 md:max-w-32 text-xs md:text-sm text-center font-medium px-2 md:px-3 py-1.5 rounded-md focus:outline-none"
        type="text"
        placeholder="Sem limite"
        value={maxPlayers ?? ""}
        onChange={handleChange}
        maxLength={2}
        disabled={disabled}
      />
    </div>
  );
}
