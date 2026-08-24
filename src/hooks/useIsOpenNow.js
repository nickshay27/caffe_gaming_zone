import { useState, useEffect } from "react";

export default function useIsOpenNow() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const day = now.getDay(); // 0 Sun - 6 Sat
      const hour = now.getHours();
      const isWeekend = day === 0 || day === 5 || day === 6;
      const closeHour = isWeekend ? 25 : 23; // 1am wraps
      const effectiveHour = hour < 11 ? hour + 24 : hour;
      setOpen(effectiveHour >= 11 && effectiveHour < closeHour + (isWeekend ? 24 : 0) - 24 || (effectiveHour >= 11 && effectiveHour < closeHour));
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);
  return open;
}