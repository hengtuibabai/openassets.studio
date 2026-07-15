import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to asset database file
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'assets.json');

// Interface defining asset structure
interface Asset {
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

// Initial seed assets
const SEED_ASSETS: Asset[] = [
  {
    id: 'native-dungeon-hero',
    title: 'Low-Poly Dungeon Hero',
    description: 'A beautifully animated low-poly warrior character complete with animations for running, attacking, and idle states.',
    type: '3d',
    source: 'openassets',
    category: 'Characters',
    engine: ['Unity', 'Godot', 'Unreal Engine', 'Three.js'],
    tags: ['low-poly', 'character', 'warrior', 'animated', 'rpg'],
    downloadsCount: 245,
    author: 'AlexPixel',
    createdAt: '2026-07-10T12:00:00Z',
    fileSize: '1.2 MB',
    fileFormat: '.gltf',
    content: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf'
  },
  {
    id: 'native-water-shader',
    title: 'Stylized Water Shader',
    description: 'An optimized water shader with depth fading, foam lines, and vertex wave displacement. Works great for mobile and low-poly styles.',
    type: 'shader',
    source: 'openassets',
    category: 'Shaders',
    engine: ['Unity', 'Godot', 'Three.js'],
    tags: ['water', 'stylized', 'foam', 'waves', 'toon', 'hlsl'],
    downloadsCount: 412,
    author: 'ShaderChef',
    createdAt: '2026-07-12T15:30:00Z',
    fileSize: '45 KB',
    fileFormat: '.hlsl',
    content: `// Stylized Water Shader (HLSL for Unity URP)
Shader "Custom/StylizedWater" {
    Properties {
        _ShallowColor ("Shallow Water Color", Color) = (0.0, 0.7, 0.8, 1.0)
        _DeepColor ("Deep Water Color", Color) = (0.0, 0.1, 0.3, 1.0)
        _WaveSpeed ("Wave Speed", Vector) = (1.0, 1.0, 0, 0)
        _WaveScale ("Wave Scale", Float) = 0.5
        _FoamThreshold ("Foam Threshold", Float) = 0.25
    }
    SubShader {
        Tags { "RenderType"="Transparent" "Queue"="Transparent" }
        Pass {
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/DeclareDepthTexture.hlsl"

            struct Attributes {
                float4 positionOS   : POSITION;
                float2 uv           : TEXCOORD0;
            };

            struct Varyings {
                float4 positionCS   : SV_POSITION;
                float2 uv           : TEXCOORD0;
                float4 screenPos    : TEXCOORD1;
            };

            float4 _ShallowColor;
            float4 _DeepColor;
            float4 _WaveSpeed;
            float _WaveScale;
            float _FoamThreshold;

            Varyings vert(Attributes input) {
                Varyings output;
                float3 positionWS = TransformObjectToWorld(input.positionOS.xyz);
                // Vertex offset for waves
                float wave = sin(positionWS.x * _WaveScale + _Time.y * _WaveSpeed.x) * cos(positionWS.z * _WaveScale + _Time.y * _WaveSpeed.y);
                positionWS.y += wave * 0.1;
                output.positionCS = TransformWorldToHClip(positionWS);
                output.uv = input.uv;
                output.screenPos = ComputeScreenPos(output.positionCS);
                return output;
            }

            float4 frag(Varyings input) : SV_Target {
                // Calculate scene depth for water depth fading and foam lines
                float2 screenUV = input.screenPos.xy / input.screenPos.w;
                float depth = SampleSceneDepth(screenUV);
                float linearDepth = LinearEyeDepth(depth, _ZBufferParams);
                float waterDepth = linearDepth - input.screenPos.w;
                
                float fade = saturate(waterDepth * 0.5);
                float4 waterColor = lerp(_ShallowColor, _DeepColor, fade);
                
                // Foam line near intersections
                float foam = step(waterDepth, _FoamThreshold) * saturate(sin(_Time.y * 5.0) * 0.5 + 0.5);
                waterColor.rgb += foam * float3(1,1,1);
                
                return waterColor;
            }
            ENDHLSL
        }
    }
}`
  },
  {
    id: 'native-tp-controller',
    title: 'Retro Third-Person Controller',
    description: 'A simple, lightweight C# script for Unity to handle retro-style third-person movement with Rigidbody dynamics. Perfect for adventure and platformer games.',
    type: 'script',
    source: 'openassets',
    category: 'Scripts',
    engine: ['Unity'],
    tags: ['csharp', 'unity', 'movement', 'third-person', 'rigidbody', 'physics'],
    downloadsCount: 512,
    author: 'CodeAdventurer',
    createdAt: '2026-07-08T09:15:00Z',
    fileSize: '12 KB',
    fileFormat: '.cs',
    content: `using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class ThirdPersonController : MonoBehaviour
{
    [Header("Movement")]
    public float moveSpeed = 7f;
    public float rotationSpeed = 10f;
    public float jumpForce = 5f;
    
    [Header("Grounding")]
    public Transform groundCheck;
    public float groundDistance = 0.4f;
    public LayerMask groundMask;

    private Rigidbody rb;
    private Vector3 moveDirection;
    private bool isGrounded;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
        rb.freezeRotation = true;
    }

    void Update()
    {
        // Check grounding
        isGrounded = Physics.CheckSphere(groundCheck.position, groundDistance, groundMask);

        // Input
        float x = Input.GetAxisRaw("Horizontal");
        float z = Input.GetAxisRaw("Vertical");

        // Camera relative direction
        Vector3 forward = Camera.main.transform.forward;
        Vector3 right = Camera.main.transform.right;
        forward.y = 0f;
        right.y = 0f;
        forward.Normalize();
        right.Normalize();

        moveDirection = (forward * z + right * x).normalized;

        // Jump
        if (Input.GetButtonDown("Jump") && isGrounded)
        {
            rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
        }
    }

    void FixedUpdate()
    {
        // Move character
        if (moveDirection.magnitude > 0.1f)
        {
            rb.MovePosition(rb.position + moveDirection * moveSpeed * Time.fixedDeltaTime);
            
            // Rotate towards movement
            Quaternion targetRotation = Quaternion.LookRotation(moveDirection);
            transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, rotationSpeed * Time.fixedDeltaTime);
        }
    }
}`
  },
  {
    id: 'native-scifi-hover',
    title: 'Sci-Fi Hover Vehicle',
    description: 'A highly optimized futuristic hovercraft model styled in low-poly cyber aesthetic. Fits perfectly into sci-fi racers or ambient hovercraft games.',
    type: '3d',
    source: 'openassets',
    category: 'Vehicles',
    engine: ['Unity', 'Godot', 'Three.js', 'Unreal Engine'],
    tags: ['sci-fi', 'hovercraft', 'vehicle', 'low-poly', 'cyberpunk', 'gltf'],
    downloadsCount: 189,
    author: 'NetRunner',
    createdAt: '2026-07-05T18:45:00Z',
    fileSize: '2.4 MB',
    fileFormat: '.gltf',
    content: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf'
  },
  {
    id: 'mcp-openassets-config',
    title: 'openassets.studio MCP Connection Template',
    description: 'Standard Model Context Protocol (MCP) server integration template for connecting Cursor, Claude Desktop, or your game engine\'s AI assistant directly to openassets.studio APIs to search, download, and paste assets.',
    type: 'mcp',
    source: 'openassets',
    category: 'MCP Configurations',
    engine: ['Cursor', 'Claude Desktop', 'Custom Agent'],
    tags: ['mcp', 'protocol', 'json', 'ai-integration', 'tooling'],
    downloadsCount: 728,
    author: 'OpenAssets Core',
    createdAt: '2026-07-14T10:00:00Z',
    fileSize: '1.5 KB',
    fileFormat: '.json',
    content: `{
  "mcpServers": {
    "openassets-studio": {
      "command": "npx",
      "args": ["-y", "@openassets/mcp-gateway-cli", "--server-url", "https://openassets.studio"],
      "env": {
        "OPENASSETS_API_KEY": "your_api_key_here"
      },
      "disabled": false
    }
  },
  "tools": [
    {
      "name": "search_assets",
      "description": "Fetch and search game-ready assets, shaders, or controller scripts from openassets.studio",
      "parameters": {
        "query": "string",
        "type": "string (optional: 3d, 2d, shader, script)"
      }
    },
    {
      "name": "get_code_asset",
      "description": "Download shader or script code from openassets.studio straight to your codebase",
      "parameters": {
        "assetId": "string"
      }
    }
  ]
}`
  },
  {
    id: 'kenney-space-kit',
    title: 'Space Kit (Kenney)',
    description: 'Over 150 low-poly 3D models for space station exploration and lunar base layouts. Includes modular corridors, spacecraft components, base structures, solar panels, and astronaut gear.',
    type: '3d',
    source: 'kenney',
    category: 'Modular Kits',
    engine: ['Unity', 'Godot', 'Unreal Engine', 'Three.js'],
    tags: ['space', 'sci-fi', 'modular', 'kit', 'gltf', 'kenney', 'low-poly'],
    downloadsCount: 4520,
    author: 'Kenney',
    createdAt: '2024-01-01T00:00:00Z',
    fileSize: '12 MB',
    fileFormat: '.gltf',
    externalUrl: 'https://kenney.nl/assets/space-kit'
  },
  {
    id: 'kenney-scribble-platformer',
    title: 'Scribble Platformer (Kenney)',
    description: 'A beautifully hand-drawn 2D asset pack. Over 200 platformer tiles, interactive items, animated characters, traps, hazard objects, and matching doodle UI elements.',
    type: '2d',
    source: 'kenney',
    category: 'Pixel & Handdrawn',
    engine: ['Unity', 'Godot', 'Unreal Engine', 'Construct'],
    tags: ['2d', 'hand-drawn', 'scribble', 'platformer', 'spritesheet', 'kenney', 'doodle'],
    downloadsCount: 3120,
    author: 'Kenney',
    createdAt: '2024-01-01T00:00:00Z',
    fileSize: '4.5 MB',
    fileFormat: '.png',
    externalUrl: 'https://kenney.nl/assets/scribble-platformer'
  },
  {
    id: 'kenney-tiny-dungeon',
    title: 'Tiny Dungeon (Kenney)',
    description: 'A complete 16x16 pixel-art classic dungeon tileset. Includes over 100 tiles for brick walls, wooden floors, stone arches, chests, key items, animated enemies, and hero classes.',
    type: '2d',
    source: 'kenney',
    category: 'Pixel & Handdrawn',
    engine: ['Unity', 'Godot', 'RPG Maker'],
    tags: ['pixel-art', '16x16', 'dungeon', 'tileset', 'rpg', 'kenney', 'retro'],
    downloadsCount: 8900,
    author: 'Kenney',
    createdAt: '2024-01-01T00:00:00Z',
    fileSize: '1.2 MB',
    fileFormat: '.png',
    externalUrl: 'https://kenney.nl/assets/tiny-dungeon'
  },
  {
    id: 'kenney-nature-kit',
    title: 'Nature Kit (Kenney)',
    description: 'An expansive collection of low-poly modular 3D models for creating organic nature scenes. Contains over 180 models including fir trees, blossoming bushes, boulders, logs, and water stream panels.',
    type: '3d',
    source: 'kenney',
    category: 'Environments',
    engine: ['Unity', 'Godot', 'Unreal Engine', 'Three.js'],
    tags: ['nature', 'forest', 'low-poly', 'terrain', 'modular', 'kenney', 'outdoor'],
    downloadsCount: 5670,
    author: 'Kenney',
    createdAt: '2024-01-01T00:00:00Z',
    fileSize: '8.5 MB',
    fileFormat: '.gltf',
    externalUrl: 'https://kenney.nl/assets/nature-kit'
  },
  {
    id: 'threejs-starfield',
    title: 'Procedural Starfield Scene',
    description: 'A highly performant procedural starfield script utilizing custom vertex and fragment shaders with ThreeJS Particle Systems. Renders an immersive, infinitely wrapping deep-space cosmos.',
    type: 'shader',
    source: 'threejs',
    category: 'Environments',
    engine: ['Three.js', 'WebXR'],
    tags: ['threejs', 'starfield', 'procedural', 'particles', 'galaxy', 'webgl'],
    downloadsCount: 1450,
    author: 'ThreeJSAssets',
    createdAt: '2025-05-10T00:00:00Z',
    fileSize: '8 KB',
    fileFormat: '.js',
    externalUrl: 'https://threejsassets.com'
  },
  {
    id: 'threejs-sedan-model',
    title: 'Low-Poly Sedan GLTF Model',
    description: 'A beautifully balanced low-poly standard sedan car model. Standard UV layout, lightweight vertices, rigged wheels, and ready to deploy in any Three.js WebGL scene container.',
    type: '3d',
    source: 'threejs',
    category: 'Vehicles',
    engine: ['Three.js', 'Godot', 'Unity'],
    tags: ['threejs', 'car', 'sedan', 'vehicle', 'low-poly', 'gltf', 'webgl'],
    downloadsCount: 1980,
    author: 'ThreeJSAssets',
    createdAt: '2025-08-20T00:00:00Z',
    fileSize: '720 KB',
    fileFormat: '.gltf',
    externalUrl: 'https://threejsassets.com'
  }
];

// Ensure database directory and file exist
function initDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(SEED_ASSETS, null, 2), 'utf-8');
    console.log('Database initialized with seed game assets.');
  }
}

initDatabase();

// Load assets from file helper
function getAssets(): Asset[] {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading assets database:', error);
  }
  return SEED_ASSETS;
}

// Save assets to file helper
function saveAssets(assets: Asset[]) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(assets, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving assets database:', error);
  }
}

// REST API endpoint: GET all assets (with search and filtering)
app.get('/api/assets', (req: Request, res: Response) => {
  const { query, type, source, engine } = req.query;
  let list = getAssets();

  // Filter by Type
  if (type && type !== 'all') {
    list = list.filter(item => item.type === type);
  }

  // Filter by Source
  if (source && source !== 'all') {
    list = list.filter(item => item.source === source);
  }

  // Filter by Engine
  if (engine && engine !== 'all') {
    list = list.filter(item => item.engine.some(eng => eng.toLowerCase() === (engine as string).toLowerCase()));
  }

  // Filter by Search text (checks title, description, tags, author, category)
  if (query) {
    const q = (query as string).toLowerCase().trim();
    list = list.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  res.json(list);
});

// REST API endpoint: POST upload a new asset
app.post('/api/assets/upload', (req: Request, res: Response) => {
  const { title, description, type, category, engine, tags, fileSize, fileFormat, content, author } = req.body;

  if (!title || !description || !type || !category) {
    res.status(400).json({ error: 'Missing required asset fields (title, description, type, category)' });
    return;
  }

  const assets = getAssets();
  const newAsset: Asset = {
    id: `native-${Date.now()}`,
    title,
    description,
    type,
    source: 'openassets',
    category,
    engine: Array.isArray(engine) ? engine : ['General'],
    tags: Array.isArray(tags) ? tags : [type],
    downloadsCount: 0,
    author: author || 'Anonymous Developer',
    createdAt: new Date().toISOString(),
    fileSize: fileSize || '10 KB',
    fileFormat: fileFormat || (type === 'script' ? '.js' : type === 'shader' ? '.glsl' : '.json'),
    content: content || '// Uploaded asset content placeholder'
  };

  assets.unshift(newAsset);
  saveAssets(assets);
  res.status(201).json(newAsset);
});

// REST API endpoint: PUT co-maintain (edit) an asset
app.put('/api/assets/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, category, engine, tags, content } = req.body;

  const assets = getAssets();
  const index = assets.findIndex(item => item.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Asset not found' });
    return;
  }

  // Only allow updating openassets native assets to prevent breaking original seeded records easily, 
  // but let them update tags/description to co-maintain
  const updatedAsset = {
    ...assets[index],
    title: title || assets[index].title,
    description: description || assets[index].description,
    category: category || assets[index].category,
    engine: Array.isArray(engine) ? engine : assets[index].engine,
    tags: Array.isArray(tags) ? tags : assets[index].tags,
    content: content !== undefined ? content : assets[index].content,
    createdAt: new Date().toISOString() // update active modification time
  };

  assets[index] = updatedAsset;
  saveAssets(assets);
  res.json(updatedAsset);
});

// REST API endpoint: POST increment download counter
app.post('/api/assets/:id/download', (req: Request, res: Response) => {
  const { id } = req.params;
  const assets = getAssets();
  const index = assets.findIndex(item => item.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Asset not found' });
    return;
  }

  assets[index].downloadsCount += 1;
  saveAssets(assets);
  res.json({ success: true, downloadsCount: assets[index].downloadsCount });
});

// Model Context Protocol (MCP) HTTP Endpoint
// Supporting dynamic model-to-server asset fetching with MCP JSON-RPC 2.0 standards
app.post('/api/mcp', (req: Request, res: Response) => {
  const { jsonrpc, method, params, id } = req.body;

  if (jsonrpc !== '2.0') {
    res.status(400).json({
      jsonrpc: '2.0',
      error: { code: -32600, message: 'Invalid Request: Must be JSON-RPC 2.0' },
      id: id || null
    });
    return;
  }

  // MCP Method: tools/list
  if (method === 'tools/list') {
    res.json({
      jsonrpc: '2.0',
      id,
      result: {
        tools: [
          {
            name: 'search_assets',
            description: 'Search openassets.studio for modular game assets, shaders, code snippets, or models.',
            inputSchema: {
              type: 'object',
              properties: {
                query: { type: 'string', description: 'Keywords to match title, tags, or description' },
                type: { type: 'string', description: 'Optional asset filter: 3d, 2d, shader, script, mcp' }
              }
            }
          },
          {
            name: 'get_asset_details',
            description: 'Retrieve full details, code content, engine compatibility, and specs of a specific asset by ID.',
            inputSchema: {
              type: 'object',
              properties: {
                id: { type: 'string', description: 'The unique asset identifier (e.g., native-water-shader)' }
              },
              required: ['id']
            }
          }
        ]
      }
    });
    return;
  }

  // MCP Method: tools/call
  if (method === 'tools/call') {
    const { name, arguments: args } = params || {};

    if (name === 'search_assets') {
      const { query = '', type } = args || {};
      let list = getAssets();

      if (type && type !== 'all') {
        list = list.filter(item => item.type === type);
      }

      if (query) {
        const q = String(query).toLowerCase().trim();
        list = list.filter(item => 
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some(t => t.toLowerCase().includes(q))
        );
      }

      // Format as beautiful markdown/text return to LLM Client
      const textResult = list.map(item => {
        return `[ID: ${item.id}] "${item.title}" (${item.fileFormat}) by ${item.author}
Type: ${item.type} | Category: ${item.category} | FileSize: ${item.fileSize}
Description: ${item.description}
Engine Compatibility: ${item.engine.join(', ')}
${item.externalUrl ? `External URL: ${item.externalUrl}` : 'Download available natively.'}
`;
      }).join('\n---\n\n') || 'No assets found matching the query.';

      res.json({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: `### openassets.studio - Query Results (Found ${list.length})\n\n${textResult}`
            }
          ]
        }
      });
      return;
    }

    if (name === 'get_asset_details') {
      const { id: assetId } = args || {};
      const assets = getAssets();
      const asset = assets.find(item => item.id === assetId);

      if (!asset) {
        res.json({
          jsonrpc: '2.0',
          id,
          result: {
            isError: true,
            content: [
              {
                type: 'text',
                text: `Error: Asset with ID "${assetId}" was not found.`
              }
            ]
          }
        });
        return;
      }

      // Format complete details and raw code/content for model injection
      let textContent = `### ${asset.title}
- **ID**: ${asset.id}
- **Type**: ${asset.type}
- **Author**: ${asset.author}
- **File Format**: ${asset.fileFormat}
- **File Size**: ${asset.fileSize}
- **Description**: ${asset.description}
- **Engine Compatibility**: ${asset.engine.join(', ')}
`;

      if (asset.content) {
        textContent += `\n**Source Code / Asset Payload**:\n\`\`\`${asset.fileFormat.replace('.', '') || 'text'}\n${asset.content}\n\`\`\``;
      } else if (asset.externalUrl) {
        textContent += `\n**Official External Resource**: Download or view at ${asset.externalUrl}`;
      }

      res.json({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: textContent
            }
          ]
        }
      });
      return;
    }

    res.status(404).json({
      jsonrpc: '2.0',
      error: { code: -32601, message: `Method not found: ${name}` },
      id
    });
    return;
  }

  res.status(404).json({
    jsonrpc: '2.0',
    error: { code: -32601, message: 'Method not found' },
    id
  });
});

// Fast endpoint for simple client integration tests
app.get('/api/mcp-query', (req: Request, res: Response) => {
  res.json({
    serverName: 'openassets.studio-mcp-gateway',
    protocolVersion: '2024-11-05',
    availableTools: ['search_assets', 'get_asset_details'],
    endpoint: '/api/mcp'
  });
});

// Configure Vite or Static Assets handling
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite developer server middleware mounted.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static server mounted.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`openassets.studio running on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Error starting server:', err);
});
