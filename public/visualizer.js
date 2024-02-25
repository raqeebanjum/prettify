
let lastTrackId = null;

async function fetchTrackData() {
    try {
        const response = await fetch('/current-track');
        if (response.ok) {
            const data = await response.json();
            if (data && data.item) {
                const currentTrackId = data.item.id; // Get the current track's ID

                // Check if the track has changed by comparing the current track ID with the last track ID
                if (currentTrackId !== lastTrackId) {
                    lastTrackId = currentTrackId; // Update the last track ID

                    const coverArtUrl = data.item.album.images[0].url;
                    const coverArt = document.getElementById('cover-art');
                    coverArt.style.transition = 'opacity 0.5s ease';
                    coverArt.style.opacity = 0; // Fade out the current cover art

                    setTimeout(() => {
                        const img = new Image();
                        img.crossOrigin = "anonymous";
                        img.src = coverArtUrl;

                        img.onload = function () {
                            coverArt.src = coverArtUrl; // Update the cover art source
                            coverArt.style.opacity = 1; // Fade in the new cover art

                            const colorThief = new ColorThief();
                            const palette = colorThief.getPalette(img, 2);
                            const gradient = `linear-gradient(to right, rgb(${palette[0].join(',')}), rgb(${palette[1].join(',')}))`;

                            // Transition the background only when the song changes
                            const background = document.getElementById('background');
                            background.style.transition = 'background 1s ease'; // Enable transition
                            background.style.background = gradient;
                        };
                    }, 500); // Use the same duration as the CSS opacity transition

                    // Transition track information only when the song changes
                    const trackName = document.getElementById('track-name');
                    const artistName = document.getElementById('artist-name');
                    trackName.style.transition = 'opacity 0.5s ease';
                    artistName.style.transition = 'opacity 0.5s ease';
                    trackName.style.opacity = 0;
                    artistName.style.opacity = 0;

                    setTimeout(() => {
                        trackName.textContent = data.item.name;
                        artistName.textContent = data.item.artists.map(artist => artist.name).join(', ');
                        trackName.style.opacity = 1;
                        artistName.style.opacity = 1;
                    }, 500); // Use the same duration as the CSS opacity transition
                }
            } else {
                // Handle case when no track is playing
                document.getElementById('track-name').textContent = 'No track playing';
                document.getElementById('artist-name').textContent = '';
                document.getElementById('cover-art').style.display = 'none';
                document.getElementById('background').style.background = '';
            }
        } else {
            console.error('Failed to fetch track data');
        }
    } catch (error) {
        console.error('Error fetching track data:', error);
    }
}

setInterval(fetchTrackData, 500); // Fetch track data every 5 seconds
fetchTrackData(); // Initial fetch


document.getElementById('fullscreen-btn').addEventListener('click', function () {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        hideCursorAndButton(); // Call this function when entering full-screen
    } else {
        showCursorAndButton(); // Reset to default state when exiting full-screen
    }
});

let mouseMoveTimeout;
function hideCursorAndButton() {
    // Hide cursor and button immediately when entering full-screen mode
    document.body.style.cursor = 'none';
    document.getElementById('fullscreen-btn').style.display = 'none';

    // Add event listener for mouse movement in full-screen mode
    document.addEventListener('mousemove', () => {
        // Show cursor and button when mouse moves
        document.body.style.cursor = 'default';
        document.getElementById('fullscreen-btn').style.display = 'block';

        // Clear previous timeout if there was one
        clearTimeout(mouseMoveTimeout);

        // Set timeout to hide cursor and button again after 2 seconds of inactivity
        mouseMoveTimeout = setTimeout(() => {
            document.body.style.cursor = 'none';
            document.getElementById('fullscreen-btn').style.display = 'none';
        }, 2000); // Adjust time as needed
    });
}

function showCursorAndButton() {
    // Clear timeout and remove event listener to prevent it from running when not in full-screen
    clearTimeout(mouseMoveTimeout);
    document.removeEventListener('mousemove', hideCursorAndButton);

    // Show cursor and button by resetting styles to default
    document.body.style.cursor = 'default';
    document.getElementById('fullscreen-btn').style.display = 'block'; // Adjust to your default display style if it's not 'block'
}

