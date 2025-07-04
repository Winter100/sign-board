import { parseISO, differenceInHours, differenceInDays, differenceInMinutes } from "date-fns";

interface TimeDisplayProps {
  isoDate: string;
}

const TimeDisplay = ({ isoDate }: TimeDisplayProps) => {
  const date = parseISO(isoDate);
  const now = new Date();

  const minutesDifference = differenceInMinutes(now, date);
  const hoursDifference = differenceInHours(now, date);
  const daysDifference = differenceInDays(now, date);
  let displayText: string;

  if (minutesDifference < 1) {
    displayText = "방금 전";
  } else if (minutesDifference < 60) {
    displayText = `${minutesDifference}분 전`;
  } else if (hoursDifference < 24) {
    displayText = `${hoursDifference}시간 전`;
  } else {
    displayText = `${daysDifference}일 전`;
  }

  return <span>{displayText ?? ""}</span>;
};

export default TimeDisplay;
