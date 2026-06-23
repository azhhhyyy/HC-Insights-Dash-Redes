import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { AiPresetQuestions } from "./AiPresetQuestions";
import { cn } from "../ui/utils";

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
};

export function AiChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: 'Hello! I am your HealthCompiler AI assistant. How can I help you analyze your data today?'
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          id: (Date.now() + 1).toString(), 
          role: 'ai', 
          content: 'I have analyzed your request. Based on the current view, we are seeing a 15% increase in utilization gaps this quarter. Would you like me to generate a detailed report?' 
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePresetClick = (question: string) => {
    setInput(question);
  };

  return (
    <div className="flex flex-col h-full bg-muted/10">
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn("flex gap-3 text-sm", msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
            >
              <div className={cn(
                "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full shadow-sm",
                msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card border'
              )}>
                {msg.role === 'user' ? <User className="size-4" /> : <Bot className="size-4 text-primary" />}
              </div>
              <div
                className={cn(
                  "flex flex-col gap-2 px-3.5 py-2.5 max-w-[78%] leading-relaxed shadow-sm",
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-sm'
                    : 'bg-card border rounded-2xl rounded-tl-sm'
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex gap-3 text-sm flex-row">
               <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full shadow-sm bg-card border">
                 <Bot className="size-4 text-primary" />
               </div>
               <div className="flex items-center gap-2 px-4 py-3 bg-card border rounded-2xl rounded-tl-sm shadow-sm">
                 <Loader2 className="size-4 animate-spin text-muted-foreground" />
               </div>
             </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t bg-card">
        <AiPresetQuestions onSelect={handlePresetClick} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex w-full items-center gap-2 mt-3 relative"
        >
          <Input
            type="text"
            placeholder="Ask AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 pr-10 shadow-sm rounded-full bg-muted/30 focus-visible:ring-1 focus-visible:bg-background transition-colors"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isTyping || !input.trim()}
            className="absolute right-1 size-8 rounded-full shadow-sm transition-transform active:scale-95"
          >
            <Send className="size-3.5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
