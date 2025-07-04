import React from 'react';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { ThreadMessage } from '../../models/Forum';
import { formatDateTime } from '../../services/chatService';

export const ThreadMessageItem: React.FC<{ message: ThreadMessage, currentUserId : number }> = ({ message, currentUserId }) => (
  <div className="flex gap-4">
    <Avatar>
      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
        {message?.author?.initials || '?'}
      </AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <p className="font-medium">  {message.author.id === currentUserId ? 'את/ה' : message.author.name}</p>
        <span className="text-xs text-gray-500">{formatDateTime(message.time)}</span>
      </div>
      <div className="p-3 bg-gray-50 rounded-lg">
        <p>{message.content}</p>
      </div>
    </div>
  </div>
);