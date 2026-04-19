import React from "react";
import { getAutomations } from "../../api/mockApi.js";

export default function RightPanel({
  selectedNode,
  setNodes,
  nodes,
  setEdges,
  validateWorkflow,
  runWorkflow,
}) {
  const [actions, setActions] = React.useState([]);
  const isStartNode = selectedNode?.type === "input";
  const isTaskNode = selectedNode?.type === "task";
  const isApprovalNode = selectedNode?.type === "approval";
  const isAutomationNode = selectedNode?.type === "automation";
  const isEndNode = selectedNode?.type === "end";

  // Always get latest node
  const currentNode = nodes.find((n) => n.id === selectedNode?.id);

  const [formData, setFormData] = React.useState(null);

  // Sync form when node changes
  React.useEffect(() => {
    if (currentNode) {
      setFormData(currentNode.data || { label: "", metadata: [] });
    }
  }, [currentNode]);

  React.useEffect(() => {
  getAutomations().then((data) => {
    setActions(data);
  });
}, []);

  // No node selected
  if (!selectedNode || !currentNode || !formData) {
    return (
      <div style={{ width: 250, padding: 10 }}>
        <h4>No node selected</h4>
      </div>
    );
  }
  const mockActions = {
  sendEmail: {
    label: "Send Email",
    params: ["to", "subject"],
  },
  createTicket: {
    label: "Create Ticket",
    params: ["title", "priority"],
  },
};

  return (
    <div
      style={{
        width: 250,
        padding: 10,
        background: "#fafafa",
        height: "100vh",
        borderLeft: "1px solid #ddd",
      }}
    >
      <button
  onClick={() => {
    const isValid = validateWorkflow();
    if (isValid) {
      runWorkflow();
    }
  }}
  style={{
    width: "100%",
    marginBottom: 10,
    background: "#4CAF50",
    color: "white",
    border: "none",
    padding: "8px",
    cursor: "pointer",
  }}
>
  Run Workflow
</button>
      {/* Run Workflow */}
      <button
        onClick={validateWorkflow}
        style={{
          width: "100%",
          marginBottom: 10,
          background: "#4CAF50",
          color: "white",
          border: "none",
          padding: "8px",
          cursor: "pointer",
        }}
      >
        Run Workflow
      </button>

      <h4>Edit Node</h4>

      <p>
        <strong>Type:</strong> {currentNode.type}
      </p>

      {/* 🔥 START NODE FORM */}
      {isStartNode && (
        <>
          <h4>Start Configuration</h4>

          {/* Title */}
          <label>Start Title</label>
          <input
            value={formData.label || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                label: e.target.value,
              })
            }
            style={{ width: "100%", marginBottom: 10 }}
          />

          {/* Metadata */}
          <label>Metadata</label>

          {formData.metadata?.map((item, index) => (
            <div
              key={index}
              style={{ display: "flex", gap: 5, marginBottom: 5 }}
            >
              {/* Key */}
              <input
                placeholder="Key"
                value={item.key}
                onChange={(e) => {
                  const newMetadata = [...formData.metadata];
                  newMetadata[index].key = e.target.value;

                  setFormData({
                    ...formData,
                    metadata: newMetadata,
                  });
                }}
              />

              {/* Value */}
              <input
                placeholder="Value"
                value={item.value}
                onChange={(e) => {
                  const newMetadata = [...formData.metadata];
                  newMetadata[index].value = e.target.value;

                  setFormData({
                    ...formData,
                    metadata: newMetadata,
                  });
                }}
              />
            </div>
          ))}

          {/* Add Metadata */}
          <button
            onClick={() =>
              setFormData({
                ...formData,
                metadata: [
                  ...(formData.metadata || []),
                  { key: "", value: "" },
                ],
              })
            }
            style={{
              marginBottom: 10,
              width: "100%",
              padding: "6px",
              cursor: "pointer",
            }}
          >
            + Add Metadata
          </button>
        </>
      )}
      {/* Task node */}
      {isTaskNode && (
  <>
    <h4>Task Configuration</h4>

    {/* Title */}
    <label>Title</label>
    <input
      value={formData.label || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          label: e.target.value,
        })
      }
      style={{ width: "100%", marginBottom: 10 }}
    />

    {/* Description */}
    <label>Description</label>
    <textarea
      value={formData.description || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          description: e.target.value,
        })
      }
      style={{ width: "100%", marginBottom: 10 }}
    />

    {/* Assignee */}
    <label>Assignee</label>
    <input
      value={formData.assignee || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          assignee: e.target.value,
        })
      }
      style={{ width: "100%", marginBottom: 10 }}
    />

    {/* Due Date */}
    <label>Due Date</label>
    <input
      type="date"
      value={formData.dueDate || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          dueDate: e.target.value,
        })
      }
      style={{ width: "100%", marginBottom: 10 }}
    />
  </>
)}
{/* Approval node */}
{isApprovalNode && (
  <>
    <h4>Approval Configuration</h4>

    {/* Title */}
    <label>Title</label>
    <input
      value={formData.label || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          label: e.target.value,
        })
      }
      style={{ width: "100%", marginBottom: 10 }}
    />

    {/* Role */}
    <label>Approver Role</label>
    <input
      value={formData.approverRole || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          approverRole: e.target.value,
        })
      }
      style={{ width: "100%", marginBottom: 10 }}
    />

    {/* Threshold */}
    <label>Auto-approve Threshold</label>
    <input
      type="number"
      value={formData.threshold || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          threshold: e.target.value,
        })
      }
      style={{ width: "100%", marginBottom: 10 }}
    />
  </>
)}
{/* Automation node */}
{isAutomationNode && (
  <>
    <h4>Automation Configuration</h4>

    {/* Title */}
    <label>Title</label>
    <input
      value={formData.label || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          label: e.target.value,
        })
      }
      style={{ width: "100%", marginBottom: 10 }}
    />

    {/* Action Dropdown */}
    <label>Action</label>
    <select
  value={formData.action || ""}
  onChange={(e) => {
    const actionId = e.target.value;

    const selected = actions.find((a) => a.id === actionId);

    const paramsObj = {};
    selected?.params.forEach((p) => {
      paramsObj[p] = "";
    });

    setFormData({
      ...formData,
      action: actionId,
      params: paramsObj,
    });
  }}
>
  <option value="">Select Action</option>
  {actions.map((a) => (
    <option key={a.id} value={a.id}>
      {a.label}
    </option>
  ))}
</select>

    {/* Dynamic Params */}
    {formData.action &&
      mockActions[formData.action]?.params.map((param) => (
        <div key={param}>
          <label>{param}</label>
          <input
            value={formData.params?.[param] || ""}
            onChange={(e) => {
              setFormData({
                ...formData,
                params: {
                  ...formData.params,
                  [param]: e.target.value,
                },
              });
            }}
            style={{ width: "100%", marginBottom: 10 }}
          />
        </div>
      ))}
  </>
)}
{/* End node */}
{isEndNode && (
  <>
    <h4>End Configuration</h4>

    <label>End Message</label>
    <input
      value={formData.message || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          message: e.target.value,
        })
      }
      style={{ width: "100%", marginBottom: 10 }}
    />
  </>
)}


      {/* 💾 SAVE BUTTON */}
      <button
        onClick={() => {
          setNodes((nds) =>
            nds.map((node) =>
              node.id === selectedNode.id
                ? {
                    ...node,
                    data: formData,
                  }
                : node
            )
          );
          alert("✅ Saved!");
        }}
        style={{
          marginTop: 10,
          background: "#1890ff",
          color: "white",
          border: "none",
          padding: "8px",
          width: "100%",
          cursor: "pointer",
        }}
      >
        Save Changes
      </button>

      {/* ❌ DELETE NODE */}
      <button
        onClick={() => {
          setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));

          setEdges((eds) =>
            eds.filter(
              (e) =>
                e.source !== selectedNode.id &&
                e.target !== selectedNode.id
            )
          );
        }}
        style={{
          marginTop: 10,
          background: "#ff4d4f",
          color: "white",
          border: "none",
          padding: "6px 10px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Delete Node
      </button>
    </div>
  );
}