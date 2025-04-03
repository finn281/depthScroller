// --- Part 1: Initial Interaction Elements ---
const actionLink = document.getElementById('action-link');
const clickSound = document.getElementById('click-sound');
const descendGif = document.getElementById('descend-gif');
const originalDescendSrc = descendGif.src;
const descendGifDuration = 2000; // !! SET DURATION for descend_animation.gif !!
let firstActionTriggered = false; // Simplified state for first action

// --- Part 2: Frame Control Elements ---
const scrollImage = document.getElementById('scroll-image');
const deeperButton = document.getElementById('deeper-button');

// --- Frame Control Configuration ---
// !! YOU NEED TO SET THESE VALUES !!
const frameBaseName = "frameScroll/frame_";     // Base filename for your frames
const frameExtension = ".png";      // File extension for your frames
const totalFrames = 20;             // TOTAL number of frames (e.g., 50 for frame_0 to frame_49)
let currentFrame = 0;               // Start at frame 0

// --- Initial Setup ---
// Ensure first GIF is hidden, second image (first frame) is visible
descendGif.classList.add('hidden');
// Initial src is set in HTML: <img id="scroll-image" src="frame_0.png">

// --- Event Listener for Initial Action ("Leave") ---
actionLink.addEventListener('click', function(event) {
    event.preventDefault();
    if (firstActionTriggered) return;
    firstActionTriggered = true;

    actionLink.style.opacity = '0.7';
    actionLink.style.pointerEvents = 'none'; // Keep disabled after click

    clickSound.currentTime = 0;
    clickSound.play();

    descendGif.classList.remove('hidden');
    descendGif.src = originalDescendSrc + '?t=' + new Date().getTime();

    console.log("Leave link clicked! Descend animation starting...");

    // We might not need the timeout anymore if nothing happens automatically after
    /*
    setTimeout(() => {
        actionLink.style.display = 'none'; // Example: hide link after animation
        console.log("Descend animation finished.");
    }, descendGifDuration);
    */
});

// --- Event Listener for Frame Control ("deeper" button) ---
deeperButton.addEventListener('click', function() {
    // Increment frame number
    currentFrame++;

    // Check if we exceeded the last frame (frame index goes from 0 to totalFrames-1)
    if (currentFrame >= totalFrames) {
        //currentFrame = 0; // Loop back to the first frame
        // Or uncomment below to stop at the last frame:
        currentFrame = totalFrames - 1;
        deeperButton.disabled = true; // Optional: disable button at end
    }

    // Construct the new image source path
    const newSrc = frameBaseName + currentFrame + frameExtension;

    // Update the image source
    scrollImage.src = newSrc;

    console.log("Deeper button clicked. Showing frame:", currentFrame);
});