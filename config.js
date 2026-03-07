// Configuration file for dynamic content
const CONFIG = {
    // GitHub Repository
    github: {
        owner: 'DevStudio2k25',
        repo: 'premium-hub-web',
        branch: 'main'
    },
    
    // API Endpoints
    api: {
        base: 'https://api.github.com',
        rawContent: 'https://raw.githubusercontent.com'
    },
    
    // Cache settings
    cache: {
        duration: 5 * 60 * 1000, // 5 minutes
        enabled: true
    },
    
    // Feature flags
    features: {
        autoRefresh: true,
        refreshInterval: 10 * 60 * 1000, // 10 minutes
        showRepoStats: true,
        showReleaseNotes: false,
        showDownloadCount: true
    },
    
    // Fallback data (if API fails)
    fallback: {
        version: 'v1.0.0',
        downloadText: 'Download APK',
        repoStats: {
            stars: 0,
            forks: 0
        }
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
