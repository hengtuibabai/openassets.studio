import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Download, ExternalLink, Calendar, User, Tag, HardDrive, FileCode, Check, 
  Settings, Save, Plus, Trash2, Shield, Info, Copy 
} from 'lucide-react';
import { Asset } from '../types';

interface AssetDetailModalProps {
  asset: Asset;
  onClose: () => void;
  onUpdateAsset: (updatedAsset: Asset) => void;
  onDownloadIncrement: (id: string) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({ 
  asset, 
  onClose, 
  onUpdateAsset, 
  onDownloadIncrement 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Editable Fields
  const [title, setTitle] = useState(asset.title);
  const [description, setDescription] = useState(asset.description);
  const [category, setCategory] = useState(asset.category);
  const [content, setContent] = useState(asset.content || '');
  const [engineInput, setEngineInput] = useState(asset.engine.join(', '));
  const [tagInput, setTagInput] = useState(asset.tags.join(', '));
  const [isSaving, setIsSaving] = useState(false);

  const handleCopyCode = () => {
    if (asset.content) {
      navigator.clipboard.writeText(asset.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (asset.source !== 'openassets') {
      window.open(asset.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // Trigger mock download
    onDownloadIncrement(asset.id);
    const element = document.createElement("a");
    const file = new Blob([asset.content || JSON.stringify(asset, null, 2)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${asset.title.toLowerCase().replace(/\s+/g, '-')}${asset.fileFormat}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const parsedEngines = engineInput.split(',').map(e => e.trim()).filter(e => e.length > 0);
      const parsedTags = tagInput.split(',').map(t => t.trim()).filter(t => t.length > 0);

      const response = await fetch(`/api/assets/${asset.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          category,
          engine: parsedEngines,
          tags: parsedTags,
          content: asset.source === 'openassets' ? content : undefined,
        }),
      });

      if (response.ok) {
        const updated = await response.json();
        onUpdateAsset(updated);
        setIsEditing(false);
      } else {
        console.error('Failed to update asset');
      }
    } catch (err) {
      console.error('Error saving asset details:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div id="asset-detail-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8 max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/60 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
              asset.source === 'openassets' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
              asset.source === 'kenney' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
              'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
            }`}>
              {asset.source === 'openassets' ? 'Native Asset' : asset.source === 'kenney' ? 'Kenney.nl Source' : 'ThreeJS Source'}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{asset.type}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {isEditing ? (
            /* ================= EDIT MODE ================= */
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-2">
                <Settings className="w-4 h-4 animate-spin-slow" />
                <span>Co-Maintenance Editor: Improve this asset metadata & files</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-medium">Asset Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 text-slate-100 text-sm rounded-lg px-3 py-2 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-medium">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 text-slate-100 text-sm rounded-lg px-3 py-2 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 text-slate-100 text-sm rounded-lg px-3 py-2 outline-none transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-medium">Game Engine Compatibility (comma-separated)</label>
                  <input
                    type="text"
                    value={engineInput}
                    onChange={(e) => setEngineInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 text-slate-100 text-sm rounded-lg px-3 py-2 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-medium">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 text-slate-100 text-sm rounded-lg px-3 py-2 outline-none transition-colors"
                  />
                </div>
              </div>

              {asset.source === 'openassets' && asset.content && (
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-medium">Source Code / Shaders / Snippet payload</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 text-slate-100 text-xs font-mono rounded-lg px-3 py-2 outline-none transition-colors resize-y leading-relaxed"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 pt-4 justify-end border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setTitle(asset.title);
                    setDescription(asset.description);
                    setCategory(asset.category);
                    setContent(asset.content || '');
                    setEngineInput(asset.engine.join(', '));
                    setTagInput(asset.tags.join(', '));
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      Save Modifications
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* ================= VIEW MODE ================= */
            <div className="space-y-6">
              {/* Asset Intro */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="space-y-1.5">
                  <h2 className="text-2xl font-bold text-white tracking-tight">{asset.title}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">{asset.description}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-colors cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-cyan-400" />
                    Co-Maintain / Edit
                  </button>

                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg shadow-lg hover:shadow-cyan-500/10 transition-all cursor-pointer"
                  >
                    {asset.source === 'openassets' ? (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        Download Free Asset
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-3.5 h-3.5" />
                        Jump to Official Site
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-950/40 p-4 border border-slate-800/80 rounded-xl">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                    <User className="w-3 h-3" />
                    Author
                  </div>
                  <div className="text-xs font-semibold text-slate-200 font-mono">@{asset.author}</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                    <HardDrive className="w-3 h-3" />
                    Payload Size
                  </div>
                  <div className="text-xs font-semibold text-slate-200 font-mono">{asset.fileSize}</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                    <FileCode className="w-3 h-3" />
                    File Format
                  </div>
                  <div className="text-xs font-semibold text-slate-200 font-mono">{asset.fileFormat}</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                    <Calendar className="w-3 h-3" />
                    Published
                  </div>
                  <div className="text-xs font-semibold text-slate-200 font-mono">
                    {new Date(asset.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Detail Panels: Metadata & Asset Visual Snippet */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Side Specifications Column */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Engine Support */}
                  <div className="p-4 bg-slate-950/20 border border-slate-800/50 rounded-xl space-y-2.5">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-1.5">Supported Engines</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {asset.engine.map(eng => (
                        <span key={eng} className="text-xs px-2.5 py-1 bg-slate-800 border border-slate-700/50 text-slate-300 font-medium rounded-md">
                          {eng}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Taxonomy / Tags */}
                  <div className="p-4 bg-slate-950/20 border border-slate-800/50 rounded-xl space-y-2.5">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-1.5">Tags</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {asset.tags.map(tag => (
                        <span key={tag} className="flex items-center gap-1 text-xs px-2 py-0.5 bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/10 rounded-md cursor-default transition-all">
                          <Tag className="w-3 h-3 opacity-60" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* MCP Integration Notice */}
                  {asset.source === 'openassets' && (
                    <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-xl space-y-2">
                      <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                        <Shield className="w-3.5 h-3.5" />
                        MCP Protocol Active
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        This asset is fully mapped to the openassets MCP Server. You can query or import this code module directly inside Cursor or Claude using the asset ID:
                      </p>
                      <div className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800 font-mono text-[10px] text-slate-300 flex items-center justify-between">
                        <span>{asset.id}</span>
                        <span className="text-[9px] text-cyan-500 font-bold uppercase">Ready</span>
                      </div>
                    </div>
                  )}

                  {/* External Resource warning */}
                  {asset.source !== 'openassets' && (
                    <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
                        <Info className="w-3.5 h-3.5" />
                        External Asset
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        This metadata has been indexed from the official {asset.source === 'kenney' ? 'Kenney.nl' : 'ThreeJSAssets'} directories to provide game creators a consolidated registry. Click "Jump to Official Site" to retrieve files directly.
                      </p>
                    </div>
                  )}
                </div>

                {/* Primary Content Column: Code View or Render Visualizer */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                      {asset.type === '3d' ? '3D Render Asset Payload' : 'Source Payload File / Guide'}
                    </h4>
                    {asset.content && (
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700/60 rounded-md text-[11px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-cyan-400" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Copy Payload
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Container Display */}
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden shadow-inner">
                    {asset.content ? (
                      <div className="relative">
                        <pre className="p-5 font-mono text-xs text-slate-300 overflow-x-auto overflow-y-auto max-h-[360px] leading-relaxed select-all">
                          <code>{asset.content}</code>
                        </pre>
                      </div>
                    ) : (
                      /* Fallback Display if no direct code payload (e.g. Kenney external downloads) */
                      <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="relative w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-cyan-400 shadow-lg">
                          <ExternalLink className="w-8 h-8 opacity-80" />
                        </div>
                        <div className="space-y-1.5 max-w-xs">
                          <h5 className="font-semibold text-slate-200 text-sm">Indexed External Registry Package</h5>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            This resource belongs to {asset.source === 'kenney' ? 'Kenney.nl' : 'ThreeJSAssets'}. High fidelity models, zip folders, and matching asset bundles are hosted directly on their network.
                          </p>
                        </div>
                        <a
                          href={asset.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-colors cursor-pointer"
                        >
                          Visit Official Download
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
