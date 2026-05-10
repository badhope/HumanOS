export interface GenericReportResult {
  [key: string]: any
}

export interface RadarDataItem {
  dimension: string
  score: number
  fullMark: number
}

export interface ColorDimension {
  name: string
  score: number
  color: string
}

export interface AnimalInfo {
  type: string
  emoji: string
  desc?: string
  name?: string
}
