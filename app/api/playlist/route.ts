import { NextRequest, NextResponse } from 'next/server'
import { extractPlaylistId, parseDuration, formatDuration } from '@/utils/youtube'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

export async function POST(request: NextRequest) {
  try {
    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE') {
      return NextResponse.json(
        { error: 'YouTube API key is not configured. Please add your API key to the .env file.' },
        { status: 500 }
      )
    }

    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'Playlist URL is required' },
        { status: 400 }
      )
    }

    const playlistId = extractPlaylistId(url)
    if (!playlistId) {
      return NextResponse.json(
        { error: 'Invalid YouTube playlist URL' },
        { status: 400 }
      )
    }

    const playlistInfo = await fetchPlaylistInfo(playlistId)
    const videoIds = await fetchAllVideoIds(playlistId)

    if (videoIds.length === 0) {
      return NextResponse.json(
        { error: 'No videos found in playlist or playlist is private' },
        { status: 404 }
      )
    }

    const totalSeconds = await calculateTotalDuration(videoIds)
    const duration = formatDuration(totalSeconds)

    return NextResponse.json({
      playlistId,
      title: playlistInfo.title,
      thumbnail: playlistInfo.thumbnail,
      videoCount: videoIds.length,
      totalSeconds,
      duration,
    })
  } catch (error: any) {
    console.error('Error processing playlist:', error)

    if (error.message?.includes('quota')) {
      return NextResponse.json(
        { error: 'YouTube API quota exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process playlist. Please check the URL and try again.' },
      { status: 500 }
    )
  }
}

async function fetchPlaylistInfo(playlistId: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${YOUTUBE_API_KEY}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch playlist info')
  }

  const data = await response.json()

  if (!data.items || data.items.length === 0) {
    throw new Error('Playlist not found')
  }

  const playlist = data.items[0]
  return {
    title: playlist.snippet.title,
    thumbnail: playlist.snippet.thumbnails.high?.url || playlist.snippet.thumbnails.default?.url,
  }
}

async function fetchAllVideoIds(playlistId: string): Promise<string[]> {
  const videoIds: string[] = []
  let pageToken: string | undefined

  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playlistId}&maxResults=50&key=${YOUTUBE_API_KEY}${
      pageToken ? `&pageToken=${pageToken}` : ''
    }`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to fetch playlist items')
    }

    const data = await response.json()

    if (data.items) {
      videoIds.push(
        ...data.items.map((item: any) => item.contentDetails.videoId)
      )
    }

    pageToken = data.nextPageToken
  } while (pageToken)

  return videoIds
}

async function calculateTotalDuration(videoIds: string[]): Promise<number> {
  let totalSeconds = 0

  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50)
    const ids = batch.join(',')

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${YOUTUBE_API_KEY}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch video details')
    }

    const data = await response.json()

    if (data.items) {
      for (const video of data.items) {
        const duration = parseDuration(video.contentDetails.duration)
        totalSeconds += duration
      }
    }
  }

  return totalSeconds
}
