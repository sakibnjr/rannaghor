"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={reduceMotion ? false : { opacity: 1, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some", margin: "0px 0px -24px" }}
      transition={{ duration: 0.38, delay }}
    >
      {children}
    </m.div>
  );
}
