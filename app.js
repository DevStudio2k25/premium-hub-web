// GitHub Repository Configuration
const GITHUB_OWNER = CONFIG.github.owner;
const GITHUB_REPO = CONFIG.github.repo;
const GITHUB_FULL_REPO = `${GITHUB_OWNER}/${GITHUB_REPO}`;
const GITHUB_API_BASE = CONFIG.api.base;

// Cache configuration
const CACHE_DURATION = CONFIG.cache.duration;
let cachedData = {
    release: null,
    repo: null,
    timestamp: null
};

// Fetch latest release data
async function fetchLatestRelease() {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_FULL_REPO}/releases/latest`);
        if (!response.ok) throw new Error('Failed to fetch release data');
        return await response.json();
    } catch (error) {
        console.error('Error fetching release:', error);
        return null;
    }
}

// Fetch repository data
async function fetchRepoData() {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_FULL_REPO}`);
        if (!response.ok) throw new Error('Failed to fetch repo data');
        return await response.json();
    } catch (error) {
        console.error('Error fetching repo data:', error);
        return null;
    }
}

// Get cached or fresh data
async function getData() {
    const now = Date.now();
    
    // Return cached data if still valid
    if (cachedData.timestamp && (now - cachedData.timestamp) < CACHE_DURATION) {
        return cachedData;
    }
    
    // Fetch fresh data
    const [release, repo] = await Promise.all([
        fetchLatestRelease(),
        fetchRepoData()
    ]);
    
    cachedData = {
        release,
        repo,
        timestamp: now
    };
    
    return cachedData;
}

// Handle download click - always fetch latest before downloading
async function handleDownloadClick(event) {
    event.preventDefault();
    
    const button = event.currentTarget;
    const originalText = button.querySelector('span')?.textContent || button.textContent;
    const textElement = button.querySelector('span') || button;
    
    // Show loading notification
    const loadingNotif = notify.loading(
        'Checking for updates...',
        'Fetching latest version from GitHub'
    );
    
    // Show loading state on button
    textElement.textContent = 'Checking latest version...';
    button.style.opacity = '0.7';
    button.style.pointerEvents = 'none';
    
    try {
        // Force fresh data fetch (bypass cache)
        cachedData.timestamp = null;
        const { release } = await getData();
        
        if (!release) {
            throw new Error('Unable to fetch release data');
        }
        
        // Find APK asset
        const apkAsset = release.assets.find(asset => 
            asset.name.endsWith('.apk') || asset.content_type === 'application/vnd.android.package-archive'
        );
        
        if (!apkAsset) {
            throw new Error('APK not found in latest release');
        }
        
        // Hide loading notification
        notify.hide(loadingNotif);
        
        // Show success notification
        const sizeMB = (apkAsset.size / (1024 * 1024)).toFixed(1);
        notify.success(
            `Latest version: ${release.tag_name}`,
            `Starting download (${sizeMB} MB)...`,
            3000
        );
        
        // Update button text
        textElement.textContent = `Downloading ${release.tag_name}...`;
        
        console.log('✓ Latest version found:', release.tag_name);
        console.log('✓ Starting download:', apkAsset.name);
        
        // Start download
        window.location.href = apkAsset.browser_download_url;
        
        // Reset button after a delay
        setTimeout(() => {
            const sizeMB = (apkAsset.size / (1024 * 1024)).toFixed(1);
            textElement.textContent = button.id === 'heroDownloadBtn' ? 'Download Hub' : `Download APK (${sizeMB} MB)`;
            button.style.opacity = '1';
            button.style.pointerEvents = 'auto';
        }, 2000);
        
    } catch (error) {
        console.error('❌ Download failed:', error);
        
        // Hide loading notification
        notify.hide(loadingNotif);
        
        // Show error notification
        notify.error(
            'Download Failed',
            'Unable to fetch latest version. Please check your connection.',
            5000
        );
        
        textElement.textContent = 'Download failed - Retry';
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
    }
}

// Update download button with latest APK link
async function updateDownloadButton() {
    const { release } = await getData();
    
    const downloadBtn = document.getElementById('downloadApkBtn');
    const btnText = document.getElementById('downloadBtnText');
    const heroDownloadBtn = document.getElementById('heroDownloadBtn');
    const heroDownloadText = document.getElementById('heroDownloadText');
    
    if (!release) {
        console.warn('No release data available');
        if (btnText) btnText.textContent = 'Download APK (Offline)';
        if (heroDownloadText) heroDownloadText.textContent = 'Download Hub';
        return;
    }
    
    // Find APK asset
    const apkAsset = release.assets.find(asset => 
        asset.name.endsWith('.apk') || asset.content_type === 'application/vnd.android.package-archive'
    );
    
    if (!apkAsset) {
        console.warn('No APK found in latest release');
        if (btnText) btnText.textContent = 'Download APK (Not Found)';
        if (heroDownloadText) heroDownloadText.textContent = 'Download Hub';
        return;
    }
    
    // Update button text
    if (btnText) {
        const sizeMB = (apkAsset.size / (1024 * 1024)).toFixed(1);
        btnText.textContent = `Download APK (${sizeMB} MB)`;
    }
    
    if (heroDownloadText) {
        heroDownloadText.textContent = `Download Hub`;
    }
    
    // Attach click handlers for real-time checking
    if (downloadBtn) {
        downloadBtn.onclick = handleDownloadClick;
    }
    
    if (heroDownloadBtn) {
        heroDownloadBtn.onclick = handleDownloadClick;
    }
    
    console.log('✓ Download buttons configured with latest check on click');
}

// Update version information
async function updateVersionInfo() {
    const { release } = await getData();
    
    if (!release) return;
    
    // Update version in stats
    const versionElements = document.querySelectorAll('.stat-value');
    versionElements.forEach(el => {
        if (el.textContent.includes('v1.0.0') || el.textContent.includes('Stable')) {
            el.textContent = `${release.tag_name} Stable`;
        }
    });
    
    console.log('✓ Version updated to:', release.tag_name);
}

// Update repository stats
async function updateRepoStats() {
    const { repo } = await getData();
    
    if (!repo) return;
    
    // You can add more stats here if needed
    const stats = {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        watchers: repo.watchers_count,
        openIssues: repo.open_issues_count
    };
    
    console.log('✓ Repository stats loaded:', stats);
    
    // Optional: Display stats somewhere on the page
    // Example: Add a stats section dynamically
}

// Update release notes (if you want to show them)
async function updateReleaseNotes() {
    const { release } = await getData();
    
    if (!release || !release.body) return;
    
    // You can display release notes in a modal or section
    console.log('✓ Release notes available:', release.body.substring(0, 100) + '...');
}

// Initialize all dynamic content
async function initializeDynamicContent() {
    console.log('🔄 Fetching data from GitHub...');
    
    try {
        await Promise.all([
            updateDownloadButton(),
            updateVersionInfo(),
            updateRepoStats(),
            updateReleaseNotes()
        ]);
        
        console.log('✅ All dynamic content loaded successfully!');
        
        // Show success notification
        const { release } = await getData();
        if (release) {
            notify.success(
                'Latest version loaded',
                `${release.tag_name} is ready to download`,
                3000
            );
        }
    } catch (error) {
        console.error('❌ Error initializing dynamic content:', error);
        notify.warning(
            'Offline Mode',
            'Some features may not be available',
            4000
        );
    }
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDynamicContent);
} else {
    initializeDynamicContent();
}

// Refresh data periodically (optional)
if (CONFIG.features.autoRefresh) {
    setInterval(async () => {
        console.log('🔄 Refreshing data...');
        cachedData.timestamp = null; // Invalidate cache
        await initializeDynamicContent();
    }, CONFIG.features.refreshInterval);
}
