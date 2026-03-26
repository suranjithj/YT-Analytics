# VidMetrics — YouTube Competitor Intelligence

> Paste any YouTube channel URL → get instant competitor video performance insights.

Built as a demo MVP for the VidMetrics challenge. Ships a polished, client-ready SaaS interface in a single Next.js 14 app.

---

## ✨ Features

- **Channel URL parsing** — handles `/channel/UC...`, `/@handle`, `/c/name`, `/user/name`, bare handles
- **Video metrics** — views, likes, comments, engagement rate, duration, published date
- **Performance score** — composite 0–100 score (views 50% + likes 30% + engagement 20%)
- **Trending badges** — top 20% by views get a 🔥 HOT badge
- **Filter by period** — All time / This month / Last 7d / Last 30d / Last 90d
- **Sort by** — Views, Likes, Comments, Engagement, Score, Date
- **Search** — filter by title, description, or tags
- **Grid & List views**
- **4 performance charts** — Views, Engagement, Views vs Engagement scatter, Upload timeline
- **Channel insights** — best upload day, average video length, top tag
- **Export to CSV** — all filtered results
- **Responsive** — works on mobile, tablet, and desktop

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd vidmetrics
npm install
```

### 2. Get a YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a project → **Enable** YouTube Data API v3
3. Create credentials → **API Key**

### 3. Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
YOUTUBE_API_KEY=YOUR_KEY_HERE
```

### 4. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🏗 Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | Server API routes + React frontend in one deploy |
| Styling | Tailwind CSS | Fast, consistent, responsive |
| Charts | Recharts | Lightweight, composable React charts |
| Data | YouTube Data API v3 | Official, reliable, free tier generous |
| Date utils | date-fns | Lightweight, tree-shakeable |
| Icons | Lucide React | Crisp, consistent icon set |
| Deploy | Vercel | Zero-config, edge-optimized |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens, animations, scrollbar
│   ├── layout.tsx           # Root layout + metadata
│   ├── page.tsx             # Main page (hero → results)
│   └── api/analyze/
│       └── route.ts         # GET /api/analyze?channel=...
│
├── lib/
│   ├── types.ts             # All TypeScript interfaces
│   ├── youtube.ts           # YouTube API calls + URL parsing + formatters
│   ├── filters.ts           # Client-side sort/filter logic + chart data builder
│   └── export.ts            # CSV export
│
└── components/
    ├── ChannelSearch.tsx    # URL input form
    ├── ChannelHeader.tsx    # Channel avatar + stats
    ├── StatsOverview.tsx    # 6-card metric summary
    ├── FilterBar.tsx        # Period / sort / search / trending controls
    ├── VideoGrid.tsx        # Grid + list view toggle
    ├── VideoCard.tsx        # Individual video tile
    ├── PerformanceChart.tsx # 4-tab Recharts panel + insight cards
    ├── LoadingState.tsx     # Animated skeleton + progress bar
    ├── ErrorState.tsx       # Contextual error messages
    └── EmptyState.tsx       # Empty filter result state
```

---

## 🌐 Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Set `YOUTUBE_API_KEY` in your Vercel project's **Environment Variables** dashboard.

---

## 📊 YouTube API Quota

The YouTube Data API v3 has a **10,000 unit/day** free quota. This app uses:

| Operation | Units | Per analysis |
|---|---|---|
| Channel search/resolve | 100 | 100 |
| Channel details | 1 | 1 |
| Playlist items (50 videos) | 1 | 1 |
| Video details batch (50) | 1 | 1 |
| **Total** | | **~103 units** |

You can comfortably run **~95 channel analyses per day** on the free tier.

---

## 🧠 Build Notes

**AI tools used:** Claude (architecture + code generation), Cursor (inline edits)

**Time to build:** ~4 hours from blank project to deployed MVP

**Key decisions:**
- Server-side YouTube API calls keep the API key safe and allow response caching
- Performance score formula is transparent and tunable — not a black box
- Chart library (Recharts) chosen over D3 for speed; no custom SVG needed at MVP stage
- `date-fns` over `moment` — smaller bundle, tree-shakeable
- No database — all state is ephemeral per session; adds a deploy-anywhere simplicity

**What I'd add with more time:**
- Competitor comparison side-by-side (2–3 channels at once)
- Historical tracking with Postgres + cron jobs
- AI-generated "why is this video winning?" summaries using Claude API
- OAuth login so users can save analyses
- Thumbnail A/B trend analysis (title length vs views correlation)

---

## License

MIT