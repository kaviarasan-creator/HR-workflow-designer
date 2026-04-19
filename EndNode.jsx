import { Handle, Position } from "reactflow";

export default function EndNode({ data }) {
  return (
    <div
      style={{
        padding: 10,
        border: "2px solid #4CAF50",
        borderRadius: 8,
        background: "#f6fff6",
      }}
    >
      {/* 🔥 ONLY TARGET */}
      <Handle type="target" position={Position.Top} />

      <strong>🏁 End</strong>
      <div>{data.message}</div>
    </div>
  );
}