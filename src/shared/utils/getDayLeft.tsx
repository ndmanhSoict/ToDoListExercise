export default function getDayLeft(endDateString: string) {
  const today = new Date();
  const endDate = new Date(endDateString);
  today.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  const diffTime = endDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
