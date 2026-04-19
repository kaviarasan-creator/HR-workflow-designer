import { Handle, Position } from "reactflow";

export default function ApprovalNode({ data }) {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid #333",
        borderRadius: 8,
        background: "#fff", // 🔥 FIX
        minWidth: 160,
      }}
    >
      <Handle type="target" position={Position.Top} />

      <strong>✅ Approval</strong>

      <div style={{ fontWeight: "bold" }}>{data.label}</div>

      {data.approverRole && (
        <div style={{ fontSize: 12 }}>👤 {data.approverRole}</div>
      )}

      {data.threshold && (
        <div style={{ fontSize: 12 }}>⚡ {data.threshold}</div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}