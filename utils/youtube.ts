export function extractPlaylistId(url: string): string | null {
  try {
    const urlObj = new URL(url)

    if (urlObj.hostname.includes('youtube.com')) {
      const listParam = urlObj.searchParams.get('list')
      if (listParam) return listParam
    }

    const playlistIdMatch = url.match(/[?&]list=([^&]+)/)
    if (playlistIdMatch) return playlistIdMatch[1]

    return null
  } catch {
    return null
  }
}

export function parseDuration(isoDuration: string): number {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0

  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  const seconds = parseInt(match[3] || '0')

  return hours * 3600 + minutes * 60 + seconds
}

export function formatDuration(totalSeconds: number) {
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}
