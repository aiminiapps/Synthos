import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * GET /api/health
 * Check database connection and system health
 */
export async function GET() {
    const health = {
        timestamp: new Date().toISOString(),
        status: 'healthy',
        checks: {
            database: 'unknown',
            api: 'ok'
        },
        details: {}
    }

    try {
        // Test Supabase connection
        const { data, error } = await supabase
            .from('users')
            .select('count')
            .limit(1)

        if (error) {
            health.checks.database = 'error'
            health.status = 'degraded'
            health.details.database_error = error.message
            console.error('❌ Database health check failed:', error.message)
        } else {
            health.checks.database = 'connected'
            health.details.database_message = '✅ Supabase connected successfully'
            console.log('✅ Database health check passed')
        }

    } catch (error) {
        health.checks.database = 'error'
        health.status = 'degraded'
        health.details.database_error = error.message
        console.error('❌ Database health check exception:', error)
    }

    // Check environment variables
    const envVars = {
        supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabase_anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        walletconnect_id: !!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
        openrouter_key: !!process.env.OPENROUTER_API_KEY,
    }

    health.details.environment = envVars

    // Set HTTP status based on health
    const status = health.status === 'healthy' ? 200 : 503

    return NextResponse.json(health, { status })
}
