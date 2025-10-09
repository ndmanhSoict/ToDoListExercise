import ColumnTask from './shared/components/ColumnTask';

export default function TestComponent() {
  return (
    <div className="flex overflow-x-auto p-4">
      <ColumnTask header="In Progress" count={2} />
      <ColumnTask header="In Progress" count={2} />
      <ColumnTask header="In Progress" count={2} />
      <ColumnTask header="In Progress" count={2} />
      <ColumnTask header="In Progress" count={2} />
      <ColumnTask header="In Progress" count={2} />
      <ColumnTask header="In Progress" count={2} />
      <ColumnTask header="In Progress" count={2} />
    </div>
  );
}
