import { motion } from "framer-motion";

const Card = (props: {
  name: string;
  img: string;
  extraStyling?: string;
  appearDelay?: number;
  animationDuration?: number;
}) => {
  const { name, img, extraStyling, appearDelay, animationDuration } = props;

  return (
    <motion.div
      initial={{ translateY: 120, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{
        duration: animationDuration ?? 1,
        ease: "easeInOut",
        delay: appearDelay ?? 1,
      }}
      className="flex flex-col items-center gap-6 w-full max-w-xl"
    >
      {/* Card Title */}
      <p
        className="
          text-[#f4d03e]
          font-jersey
          text-4xl md:text-5xl
          text-shadow-[2px_2px_0px_#7b3aec]
          text-center
          whitespace-nowrap
        "
      >
        {name}
      </p>

      {/* Card Body */}
      <div
        className="
          w-full
          flex justify-center items-center
          bg-[url(/sponsors-page/card.png)]
          bg-center bg-contain bg-no-repeat
          py-[12%]
        "
      >
        <img
          src={img}
          alt={name}
          className={`
            w-[70%] md:w-[60%]
            object-contain
            ${extraStyling ?? ""}
          `}
        />
      </div>
    </motion.div>
  );
};

export default Card;
