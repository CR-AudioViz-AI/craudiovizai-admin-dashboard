// Javari SDK Client - Universal Integration
// Provides real-time monitoring, error tracking, and auto-fix capabilities

interface JavariConfig {
  appName: string
  supabaseUrl: string
  supabaseKey: string
  enableAutoFix?: boolean
  enableMonitoring?: boolean
}

interface ErrorReport {
  error_type: string
  error_message: string
  stack_trace?: string
  context?: Record<string, any>
  auto_fix_attempted?: boolean
  fix_strategy?: string
}

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'down'
  response_time_ms: number
  error_count_24h: number
  uptime_percentage: number
}

class JavariClient {
  private config: JavariConfig
  private healthCheckInterval: NodeJS.Timeout | null = null

  constructor(config: JavariConfig) {
    this.config = {
      enableAutoFix: true,
      enableMonitoring: true,
      ...config,
    }

    if (this.config.enableMonitoring) {
      this.startHealthMonitoring()
    }
  }

  // Report error to Javari monitoring system
  async reportError(error: Error | string, context?: Record<string, any>): Promise<void> {
    try {
      const errorData: ErrorReport = {
        error_type: typeof error === 'string' ? 'Error' : error.name,
        error_message: typeof error === 'string' ? error : error.message,
        stack_trace: typeof error === 'string' ? undefined : error.stack,
        context,
        auto_fix_attempted: false,
      }

      const response = await fetch(`${this.config.supabaseUrl}/rest/v1/error_logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.config.supabaseKey,
          'Authorization': `Bearer ${this.config.supabaseKey}`,
        },
        body: JSON.stringify({
          app_name: this.config.appName,
          ...errorData,
          created_at: new Date().toISOString(),
        }),
      })

      if (this.config.enableAutoFix && response.ok) {
        await this.attemptAutoFix(errorData)
      }
    } catch (err) {
      console.error('Failed to report error to Javari:', err)
    }
  }

  // Attempt automatic error fixing
  private async attemptAutoFix(error: ErrorReport): Promise<void> {
    try {
      const response = await fetch(`${this.config.supabaseUrl}/functions/v1/javari-auto-fix`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.supabaseKey}`,
        },
        body: JSON.stringify({
          app_name: this.config.appName,
          error,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Auto-fix applied:', result.strategy)
      }
    } catch (err) {
      console.error('Auto-fix failed:', err)
    }
  }

  // Update app health status
  private async updateHealthStatus(status: HealthStatus): Promise<void> {
    try {
      await fetch(`${this.config.supabaseUrl}/rest/v1/app_health_status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.config.supabaseKey,
          'Authorization': `Bearer ${this.config.supabaseKey}`,
          'Prefer': 'resolution=merge-duplicates',
        },
        body: JSON.stringify({
          app_name: this.config.appName,
          ...status,
          last_check: new Date().toISOString(),
        }),
      })
    } catch (err) {
      console.error('Failed to update health status:', err)
    }
  }

  // Start periodic health monitoring
  private startHealthMonitoring(): void {
    // Check health every 30 seconds
    this.healthCheckInterval = setInterval(() => {
      this.performHealthCheck()
    }, 30000)

    // Immediate first check
    this.performHealthCheck()
  }

  // Perform health check
  private async performHealthCheck(): Promise<void> {
    const startTime = performance.now()
    
    try {
      const response = await fetch('/api/health')
      const responseTime = performance.now() - startTime

      const status: HealthStatus = {
        status: response.ok ? 'healthy' : 'degraded',
        response_time_ms: Math.round(responseTime),
        error_count_24h: 0, // Populated by backend
        uptime_percentage: 99.9, // Populated by backend
      }

      await this.updateHealthStatus(status)
    } catch (err) {
      const responseTime = performance.now() - startTime

      await this.updateHealthStatus({
        status: 'down',
        response_time_ms: Math.round(responseTime),
        error_count_24h: 0,
        uptime_percentage: 0,
      })
    }
  }

  // Cleanup
  destroy(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval)
      this.healthCheckInterval = null
    }
  }
}

// Singleton instance
let javariInstance: JavariClient | null = null

export function initJavari(config: JavariConfig): JavariClient {
  if (!javariInstance) {
    javariInstance = new JavariClient(config)
  }
  return javariInstance
}

export function getJavari(): JavariClient | null {
  return javariInstance
}

export { JavariClient }
export type { JavariConfig, ErrorReport, HealthStatus }
