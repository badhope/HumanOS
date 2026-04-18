// =============================================================================
//  后端 API 客户端封装
// =============================================================================
import axios, { AxiosInstance, AxiosResponse } from 'axios'

// =============================================================================
//  配置
// =============================================================================
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const USE_BACKEND_CALCULATION = import.meta.env.VITE_USE_BACKEND_CALCULATION === 'true'

// =============================================================================
//  类型定义
// =============================================================================
export interface CalculationRequest {
  answers: Record<string, number>
  user_id?: number
  session_id?: string
  include_norm?: boolean
  include_interpretation?: boolean
  language?: string
}

export interface DimensionScore {
  id: string
  name: string
  raw_score: number
  percentile?: number
  stanine?: number
  level: string
  interpretation?: string
  z_score?: number
  t_score?: number
}

export interface CalculationResponse {
  assessment_id: string
  assessment_name: string
  overall_score?: number
  overall_percentile?: number
  dimensions: DimensionScore[]
  type_profile?: Record<string, any>
  interpretation?: Record<string, any>
  career_suggestions?: string[]
  development_advice?: string[]
  strengths?: string[]
  blind_spots?: string[]
  norm_comparison?: Record<string, any>
  result_id?: number
  share_token?: string
  calculated_at: string
  version: string
  source?: 'frontend' | 'backend'
  latency?: number
}

export interface AssessmentInfo {
  id: string
  name: string
  category: string
  description: string
  question_count: number
  estimated_time_minutes: number
  reliability?: number
  sample_size?: number
  dimensions: { id: string; name: string }[]
}

export interface ApiConfig {
  baseURL: string
  useBackend: boolean
  timeout: number
}

// =============================================================================
//  API 客户端类
// =============================================================================
class AssessmentApiClient {
  private client: AxiosInstance
  private config: ApiConfig
  private token: string | null = null

  constructor() {
    this.config = {
      baseURL: API_BASE_URL,
      useBackend: USE_BACKEND_CALCULATION,
      timeout: 30000,
    }

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this._setupInterceptors()
  }

  private _setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('[API Error]', error.response?.data || error.message)
        return Promise.reject(error)
      }
    )
  }

  setToken(token: string) {
    this.token = token
  }

  clearToken() {
    this.token = null
  }

  isBackendEnabled(): boolean {
    return this.config.useBackend
  }

  toggleBackend(enabled: boolean) {
    this.config.useBackend = enabled
  }

  getConfig(): ApiConfig {
    return { ...this.config }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.get('/health')
      return response.data.status === 'healthy'
    } catch {
      return false
    }
  }

  async getAssessmentList(): Promise<AssessmentInfo[]> {
    const response = await this.client.get('/api/v1/assessment/list')
    return response.data
  }

  async calculateAssessment(
    assessmentId: string,
    request: CalculationRequest
  ): Promise<CalculationResponse> {
    const response = await this.client.post<
      CalculationRequest,
      AxiosResponse<CalculationResponse>
    >(`/api/v1/assessment/calculate/${assessmentId}`, request)
    return response.data
  }

  async getResultByToken(shareToken: string): Promise<CalculationResponse> {
    const response = await this.client.get(`/api/v1/assessment/result/${shareToken}`)
    return response.data
  }

  async getUserHistory(userId: number): Promise<any[]> {
    const response = await this.client.get(`/api/v1/assessment/history/${userId}`)
    return response.data
  }

  async login(username: string, password: string): Promise<{ access_token: string }> {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    const response = await this.client.post('/api/v1/auth/login', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  }

  async register(username: string, password: string, email?: string): Promise<any> {
    const response = await this.client.post('/api/v1/auth/register', {
      username,
      password,
      email,
    })
    return response.data
  }

  async getCurrentUser(): Promise<any> {
    const response = await this.client.get('/api/v1/auth/me')
    return response.data
  }
}

export const apiClient = new AssessmentApiClient()

export default apiClient
