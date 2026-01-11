"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { processInstagramData, getChatResponse } from "../actions";
import {
  Send,
  Loader2,
  Sparkles,
  MessageCircle,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [instagramId, setInstagramId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInstagramConnect = async () => {
    if (!instagramId) return;
    setProcessing(true);
    try {
      const result = await processInstagramData(instagramId);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `${result.message} You can now ask specific questions about your content!`,
        },
      ]);
      setIsConnected(true);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was an error processing your Instagram data.",
        },
      ]);
      setErrorMessage("Failed to process Instagram data. Please try again.");
      setTimeout(() => setErrorMessage(""), 5000);
    }
    setProcessing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await getChatResponse(userMessage);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.response },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error processing your request.",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">SocialSpark Chat</span>
              </div>
            </div>
            {isConnected && (
              <div className="flex items-center space-x-2 text-sm text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>Social Media Connected</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {!isConnected ? (
          // Instagram Connection UI
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-4">
                Connect Your Social Media
              </h1>
              <p className="text-slate-300 text-lg">
                Connect your social media accounts to get personalized AI
                insights about your content and audience across platforms
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg px-4 py-3 mb-6">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="instagram-handle"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Social Media Handle
                  </label>
                  <Input
                    id="instagram-handle"
                    placeholder="@yourusername or profile URL"
                    value={instagramId}
                    onChange={(e) => setInstagramId(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 h-12 text-lg"
                  />
                </div>

                <Button
                  onClick={handleInstagramConnect}
                  disabled={processing || !instagramId}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 h-12 text-lg"
                >
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Connect Account
                    </>
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-slate-900 px-4 text-slate-400">or</span>
                  </div>
                </div>

                <Button
                  onClick={() => setIsConnected(true)}
                  variant="outline"
                  className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 h-12 text-lg"
                >
                  Continue without connecting
                </Button>
              </div>

              <div className="mt-8 p-4 bg-slate-800/50 rounded-xl">
                <h3 className="font-semibold text-white mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                  What you'll get:
                </h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Personalized content recommendations</li>
                  <li>• Audience engagement insights</li>
                  <li>• Optimal posting time suggestions</li>
                  <li>• Cross-platform hashtag optimization</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          // Chat Interface
          <div className="grid lg:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                  Suggested Questions
                </h3>
                <div className="space-y-2">
                  {[
                    "Analyze my recent posts",
                    "What's my best performing content?",
                    "When should I post for maximum engagement?",
                    "Suggest hashtags for my niche",
                    "How can I improve my social media strategy?",
                  ].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(suggestion)}
                      className="w-full text-left text-sm text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-2">Chat Tips</h3>
                <p className="text-sm text-slate-300">
                  Ask specific questions about your content strategy, audience,
                  or engagement across different social media platforms to get
                  the most helpful insights.
                </p>
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-3 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col">
              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {messages.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                        <MessageCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Start a conversation
                      </h3>
                      <p className="text-slate-400">
                        Ask me anything about your Instagram content and
                        strategy!
                      </p>
                    </div>
                  )}

                  {messages.map((message, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div className="flex items-start space-x-3 max-w-[80%]">
                        {message.role === "assistant" && (
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.role === "user"
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                              : "bg-slate-800 text-slate-100"
                          }`}
                        >
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeSanitize, rehypeHighlight]}
                            className="prose prose-invert prose-sm max-w-none"
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-slate-800 rounded-2xl px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                            <span className="text-slate-300">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Form */}
              <div className="border-t border-slate-800 p-6">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about social media content..."
                    className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 h-12"
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 h-12 px-6"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </form>
                <p className="text-xs text-slate-500 mt-2">
                  Press Enter to send • AI responses may take a moment
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
