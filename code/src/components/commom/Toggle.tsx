interface ToggleProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  disabled: boolean;
}

export default function Toggle(props: ToggleProps) {
  const { checked, setChecked, disabled } = props;

  return (
    <label className="cursor-pointer">
      <input
        className="sr-only peer"
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  );
}
