/**@jsxImportSource @emotion/react */
import * as s from "./styles";
import { format } from "date-fns";
import { motion } from "motion/react";

function ToDay({ day, setShowing }) {
  const handleShowing = (e) => {
    setShowing((prev) => !prev);
  };

  const today = format(new Date(), "yyyyMMdd") === format(day, "yyyyMMdd");

  return (
    <motion.span
      css={s.date(!!today)}
      whileHover={{ scale: 1.2, border: 2 }}
      onClick={handleShowing}>
      {format(day, "d")}
    </motion.span>
  );
}

export default ToDay;