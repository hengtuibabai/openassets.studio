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
          icon: <Box className="w-5 h-5 text-indigo-600" />,
          bgColor: 'bg-indigo-50 border-indigo-200',
          badgeColor: 'bg-indigo-50 text-indigo-600 border-indigo-100',
          visualPattern: (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
              <div className="relative w-16 h-16 border border-dashed border-indigo-300 rounded-lg rotate-12 flex items-center justify-center bg-white/80 shadow-xs animate-pulse">
                <Box className="w-8 h-8 text-indigo-500/80" />
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-indigo-500 rounded-full"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"></div>
              </div>
            </div>
          )
        };
      case '2d':
        return {
          icon: <Image className="w-5 h-5 text-brand-green" />,
          bgColor: 'bg-brand-green/5 border-brand-green/20',
          badgeColor: 'bg-brand-green/10 text-brand-green border-brand-green/20',
          visualPattern: (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center">
              <div className="relative w-20 h-20 border border-brand-green/20 rounded-md flex items-center justify-center bg-white/90 shadow-xs">
                <Image className="w-8 h-8 text-brand-green/70" />
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="border border-brand-green/5 rounded-[1px]"></div>
                  ))}
                </div>
              </div>
            </div>
          )
        };
      case 'shader':
        return {
          icon: <Cpu className="w-5 h-5 text-amber-600" />,
          bgColor: 'bg-amber-50 border-amber-200',
          badgeColor: 'bg-amber-50 text-amber-600 border-amber-100',
          visualPattern: (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white flex items-center justify-center overflow-hidden">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-200/40 to-orange-200/40 animate-spin blur-md" style={{ animationDuration: '8s' }}></div>
              <Cpu className="absolute w-8 h-8 text-amber-600/70" />
            </div>
          )
        };
      case 'script':
        return {
          icon: <Code className="w-5 h-5 text-brand-green" />,
          bgColor: 'bg-emerald-50 border-emerald-200',
          badgeColor: 'bg-emerald-50 text-brand-green border-emerald-100',
          visualPattern: (
            <div className="absolute inset-0 bg-slate-900 p-4 font-mono text-[9px] text-emerald-400 overflow-hidden select-none">
              <div className="border-b border-slate-800 pb-1 mb-2 flex items-center justify-between">
                <span className="text-emerald-400/80 font-semibold">{asset.fileFormat}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <pre className="leading-tight opacity-75">
                {`using UnityEngine;\n\npublic class Controller : MonoBehaviour {\n  void Update() {\n    float m = Input.GetAxis("Vertical");\n    transform.Translate(0, 0, m);\n  }\n}`}
              </pre>
            </div>
          )
        };
      case 'mcp':
        return {
          icon: <Terminal className="w-5 h-5 text-purple-600" />,
          bgColor: 'bg-purple-50 border-purple-200',
          badgeColor: 'bg-purple-50 text-purple-600 border-purple-100',
          visualPattern: (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white flex flex-col justify-center px-4 font-mono border-b border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                <span className="text-[10px] text-purple-600 font-bold uppercase tracking-wider">MCP Protocol</span>
              </div>
              <div className="text-[9px] text-purple-500/80 space-y-1">
                <div>GET /api/mcp-query</div>
                <div className="bg-purple-100/50 px-1 py-0.5 rounded border border-purple-200/50 text-purple-700">{"{ tools: ['search'] }"}</div>
              </div>
            </div>
          )
        };
      default:
        return {
          icon: <Code className="w-5 h-5 text-zinc-500" />,
          bgColor: 'bg-zinc-50 border-zinc-200',
          badgeColor: 'bg-zinc-50 text-zinc-600 border-zinc-100',
          visualPattern: <div className="absolute inset-0 bg-zinc-50"></div>
        };
    }
  };

  const config = getTypeConfig(asset.type);

  // Source badges styling
  const getSourceBadge = () => {
    switch (asset.source) {
      case 'openassets':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-brand-green text-white uppercase tracking-wide shadow-xs">
            Native
          </span>
        );
      case 'kenney':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-orange-600 text-white uppercase tracking-wide shadow-xs">
            Kenney.nl
          </span>
        );
      case 'threejs':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-600 text-white uppercase tracking-wide shadow-xs">
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
      className="group flex flex-col h-full bg-white border border-slate-200/80 hover:border-brand-green/60 rounded-xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-200"
    >
      {/* Thumbnail / Representation Header */}
      <div className="relative h-40 bg-slate-50 border-b border-slate-200/60 flex-shrink-0">
        {config.visualPattern}

        {/* Source Badge overlay */}
        <div className="absolute top-3 left-3 z-10">
          {getSourceBadge()}
        </div>

        {/* File size & format overlay */}
        <div className="absolute bottom-3 right-3 z-10 px-2 py-0.5 bg-slate-900/90 backdrop-blur-md rounded border border-slate-800 text-[10px] font-mono text-slate-100">
          {asset.fileFormat} • {asset.fileSize}
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title and Category */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-sm text-slate-800 group-hover:text-brand-green transition-colors line-clamp-1">
            {asset.title}
          </h3>
          <div className="flex-shrink-0 mt-0.5">
            {config.icon}
          </div>
        </div>

        <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-2">
          {asset.category}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-grow">
          {asset.description}
        </p>

        {/* Engines and Tags */}
        <div className="space-y-3 pt-3 border-t border-slate-100 mt-auto">
          {/* Compatible Game Engines */}
          <div className="flex flex-wrap gap-1">
            {asset.engine.map((eng) => (
              <span
                key={eng}
                className="text-[10px] px-2 py-0.5 bg-slate-50 rounded text-[10px] text-slate-500 border border-slate-200/60 font-medium"
              >
                {eng}
              </span>
            ))}
          </div>

          {/* Footer Metadata (Downloads and Author) */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
            <span>By @{asset.author}</span>
            <span className="flex items-center gap-1">
              {asset.source === 'openassets' ? (
                <>
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  {asset.downloadsCount}
                </>
              ) : (
                <span className="flex items-center gap-0.5 text-slate-400 hover:text-brand-green">
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
