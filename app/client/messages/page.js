"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Send, MessageSquare } from "lucide-react"

export default function ClientMessages() {
  const { toast } = useToast()
  const [messageText, setMessageText] = useState("")

  // Simulated data - in a real app, this would come from an API
  const [conversations] = useState([
    {
      id: 1,
      with: "Service Client",
      lastMessage: "Votre demande de crédit a été reçue et est en cours d'analyse.",
      date: "2023-05-10T14:30:00",
      unread: false,
    },
    {
      id: 2,
      with: "Conseiller Jean Martin",
      lastMessage: "Bonjour, j'ai besoin de quelques informations supplémentaires concernant votre demande de crédit.",
      date: "2023-05-09T10:15:00",
      unread: true,
    },
  ])

  const [selectedConversation, setSelectedConversation] = useState(null)

  // Simulated messages for each conversation
  const [messages] = useState({
    1: [
      {
        id: 1,
        sender: "system",
        text: "Bienvenue dans le service client. Comment pouvons-nous vous aider ?",
        timestamp: "2023-05-10T10:00:00",
      },
      {
        id: 2,
        sender: "client",
        text: "Bonjour, je voudrais savoir où en est ma demande de crédit.",
        timestamp: "2023-05-10T10:05:00",
      },
      {
        id: 3,
        sender: "system",
        text: "Votre demande de crédit a été reçue et est en cours d'analyse. Un conseiller vous contactera prochainement.",
        timestamp: "2023-05-10T10:10:00",
      },
    ],
    2: [
      {
        id: 1,
        sender: "banker",
        text: "Bonjour, je suis Jean Martin, votre conseiller pour votre demande de crédit.",
        timestamp: "2023-05-09T09:00:00",
      },
      {
        id: 2,
        sender: "client",
        text: "Bonjour, merci de me contacter.",
        timestamp: "2023-05-09T09:05:00",
      },
      {
        id: 3,
        sender: "banker",
        text: "J'ai besoin de quelques informations supplémentaires concernant votre demande de crédit. Pourriez-vous me fournir votre dernier relevé de compte ?",
        timestamp: "2023-05-09T09:10:00",
      },
    ],
  })

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return

    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé.",
    })

    setMessageText("")
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500">Communiquez avec votre conseiller</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`cursor-pointer rounded-md p-3 transition-colors ${
                      selectedConversation === conversation.id ? "bg-blue-100" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <MessageSquare className="mr-2 h-5 w-5 text-blue-600" />
                        <span className="font-medium">{conversation.with}</span>
                      </div>
                      <span className="text-xs text-gray-500">{new Date(conversation.date).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-1 truncate text-sm text-gray-600">{conversation.lastMessage}</p>
                    {conversation.unread && (
                      <div className="mt-1 flex justify-end">
                        <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">Nouveau</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>
                {selectedConversation
                  ? conversations.find((c) => c.id === selectedConversation)?.with
                  : "Sélectionnez une conversation"}
              </CardTitle>
              {selectedConversation && (
                <CardDescription>
                  Conversation démarrée le{" "}
                  {new Date(conversations.find((c) => c.id === selectedConversation)?.date).toLocaleDateString()}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="flex-grow">
              {selectedConversation ? (
                <div className="flex h-full flex-col">
                  <div className="flex-grow space-y-4 overflow-y-auto rounded-md border p-4">
                    {messages[selectedConversation]?.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "client" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "client"
                              ? "bg-blue-600 text-white"
                              : message.sender === "banker"
                                ? "bg-gray-200 text-gray-800"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className="mt-1 text-xs opacity-70">{formatDate(message.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center space-x-2">
                    <Textarea
                      placeholder="Écrivez votre message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <Button onClick={handleSendMessage} className="h-full">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-500">Sélectionnez une conversation pour afficher les messages</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
