let currentTimeRange = 'short_term';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadTopArtists(currentTimeRange);
    loadTopTracks(currentTimeRange);
    setupTimeRangeButtons();
});

function setupTimeRangeButtons() {
    const buttons = document.querySelectorAll('.time-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Load new data
            currentTimeRange = button.dataset.range;
            loadTopArtists(currentTimeRange);
            loadTopTracks(currentTimeRange);
        });
    });
}

async function loadTopArtists(timeRange) {
    try {
        const response = await fetch(`/top-artists?time_range=${timeRange}`);
        const data = await response.json();
        
        const container = document.getElementById('top-artists');
        container.innerHTML = data.items.slice(0, 10).map((artist, index) => `
            <div class="artist-card">
                <img src="${artist.images[0]?.url}" 
                     alt="${artist.name}" 
                     class="artist-image">
                <div class="artist-name">
                    <div class="font-bold">${artist.name}</div>
                    <div class="text-sm text-gray-400">#${index + 1}</div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading top artists:', error);
    }
}

async function loadTopTracks(timeRange) {
    try {
        const response = await fetch(`/top-tracks?time_range=${timeRange}`);
        const data = await response.json();
        
        const container = document.getElementById('top-tracks');
        container.innerHTML = data.items.slice(0, 10).map((track, index) => `
            <div class="track-item">
                <div class="track-rank">${index + 1}</div>
                <img src="${track.album.images[0]?.url}" 
                     alt="${track.name}" 
                     class="track-image">
                <div class="track-info">
                    <div class="track-name">${track.name}</div>
                    <div class="track-artist">${track.artists.map(artist => artist.name).join(', ')}</div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading top tracks:', error);
    }
}