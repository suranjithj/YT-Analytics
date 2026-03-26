import type { NextRequest } from 'next/server';
import { resolveChannelId, fetchChannelInfo, fetchChannelVideos } from '@/lib/youtube';
import type { AnalysisResult } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const channelInput = searchParams.get('channel');
    const max = parseInt(searchParams.get('max') || '50', 10);

    if (!channelInput) {
      return new Response(JSON.stringify({ error: 'Missing channel parameter' }), { status: 400 });
    }

    const channelId = await resolveChannelId(channelInput);
    const channelInfo = await fetchChannelInfo(channelId);
    const videos = await fetchChannelVideos(channelId, max);

    const result: AnalysisResult = {
      channel: channelInfo,
      videos,
      fetchedAt: new Date().toISOString(),
      totalVideosAnalyzed: videos.length,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}