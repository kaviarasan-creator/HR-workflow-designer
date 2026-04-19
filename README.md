# Architecture
![alt text](<Architecture for hr-workflow.jpg>)
the architecture of the React-based Workflow Builder system. It shows how the application is structured in layers, starting from the React frontend, which provides the user interface for designing workflows. The frontend is composed of key components such as the React Flow canvas for visual workflow creation, a sidebar for dragging different node types, and a right panel for editing node details. All interactions are managed through a centralized state system that maintains nodes, edges, and selected node data. These are rendered using modular custom node components like Task, Approval, Automation, and End nodes. The workflow is then converted into a structured JSON format, which is passed to the mock API layer that simulates backend operations such as fetching automation actions and executing workflows. Finally, the workflow engine processes the nodes step-by-step and produces execution results in the form of logs, alerts, or console outputs.
<!--How to run the project--> 
To run this project, first make sure you have Node.js installed on your system. Then navigate to the project folder (the one containing the package.json file, typically hr-workflow-designer) using your terminal. Install all required dependencies by running npm install. Once the installation is complete, start the development server using npm run dev (since this is a Vite-based React project). After the server starts, you will see a local URL (usually http://localhost:5173/)—open this in your browser to access the application. From there, you can interact with the workflow builder UI, drag and drop nodes, connect them, edit their properties, and run the workflow using the mock API simulation.
The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

<!--Design decisions-->
The project is designed using a modular, component-based architecture to ensure scalability and maintainability. The frontend is built with React and leverages React Flow to provide an interactive drag-and-drop workflow canvas, enabling users to visually design processes. State management is handled using React hooks (useNodesState, useEdgesState, and local state), keeping all workflow data centralized and synchronized across components. Each node type (Task, Approval, Automation, End) is implemented as a separate reusable component, allowing easy extension of new node types without affecting existing logic. A right-side configuration panel uses controlled components to dynamically update node data, ensuring a clear separation between UI and business logic. Instead of a real backend, a mock API layer is introduced to simulate endpoints such as fetching automation actions and executing workflows, which helps in development and testing without external dependencies. The workflow is represented as a structured JSON object (nodes and edges), which is passed to a simple execution engine that processes nodes step-by-step, making the system predictable and easy to debug. Overall, the design emphasizes modularity, clear data flow, and extensibility while maintaining a lightweight and user-friendly interface.

<!--What I Have Completed-->
1.Developed an interactive workflow builder using React and React Flow with drag-and-drop functionality.
2.Implemented multiple node types such as Start, Task, Approval, Automation, and End with modular components.
3.Built dynamic configuration forms in the right panel using controlled components for editing node data.
4.Managed workflow state efficiently using React hooks (useNodesState, useEdgesState).
5.Implemented validation rules to ensure workflow correctness (e.g., single start node, no incoming edges to start).
6.Integrated a mock API layer to simulate backend functionality for fetching automation actions and executing workflows.

<!--What I Could've Add With More Time-->
1.Implement a real backend (Node.js/Express) with database support for saving and loading workflows.
2.Add workflow execution visualization (highlight nodes step-by-step during simulation).
3.Introduce advanced validation rules (e.g., cycle detection, required fields validation, node dependency checks).
4.Improve UI/UX with better styling, animations, and user feedback (loading states, error indicators).
5.Add export/import functionality for workflows (JSON download/upload).
6.Introduce TypeScript for better type safety and improved code maintainability.

<!-- frontend bug you solved-->
1.Faced an issue where editing node details in the RightPanel did not update properly because inputs were directly bound to selectedNode.data, which didn’t trigger re-renders in React Flow.
2.Solved it by introducing a separate local state (formData) as a controlled component and syncing it with the selected node using useEffect.
3.Applied changes back to the main nodes state only on “Save,” which fixed update issues, improved performance, and ensured consistent UI behavior.