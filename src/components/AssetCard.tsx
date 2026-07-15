import React from 'react';
import { motion } from 'motion/react';
import { Box, Code, Image, Cpu, Download, ExternalLink, Terminal } from 'lucide-react';
import { Asset } from '../types';

interface AssetCardProps {
  asset: Asset;
  onClick: (asset: Asset) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, onClick }) => {
  // Determine appropriate icon and colors based on asset type
  const getTypeConfig = (type: string) => {
    switch (type) {
      case '3d':
        return {
          icon: <Box className="w-5 h-5 text-indigo-400" />,
          bgColor: 'bg-indigo-950/40 border-indigo-500/20',
          badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
          visualPattern: (
            <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent flex items-center justify-center">
              <div className="relative w-16 h-16 border-2 border-dashed border-indigo-500/30 rounded-lg rotate-12 flex items-center justify-center animate-pulse">
                <Box className="w-8 h-8 text-indigo-400/60" />
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-indigo-400 rounded-full"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-indigo-400 rounded-full"></div>
              </div>
            </div>
          )
        };
      case '2d':
        return {
          icon: <Image className="w-5 h-5 text-emerald-400" />,
          bgColor: 'bg-emerald-950/40 border-emerald-500/20',
          badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
          visualPattern: (
            <div className="absolute inset-0 bg-grid-pattern opacity-15 flex items-center justify-center">
              <div className="relative w-20 h-20 border border-emerald-500/30 rounded-md flex items-center justify-center bg-emerald-950/20">
                <Image className="w-8 h-8 text-emerald-400/60" />
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="border border-emerald-500/10 rounded-[1px]"></div>
                  ))}
                </div>
              </div>
            </div>
          )
        };
      case 'shader':
        return {
          icon: <Cpu className="w-5 h-5 text-amber-400" />,
          bgColor: 'bg-amber-950/40 border-amber-500/20',
          badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
          visualPattern: (
            <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-transparent flex items-center justify-center overflow-hidden">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500/20 to-red-500/20 animate-spin blur-md" style={{ animationDuration: '6s' }}></div>
              <Cpu className="absolute w-8 h-8 text-amber-400/50" />
            </div>
          )
        };
      case 'script':
        return {
          icon: <Code className="w-5 h-5 text-cyan-400" />,
          bgColor: 'bg-cyan-950/40 border-cyan-500/20',
          badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
          visualPattern: (
            <div className="absolute inset-0 bg-slate-950/50 p-4 font-mono text-[9px] text-cyan-400/40 overflow-hidden select-none">
              <div className="border-b border-cyan-500/10 pb-1 mb-2 flex items-center justify-between">
                <span className="text-cyan-400/60 font-semibold">{asset.fileFormat}</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400/60"></span>
              </div>
              <pre className="leading-tight">
                {`using UnityEngine;\n\npublic class Controller : MonoBehaviour {\n  void Update() {\n    float move = Input.GetAxis("Vertical");\n    transform.Translate(0, 0, move);\n  }\n}`}
              </pre>
            </div>
          )
        };
      case 'mcp':
        return {
          icon: <Terminal className="w-5 h-5 text-purple-400" />,
          bgColor: 'bg-purple-950/40 border-purple-500/20',
          badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
          visualPattern: (
            <div className="absolute inset-0 bg-purple-950/20 flex flex-col justify-center px-4 font-mono">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">MCP Protocol Enabled</span>
              </div>
              <div className="text-[9px] text-purple-300/60 space-y-1">
                <div>GET /api/mcp-query</div>
                <div className="bg-purple-950/60 px-1 py-0.5 rounded border border-purple-500/10">{"{ tools: ['search_assets'] }"}</div>
              </div>
            </div>
          )
        };
      default:
        return {
          icon: <Code className="w-5 h-5 text-zinc-400" />,
          bgColor: 'bg-zinc-950/40 border-zinc-500/20',
          badgeColor: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20',
          visualPattern: <div className="absolute inset-0 bg-zinc-900"></div>
        };
    }
  };

  const config = getTypeConfig(asset.type);

  // Source badges styling
  const getSourceBadge = () => {
    switch (asset.source) {
      case 'openassets':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-600 text-white uppercase tracking-wide">
            Native
          </span>
        );
      case 'kenney':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-orange-600 text-white uppercase tracking-wide">
            Kenney.nl
          </span>
        );
      case 'threejs':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-600 text-white uppercase tracking-wide">
            Three.js Assets
          </span>
        );
    }
  };

  return (
    <motion.div
      id={`asset-card-${asset.id}`}
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick(asset)}
      className="group flex flex-col h-full bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl overflow-hidden cursor-pointer shadow-lg transition-colors"
    >
      {/* Thumbnail / Representation Header */}
      <div className="relative h-40 bg-slate-950 border-b border-slate-800 flex-shrink-0">
        {config.visualPattern}

        {/* Source Badge overlay */}
        <div className="absolute top-3 left-3 z-10">
          {getSourceBadge()}
        </div>

        {/* File size & format overlay */}
        <div className="absolute bottom-3 right-3 z-10 px-2 py-0.5 bg-slate-950/90 backdrop-blur-md rounded border border-slate-800 text-[10px] font-mono text-slate-400">
          {asset.fileFormat} • {asset.fileSize}
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title and Category */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-sm text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
            {asset.title}
          </h3>
          <div className="flex-shrink-0 mt-0.5">
            {config.icon}
          </div>
        </div>

        <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-2">
          {asset.category}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4 flex-grow">
          {asset.description}
        </p>

        {/* Engines and Tags */}
        <div className="space-y-3 pt-3 border-t border-slate-800/60 mt-auto">
          {/* Compatible Game Engines */}
          <div className="flex flex-wrap gap-1">
            {asset.engine.map((eng) => (
              <span
                key={eng}
                className="text-[10px] px-2 py-0.5 bg-slate-800 rounded text-[10px] text-slate-400 border border-slate-700 font-medium"
              >
                {eng}
              </span>
            ))}
          </div>

          {/* Footer Metadata (Downloads and Author) */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
            <span>By @{asset.author}</span>
            <span className="flex items-center gap-1">
              {asset.source === 'openassets' ? (
                <>
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  {asset.downloadsCount}
                </>
              ) : (
                <span className="flex items-center gap-0.5 text-slate-500 hover:text-cyan-400">
                  Ref URL
                  <ExternalLink className="w-3 h-3" />
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
