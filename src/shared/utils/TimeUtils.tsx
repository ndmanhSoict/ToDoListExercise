function formatDate(date: string): string {
  const parts = new Date(date).toLocaleDateString('en-GB').split('/'); // 'en-GB' => dd/mm/yyyy
  const y = parts[2];
  const m = parts[1].padStart(2, '0');
  const d = parts[0].padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString('en-GB');
}

function convertDate(date?: string, time?: string): string {
  if (!date || !time) return '';
  return new Date(`${date}T${time}`).toISOString();
}

function getDayLeft(endDateString: string) {
  const today = new Date();
  const endDate = new Date(endDateString);
  today.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  const diffTime = endDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export { formatDate, formatTime, convertDate, getDayLeft };
