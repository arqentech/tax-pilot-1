import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { marqueeAnimation, marqueeTransition } from "@/animations/marqueeAnimation";

const TopBar = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(marqueeAnimation);
  }, [controls]);

  return (
    <div className="bg-[#007BFF] text-[#BFDDFF] overflow-hidden py-2">
      <motion.div
        className="flex items-center gap-1 whitespace-nowrap"
        animate={controls}
        transition={marqueeTransition}
        onHoverStart={() => controls.stop()}           
        onHoverEnd={() => controls.start(marqueeAnimation)} 
      >
        <span className="flex-shrink-0 font-medium text-sm leading-[20px] md:text-[18px] md:leading-[25px]">
          New services added recently •
        </span>
        <Link
          to="/services"
          className="group flex-shrink-0 inline-flex items-center gap-1 no-underline hover:text-gray-200 transition-colors font-medium text-sm leading-[20px] md:text-[18px] md:leading-[25px]"
        >
          explore now
          <ArrowUpRight className="h-[22px] w-[22px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </motion.div>
    </div>
  );
};

export default TopBar;
