"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Bot,
  Send,
  Gift,
  MessageCircle,
  User,
  FileText,
  LogOut,
  X,
  Minimize2,
  CheckCircle2,
  Calendar,
  DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SamLogo } from "@/components/sam-logo"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Program {
  id: string
  name: string
  description: string
  documentCount: number
  coverage: string
  enrollmentDate: string
  annualLimit: string
  highlights: string[]
}

const programs: Program[] = [
  {
    id: "1",
    name: "Lowes",
    description: "Exclusive discounts and benefits at Lowes home improvement stores for members and their families.",
    documentCount: 12,
    coverage: "Retail Partner",
    enrollmentDate: "January 1, 2024",
    annualLimit: "Unlimited savings",
    highlights: [
      "10% off all purchases",
      "Free delivery on orders over $50",
      "Exclusive member-only sales access",
      "Extended return policy for members",
    ],
  },
  {
    id: "2",
    name: "Home Depot",
    description: "Special pricing and perks at Home Depot locations with access to a nationwide network of stores.",
    documentCount: 8,
    coverage: "Retail Partner",
    enrollmentDate: "January 1, 2024",
    annualLimit: "Unlimited savings",
    highlights: [
      "Pro Xtra member benefits",
      "Volume pricing discounts",
      "Free tool rental days",
      "Priority contractor services",
    ],
  },
  {
    id: "3",
    name: "800-Flowers",
    description: "Exclusive discounts on flowers, gifts, and gourmet treats for all occasions.",
    documentCount: 15,
    coverage: "Gift Services",
    enrollmentDate: "January 1, 2024",
    annualLimit: "Unlimited orders",
    highlights: [
      "20% off all flower arrangements",
      "Free shipping on select items",
      "Exclusive holiday collections",
      "Birthday reminder service included",
    ],
  },
  {
    id: "4",
    name: "Avis Car Rental",
    description: "Discounted car rentals and upgrades at Avis locations nationwide for business and leisure travel.",
    documentCount: 6,
    coverage: "Travel Partner",
    enrollmentDate: "Immediate eligibility",
    annualLimit: "Unlimited rentals",
    highlights: [
      "Up to 25% off base rates",
      "Free vehicle upgrades when available",
      "Skip the counter with Avis Preferred",
      "No young driver fees for members",
    ],
  },
  {
    id: "5",
    name: "AMC Movie Ticket",
    description: "Discounted movie tickets and concessions at AMC Theatres locations for members and their families.",
    documentCount: 9,
    coverage: "Entertainment Partner",
    enrollmentDate: "January 1, 2024",
    annualLimit: "Unlimited tickets",
    highlights: [
      "Up to 40% off ticket prices",
      "Discounted concession combos",
      "Early access to blockbuster screenings",
      "Free popcorn on Tuesdays",
    ],
  },
]

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm SAM, your Smart Association Management assistant. I can help you learn about your benefit, answer questions about coverage, and guide you through enrollment. How can I assist you today?",
    timestamp: new Date(),
  },
]

export default function MemberDashboardPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isChatMinimized, setIsChatMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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

    const responses: Record<string, string> = {
      dental:
        "Great question! Your dental plan covers preventive care at 100%, basic procedures at 80%, and major procedures at 50%. The annual maximum is $2,000 per person. Would you like me to explain any specific coverage in more detail?",
      vision:
        "Your vision benefits include an annual eye exam covered at 100%, plus an allowance of $150 for frames and $150 for contact lenses. You can use providers in our nationwide network for the best rates.",
      life: "Your life insurance benefit provides coverage up to 2x your annual salary. You can also add supplemental coverage for yourself and your dependents at competitive group rates.",
      retirement:
        "Your retirement benefits include a 401(k) plan with employer matching up to 6% of your salary. We also offer financial planning consultations to help you maximize your retirement savings.",
      mental:
        "Your mental health benefits cover therapy sessions, counseling, and access to our Employee Assistance Program (EAP). You have 12 free counseling sessions per year, plus unlimited access to our mental wellness app.",
      default:
        "I'd be happy to help you with that. Based on the information in our knowledge base, I can provide details about your specific benefits. Could you tell me more about what you're looking for?",
    }

    const lowerInput = input.toLowerCase()
    let responseContent = responses.default
    if (lowerInput.includes("lowes")) responseContent = responses.dental
    if (lowerInput.includes("home depot")) responseContent = responses.vision
    if (lowerInput.includes("800-flowers") || lowerInput.includes("insurance")) responseContent = responses.life
    if (lowerInput.includes("avis") || lowerInput.includes("401")) responseContent = responses.retirement
    if (lowerInput.includes("amc") || lowerInput.includes("therapy") || lowerInput.includes("counsel"))
      responseContent = responses.mental

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseContent,
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <SamLogo size="sm" animated={false} />
            <Badge variant="secondary">AAP (American Pediatrics Association)</Badge>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="size-4" />
              <span>john.doe@email.com</span>
            </div>
            <Link href="/member-portal">
              <Button variant="ghost" size="sm">
                <LogOut className="size-4 mr-2" />
                Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John - AAP (American Pediatrics Association)</h1>
          <p className="text-muted-foreground mb-3">
            Explore your benefit below. Have questions? Click the chat icon to talk with SAM AI.
          </p>
          <p className="text-sm text-muted-foreground/80">
            The American Academy of Pediatrics (AAP) is committed to providing comprehensive benefits that support your
            health, wellness, and financial security. As a valued member, you have access to a wide range of programs
            designed to meet your needs.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Gift className="size-5 text-primary" />
            Your Benefits
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Card
              key={program.id}
              className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => setSelectedProgram(program)}
            >
              <CardHeader>
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Gift className="size-5 text-primary" />
                </div>
                <CardTitle>{program.name}</CardTitle>
                <CardDescription className="line-clamp-3">{program.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="size-4" />
                  <span>{program.documentCount} documents</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedProgram} onOpenChange={(open) => !open && setSelectedProgram(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Gift className="size-6 text-primary" />
            </div>
            <DialogTitle className="text-xl">{selectedProgram?.name}</DialogTitle>
            <DialogDescription>{selectedProgram?.description}</DialogDescription>
          </DialogHeader>

          {selectedProgram && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-md bg-secondary flex items-center justify-center shrink-0">
                    <FileText className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Coverage Type</p>
                    <p className="text-sm font-medium">{selectedProgram.coverage}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-md bg-secondary flex items-center justify-center shrink-0">
                    <Calendar className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Enrollment Date</p>
                    <p className="text-sm font-medium">{selectedProgram.enrollmentDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 col-span-2">
                  <div className="size-8 rounded-md bg-secondary flex items-center justify-center shrink-0">
                    <DollarSign className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Annual Limit</p>
                    <p className="text-sm font-medium">{selectedProgram.annualLimit}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3">Plan Highlights</h4>
                <ul className="space-y-2">
                  {selectedProgram.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
                <FileText className="size-4" />
                <span>{selectedProgram.documentCount} documents available</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {!isChatOpen ? (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 rounded-full size-14 p-0 shadow-lg hover:scale-105 transition-transform z-50"
        >
          <MessageCircle className="size-6" />
        </Button>
      ) : isChatMinimized ? (
        <div
          className="fixed bottom-6 right-6 bg-card border border-border rounded-full shadow-lg cursor-pointer z-50 flex items-center gap-2 pl-4 pr-2 py-2 hover:bg-secondary transition-colors"
          onClick={() => setIsChatMinimized(false)}
        >
          <div className="size-8 rounded-full bg-primary flex items-center justify-center">
            <Bot className="size-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium">SAM AI</span>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={(e) => {
              e.stopPropagation()
              setIsChatOpen(false)
            }}
          >
            <X className="size-4" />
          </Button>
        </div>
      ) : (
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
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setIsChatMinimized(true)}>
                <Minimize2 className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="size-8" onClick={() => setIsChatOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>
          </div>

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
                placeholder="Ask about your benefits..."
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
        </div>
      )}
    </div>
  )
}
