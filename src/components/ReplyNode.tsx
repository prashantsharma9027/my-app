import { useState } from 'react';

type Reply = {
  id: string;
  text: string;
  children: Reply[];
};

type Props = {
  reply: Reply;
  onAddReply: (parentId: string, text: string) => void;
  level: number;
  editingId: string | null;
  onStartEdit: (id: string) => void;
  onCancelEdit: () => void;
};

export function ReplyNode({ 
  reply, 
  onAddReply, 
  level,
  editingId,
  onStartEdit,
  onCancelEdit,
}: Props) {
  const [text, setText] = useState('');
  const isEditing = editingId === reply.id;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddReply(reply.id, text.trim());
      setText('');
    }
  };

  return (
    <div style={{ 
      marginLeft: level * 20 + 'px',
      borderLeft: level ? '2px solid #ccc' : 'none',
      padding: '10px'
    }}>
      <div>
        <h3>{reply.text}</h3>
        
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Type your reply..."
              style={{ display: 'block', marginBottom: '10px' }}
            />
            <button type="submit">Add</button>
            <button type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          </form>
        ) : (
          <button onClick={() => onStartEdit(reply.id)}>
            Reply
          </button>
        )}
      </div>

      <div style={{ marginTop: '10px' }}>
        {reply.children.map(child => (
          <ReplyNode
            key={child.id}
            reply={child}
            onAddReply={onAddReply}
            level={level + 1}
            editingId={editingId}
            onStartEdit={onStartEdit}
            onCancelEdit={onCancelEdit}
          />
        ))}
      </div>
    </div>
  );
} 