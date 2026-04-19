import { Handle, Position } from "reactflow";

export default function AutomationNode({ data }) {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid #333",
        borderRadius: 8,
        background: "#fff", // 🔥 FIX
        minWidth: 180,
      }}
    >
      <Handle type="target" position={Position.Top} />

      <strong>⚙️ Automation</strong>

      <div style={{ fontWeight: "bold" }}>{data.label}</div>

      {data.action && (
        <div style={{ fontSize: 12 }}>🔧 {data.action}</div>
      )}

      {data.params &&
        Object.entries(data.params).map(([key, value]) => (
          <div key={key} style={{ fontSize: 11 }}>
            {key}: {value}
          </div>
        ))}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}