/**
 * Mock tasks for SYNTHOS when database is not connected
 * Includes labeling tasks and social media tasks
 */

export const mockTasks = [
    // === LABELING TASKS ===
    {
        id: 'task-1',
        task_type: 'sentiment',
        title: 'Crypto News Sentiment Analysis',
        description: 'Analyze the sentiment of this crypto news headline: "Bitcoin surges 15% after major institutional adoption announcement"',
        options: ['Very Bullish', 'Bullish', 'Neutral', 'Bearish', 'Very Bearish'],
        difficulty: 'easy',
        base_reward: 10,
        min_level: 1,
        category: 'labeling'
    },
    {
        id: 'task-2',
        task_type: 'risk',
        title: 'DeFi Protocol Risk Assessment',
        description: 'Rate the risk level of investing in a new DeFi yield farming protocol with 500% APY and 2-day-old liquidity',
        options: ['Very Low Risk', 'Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk'],
        difficulty: 'medium',
        base_reward: 30,
        min_level: 1,
        category: 'labeling'
    },
    {
        id: 'task-3',
        task_type: 'tagging',
        title: 'Wallet Behavior Classification',
        description: 'A wallet address shows: 1000+ daily transactions, consistent $100-$500 trades, active during US hours. Classify this wallet:',
        options: ['Bot Trading', 'Day Trader', 'Long-term Holder', 'Arbitrage Bot', 'Market Maker'],
        difficulty: 'hard',
        base_reward: 50,
        min_level: 2,
        category: 'labeling'
    },
    {
        id: 'task-4',
        task_type: 'prediction',
        title: 'Price Movement Validation',
        description: 'An AI predicts BTC will rise 5% in 24h based on order book analysis, social sentiment, and whale movements. Do you agree?',
        options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
        difficulty: 'medium',
        base_reward: 30,
        min_level: 1,
        category: 'labeling'
    },
    {
        id: 'task-5',
        task_type: 'sentiment',
        title: 'Token Launch Sentiment',
        description: 'Analyze community sentiment: "New AI token launching with locked liquidity, doxxed team, and real product demo"',
        options: ['Very Positive', 'Positive', 'Mixed', 'Negative', 'Very Negative'],
        difficulty: 'easy',
        base_reward: 10,
        min_level: 1,
        category: 'labeling'
    },
    {
        id: 'task-6',
        task_type: 'tagging',
        title: 'NFT Collection Classification',
        description: 'Classify this NFT project: 10k PFP collection, celebrity partnerships, gaming utility, staking rewards, DAO governance',
        options: ['Utility NFT', 'Art Collection', 'Gaming Asset', 'Membership Pass', 'Hybrid Project'],
        difficulty: 'medium',
        base_reward: 30,
        min_level: 1,
        category: 'labeling'
    },
    {
        id: 'task-7',
        task_type: 'risk',
        title: 'Smart Contract Audit Review',
        description: 'A smart contract audit shows: 2 medium issues, 5 low issues, unverified proxy contracts. Risk level?',
        options: ['Safe to Use', 'Low Risk', 'Medium Risk', 'High Risk', 'Critical Risk'],
        difficulty: 'hard',
        base_reward: 50,
        min_level: 2,
        category: 'labeling'
    },
    {
        id: 'task-8',
        task_type: 'prediction',
        title: 'Market Trend Prediction',
        description: 'Based on: BTC dominance rising, altcoin volume dropping, fear & greed index at 25. What happens next?',
        options: ['Major Rally', 'Moderate Up', 'Sideways', 'Moderate Down', 'Major Dump'],
        difficulty: 'hard',
        base_reward: 50,
        min_level: 2,
        category: 'labeling'
    },
    {
        id: 'task-9',
        task_type: 'sentiment',
        title: 'Exchange Listing Analysis',
        description: 'Token gets listed on Binance with $50M trading volume in first hour. Market sentiment?',
        options: ['Extremely Bullish', 'Bullish', 'Cautiously Optimistic', 'Neutral', 'Bearish'],
        difficulty: 'easy',
        base_reward: 10,
        min_level: 1,
        category: 'labeling'
    },
    {
        id: 'task-10',
        task_type: 'tagging',
        title: 'Transaction Pattern Recognition',
        description: 'Wallet shows: Regular small inflows from 100+ addresses, immediate outflow to exchange, repeating daily. Pattern?',
        options: ['Payment Aggregator', 'Scam Collector', 'Mixer Service', 'Business Wallet', 'Exchange Hot Wallet'],
        difficulty: 'hard',
        base_reward: 50,
        min_level: 3,
        category: 'labeling'
    },
    {
        id: 'task-11',
        task_type: 'risk',
        title: 'Liquidity Pool Assessment',
        description: 'Pool analysis: $100K TVL, 90% owned by 3 wallets, created 5 days ago, no audit. Risk assessment?',
        options: ['Very Low', 'Low', 'Moderate', 'High', 'Extreme'],
        difficulty: 'medium',
        base_reward: 30,
        min_level: 1,
        category: 'labeling'
    },
    {
        id: 'task-12',
        task_type: 'prediction',
        title: 'Gas Fee Prediction',
        description: 'ETH network: High pending txs, major NFT mint in 2h, average gas 50 gwei. What will gas fees do?',
        options: ['Spike >200 gwei', 'Rise to 100-200', 'Stay 50-100', 'Drop to 20-50', 'Drop <20'],
        difficulty: 'medium',
        base_reward: 30,
        min_level: 1,
        category: 'labeling'
    },

    // === SOCIAL MEDIA TASKS (One-time) ===
    {
        id: 'social-1',
        task_type: 'social',
        title: 'Follow SYNTHOS on X (Twitter)',
        description: 'Follow @SynthosAI on X to stay updated with platform news and earn bonus rewards!',
        options: ['Followed @SynthosAI', 'Already Following'],
        difficulty: 'easy',
        base_reward: 100,
        min_level: 1,
        category: 'social',
        action_url: 'https://twitter.com/SynthosAI',
        is_one_time: true
    },
    {
        id: 'social-2',
        task_type: 'social',
        title: 'Like Our Launch Post',
        description: 'Like our official SYNTHOS platform launch announcement post on X!',
        options: ['Liked the Post', 'Already Liked'],
        difficulty: 'easy',
        base_reward: 50,
        min_level: 1,
        category: 'social',
        action_url: 'https://twitter.com/SynthosAI/status/123456',
        is_one_time: true
    },
    {
        id: 'social-3',
        task_type: 'social',
        title: 'Repost & Share SYNTHOS',
        description: 'Repost our introduction tweet to help spread the word about AI-powered crypto training!',
        options: ['Reposted Successfully', 'Already Reposted'],
        difficulty: 'easy',
        base_reward: 100,
        min_level: 1,
        category: 'social',
        action_url: 'https://twitter.com/intent/retweet?tweet_id=123456',
        is_one_time: true
    },
    {
        id: 'social-4',
        task_type: 'social',
        title: 'Share Your Experience',
        description: 'Write a post about your SYNTHOS experience and tag us for bonus tokens!',
        options: ['Posted & Tagged', 'Will Post Later'],
        difficulty: 'medium',
        base_reward: 100,
        min_level: 1,
        category: 'social',
        action_url: 'https://twitter.com/intent/tweet?text=Just%20started%20training%20AI%20and%20earning%20crypto%20on%20@SynthosAI',
        is_one_time: true
    },
]

/**
 * Get tasks filtered by category
 */
export function getTasksByCategory(category) {
    if (!category) return mockTasks
    return mockTasks.filter(task => task.category === category)
}

/**
 * Get task by ID
 */
export function getTaskById(id) {
    return mockTasks.find(task => task.id === id)
}

/**
 * Get random tasks
 */
export function getRandomTasks(count = 5) {
    const shuffled = [...mockTasks].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
}
