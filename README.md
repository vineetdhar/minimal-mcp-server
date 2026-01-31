# Minimal MCP Server Setup for Cursor IDE

This guide walks through the simplest possible setup for a working MCP (Model Context Protocol) server that integrates with Cursor IDE. It requires no external packages, no SDKs, and no GitHub dependencies.

## 🧱 Prerequisites

* Node.js installed (v18+ recommended)

* Cursor IDE installed

* A working project folder (e.g. C:\Users\PowerUser\mcp-demo)


## 📁 Project Structure

mcp-demo/

├── server.js

└── mcp.json

## Steps:

### 🧪 Step 1: Create >> server.js

This file implements a pure CommonJS MCP server using JSON-RPC over stdio. It defines a single tool called hello that accepts a name parameter.


### ⚙️ Step 2: Create >> mcp.json

This file registers the MCP server with Cursor IDE.

Place this file in the root of your project folder.


### 🚀 Step 3: Launch in Cursor

* Open Cursor IDE.

* Open your project folder (mcp-demo).

* Navigate to the MCP panel (left sidebar → ⚙️ icon).

* You should see:

        simple-mcp

        Tool: hello


### 💬 Step 4: Call the Tool


#### 1. Option 1: From Chat

Open the Chat tab (💬 icon in the left sidebar) and type:

        /mcp simple-mcp.hello { "name": "<name>" }

#### 2. Option 2: From MCP Panel

Click the hello tool, enter a name, then click Run.

You will receive:

        Hello, <name>!


## 🥹 Notes

* No SDKs or packages are required.

* No GitHub dependencies.

* No ESM/CJS conflicts.

* Fully compatible with Cursor’s MCP loader.


## 🔧 Extending the Server

Add more tools by:

Adding entries to the tools/list response.

Handling them in the tools/call block.

Example tool definition:

        
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


## ✅ Summary

This setup provides a fully functional MCP server with:

One tool (hello) that accepts a parameter.

No external dependencies.

Full integration with Cursor IDE.

Ideal for testing, learning, or building more advanced MCP workflows.
