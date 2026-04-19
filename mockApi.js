// src/api/mockApi.js

// ✅ Mock automation list (GET /automations)
export const getAutomations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "send_email",
          label: "Send Email",
          params: ["to", "subject"],
        },
        {
          id: "generate_doc",
          label: "Generate Document",
          params: ["template", "recipient"],
        },
      ]);
    }, 500);
  });
};


// ✅ Simulate workflow execution (POST /simulate)
export const simulateWorkflow = (workflow) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const steps = workflow.nodes.map((node) => ({
        nodeId: node.id,
        type: node.type,
        status: "success",
        message: `Executed ${node.type}`,
      }));

      resolve({
        status: "completed",
        steps,
      });
    }, 1000);
  });
};