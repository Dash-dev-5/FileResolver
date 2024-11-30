import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  return (
    <div
      style={{
        borderRadius: '5px',
        backgroundColor: '#0ba9f3',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        minWidth: '120px',
        maxWidth :'200px',
        overflow: 'hidden',
      }}
    >
      <div style={{ backgroundColor: '#fff', textAlign: 'center',fontSize: '0.8em' }}>
        {data.service?.name || 'Inconnu'}
      </div>
      <div style={{ margin: '3px 8px', color: '#fff', fontSize: '0.7em' }}>
        {data.binder_name || 'Aucun'}
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
        <p style={{ margin: 0, color: '#fff', fontSize: '0.7em', flex: 1 }}>
          {data.status?.label_fr || 'En attente'}
        </p>
        <div
          style={{
            width: '20px',
            background:
              data.status?.name === 'pending'
                ? 'lightgrey'
                : data.status?.name === 'rejected'
                ? 'red'
                : data.status?.name === 'in Progress'
                ? '#f7c948'
                : '#34c759',
            borderRadius: 8,
          }}
        ></div>
      </div>
      <div style={{ padding: '3px 8px',margin: '2px', color: '#0ba9f3', fontSize: '0.7em',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        borderRadius:4
        
       }}>
        {data.remarks || ''}
      </div>
      <div style={{ margin: '3px 8px', color: '#fff', fontSize: '0.7em' }}>
        {data.transferred_at || ''}
      </div>
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
    </div>
  );
};

export default function DynamicFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [tabs, setTabs] = useState([]); // État pour stocker les transferts
  const classeurs = useSelector((state) => state.classeurs) || [];
  const services = useSelector((state) => state.services) || [];
  const location = useLocation();
  const { item } = location.state || {}; // Accès aux données via React Router
  const navigation = useNavigate()
  useLayoutEffect(() => {
      if (!item) {
        navigation(-1)
    }
  }
    ,[])

  useEffect(() => {
    if (!item || !item.transfers) return;

    const tab = item.transfers.map((transfer) => {
      let relatedClasseur = null;
      let relatedService = null;

      if (!transfer.from_binder_id) {
        return {
          ...transfer,
          binder_name: 'Upload',
          classeur: { name: 'upload' },
          service: { id: null, name: 'Secretariat' },
        };
      }

      relatedClasseur = classeurs.find(
        (classeur) => classeur.id === transfer.from_binder_id
      );
      if (relatedClasseur) {
        relatedService = services.find(
          (service) => service.id === relatedClasseur.service_id
        );
      }

      return {
        ...transfer,
        binder_name: relatedClasseur?.name || null,
        classeur: relatedClasseur || {},
        service: relatedService || {},
      };
    });
   const relatedClasseurEnd = classeurs.find(
        (classeur) => classeur.id === item.binder_id
      );
    tab.push( {
       ...item,
       remarks:'En cours de traitement',
       transferred_at : "Aujourd'hui...",
       classeur: relatedClasseurEnd,
       binder_name: relatedClasseurEnd.name
      },)
    setTabs(tab);
  }, [item, classeurs, services]);

  useEffect(() => {
    if (tabs.length) {
      setNodes(generateNodes(tabs));
      setEdges(generateEdges(tabs));
    }
  }, [tabs]);

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
        nodeTypes={{ customNode: CustomNode }}
      />
    </div>
  );
}
