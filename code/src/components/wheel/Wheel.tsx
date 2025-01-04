import { useState } from "react";
import { Wheel as WheelRoulette, WheelDataType } from "react-custom-roulette";

import { SpiningVelocityEnum } from "../../enums/spinningVelocityEnum";

interface WheelProps {
  data: WheelDataType[];
  spinningVelocity: SpiningVelocityEnum;
  onSpinStop: (index: number) => void;
}

export default function Wheel(props: WheelProps) {
  const { data, spinningVelocity, onSpinStop } = props;

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  function handleSpinClick(): void {
    setPrizeNumber(Math.floor(Math.random() * data.length));
    setMustSpin(true);
  }

  return (
    <div className="flex items-center">
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
        disableInitialAnimation={true}
      />

      <button
        className="h-10 uppercase bg-orange-600 p-2 font-bold text-white rounded-md"
        onClick={handleSpinClick}
      >
        SPIN
      </button>
    </div>
  );
}
