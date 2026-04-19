import { Handle, Position } from "reactflow";

export default function TaskNode({ data }) {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid #333",
        borderRadius: 8,
        background: "#fff",
        minWidth: 150,
      }}
    >
      {/* 🔥 TARGET (incoming) */}
      <Handle type="target" position={Position.Top} />

      <strong>📝 Task</strong>

      <div style={{ fontWeight: "bold" }}>{data.label}</div>

      {data.description && <div>{data.description}</div>}
      {data.assignee && <div>👤 {data.assignee}</div>}
      {data.dueDate && <div>📅 {data.dueDate}</div>}

      {/* 🔥 SOURCE (outgoing) */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}