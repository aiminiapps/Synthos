import { NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

/**
 * POST /api/ai-tasks
 * Generate AI-powered tasks dynamically using OpenRouter
 */
export async function POST(request) {
    try {
        const { category, difficulty, count = 3 } = await request.json()

        if (!OPENROUTER_API_KEY) {
            return NextResponse.json({ error: 'OpenRouter API key not configured' }, { status: 500 })
        }

        const categoryPrompts = {
            sentiment: 'crypto market sentiment analysis, news headlines, social media posts about DeFi/NFT/blockchain',
            risk: 'DeFi protocol risk, smart contract security, liquidity pool analysis, investment risk assessment',
            tagging: 'blockchain wallet behavior classification, transaction pattern recognition, token categorization',
            prediction: 'crypto price prediction validation, market trend forecasting, on-chain metric interpretation',
            research: 'tokenomics analysis, whitepaper review, team credibility assessment, market opportunity sizing',
            validation: 'AI-generated trading signals, smart contract code review, AI summary accuracy checking',
            creative: 'rating AI-generated crypto content, evaluating educational threads, assessing marketing copy'
        }

        const prompt = `Generate ${count} unique data labeling tasks for a crypto AI training platform called SYNTHOS. 
Category: ${category} (${categoryPrompts[category] || 'general crypto analysis'})
Difficulty: ${difficulty || 'medium'}

Each task should:
- Be specific and realistic (use real crypto scenarios)
- Have exactly 5 answer options
- Be completable in 1-5 minutes
- Train AI models to understand crypto/blockchain data

Return ONLY a valid JSON array with this exact structure:
[
  {
    "id": "ai-${category}-${Date.now()}-1",
    "title": "Task title here",
    "description": "Detailed scenario description with specific numbers/data",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
    "difficulty": "${difficulty || 'medium'}",
    "base_reward": ${difficulty === 'easy' ? 10 : difficulty === 'hard' ? 50 : 30},
    "estimated_time": "X min",
    "category": "${category}",
    "task_type": "${category}",
    "ai_powered": true,
    "ai_generated": true,
    "min_level": 1
  }
]

Return ONLY the JSON array, no markdown, no explanation.`

        const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://synthos.ai',
                'X-Title': 'SYNTHOS AI Training Platform',
            },
            body: JSON.stringify({
                model: 'mistralai/mistral-7b-instruct:free',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a task generator for a crypto AI training platform. Generate realistic, specific data labeling tasks. Always return valid JSON only.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.8,
                max_tokens: 2000,
            })
        })

        if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.status}`)
        }

        const data = await response.json()
        const content = data.choices?.[0]?.message?.content

        if (!content) {
            throw new Error('No content from AI')
        }

        // Parse JSON from response (handle markdown code blocks)
        let tasks
        try {
            const jsonMatch = content.match(/\[[\s\S]*\]/)
            if (jsonMatch) {
                tasks = JSON.parse(jsonMatch[0])
            } else {
                tasks = JSON.parse(content)
            }
        } catch {
            throw new Error('Failed to parse AI response as JSON')
        }

        // Add unique IDs to prevent collisions
        tasks = tasks.map((task, i) => ({
            ...task,
            id: `ai-${category}-${Date.now()}-${i}`,
        }))

        return NextResponse.json({
            success: true,
            tasks,
            generated_at: new Date().toISOString(),
            model: 'mistralai/mistral-7b-instruct:free'
        })

    } catch (error) {
        console.error('AI task generation error:', error)
        return NextResponse.json({
            error: 'Failed to generate AI tasks',
            details: error.message
        }, { status: 500 })
    }
}

/**
 * GET /api/ai-tasks
 * Get AI task generation status
 */
export async function GET() {
    return NextResponse.json({
        status: 'ready',
        model: 'mistralai/mistral-7b-instruct:free',
        supported_categories: ['sentiment', 'risk', 'tagging', 'prediction', 'research', 'validation', 'creative'],
        api_configured: !!OPENROUTER_API_KEY
    })
}
