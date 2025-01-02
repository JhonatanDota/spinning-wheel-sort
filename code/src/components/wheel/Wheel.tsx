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
    <>
      <WheelRoulette
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        spinDuration={spinningVelocity}
        onStopSpinning={() => {
          onSpinStop(prizeNumber);
          setMustSpin(false);
        }}
      />

      <button onClick={handleSpinClick}>SPIN</button>
    </>
  );
}
