import { useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import nodes from './message.json';
import edges from './message.json'

function PaperNodes({ data }: { data: { title: string; publisher: string } }) {
  const truncateTitle = (title: string, maxLength: number = 30) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  };

  return (
    <div style={{ padding: 10, border: '1px solid #777', borderRadius: 5, marginBottom: 10 }}>
      <Handle type="target" position={Position.Left} />
      <div>{truncateTitle(data.title)}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default PaperNodes;