"use client";

import ChatSidebar from "@/components/ChatSidebar";
import TrendingTechVideos from "@/components/TrendingTechVideos";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import { TamboProvider, useTambo } from "@tambo-ai/react";

function ContentArea() {
  const { thread } = useTambo();

  // Get the latest assistant message with a rendered component
  const latestComponent = thread?.messages
    .filter(msg => msg.role === "assistant" && msg.renderedComponent)
    .map(msg => msg.renderedComponent)
    .pop();

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-scroll-y" data-canvas-space="true">
      <main className="flex-1 overflow-auto">
        <div className="bg-white m-6 rounded-lg shadow-sm border border-gray-200">
          {latestComponent || <TrendingTechVideos />}
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  const mcpServers = useMcpServers();

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
      mcpServers={mcpServers}
    >
      <div className="h-svh bg-gray-50 flex">
        <ContentArea />
        <ChatSidebar />
      </div>
    </TamboProvider>
  );
}