"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot, Send, X, Loader2, MessageCircle, User, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm SAM, your benefits assistant. I can help you learn about your coverage and answer questions. How can I help you today?",
    timestamp: new Date(),
  },
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [email, setEmail] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsVerifying(false)
    setIsVerified(true)
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content:
        "Based on your benefits package, I can help you with that. Would you like me to provide more specific details about your coverage options?",
      timestamp: new Date(),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full size-14 p-0 shadow-lg hover:scale-105 transition-transform z-50"
      >
        <MessageCircle className="size-6" />
      </Button>
    )
  }

  if (isMinimized) {
    return (
      <div
        className="fixed bottom-6 right-6 bg-card border border-border rounded-full shadow-lg cursor-pointer z-50 flex items-center gap-2 pl-4 pr-2 py-2 hover:bg-secondary transition-colors"
        onClick={() => setIsMinimized(false)}
      >
        <div className="size-8 rounded-full bg-primary flex items-center justify-center">
          <Bot className="size-4 text-primary-foreground" />
        </div>
        <span className="text-sm font-medium">SAM AI</span>
        <Button variant="ghost" size="icon" className="size-8" onClick={() => setIsOpen(false)}>
          <X className="size-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden">
      <div className="border-b border-border p-4 flex items-center justify-between bg-card">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary flex items-center justify-center">
            <Bot className="size-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">SAM AI</h3>
            <p className="text-xs text-muted-foreground">Benefits Assistant</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="size-8" onClick={() => setIsMinimized(true)}>
            <Minimize2 className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8" onClick={() => setIsOpen(false)}>
            <X className="size-4" />
          </Button>
        </div>
      </div>

      {!isVerified ? (
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <User className="size-7 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">Verify Your Identity</h3>
            <p className="text-sm text-muted-foreground">Enter your email or member ID to continue.</p>
          </div>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="widgetEmail">Email or Member ID</Label>
              <Input
                id="widgetEmail"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isVerifying}>
              {isVerifying ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </div>
      ) : (
        <>
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-2", message.role === "user" ? "justify-end" : "justify-start")}
              >
                {message.role === "assistant" && (
                  <div className="size-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Bot className="size-3.5 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-3 py-2",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-secondary-foreground rounded-bl-sm",
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="size-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Bot className="size-3.5 text-primary-foreground" />
                </div>
                <div className="bg-secondary rounded-2xl rounded-bl-sm px-3 py-2.5">
                  <div className="flex gap-1">
                    <span className="size-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="size-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="size-1.5 bg-muted-foreground rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t border-border p-3">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-input border-border text-sm"
              />
              <Button size="icon" onClick={handleSend} disabled={!input.trim() || isTyping}>
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
