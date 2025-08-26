'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ChatConversation {
  id: string;
  clientName: string;
  clientAvatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: 'online' | 'offline';
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'booking';
}

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');

  // Mock conversations data
  const conversations: ChatConversation[] = [
    {
      id: '1',
      clientName: 'María González',
      clientAvatar: 'MG',
      lastMessage: '¿Tienes disponibilidad mañana por la tarde?',
      timestamp: '10:30 AM',
      unreadCount: 2,
      status: 'online'
    },
    {
      id: '2',
      clientName: 'Carmen Rodríguez',
      clientAvatar: 'CR',
      lastMessage: '¡Gracias! El servicio estuvo increíble',
      timestamp: 'Ayer',
      unreadCount: 0,
      status: 'offline'
    },
    {
      id: '3',
      clientName: 'Ana Pérez',
      clientAvatar: 'AP',
      lastMessage: 'Perfecto, confirmo la cita para el viernes',
      timestamp: 'Ayer',
      unreadCount: 1,
      status: 'online'
    },
    {
      id: '4',
      clientName: 'Sofía Martínez',
      clientAvatar: 'SM',
      lastMessage: '¿Qué productos utilizas para el tratamiento facial?',
      timestamp: '2 días',
      unreadCount: 0,
      status: 'offline'
    }
  ];

  // Mock messages for selected conversation
  const messages: Message[] = [
    {
      id: '1',
      senderId: 'client',
      senderName: 'María González',
      content: 'Hola! Me gustaría reservar una cita para manicure',
      timestamp: '10:15 AM',
      type: 'text'
    },
    {
      id: '2',
      senderId: 'vendor',
      senderName: 'Tú',
      content: '¡Hola María! Claro, con mucho gusto. ¿Qué día te viene mejor?',
      timestamp: '10:17 AM',
      type: 'text'
    },
    {
      id: '3',
      senderId: 'client',
      senderName: 'María González',
      content: '¿Tienes disponibilidad mañana por la tarde?',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: '4',
      senderId: 'client',
      senderName: 'María González',
      content: 'Prefiero después de las 3:00 PM',
      timestamp: '10:31 AM',
      type: 'text'
    }
  ];

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // Here you would send the message via Supabase
    console.log('Sending message:', messageInput);
    setMessageInput('');
  };

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="p-6">
      <div className="flex h-[calc(100vh-8rem)] bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Conversations Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-femfuel-black">
              Mensajes
            </h2>
            <p className="text-sm text-gray-600">
              {conversations.filter(c => c.unreadCount > 0).length} conversaciones sin leer
            </p>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 cursor-pointer transition-colors border-b border-gray-100 hover:bg-gray-50 ${
                  selectedConversation === conversation.id ? 'bg-femfuel-pink bg-opacity-10' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="h-12 w-12 bg-femfuel-pink rounded-full flex items-center justify-center text-white font-medium">
                      {conversation.clientAvatar}
                    </div>
                    {conversation.status === 'online' && (
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {conversation.clientName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {conversation.timestamp}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-femfuel-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversationData ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-femfuel-pink rounded-full flex items-center justify-center text-white font-medium">
                      {selectedConversationData.clientAvatar}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {selectedConversationData.clientName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {selectedConversationData.status === 'online' ? '🟢 En línea' : '⚪ Desconectado'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      📞 Llamar
                    </Button>
                    <Button size="sm" variant="outline">
                      📅 Agendar
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'vendor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === 'vendor'
                          ? 'bg-femfuel-pink text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.senderId === 'vendor' ? 'text-pink-100' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <Button size="sm" variant="outline">
                    📎
                  </Button>
                  <div className="flex-1">
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Escribe un mensaje..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                  </div>
                  <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                    Enviar
                  </Button>
                </div>

                {/* Quick Responses */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    '¡Hola! ¿Cómo puedo ayudarte?',
                    'Perfecto, confirmo tu cita',
                    '¿Te viene bien mañana?',
                    'Gracias por elegirme 💕'
                  ].map((quickResponse, index) => (
                    <button
                      key={index}
                      onClick={() => setMessageInput(quickResponse)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                    >
                      {quickResponse}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Selecciona una conversación
                </h3>
                <p className="text-gray-600">
                  Elige un cliente para comenzar a chatear
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-femfuel-pink">
              {conversations.filter(c => c.unreadCount > 0).length}
            </div>
            <p className="text-sm text-gray-600">Mensajes sin leer</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {conversations.filter(c => c.status === 'online').length}
            </div>
            <p className="text-sm text-gray-600">Clientes en línea</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              15 min
            </div>
            <p className="text-sm text-gray-600">Tiempo promedio de respuesta</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}