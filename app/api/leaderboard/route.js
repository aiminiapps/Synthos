import { NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase'

export async function GET() {
    try {
        const supabase = getServerSupabase()

        // Fetch top contributors ordered by reputation score
        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .order('reputation_score', { ascending: false })
            .order('total_contributions', { ascending: false })
            .limit(100)

        if (error) {
            console.error('Error fetching leaderboard:', error)
            return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 })
        }

        return NextResponse.json(users || [])
    } catch (error) {
        console.error('Leaderboard API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
