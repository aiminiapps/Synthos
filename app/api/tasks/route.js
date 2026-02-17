import { NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase'

export async function GET() {
    try {
        const supabase = getServerSupabase()

        // Fetch all active tasks
        const { data: tasks, error } = await supabase
            .from('tasks')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching tasks:', error)
            return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
        }

        return NextResponse.json(tasks || [])
    } catch (error) {
        console.error('Tasks API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
