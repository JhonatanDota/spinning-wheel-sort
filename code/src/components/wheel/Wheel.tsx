import { useState } from "react";
import { Wheel as WheelRoulette, WheelDataType } from "react-custom-roulette";

import { ImSpinner11 } from "react-icons/im";

import { SpiningVelocityEnum } from "../../constants/wheel";
interface WheelProps {
  canSpinWheel: boolean;
  setCanSpinWheel: (can: boolean) => void;
  data: WheelDataType[];
  spinningVelocity: SpiningVelocityEnum;
  onSpinStop: (index: number) => void;
}

export default function Wheel(props: WheelProps) {
  const { canSpinWheel, setCanSpinWheel, data, spinningVelocity, onSpinStop } =
    props;

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  function handleSpinClick(): void {
    setPrizeNumber(Math.floor(Math.random() * data.length));

    setCanSpinWheel(false);
    setMustSpin(true);
  }

  return (
    <div className="flex items-center overflow-hidden">
      <WheelRoulette
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        spinDuration={spinningVelocity}
        onStopSpinning={() => {
          onSpinStop(prizeNumber);
          setMustSpin(false);
        }}
        outerBorderWidth={0.5}
        innerRadius={4}
        innerBorderWidth={3}
        radiusLineWidth={0}
        textColors={["#f5f5f5"]}
        backgroundColors={[
          "#3f297e",
          "#175fa9",
          "#169ed8",
          "#239b63",
          "#64b031",
          "#efe61f",
          "#f7a416",
          "#e6471d",
          "#dc0936",
          "#e5177b",
          "#be1180",
          "#871f7f",
        ]}
      />

      <button
        className="flex items-center text-base md:text-2xl p-2 md:p-3 bg-orange-600 text-white rounded-lg disabled:opacity-55"
        disabled={!canSpinWheel}
        onClick={handleSpinClick}
      >
        <ImSpinner11 fill="white" />
      </button>
    </div>
  );
}
