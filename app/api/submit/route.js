import { NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase'
import { calculateReward, TASK_POINTS } from '@/lib/reputation'

export async function POST(request) {
    try {
        const { taskId, answer, userAddress } = await request.json()

        if (!taskId || !answer || !userAddress) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const supabase = getServerSupabase()

        // Get user
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('wallet_address', userAddress.toLowerCase())
            .single()

        if (userError || !user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Get task
        const { data: task, error: taskError } = await supabase
            .from('tasks')
            .select('*')
            .eq('id', taskId)
            .single()

        if (taskError || !task) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 })
        }

        // Calculate reward based on difficulty and user level
        const rewardAmount = calculateReward(task.difficulty, user.level)

        // Calculate reputation points
        const reputationPoints = TASK_POINTS[task.difficulty] || 10

        // Create submission
        const { data: submission, error: submissionError } = await supabase
            .from('submissions')
            .insert([
                {
                    user_id: user.id,
                    task_id: taskId,
                    answer: { value: answer },
                    reward_amount: rewardAmount,
                    status: 'validated',
                },
            ])
            .select()
            .single()

        if (submissionError) {
            console.error('Error creating submission:', submissionError)
            return NextResponse.json({ error: 'Failed to create submission' }, { status: 500 })
        }

        // Update user stats
        const newReputationScore = user.reputation_score + reputationPoints
        const newLevel = Math.floor(newReputationScore / 100) + 1 // Simple level calculation

        const { error: updateError } = await supabase
            .from('users')
            .update({
                reputation_score: newReputationScore,
                level: newLevel,
                total_contributions: user.total_contributions + 1,
                total_rewards: parseFloat(user.total_rewards) + parseFloat(rewardAmount),
            })
            .eq('id', user.id)

        if (updateError) {
            console.error('Error updating user:', updateError)
        }

        // Create reward record
        const { data: reward, error: rewardError } = await supabase
            .from('rewards')
            .insert([
                {
                    user_id: user.id,
                    submission_id: submission.id,
                    amount: rewardAmount,
                    status: 'pending',
                },
            ])
            .select()
            .single()

        if (rewardError) {
            console.error('Error creating reward:', rewardError)
        }

        // TODO: In production, trigger actual token transfer here
        // For MVP, we'll simulate it
        const mockTxHash = `0x${Math.random().toString(16).substring(2, 66)}`

        // Update reward with mock transaction hash
        if (reward) {
            await supabase
                .from('rewards')
                .update({
                    tx_hash: mockTxHash,
                    status: 'sent',
                })
                .eq('id', reward.id)
        }

        return NextResponse.json({
            success: true,
            submission_id: submission.id,
            reward_amount: rewardAmount,
            tx_hash: mockTxHash,
            reputation_gained: reputationPoints,
        })
    } catch (error) {
        console.error('Submit API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
