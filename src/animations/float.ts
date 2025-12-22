import { Variants } from "framer-motion";

export const floatUpDown = (
  distance = 12,
  duration = 3,
  delay = 0
): Variants => ({
  animate: {
    y: [0, -distance, 0],
    transition: {
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});
