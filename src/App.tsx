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
import STATIC_ASSETS from '../data/assets.json';

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

  // Filter local bundled assets as fallback
  const loadLocalAssets = () => {
    let list = [...(STATIC_ASSETS as Asset[])];

    // Filter by Type
    if (selectedType !== 'all') {
      list = list.filter(item => item.type === selectedType);
    }

    // Filter by Source
    if (selectedSource !== 'all') {
      list = list.filter(item => item.source === selectedSource);
    }

    // Filter by Engine
    if (selectedEngine !== 'all') {
      list = list.filter(item => item.engine.some(eng => eng.toLowerCase() === selectedEngine.toLowerCase()));
    }

    // Filter by Search text
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    setAssets(list);
  };

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
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setAssets(data);
          return;
        }
      }
      
      // Fallback: If not JSON (e.g. static site returning HTML or non-ok response)
      loadLocalAssets();
    } catch (err) {
      console.warn('Network error fetching assets, falling back to local static assets:', err);
      loadLocalAssets();
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
    <div className="min-h-screen bg-canvas-bg text-slate-700 font-sans antialiased selection:bg-brand-green/25 selection:text-brand-green-hover">
      
      {/* ================= TOP NAVIGATION / HEADER ================= */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center font-black text-white text-lg shadow-md shadow-brand-green/20">
              O
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight text-slate-900 font-sans">openassets<span className="text-brand-green font-extrabold">.studio</span></h1>
                <span className="text-[9px] bg-brand-green/10 text-brand-green font-bold border border-brand-green/25 px-1.5 py-0.5 rounded uppercase">Beta</span>
              </div>
              <p className="text-[11px] text-slate-400">Collaborative Game Asset Registry & MCP Hub</p>
            </div>
          </div>

          {/* Nav / Tabs control */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setActiveWorkspaceTab('catalog')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeWorkspaceTab === 'catalog' 
                  ? 'bg-white text-brand-green border border-slate-200/50 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Compass className="w-4 h-4" />
              Asset Catalog
            </button>
            <button
              onClick={() => setActiveWorkspaceTab('mcp')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeWorkspaceTab === 'mcp' 
                  ? 'bg-white text-brand-green border border-slate-200/50 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Terminal className="w-4 h-4" />
              MCP Server Sandbox
            </button>
          </div>

          {/* Mandated External Friend Links & Actions */}
          <div className="flex items-center flex-wrap gap-3">
            {/* Kenney & ThreeJS Assets badges */}
            <div className="flex items-center gap-2.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-xs">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">External Partners</span>
              <a 
                href="https://kenney.nl/assets" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-brand-green transition-colors flex items-center gap-0.5 font-medium text-slate-600"
              >
                Kenney Assets
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
              <span className="text-slate-200">|</span>
              <a 
                href="https://threejsassets.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-brand-green transition-colors flex items-center gap-0.5 font-medium text-slate-600"
              >
                ThreeJS Assets
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
            </div>

            {/* Share action */}
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-4 py-2 bg-brand-green hover:bg-brand-green-hover text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-brand-green/20"
            >
              <Plus className="w-4 h-4" />
              Upload Asset
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO INTRO SECTION ================= */}
      <section className="relative overflow-hidden border-b border-slate-200/50 px-6 py-16 text-center bg-radial-gradient from-brand-green/5 via-transparent to-transparent">
        {/* Decorative background grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-65 pointer-events-none"></div>
        <div className="relative max-w-4xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-brand-green bg-brand-green/10 px-3 py-1 border border-brand-green/20 rounded-full uppercase">
            <Layers className="w-3.5 h-3.5" />
            91+ Web & Engine Optimized Assets
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 animate-fade-in leading-tight max-w-3xl mx-auto">
            The openassets library. <br className="hidden sm:inline" />Search <span className="text-brand-green">web-ready</span> game resources.
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Free & premium. Every asset optimized, oriented, and licensed for real projects — no asset-file resale or redistribution. Integrate seamlessly via <strong className="text-brand-green font-semibold font-mono">Model Context Protocol (MCP)</strong>.
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
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 max-w-4xl mx-auto space-y-3 text-center sm:text-left shadow-xs">
                <h3 className="font-bold text-slate-900 text-base">Model Context Protocol Integration</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  MCP allows large language models (like Claude in Cursor or VS Code AI agents) to access openassets.studio directories directly. Once configured, you can command your agent: 
                  <span className="text-brand-green font-semibold italic font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60 mx-1">"Find a toon water shader from openassets and paste it inside my project"</span>, and the AI will download, format, and load the code straight into your file explorer automatically.
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
              <div className="bg-white p-5 border border-slate-200/80 rounded-2xl shadow-xs space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  {/* Search input in visual match with threejsassets */}
                  <div className="relative w-full lg:max-w-md flex items-center bg-white border border-slate-200 hover:border-slate-300 focus-within:border-brand-green rounded-xl p-1 shadow-sm transition-all">
                    <div className="flex items-center pl-3 flex-grow gap-2">
                      <Search className="w-4.5 h-4.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search assets, shaders, scripts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-slate-800 text-sm outline-none placeholder:text-slate-400 py-1.5"
                      />
                    </div>
                  </div>

                  {/* Filter controls triggers */}
                  <div className="flex items-center gap-3 w-full lg:w-auto justify-end overflow-x-auto py-1">
                    {/* Source Selector button toggles */}
                    <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 flex-shrink-0 text-xs">
                      <button
                        onClick={() => setSelectedSource('all')}
                        className={`px-3.5 py-1.5 font-bold rounded-lg transition-all cursor-pointer ${
                          selectedSource === 'all' 
                            ? 'bg-white text-brand-green border border-slate-200/50 shadow-xs' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        All Directories
                      </button>
                      <button
                        onClick={() => setSelectedSource('openassets')}
                        className={`px-3.5 py-1.5 font-bold rounded-lg transition-all cursor-pointer ${
                          selectedSource === 'openassets' 
                            ? 'bg-brand-green/10 text-brand-green' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Native
                      </button>
                      <button
                        onClick={() => setSelectedSource('kenney')}
                        className={`px-3.5 py-1.5 font-bold rounded-lg transition-all cursor-pointer ${
                          selectedSource === 'kenney' 
                            ? 'bg-orange-500/10 text-orange-600' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Kenney
                      </button>
                      <button
                        onClick={() => setSelectedSource('threejs')}
                        className={`px-3.5 py-1.5 font-bold rounded-lg transition-all cursor-pointer ${
                          selectedSource === 'threejs' 
                            ? 'bg-indigo-500/10 text-indigo-600' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Three.js
                      </button>
                    </div>

                    {/* Filter Drawer toggle */}
                    <button
                      onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                      className={`flex items-center gap-2 px-3.5 py-2 bg-white border rounded-xl text-xs font-bold hover:text-brand-green transition-all cursor-pointer ${
                        showFiltersPanel ? 'border-brand-green text-brand-green shadow-xs' : 'border-slate-200 text-slate-500'
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
                    className="pt-3 border-t border-slate-200/60 grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {/* Game Engine filters */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Compatible Engine</span>
                      <select
                        value={selectedEngine}
                        onChange={(e) => setSelectedEngine(e.target.value)}
                        className="bg-white border border-slate-200 hover:border-slate-300 focus:border-brand-green text-slate-700 text-xs rounded-xl px-3 py-2 outline-none w-full max-w-xs transition-colors"
                      >
                        <option value="all">Any Game Engine</option>
                        <option value="Unity">Unity</option>
                        <option value="Godot">Godot</option>
                        <option value="Three.js">Three.js</option>
                        <option value="Unreal Engine">Unreal Engine</option>
                        <option value="WebXR">WebXR</option>
                      </select>
                    </div>

                    <div className="flex items-center text-xs text-slate-500 bg-slate-50 p-3 border border-slate-200/60 rounded-xl max-w-md">
                      <HelpCircle className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
                      <span>Federated indexing automatically searches titles, tags, and authors of Kenney and ThreeJS libraries, letting you jump straight to official endpoints.</span>
                    </div>
                  </motion.div>
                )}

                {/* Sub category horizontal pills */}
                <div className="flex items-center gap-2 overflow-x-auto py-1 border-t border-slate-100 pt-3">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-2 flex-shrink-0">Filter:</span>
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
                            ? 'bg-brand-green/10 border-brand-green/20 text-brand-green'
                            : 'bg-slate-50 border-slate-200/80 text-slate-500 hover:border-slate-300 hover:text-slate-800'
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
                <div className="py-20 text-center flex flex-col items-center justify-center space-y-4 text-slate-400 select-none">
                  <div className="w-10 h-10 border-4 border-brand-green/35 border-t-brand-green rounded-full animate-spin"></div>
                  <div className="text-sm font-mono uppercase tracking-widest">Retrieving asset data...</div>
                </div>
              ) : assets.length === 0 ? (
                <div className="py-20 text-center bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto shadow-xs">
                  <Compass className="w-10 h-10 text-slate-300 animate-pulse" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-slate-800 text-sm">No Game Assets Found</h4>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
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
                    className="text-xs text-brand-green font-bold hover:underline"
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
      <footer className="mt-20 border-t border-slate-200/80 bg-white px-8 py-10 text-xs text-slate-500 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-extrabold text-sm tracking-tight text-slate-900 font-sans flex items-center justify-center md:justify-start gap-1">
              openassets<span className="text-brand-green font-extrabold">.studio</span>
            </div>
            <p className="text-xs text-slate-400">
              Made by and for the indie game developer community. Build, integrate, co-maintain.
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Contact: <a href="mailto:service@openassets.studio" className="hover:text-brand-green transition-colors font-mono">service@openassets.studio</a>
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-400">
            <span>License: CC0 & MIT</span>
            <span className="text-slate-200">•</span>
            <a href="https://kenney.nl" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">Kenney.nl</a>
            <span className="text-slate-200">•</span>
            <a href="https://threejsassets.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">ThreeJSAssets</a>
            <span className="text-slate-200">•</span>
            <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">Model Context Protocol</a>
          </div>
        </div>

        {/* Real-time Status indicators based on the Theme's Design HTML Footer */}
        <div className="max-w-7xl mx-auto pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex flex-wrap justify-center sm:justify-start gap-6">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse"></span> Local Registry Online</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-brand-green rounded-full"></span> Kenney API Bridge: 24ms</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-brand-green rounded-full"></span> ThreeJS Peer Link Active</span>
          </div>
          <div className="uppercase tracking-widest font-bold text-slate-400 text-center sm:text-right">
            Seamless Cross-Platform Compatibility v1.0.2
          </div>
        </div>
      </footer>
    </div>
  );
}
