import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Upload, FileCode, CheckCircle, HelpCircle, HardDrive, Cpu, Code } from 'lucide-react';

interface UploadModalProps {
  onClose: () => void;
  onUploadSuccess: (newAsset: any) => void;
}

const AVAILABLE_ENGINES = ['Unity', 'Godot', 'Three.js', 'Unreal Engine', 'Construct', 'WebXR', 'RPG Maker'];
const CATEGORY_PRESETS = ['Characters', 'Shaders', 'Scripts', 'Modular Kits', 'Vehicles', 'Environments', 'UI Packs'];

export const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'3d' | '2d' | 'shader' | 'script' | 'mcp'>('script');
  const [category, setCategory] = useState(CATEGORY_PRESETS[2]); // Default 'Scripts'
  const [engines, setEngines] = useState<string[]>(['Godot']);
  const [tags, setTags] = useState('');
  const [fileFormat, setFileFormat] = useState('.gd');
  const [fileSize, setFileSize] = useState('25 KB');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleEngine = (eng: string) => {
    if (engines.includes(eng)) {
      setEngines(engines.filter(e => e !== eng));
    } else {
      setEngines([...engines, eng]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !content) {
      setErrorMsg('Please fill in all mandatory fields (Title, Description, and Asset Payload).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const parsedTags = tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
      if (parsedTags.length === 0) {
        parsedTags.push(type);
      }

      const bodyPayload = {
        title,
        description,
        type,
        category,
        engine: engines.length > 0 ? engines : ['General'],
        tags: parsedTags,
        fileSize,
        fileFormat,
        content,
        author: author.trim() || 'Anonymous Developer'
      };

      const response = await fetch('/api/assets/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyPayload)
      });

      if (response.ok) {
        const result = await response.json();
        onUploadSuccess(result);
        onClose();
      } else {
        const err = await response.json();
        setErrorMsg(err.error || 'Server rejected asset upload.');
      }
    } catch (err: any) {
      setErrorMsg(`Network communication error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="upload-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/60 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white tracking-tight">Share Game Asset or Code Snippet</h2>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-grow">
          {errorMsg && (
            <div className="p-3 bg-red-500/15 border border-red-500/20 rounded-lg text-xs font-semibold text-red-400">
              {errorMsg}
            </div>
          )}

          {/* Title & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Asset Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. RPG Save Manager"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 text-slate-200 text-sm rounded-lg px-3 py-2 outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Author Nickname</label>
              <input
                type="text"
                placeholder="e.g. dev_miku"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 text-slate-200 text-sm rounded-lg px-3 py-2 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Type & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Asset Type</label>
              <select
                value={type}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setType(val);
                  // Update extension preset
                  if (val === 'script') setFileFormat('.cs');
                  else if (val === 'shader') setFileFormat('.hlsl');
                  else if (val === '3d') setFileFormat('.gltf');
                  else if (val === '2d') setFileFormat('.png');
                  else setFileFormat('.json');
                }}
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 text-slate-200 text-sm rounded-lg px-3 py-2 outline-none transition-colors"
              >
                <option value="script">Script (.cs, .gd, .js)</option>
                <option value="shader">Shader (.shader, .hlsl, .glsl)</option>
                <option value="3d">3D Model (.gltf, .fbx, .obj)</option>
                <option value="2d">2D Asset / Spritesheet (.png, .ase)</option>
                <option value="mcp">MCP Config Template (.json)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Category Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 text-slate-200 text-sm rounded-lg px-3 py-2 outline-none transition-colors"
              >
                {CATEGORY_PRESETS.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Format & Payload Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">File Format / Extension</label>
              <input
                type="text"
                placeholder="e.g. .cs or .gltf"
                value={fileFormat}
                onChange={(e) => setFileFormat(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 text-slate-200 text-sm rounded-lg px-3 py-2 outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Payload Weight</label>
              <input
                type="text"
                placeholder="e.g. 15 KB or 1.2 MB"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 text-slate-200 text-sm rounded-lg px-3 py-2 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Brief Description *</label>
            <textarea
              required
              rows={2}
              placeholder="Give other developers a quick overview of how this module works or how to import it."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 text-slate-200 text-sm rounded-lg px-3 py-2 outline-none transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Engine Compatibility */}
          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Game Engine Compatibility</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_ENGINES.map((eng) => {
                const isActive = engines.includes(eng);
                return (
                  <button
                    key={eng}
                    type="button"
                    onClick={() => toggleEngine(eng)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-cyan-500/15 border-cyan-500 text-cyan-400' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {eng}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Keywords */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Search Keywords / Tags (comma-separated)</label>
            <input
              type="text"
              placeholder="e.g. controller, utility, procedural, toon"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 text-slate-200 text-sm rounded-lg px-3 py-2 outline-none transition-colors"
            />
          </div>

          {/* Source Payload Area */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Asset Code Snippet / Shaders / URL *</label>
              <span className="text-[10px] text-slate-500">Supports Raw Code, JSON-RPC templates, or direct links</span>
            </div>
            <textarea
              required
              rows={6}
              placeholder={type === 'script' ? 'Paste your C#, GDScript, or JavaScript character controller here...' : 'Paste your shader source or model links here...'}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 text-slate-200 text-xs font-mono rounded-lg px-3 py-2.5 outline-none transition-colors resize-y leading-relaxed"
            />
          </div>

          {/* Footer controls */}
          <div className="flex items-center gap-2 pt-4 justify-end border-t border-slate-800/60 sticky bottom-0 bg-slate-900 py-2 z-10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-50 transition-colors cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              {isSubmitting ? 'Uploading...' : 'Publish Asset'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
