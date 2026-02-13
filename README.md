# YouTube Trending Videos Dashboard

A modern YouTube analytics dashboard that uses AI to help you discover and analyze trending tech videos. Ask questions in natural language and get real-time data visualized through interactive components.

## Features

### 🤖 AI-Powered Chat Interface
- **Natural Language Queries**: Ask questions like "Show me trending AI tutorials" or "What are the most popular React videos this week?"
- **Generative UI**: AI dynamically renders components (VideoGrid, Graphs, DataCards) based on your query
- **Real-Time Search**: Get instant results from YouTube's API with AI-powered filtering

### 📊 Data Visualization
- **Video Grid**: Responsive 4-column layout displaying trending videos with thumbnails, views, and metadata
- **Interactive Charts**: Bar, line, and pie charts for visualizing video performance metrics
- **Data Cards**: Summary views of key insights and statistics

### 🎯 YouTube Integration
- **Trending Videos**: Fetch real-time trending videos from YouTube API
- **Category Filtering**: Filter by categories like AI & ML, React, JavaScript, Web Dev, Tech Careers, and Open Source
- **Video Details**: Get comprehensive video information including views, likes, duration, and quality scores
- **Fallback to Mock Data**: If YouTube API quota is exceeded, automatically use curated mock data

### 🚀 Performance Features
- **Dual-Layer Caching**: Client-side (localStorage) and server-side (in-memory) caching to minimize API calls
- **Error Handling**: Graceful fallback mechanisms for API failures
- **Search & Filter**: Client-side search functionality for quick video discovery

## Tech Stack

- **Next.js 15**: React framework for server-side rendering
- **Tambo AI**: Generative UI agent for interactive components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Data visualization library
- **YouTube Data API v3**: For fetching video data

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- YouTube API Key (get one from [Google Cloud Console](https://console.cloud.google.com/))
- Tambo API Key (get one from [Tambo Dashboard](https://tambo.co/dashboard))

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd youtube-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Rename `example.env.local` to `.env.local`
   - Add your YouTube API key: `NEXT_PUBLIC_YOUTUBE_API_KEY=your-api-key`
   - Add your Tambo API key: `NEXT_PUBLIC_TAMBO_API_KEY=your-api-key`

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the application**:
   Navigate to `http://localhost:3000` in your browser

## Project Structure

```
src/
├── app/
│   ├── page.tsx                # Main dashboard page with TamboProvider
│   ├── layout.tsx              # Root HTML layout
│   ├── api/
│   │   └── youtube/trending/
│   │       └── route.ts        # REST endpoint for fetching trending videos
│   └── globals.css             # Global styles
├── components/
│   ├── tambo/                  # AI-renderable components and chat UI
│   │   ├── graph.tsx          # Recharts visualization component
│   │   ├── message.tsx        # Chat message display
│   │   └── message-thread-full.tsx # Full thread container
│   ├── VideoCard.tsx          # Single video card component
│   ├── VideoGridSkeleton.tsx  # Responsive grid of video cards
│   ├── VideoDescription.tsx   # Video metadata display
│   ├── ChatSidebar.tsx        # Right sidebar chat interface
│   ├── CategoryPills.tsx      # Category filter buttons
│   └── ApiKeyCheck.tsx        # API key validation UI
├── lib/
│   ├── tambo.ts              # Component and tool registration
│   ├── thread-hooks.ts       # Thread management hooks
│   └── utils.ts              # Utility functions
├── services/
│   ├── youtube-data.ts       # YouTube API integration with caching
│   ├── mock-trending-data.ts # Fallback mock data
│   └── types.ts              # TypeScript definitions
└── public/                   # Static assets
```

## Usage Examples

### Asking for Trending Videos
- "Show me trending AI tutorials from the last week"
- "What are the most popular React videos with over 100K views?"
- "Find JavaScript tutorials about web development"

### Getting Analytics
- "How many views do the top AI videos have?"
- "Show me the distribution of views across categories"
- "What's the average duration of trending videos?"

### Video Performance
- "Which videos have the highest quality scores?"
- "Show me the most popular videos by watch time"
- "What's the trend score for React tutorials?"

## Architecture

The application follows a modern generative UI architecture:

1. **User Input**: You ask a question in the chat sidebar
2. **AI Processing**: Tambo AI analyzes the query and determines the best tools to use
3. **Data Fetching**: Relevant tools are called to fetch data from YouTube API
4. **Component Rendering**: AI dynamically selects and renders the appropriate components
5. **Result Display**: The AI streams the response with rendered components

For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Customization

### Adding New Components
Components are registered in `src/lib/tambo.ts`. Each component has:
- `name`: Display name for the AI
- `description`: What the component does (used for AI reasoning)
- `component`: React component to render
- `propsSchema`: Zod schema for validating props

### Adding New Tools
Tools are also registered in `src/lib/tambo.ts`. A tool has:
- `name`: Display name
- `description`: What the tool does
- `tool`: Function that executes the tool
- `inputSchema`: Expected input parameters
- `outputSchema`: Output data structure

### Customizing Categories
Modify `CATEGORY_QUERIES` in `src/services/youtube-data.ts` to add or update video categories.

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Run tests (`npm run test`)
5. Commit your changes (`git commit -m 'Add my feature'`)
6. Push to the branch (`git push origin feature/my-feature`)
7. Open a pull request

## License

This project is open source and available under the [MIT License](./LICENSE).

## Acknowledgments

- **Tambo AI**: For the generative UI framework
- **YouTube Data API**: For providing video data
- **Recharts**: For data visualization components
