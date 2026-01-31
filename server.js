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