export interface Asset {
  id: string;
  title: string;
  description: string;
  type: '3d' | '2d' | 'shader' | 'script' | 'mcp';
  source: 'openassets' | 'kenney' | 'threejs';
  category: string;
  engine: string[];
  tags: string[];
  downloadsCount: number;
  author: string;
  createdAt: string;
  fileSize: string;
  fileFormat: string;
  thumbnailUrl?: string;
  content?: string;
  externalUrl?: string;
}

export type AssetTypeFilter = 'all' | '3d' | '2d' | 'shader' | 'script' | 'mcp';
export type AssetSourceFilter = 'all' | 'openassets' | 'kenney' | 'threejs';

export interface McpLog {
  id: string;
  timestamp: string;
  direction: 'request' | 'response';
  payload: any;
}
