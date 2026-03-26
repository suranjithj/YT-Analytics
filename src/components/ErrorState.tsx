'use client';

import { AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';

interface Props {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: Props) {
  const isApiKey = message.includes('API key') || message.includes('not configured');
  const isQuota = message.includes('quota');
  const isNotFound = message.includes('not found') || message.includes('No channel');

  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/05 p-8 text-center">
      <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-5 h-5 text-red-400" />
      </div>

      <h3 className="text-base font-medium text-white mb-2">
        {isApiKey
          ? 'API Key Required'
          : isQuota
          ? 'API Quota Exceeded'
          : isNotFound
          ? 'Channel Not Found'
          : 'Something went wrong'}
      </h3>

      <p className="text-sm text-[#71717a] mb-6 max-w-md mx-auto leading-relaxed">{message}</p>

      {isApiKey && (
        <div className="mb-6 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-left max-w-md mx-auto">
          <p className="text-xs font-medium text-[#a1a1aa] mb-2">How to get a YouTube API key:</p>
          <ol className="text-xs text-[#71717a] space-y-1 list-decimal list-inside">
            <li>Go to Google Cloud Console</li>
            <li>Create or select a project</li>
            <li>Enable YouTube Data API v3</li>
            <li>Create credentials → API Key</li>
            <li>Add to <code className="text-[#f97316]">.env.local</code> as <code className="text-[#f97316]">YOUTUBE_API_KEY</code></li>
          </ol>
          <a
            href="https://console.cloud.google.com/apis/credentials"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-1.5 text-xs text-[#f97316] hover:underline"
          >
            Open Google Cloud Console <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.10] text-sm text-white hover:bg-white/[0.10] transition-colors mx-auto"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Try again
      </button>
    </div>
  );
}