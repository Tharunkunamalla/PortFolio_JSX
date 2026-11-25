"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useSpring, useTransform } from "motion/react";

function DigitItem({ spring, digitIndex }) {
  const y = useTransform(spring, (latest) => {
    const current = (latest % 10 + 10) % 10;
    let offset = (10 + digitIndex - current) % 10;
    if (offset > 5) offset -= 10;
    return `${offset * 100}%`;
  });

  return (
    <motion.span
      className="absolute inset-0 flex items-center justify-center font-bold"
      style={{ y }}
    >
      {digitIndex}
    </motion.span>
  );
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function DigitRoller({ digit }) {
  const spring = useSpring(0, {
    stiffness: 280,
    damping: 24,
    mass: 0.6,
  });

  useEffect(() => {
    spring.set(digit);
  }, [digit, spring]);

  return (
    <span
      className="inline-block relative overflow-hidden align-baseline"
      style={{
        width: "1ch",
        height: "1.25em",
        lineHeight: "1.25em",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <span className="invisible">0</span>
      {DIGITS.map((i) => (
        <DigitItem key={i} spring={spring} digitIndex={i} />
      ))}
    </span>
  );
}

export default function SlidingNumber({ number, thousandSeparator = "," }) {
  const [displayNumber, setDisplayNumber] = useState(number);

  useEffect(() => {
    setDisplayNumber(number);
  }, [number]);

  const chars = useMemo(() => {
    const formattedStr = Math.round(Math.abs(displayNumber || 0)).toLocaleString("en-US");
    return formattedStr.split("");
  }, [displayNumber]);

  return (
    <span className="inline-flex items-baseline font-mono font-bold">
      {chars.map((char, index) => {
        if (char === "," || char === "." || isNaN(Number(char))) {
          return (
            <span key={`sep-${index}`} className="inline-block">
              {thousandSeparator && char === "," ? thousandSeparator : char}
            </span>
          );
        }
        return <DigitRoller key={`digit-${index}-${chars.length}`} digit={Number(char)} />;
      })}
    </span>
  );
}
