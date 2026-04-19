import React, { useMemo, useCallback, useState, useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { simulateWorkflow } from "./api/mockApi";

import Sidebar from "./components/sidebar/Sidebar";
import RightPanel from "./components/panel/RightPanel";

import TaskNode from "./components/nodes/TaskNode";
import ApprovalNode from "./components/nodes/ApprovalNode";
import AutomationNode from "./components/nodes/AutomationNode";
import EndNode from "./components/nodes/EndNode";

const runWorkflow = async () => {
  const workflow = { nodes, edges };

  const result = await simulateWorkflow(workflow);

  console.log(result);

  alert("✅ Workflow executed successfully!");
};

// Initial node
const initialNodes = [
  {
    id: "1",
    type: "input",
    data: {
      label: "Start Node",
      metadata: [],
    },
    position: { x: 250, y: 50 },
  },
];

const initialEdges = [];

let id = 2;
const getId = () => `${id++}`;

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const reactFlowWrapper = useRef(null);

  // ✅ FIX: move nodeTypes INSIDE component
  const nodeTypes = useMemo(
    () => ({
      task: TaskNode,
      approval: ApprovalNode,
      automation: AutomationNode,
      end: EndNode,
    }),
    []
  );

  // ✅ validation
  const validateWorkflow = () => {
    const startNodes = nodes.filter((n) => n.type === "input");

    if (startNodes.length === 0) {
      alert("❌ Error: No Start Node found");
      return false;
    }

    if (startNodes.length > 1) {
      alert("❌ Error: Multiple Start Nodes found");
      return false;
    }
  

    const startNode = startNodes[0];

    const hasIncoming = edges.some((e) => e.target === startNode.id);

    if (hasIncoming) {
      alert("❌ Error: Start Node cannot have incoming edges");
      return false;
    }

    alert("✅ Workflow is valid!");
    return true;
  };

  // ✅ connect edges
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // ✅ select node
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  // ✅ add node (button)
  const addNode = (type) => {
    const newNode = {
      id: getId(),

      type: type === "Start" ? "input" : type.toLowerCase(),

      data:
        type === "task"
          ? {
              label: "New Task",
              description: "",
              assignee: "",
              dueDate: "",
            }
          : type === "approval"
          ? {
              label: "Approval Step",
              approverRole: "",
              threshold: "",
            }
            : type === "automation"
          ? {
             label: "Automation Step",
             action: "",
            params: {},
            }
             : type === "end"
         ? {
               message: "Workflow Completed",
            }
          : {
              label: `${type} node`,
            },

      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  // ✅ drag over
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // ✅ drop node
  const onDrop = (event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;

    const bounds = reactFlowWrapper.current.getBoundingClientRect();

    const position = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };

    const newNode = {
      id: getId(),
      type: type === "start" ? "input" : type,

      data:
        type === "task"
          ? {
              label: "New Task",
              description: "",
              assignee: "",
              dueDate: "",
            }
          : type === "approval"
          ? {
              label: "Approval Step",
              approverRole: "",
              threshold: "",
            }
            : type === "end"
            ? {
              message: "Workflow Completed",
              }
          : {
              label: `${type} node`,
            },

      position,
    };

    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar addNode={addNode} />

      {/* Canvas */}
      <div
        style={{ width: "100vw", height: "100vh" }}
        ref={reactFlowWrapper}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}
  onNodeClick={onNodeClick}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  onConnect={onConnect}
  fitView

  nodesDraggable={true}
  nodesConnectable={true}
  elementsSelectable={true}

  panOnDrag={true}
  panOnScroll={true}
  selectionOnDrag={false}
  zoomOnScroll={true}
>
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      {/* Right Panel */}
      <RightPanel
        nodes={nodes}
        edges={edges}
        selectedNode={selectedNode}
        setNodes={setNodes}
        setEdges={setEdges}
        validateWorkflow={validateWorkflow}
        runWorkflow={runWorkflow}
      />
    </div>
  );
}