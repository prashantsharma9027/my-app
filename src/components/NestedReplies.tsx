'use client';

import { useState } from 'react';
import { ReplyNode } from './ReplyNode';

type Reply = {
  id: string;
  text: string;
  children: Reply[];
};

export function NestedReplies() {
  const [replies, setReplies] = useState<Reply[]>([
    {
      id: 'root',
      text: 'Initial Heading',
      children: [],
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const addReply = (parentId: string, text: string) => {
    const newReply = {
      id: Date.now().toString(),
      text,
      children: [],
    };

    setReplies(currentReplies => {
      const updateReplies = (items: Reply[]): Reply[] => {
        return items.map(item => {
          if (item.id === parentId) {
            return { ...item, children: [...item.children, newReply] };
          }
          if (item.children.length) {
            return { ...item, children: updateReplies(item.children) };
          }
          return item;
        });
      };

      return updateReplies(currentReplies);
    });

    setEditingId(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      {replies.map(reply => (
        <ReplyNode 
          key={reply.id}
          reply={reply}
          onAddReply={addReply}
          level={0}
          editingId={editingId}
          onStartEdit={setEditingId}
          onCancelEdit={() => setEditingId(null)}
        />
      ))}
    </div>
  );
} 