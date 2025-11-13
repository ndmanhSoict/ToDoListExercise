export const SORTBY_OPTIONS = [
  { value: 'created-asc', label: 'Creation Date (Oldest to Newest)' },
  { value: 'created-desc', label: 'Creation Date (Newest to Oldest)' },
  { value: 'endDate-asc', label: 'End Date (Earliest to Latest)' },
  { value: 'endDate-desc', label: 'End Date (Latest to Earliest)' },
  { value: 'priority-asc', label: 'Priority (Low to High)' },
  { value: 'priority-desc', label: 'Priority (High to Low)' },
  { value: 'name-asc', label: 'Name (A to Z)' },
  { value: 'name-desc', label: 'Name (Z to A)' },
];

export const SHOW_TASK_OPTIONS = [
  { value: 'all', label: 'All Tasks' },
  { value: 'ongoing', label: 'Ongoing Tasks' },
  { value: 'upcoming', label: 'Upcoming Tasks' },
  { value: 'history', label: 'History Tasks' },
];
