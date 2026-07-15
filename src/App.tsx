import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Upload, ExternalLink, Compass, Terminal, SlidersHorizontal, 
  Grid, Box, Code, Image, Cpu, Plus, Layers, ArrowUpRight, HelpCircle
} from 'lucide-react';

import { Asset, AssetTypeFilter, AssetSourceFilter } from './types';
import { AssetCard } from './components/AssetCard';
import { AssetDetailModal } from './components/AssetDetailModal';
import { UploadModal } from './components/UploadModal';
import { McpTerminal } from './components/McpTerminal';

export default function App() {
  // Asset state
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  
  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'catalog' | 'mcp'>('catalog');

  // Search & Filter controls state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<AssetTypeFilter>('all');
  const [selectedSource, setSelectedSource] = useState<AssetSourceFilter>('all');
  const [selectedEngine, setSelectedEngine] = useState<string>('all');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all assets based on active filters
  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('query', searchQuery);
      if (selectedType !== 'all') params.append('type', selectedType);
      if (selectedSource !== 'all') params.append('source', selectedSource);
      if (selectedEngine !== 'all') params.append('engine', selectedEngine);

      const response = await fetch(`/api/assets?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setAssets(data);
      } else {
        console.error('Error fetching assets from server');
      }
    } catch (err) {
      console.error('Network error fetching assets:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger fetch when any search parameter or filter state alters
  useEffect(() => {
    fetchAssets();
  }, [searchQuery, selectedType, selectedSource, selectedEngine]);

  // Download increment handler
  const handleDownloadIncrement = async (id: string) => {
    try {
      const response = await fetch(`/api/assets/${id}/download`, {
        method: 'POST'
      });
      if (response.ok) {
        // Increment count locally in state
        setAssets(prev => prev.map(asset => {
          if (asset.id === id) {
            return { ...asset, downloadsCount: asset.downloadsCount + 1 };
          }
          return asset;
        }));
        // Update selected asset if modal open
        if (selectedAsset && selectedAsset.id === id) {
          setSelectedAsset(prev => prev ? { ...prev, downloadsCount: prev.downloadsCount + 1 } : null);
        }
      }
    } catch (err) {
      console.error('Error reporting download metrics:', err);
    }
  };

  // Update asset detail handler (co-maintenance updates)
  const handleUpdateAsset = (updatedAsset: Asset) => {
    setAssets(prev => prev.map(asset => asset.id === updatedAsset.id ? updatedAsset : asset));
    setSelectedAsset(updatedAsset);
  };

  // Upload asset success handler
  const handleUploadSuccess = (newAsset: Asset) => {
    setAssets(prev => [newAsset, ...prev]);
    // Set view to newly created asset
    setSelectedAsset(newAsset);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-300">
      
      {/* ================= TOP NAVIGATION / HEADER ================= */}
      <header className="sticky top-0 z-30 bg-slate-900/85 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg shadow-cyan-500/10">
              O
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight text-white font-sans">openassets<span className="text-cyan-500 font-bold">.studio</span></h1>
                <span className="text-[9px] bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/25 px-1.5 py-0.5 rounded uppercase">Beta</span>
              </div>
              <p className="text-[11px] text-slate-500">Collaborative Game Asset Registry & MCP Hub</p>
            </div>
          </div>

          {/* Nav / Tabs control */}
          <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => setActiveWorkspaceTab('catalog')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeWorkspaceTab === 'catalog' 
                  ? 'bg-slate-700 text-cyan-400 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              Asset Catalog
            </button>
            <button
              onClick={() => setActiveWorkspaceTab('mcp')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeWorkspaceTab === 'mcp' 
                  ? 'bg-slate-700 text-cyan-400 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-4 h-4" />
              MCP Server Sandbox
            </button>
          </div>

          {/* Mandated External Friend Links & Actions */}
          <div className="flex items-center flex-wrap gap-3">
            {/* Kenney & ThreeJS Assets badges */}
            <div className="flex items-center gap-2.5 bg-slate-900/50 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">External Partners</span>
              <a 
                href="https://kenney.nl/assets" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-cyan-400 transition-colors flex items-center gap-0.5 font-medium text-slate-400"
              >
                Kenney Assets
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <span className="text-slate-800">|</span>
              <a 
                href="https://threejsassets.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-cyan-400 transition-colors flex items-center gap-0.5 font-medium text-slate-400"
              >
                ThreeJS Assets
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Share action */}
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Upload Asset
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO INTRO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900/30 to-transparent border-b border-slate-800/40 px-6 py-12 text-center">
        {/* Decorative background grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="relative max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 border border-cyan-500/20 rounded-full uppercase">
            <Layers className="w-3.5 h-3.5" />
            Cross-Engine Compatibility Hub
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white animate-fade-in">
            High Fidelity Game Assets & Snippets for AI Workflows
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Download 3D models, shaders, scripts, and sprite-sheets. Connect your IDE or assistant dynamically via our built-in 
            <strong className="text-cyan-400 font-semibold font-mono"> Model Context Protocol (MCP)</strong> server. Co-maintain tags, codes, and formats with fellow game developers!
          </p>
        </div>
      </section>

      {/* ================= WORKSPACE TAB NAVIGATION ================= */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeWorkspaceTab === 'mcp' ? (
            
            /* ================= MCP TAB PANEL ================= */
            <motion.div
              key="mcp-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 max-w-4xl mx-auto space-y-3 text-center sm:text-left">
                <h3 className="font-bold text-white text-base">Model Context Protocol Integration</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  MCP allows large language models (like Claude in Cursor or VS Code AI agents) to access openassets.studio directories directly. Once configured, you can command your agent: 
                  <span className="text-cyan-400 italic font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-900 mx-1">"Find a toon water shader from openassets and paste it inside my project"</span>, and the AI will download, format, and load the code straight into your file explorer automatically.
                </p>
              </div>
              <McpTerminal />
            </motion.div>

          ) : (

            /* ================= CATALOGUE MAIN TAB PANEL ================= */
            <motion.div
              key="catalog-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-8"
            >
              {/* Filter Console Panel */}
              <div className="bg-slate-900/50 p-4 border border-slate-800 rounded-2xl space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  {/* Search input */}
                  <div className="relative w-full lg:max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search assets, shaders, controller scripts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 hover:border-slate-600/80 focus:border-cyan-500 text-slate-200 text-sm rounded-lg pl-11 pr-4 py-2.5 outline-none transition-colors"
                    />
                  </div>

                  {/* Filter controls triggers */}
                  <div className="flex items-center gap-3 w-full lg:w-auto justify-end overflow-x-auto py-1">
                    {/* Source Selector button toggles */}
                    <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700 flex-shrink-0 text-xs">
                      <button
                        onClick={() => setSelectedSource('all')}
                        className={`px-3 py-1.5 font-bold rounded-lg transition-all cursor-pointer ${
                          selectedSource === 'all' ? 'bg-slate-700 text-cyan-400' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        All Directories
                      </button>
                      <button
                        onClick={() => setSelectedSource('openassets')}
                        className={`px-3 py-1.5 font-bold rounded-lg transition-all cursor-pointer ${
                          selectedSource === 'openassets' ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Native
                      </button>
                      <button
                        onClick={() => setSelectedSource('kenney')}
                        className={`px-3 py-1.5 font-bold rounded-lg transition-all cursor-pointer ${
                          selectedSource === 'kenney' ? 'bg-orange-500/10 text-orange-400' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Kenney
                      </button>
                      <button
                        onClick={() => setSelectedSource('threejs')}
                        className={`px-3 py-1.5 font-bold rounded-lg transition-all cursor-pointer ${
                          selectedSource === 'threejs' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Three.js
                      </button>
                    </div>

                    {/* Filter Drawer toggle */}
                    <button
                      onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                      className={`flex items-center gap-2 px-3 py-2 bg-slate-800 border rounded-xl text-xs font-bold hover:text-cyan-400 transition-colors cursor-pointer ${
                        showFiltersPanel ? 'border-cyan-500 text-cyan-400' : 'border-slate-700 text-slate-400'
                      }`}
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      Specs
                    </button>
                  </div>
                </div>

                {/* Expanded filters drawer */}
                {showFiltersPanel && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-3 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {/* Game Engine filters */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Compatible Engine</span>
                      <select
                        value={selectedEngine}
                        onChange={(e) => setSelectedEngine(e.target.value)}
                        className="bg-slate-800 border border-slate-700 hover:border-slate-600 focus:border-cyan-500 text-slate-300 text-xs rounded-xl px-3 py-2 outline-none w-full max-w-xs transition-colors"
                      >
                        <option value="all">Any Game Engine</option>
                        <option value="Unity">Unity</option>
                        <option value="Godot">Godot</option>
                        <option value="Three.js">Three.js</option>
                        <option value="Unreal Engine">Unreal Engine</option>
                        <option value="WebXR">WebXR</option>
                      </select>
                    </div>

                    <div className="flex items-center text-xs text-slate-500 bg-slate-900/40 p-3 border border-slate-800 rounded-xl max-w-md">
                      <HelpCircle className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
                      <span>Federated indexing automatically searches titles, tags, and authors of Kenney and ThreeJS libraries, letting you jump straight to official endpoints.</span>
                    </div>
                  </motion.div>
                )}

                {/* Sub category horizontal pills */}
                <div className="flex items-center gap-2 overflow-x-auto py-1 border-t border-slate-800/40 pt-3">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mr-2 flex-shrink-0">Filter:</span>
                  {[
                    { id: 'all', label: 'All Assets', icon: <Grid className="w-3.5 h-3.5" /> },
                    { id: '3d', label: '3D Models', icon: <Box className="w-3.5 h-3.5" /> },
                    { id: '2d', label: '2D Sprites', icon: <Image className="w-3.5 h-3.5" /> },
                    { id: 'shader', label: 'Shaders', icon: <Cpu className="w-3.5 h-3.5" /> },
                    { id: 'script', label: 'Code Snippets', icon: <Code className="w-3.5 h-3.5" /> },
                    { id: 'mcp', label: 'MCP Tools', icon: <Terminal className="w-3.5 h-3.5" /> }
                  ].map((cat) => {
                    const isActive = selectedType === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedType(cat.id as any)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-all flex-shrink-0 ${
                          isActive
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                        }`}
                      >
                        {cat.icon}
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Assets Grid section */}
              {isLoading ? (
                <div className="py-20 text-center flex flex-col items-center justify-center space-y-4 text-slate-500 select-none">
                  <div className="w-10 h-10 border-4 border-cyan-500/35 border-t-cyan-400 rounded-full animate-spin"></div>
                  <div className="text-sm font-mono uppercase tracking-widest">Retrieving asset data...</div>
                </div>
              ) : assets.length === 0 ? (
                <div className="py-20 text-center bg-slate-900/20 border border-slate-800 rounded-2xl flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto">
                  <Compass className="w-10 h-10 text-slate-600 animate-pulse" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-white text-sm">No Game Assets Found</h4>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                      There are no resources matching "{searchQuery}" under the selected directories. Try checking another source or search keyword.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedType('all');
                      setSelectedSource('all');
                      setSelectedEngine('all');
                    }}
                    className="text-xs text-cyan-400 font-bold hover:underline"
                  >
                    Clear Filter Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AnimatePresence>
                    {assets.map((asset) => (
                      <motion.div
                        key={asset.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <AssetCard 
                           asset={asset} 
                           onClick={(item) => setSelectedAsset(item)} 
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ================= MODAL OVERLAYS (RENDERED CONDITIONALLY) ================= */}
      <AnimatePresence>
        {/* Detail Viewer Modal */}
        {selectedAsset && (
          <AssetDetailModal
            asset={selectedAsset}
            onClose={() => setSelectedAsset(null)}
            onUpdateAsset={handleUpdateAsset}
            onDownloadIncrement={handleDownloadIncrement}
          />
        )}

        {/* Upload/Share Asset Modal */}
        {isUploadOpen && (
          <UploadModal
            onClose={() => setIsUploadOpen(false)}
            onUploadSuccess={handleUploadSuccess}
          />
        )}
      </AnimatePresence>

      {/* ================= BRAND FOOTER STATUS BAR ================= */}
      <footer className="mt-20 border-t border-slate-800 bg-slate-950 px-8 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-900">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-semibold text-sm tracking-tight text-white font-sans flex items-center justify-center md:justify-start gap-1">
              openassets<span className="text-cyan-500 font-bold">.studio</span>
            </div>
            <p className="text-xs text-slate-400">
              Made by and for the indie game developer community. Build, integrate, co-maintain.
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Contact: <a href="mailto:service@openassets.studio" className="hover:text-cyan-400 transition-colors font-mono">service@openassets.studio</a>
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-400">
            <span>License: CC0 & MIT</span>
            <span className="text-slate-800">•</span>
            <a href="https://kenney.nl" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Kenney.nl</a>
            <span className="text-slate-800">•</span>
            <a href="https://threejsassets.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">ThreeJSAssets</a>
            <span className="text-slate-800">•</span>
            <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Model Context Protocol</a>
          </div>
        </div>

        {/* Real-time Status indicators based on the Theme's Design HTML Footer */}
        <div className="max-w-7xl mx-auto pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex flex-wrap justify-center sm:justify-start gap-6">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Local Registry Online</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Kenney API Bridge: 24ms</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> ThreeJS Peer Link Active</span>
          </div>
          <div className="uppercase tracking-widest font-bold text-slate-600 text-center sm:text-right">
            Seamless Cross-Platform Compatibility v1.0.2
          </div>
        </div>
      </footer>
    </div>
  );
}
