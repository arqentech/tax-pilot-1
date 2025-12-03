import { Transition, TargetAndTransition } from "framer-motion";

export const marqueeAnimation: TargetAndTransition = {
  x: ["-100%", "100%"],
};

export const marqueeTransition: Transition = {
  duration: 10, 
  repeat: Infinity,
  ease: "linear",
};
