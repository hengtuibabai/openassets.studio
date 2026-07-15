import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, HelpCircle, RefreshCw, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { McpLog } from '../types';

export const McpTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'console' | 'config'>('console');
  const [isCopied, setIsCopied] = useState(false);
  const [command, setCommand] = useState('tools/list');
  const [argsJson, setArgsJson] = useState('{}');
  const [logs, setLogs] = useState<McpLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Configuration JSON code snippet
  const configCode = `{
  "mcpServers": {
    "openassets-studio": {
      "command": "npx",
      "args": ["-y", "@openassets/mcp-gateway-cli", "--server-url", "${window.location.origin}"],
      "env": {
        "OPENASSETS_API_KEY": "op_live_de7b8ac..."
      }
    }
  }
}`;

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(configCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const runMcpRequest = async (overrideMethod?: string, overrideArgs?: any) => {
    setIsLoading(true);
    const methodToRun = overrideMethod || command;
    let parsedArgs = {};
    
    if (!overrideMethod) {
      try {
        parsedArgs = JSON.parse(argsJson);
      } catch (e) {
        // Add error log
        const errorLog: McpLog = {
          id: String(Date.now()),
          timestamp: new Date().toLocaleTimeString(),
          direction: 'request',
          payload: { error: 'Invalid JSON arguments input' }
        };
        setLogs(prev => [errorLog, ...prev]);
        setIsLoading(false);
        return;
      }
    } else {
      parsedArgs = overrideArgs || {};
    }

    const reqId = Math.floor(Math.random() * 10000);
    const mcpRequestPayload = {
      jsonrpc: '2.0',
      id: reqId,
      method: methodToRun,
      params: methodToRun === 'tools/call' ? parsedArgs : {}
    };

    // Log request
    const requestLog: McpLog = {
      id: `${reqId}-req`,
      timestamp: new Date().toLocaleTimeString(),
      direction: 'request',
      payload: mcpRequestPayload
    };

    setLogs(prev => [requestLog, ...prev]);

    try {
      const response = await fetch('/api/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mcpRequestPayload)
      });

      const mcpResponsePayload = await response.json();

      // Log response
      const responseLog: McpLog = {
        id: `${reqId}-res`,
        timestamp: new Date().toLocaleTimeString(),
        direction: 'response',
        payload: mcpResponsePayload
      };

      setLogs(prev => [responseLog, ...prev]);
    } catch (err: any) {
      const errorLog: McpLog = {
        id: `${reqId}-err`,
        timestamp: new Date().toLocaleTimeString(),
        direction: 'response',
        payload: { error: 'Network failure communicating with MCP endpoint', details: err.message }
      };
      setLogs(prev => [errorLog, ...prev]);
    } finally {
      setIsLoading(false);
    }
  };

  // Preset triggers
  const triggerListTools = () => {
    setCommand('tools/list');
    setArgsJson('{}');
    runMcpRequest('tools/list', {});
  };

  const triggerSearchWaterShader = () => {
    setCommand('tools/call');
    const args = { name: 'search_assets', arguments: { query: 'water', type: 'shader' } };
    setArgsJson(JSON.stringify(args, null, 2));
    runMcpRequest('tools/call', args);
  };

  const triggerGetHeroDetails = () => {
    setCommand('tools/call');
    const args = { name: 'get_asset_details', arguments: { id: 'native-dungeon-hero' } };
    setArgsJson(JSON.stringify(args, null, 2));
    runMcpRequest('tools/call', args);
  };

  return (
    <div id="mcp-terminal-section" className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[520px]">
      {/* Tab Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Terminal className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5">
              Model Context Protocol Gateway
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 font-mono font-bold px-2 py-0.5 rounded-full uppercase border border-cyan-500/20">
                Active
              </span>
            </h3>
            <p className="text-xs text-slate-400">Query openassets.studio dynamically via LLM agents & game engines</p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('console')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'console' 
                ? 'bg-slate-800 text-cyan-400 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Terminal Console
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'config' 
                ? 'bg-slate-800 text-cyan-400 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            IDE Settings
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="flex-grow flex flex-col overflow-hidden min-h-0">
        {activeTab === 'config' ? (
          /* ================= INTEGRATION CONFIG ================= */
          <div className="p-6 overflow-y-auto space-y-5 h-full">
            <div className="flex gap-3 items-start bg-cyan-500/5 border border-cyan-500/10 p-4 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-widest">Connect to Cursor, Claude Desktop, or VS Code</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Add openassets.studio to your system's Model Context Protocol (MCP) server array. Once connected, your LLM code assistant can search the game asset directories and append shaders or scripts directly into your files.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold tracking-wide uppercase font-mono">Cursor / Claude Config JSON (~/.code/config.json)</span>
                <button
                  onClick={handleCopyConfig}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      Copied Config!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
                <pre className="p-4 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{configCode}</code>
                </pre>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500 bg-slate-900/40 p-4 border border-slate-800 rounded-xl">
              <span className="flex items-center gap-1 text-slate-400">
                <Layers className="w-4 h-4 text-slate-500" />
                Cross-platform compatibility: Node.js, Godot MCP, and Unity LLM modules.
              </span>
              <a 
                href="https://modelcontextprotocol.io" 
                target="_blank" 
                rel="noreferrer" 
                className="text-cyan-400 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                Learn MCP
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          /* ================= INTERACTIVE TERMINAL CONSOLE ================= */
          <div className="flex-grow flex flex-col lg:flex-row min-h-0 overflow-hidden">
            {/* Console Control Panel */}
            <div className="w-full lg:w-1/3 bg-slate-900/40 border-b lg:border-b-0 lg:border-r border-slate-800 p-5 flex flex-col gap-4 overflow-y-auto">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">MCP RPC Method</label>
                <select
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 text-slate-200 text-xs rounded-lg px-3 py-2 outline-none transition-colors"
                >
                  <option value="tools/list">tools/list (List all capabilities)</option>
                  <option value="tools/call">tools/call (Call specific function)</option>
                </select>
              </div>

              {command === 'tools/call' && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Arguments (JSON)</label>
                    <button 
                      onClick={() => setArgsJson('{\n  "name": "search_assets",\n  "arguments": {\n    "query": "toon",\n    "type": "shader"\n  }\n}')}
                      className="text-[9px] text-cyan-500/80 hover:text-cyan-400 uppercase font-bold cursor-pointer"
                    >
                      Search Template
                    </button>
                  </div>
                  <textarea
                    value={argsJson}
                    onChange={(e) => setArgsJson(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 font-mono text-[11px] text-slate-300 rounded-lg px-3 py-2 outline-none transition-colors resize-none leading-normal"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={() => runMcpRequest()}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-cyan-500/5 disabled:opacity-50 transition-colors cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Executing Request...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Send MCP Request
                  </>
                )}
              </button>

              <div className="space-y-2.5 pt-3 border-t border-slate-800/80">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                  Try Console Presets:
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={triggerListTools}
                    className="w-full text-left bg-slate-950 border border-slate-800 hover:border-slate-700 p-2 rounded-md hover:text-cyan-400 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="text-xs font-mono text-slate-300 group-hover:text-cyan-400">1. Query Available Tools</span>
                    <span className="text-[9px] bg-slate-900 border border-slate-800/80 text-slate-500 px-1 py-0.5 rounded font-mono font-bold uppercase group-hover:text-cyan-400">RPC</span>
                  </button>

                  <button
                    onClick={triggerSearchWaterShader}
                    className="w-full text-left bg-slate-950 border border-slate-800 hover:border-slate-700 p-2 rounded-md hover:text-cyan-400 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="text-xs font-mono text-slate-300 group-hover:text-cyan-400">2. Call: Search Shaders</span>
                    <span className="text-[9px] bg-slate-900 border border-slate-800/80 text-slate-500 px-1 py-0.5 rounded font-mono font-bold uppercase group-hover:text-cyan-400">RPC</span>
                  </button>

                  <button
                    onClick={triggerGetHeroDetails}
                    className="w-full text-left bg-slate-950 border border-slate-800 hover:border-slate-700 p-2 rounded-md hover:text-cyan-400 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="text-xs font-mono text-slate-300 group-hover:text-cyan-400">3. Call: Get Hero Details</span>
                    <span className="text-[9px] bg-slate-900 border border-slate-800/80 text-slate-500 px-1 py-0.5 rounded font-mono font-bold uppercase group-hover:text-cyan-400">RPC</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Live Terminal Output Logs */}
            <div className="flex-grow flex flex-col min-h-0 bg-slate-950">
              {/* Output Sub-Header */}
              <div className="bg-slate-900/60 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-bold uppercase font-mono tracking-widest">JSON-RPC Communication Logs</span>
                {logs.length > 0 && (
                  <button 
                    onClick={clearLogs}
                    className="text-[10px] text-slate-400 hover:text-white uppercase font-semibold font-mono cursor-pointer"
                  >
                    Clear Console
                  </button>
                )}
              </div>

              {/* Logs Content Area */}
              <div className="flex-grow p-4 overflow-y-auto space-y-4 font-mono text-xs">
                {logs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-600 space-y-2 p-5 select-none">
                    <Terminal className="w-8 h-8 opacity-40 animate-pulse" />
                    <div className="text-xs">Console is clean. Trigger a command preset on the left to inspect live Model Context Protocol payloads.</div>
                  </div>
                ) : (
                  logs.map((log) => (
                    <div 
                      key={log.id} 
                      className={`p-3 border rounded-xl space-y-1.5 ${
                        log.direction === 'request'
                          ? 'bg-slate-900/50 border-slate-800 text-cyan-300'
                          : log.payload?.error
                            ? 'bg-red-500/5 border-red-500/20 text-red-400'
                            : 'bg-cyan-500/5 border-cyan-500/10 text-cyan-400'
                      }`}
                    >
                      {/* Log meta */}
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold tracking-wider pb-1 border-b border-slate-800/50">
                        <span className="uppercase">
                          {log.direction === 'request' ? '→ SENT JSON-RPC REQUEST' : '← RECEIVED JSON-RPC RESPONSE'}
                        </span>
                        <span>{log.timestamp}</span>
                      </div>
                      
                      {/* Code body */}
                      <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
                        {JSON.stringify(log.payload, null, 2)}
                      </pre>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
