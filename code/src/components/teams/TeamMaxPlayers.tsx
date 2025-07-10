interface TeamsMaxPlayersProps {
  maxPlayers: number | null;
  setMaxPlayers: (value: number | null) => void;
}

export default function TeamMaxPlayers(props: TeamsMaxPlayersProps) {
  const { maxPlayers, setMaxPlayers } = props;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const numbers = event.target.value.replace(/\D/g, "");
    const parsed = parseInt(numbers);

    setMaxPlayers(Number.isNaN(parsed) || parsed <= 0 ? null : parsed);
  }

  return (
    <div className="flex flex-col items-center gap-1 md:gap-1.5">
      <label className="text-white text-xs md:text-base font-bold uppercase">
        Limite de Players por Time
      </label>

      <input
        className="max-w-24 md:max-w-32 text-xs md:text-sm text-center font-medium px-2 md:px-3 py-1.5 rounded-md focus:outline-none"
        type="text"
        placeholder="Sem limite"
        value={maxPlayers ?? ""}
        onChange={handleChange}
        maxLength={2}
      />
    </div>
  );
}
