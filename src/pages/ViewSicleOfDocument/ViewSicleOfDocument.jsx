import React, { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

// Données dynamiques
const dynamicData = [
  {
    id: 15,
    file_id: 13,
    from_binder_id: 1,
    to_binder_id: 2,
    status_id: 2,
    remarks: "voluptate maxime impedit",
    transferred_at: "03:57:05",
    created_at: "03:57:05",
    binder_name: 'Facture',
    service: {
      id: 3,
      name: "Infomatique",
      company_id: 1,
      created_at: "2024-11-20T14:21:20.000000Z",
      updated_at: "2024-11-28T13:22:28.000000Z",
      deleted_at: null,
    },
    status: {
      id: 1,
      name: "pending",
      label_fr: "En attente",
      label_en: "pending",
      created_at: "2024-11-20T02:25:30.000000Z",
      updated_at: "2024-11-20T02:25:30.000000Z",
    },
  },
  {
    id: 13,
    file_id: 13,
    from_binder_id: null,
    to_binder_id: 1,
    status_id: 1,
    remarks: "Fichier créé",
    transferred_at: "03:43:47",
    binder_name: 'Desvis',
    created_at: "03:43:47",
    status: {
      id: 2,
      name: "approved",
      label_fr: "Validé",
      label_en: "approved",
      created_at: "2024-11-20T02:25:30.000000Z",
      updated_at: "2024-11-20T02:25:30.000000Z",
    },
    service: {
      id: 3,
      name: "Infomatique",
      company_id: 1,
      created_at: "2024-11-20T14:21:20.000000Z",
      updated_at: "2024-11-28T13:22:28.000000Z",
      deleted_at: null,
    },
  },
];

// Espacement constant entre les nœuds
const NODE_SPACING = 300; // Distance horizontale entre chaque nœud
const NODE_Y = 100; // Position verticale constante pour tous les nœuds
const FIRST_NODE_OFFSET = 50; // Espacement pour le premier nœud

// Génère des nœuds dynamiques avec positions calculées
const generateNodes = (data) =>
  data.map((item, index) => ({
    id: item.id.toString(), // Assurez-vous que l'ID est une chaîne de caractères
    position: { x: index === 0 ? FIRST_NODE_OFFSET : index * NODE_SPACING, y: NODE_Y }, // Applique un décalage pour le premier nœud
    data: { ...item },
    type: 'customNode',
  }));

// Génère des edges dynamiques
const generateEdges = (data) =>
  data.slice(0, -1).map((item, index) => ({
    id: `e${item.id}-${data[index + 1].id}`,
    source: item.id.toString(),
    target: data[index + 1].id.toString(),
  }));

// Composant pour un nœud personnalisé
const CustomNode = ({ data }) => {
  const statusColors = {
    pending: '#lightgrey',
    'in Progress': '#f7c948',
    completed: '#34c759',
    rejected: '#ff3b30',
  };

  return (
    <div
      style={{
        borderRadius: '5px',
        backgroundColor: '#0ba9f3',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        minWidth: '120px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          backgroundColor: '#fff',
          textAlign: 'center',
        }}
      >
        {data.service.name}
      </div>
      <div
        style={{
          margin: '3px 8px',
          color: '#fff',
          fontSize: '0.7em',
        }}
      >
        {data.binder_name}
      </div>
      <div
        style={{
          padding: '3px 8px',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <p
          style={{
            margin: 0,
            color: '#fff',
            fontSize: '0.7em',
            flex: 1,
          }}
        >
          {data.status.label_fr}
        </p>
        <div
          style={{
            width: '20px',
            background:
              data.status.name === 'pending'
                ? 'lightgrey'
                : data.status.name === 'rejected'
                ? 'red'
                : data.status.name === 'in Progress'
                ? 'f7c948'
                : '#34c759',
            borderRadius: 8,
          }}
        >
          {' '}
        </div>
      </div>
      <p
        style={{
          margin: '3px 8px',
          color: '#fff',
          fontSize: '0.7em',
        }}
      >
        {data.remarks}
      </p>
      <div
        style={{
          margin: '3px 8px',
          color: '#fff',
          fontSize: '0.7em',
        }}
      >
        {data.transferred_at}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default function DynamicFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(generateNodes(dynamicData));
  const [edges, setEdges, onEdgesChange] = useEdgesState(generateEdges(dynamicData));

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{ customNode: CustomNode }} // Enregistre le composant comme type de nœud
      />
    </div>
  );
}
