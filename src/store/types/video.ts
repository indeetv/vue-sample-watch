export interface ScreeningDetails {
  screener_key: string
  expired: boolean
  max_views: number
  views_consumed: number
  start_date: number
  expiry_date: number
  offline: boolean
}

export interface AuthDetails {
  mode: string
  ident: {
    country_code: number
    phone: number
  }
}

export interface OverlayDetails {
  text: string
  opacity: number
  position: string
  interval_in_seconds: number
  image_link: string
}

export interface ResumeDetails {
  from_second?: number
}

export interface VideoEntity {
  key: string
  name: string
  poster: string
  duration_in_sec: number
  cast_and_crew: any[]
  description: string
  subtitles: any[]
  is_cmaf_enabled: boolean
  season: any
  episode: any
  original_air_date: any
  screening_details: ScreeningDetails
  auth_details: AuthDetails
  overlay_watermark_details: OverlayDetails
  resume_playback: ResumeDetails
}