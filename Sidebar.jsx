import { useRef } from "react";
export default function Sidebar() {

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div style={{ width: 200, padding: 10, background: "#f4f4f4" }}>
      <h4>Nodes</h4>

      <div draggable onDragStart={(e) => onDragStart(e, "task")}>
        Task
      </div>

      <div draggable onDragStart={(e) => onDragStart(e, "approval")}>
        Approval
      </div>

      <div draggable onDragStart={(e) => onDragStart(e, "automation")}>
        Automation
      </div>

      <div draggable onDragStart={(e) => onDragStart(e, "end")}>
        End
      </div>
    </div>
  );
}