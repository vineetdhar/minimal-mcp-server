# minimal-mcp-server
Minimal MCP Server Setup for Cursor IDE

This guide walks through the simplest possible setup for a working MCP (Model Context Protocol) server that integrates with Cursor IDE. It requires no external packages, no SDKs, and no GitHub dependencies.

🧱 Prerequisites

Node.js installed (v18+ recommended)

Cursor IDE installed

A working project folder (e.g. C:\Users\PowerUser\mcp-demo)

📁 Project Structure

mcp-demo/
├── server.js
└── mcp.json

🧠 Step 1: Create server.js

This is a pure CommonJS MCP server using JSON-RPC over stdio. It defines one tool called hello that takes a name parameter.

console.error(">>> SIMPLE MCP SERVER STARTED <<<");

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + "\n");
}

rl.on("line", (line) => {
  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    return;
  }

  if (msg.method === "initialize") {
    send({
      jsonrpc: "2.0",
      id: msg.id,
      result: {
        protocolVersion: "2024-11-05",
        serverInfo: { name: "simple-mcp", version: "1.0.0" },
        capabilities: { tools: {} }
      }
    });
  }

  if (msg.method === "tools/list") {
    send({
      jsonrpc: "2.0",
      id: msg.id,
      result: {
        tools: [
          {
            name: "hello",
            description: "Returns a greeting",
            inputSchema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Your name"
                }
              },
              required: ["name"]
            }
          }
        ]
      }
    });
  }

  if (msg.method === "tools/call" && msg.params?.name === "hello") {
    const name = msg.params.arguments?.name || "stranger";
    send({
      jsonrpc: "2.0",
      id: msg.id,
      result: {
        content: [
          { type: "text", text: `Hello, ${name}!` }
        ]
      }
    });
  }
});

⚙️ Step 2: Create mcp.json

This file registers the MCP server with Cursor.

{
  "servers": {
    "simple-mcp": {
      "command": "node",
      "args": ["server.js"]
    }
  }
}

Place this file in the root of your project folder.

🚀 Step 3: Launch in Cursor

Open Cursor IDE

Open your project folder (mcp-demo)

Go to the MCP panel (left sidebar → ⚙️ icon)

You’ll see:

simple-mcp

Tool: hello

💬 Step 4: Call the Tool

Option 1: From Chat

Open the Chat tab (💬 icon in left sidebar) and type:

/mcp simple-mcp.hello { "name": "<name>" }

Option 2: From MCP Panel

Click the hello tool → enter a name → click Run.

You’ll get:

Hello, Vineet!

🧩 Notes

No SDKs or packages are required

No GitHub dependencies

No ESM/CJS conflicts

Fully compatible with Cursor’s MCP loader

🛠️ Extending the Server

You can add more tools by:

Adding entries to the tools/list response

Handling them in the tools/call block

Example:

{
  name: "add",
  description: "Adds two numbers",
  inputSchema: {
    type: "object",
    properties: {
      a: { type: "number" },
      b: { type: "number" }
    },
    required: ["a", "b"]
  }
}

✅ Summary

This setup gives you a fully working MCP server with:

One tool (hello) that takes a parameter

No external dependencies

Full Cursor IDE integration

Perfect for testing, learning, or building more advanced MCP workflows.
