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
const frameSoundPlayer = document.getElementById('frame-sound');
const soundFolderPath = "frameSounds/"; // Adjust if needed
const soundBaseName = "sound_";       // Adjust if needed
const soundExtension = ".mp3";        // Adjust if needed (.wav, .ogg etc.)


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
    const soundSrc = soundFolderPath + soundBaseName + currentFrame + soundExtension;

    // Update the image source
    scrollImage.src = newSrc;
    
    
    if (frameSoundPlayer) {
        frameSoundPlayer.src = soundSrc; // Set the source for the current frame's sound
        // Optional: frameSoundPlayer.load(); // May help ensure src is ready
        frameSoundPlayer.currentTime = 0; // Rewind (stops previous sound if src changed, restarts if same)
        frameSoundPlayer.play().catch(error => {
            // Autoplay restrictions might prevent playing without prior user interaction
            // Log error or provide UI indication if sound fails
            console.error("Frame sound playback failed:", error);
        });
        console.log("Playing sound:", soundSrc);
    } else {
        console.error("Frame sound player element not found!");
    }

    console.log("Deeper button clicked. Showing frame:", currentFrame);
});






// --- Part 3: Dialogue Window Elements & Functions ---
const dialogueWindow = document.getElementById('dialogue-window');
const dialogueText = document.getElementById('dialogue-text');
const dialogueNextButton = document.getElementById('dialogue-next'); // Get button

// Function to show the dialogue window with specific text
function showDialogue(textToShow) {
    if (dialogueWindow && dialogueText) {
        dialogueText.textContent = textToShow; // Set the text
        dialogueWindow.classList.remove('hidden'); // Make window visible
        console.log("Showing dialogue:", textToShow);
    } else {
        console.error("Dialogue window elements not found!");
    }
}

// Function to hide the dialogue window
function hideDialogue() {
    if (dialogueWindow) {
        dialogueWindow.classList.add('hidden'); // Hide window
        console.log("Hiding dialogue.");
    }
}

// Example: Event listener for the 'Next' button to hide the dialogue
// (You'll likely replace this with logic to show the *next* line of dialogue)
if (dialogueNextButton) {
    dialogueNextButton.addEventListener('click', function() {
        // For now, just hide it. Later, this could load the next line.
        hideDialogue();
        console.log("Dialogue 'Next' button clicked.");
    });
}

// --- How to Use (Examples - Don't add these directly unless testing) ---
// You would call these functions from your game logic when needed.
// Example 1: Show a message immediately for testing (uncomment to test)
document.addEventListener('DOMContentLoaded', () => {
    showDialogue("That gate seems to lead outside!");
 });

// Example 2: Show dialogue when something is clicked (e.g., the background)
// const backgroundImage = document.getElementById('background-image');
// if (backgroundImage) {
//     backgroundImage.addEventListener('click', () => {
//         showDialogue("You clicked the background. It looks old.");
//     });
// }

// --- Make sure dialogue starts hidden (redundant if class is in HTML, but safe) ---
// hideDialogue(); // Call once at start if not hidden by default in HTML


/* unchaining */
// --- Minimal Logic for Final Scene Button ---

// --- Logic for the final scene button ---

// Get references to the specific button and the container it's in
const unchainButton = document.getElementById('unchain-button');
const finalContainer = document.getElementById('final-content-2');

// Optional: Get references to other elements inside if you want to hide them
const finalParagraph = finalContainer ? finalContainer.querySelector('p') : null;
const leaveButton = document.getElementById('leave-chained-button');

// Add event listener only if the button and container were found
if (unchainButton && finalContainer) {

    unchainButton.addEventListener('click', function() {
        console.log("Disconnect / Unchain button clicked.");

        // --- CORE ACTION: Change the container's background image style ---
        finalContainer.style.backgroundImage = "url('unchained.gif')"; // Adjust path if needed
        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

        // Optional: Adjust other background properties if the GIF needs different settings
        // Example: finalContainer.style.backgroundSize = 'contain';
        // Example: finalContainer.style.backgroundPosition = 'center center';

        // Optional: Hide the paragraph and buttons to just show the GIF background
        if (finalParagraph) {
            finalParagraph.style.display = 'none';
        }
        if (unchainButton) {
            unchainButton.style.display = 'none';
        }
        if (leaveButton) {
            leaveButton.style.display = 'none';
        }
    });

} else {
    // Log errors if elements crucial for this step are missing
    if (!unchainButton) console.error("Button with ID 'unchain-button' not found.");
    if (!finalContainer) console.error("Container with ID 'final-content-2' not found.");
}

// --- All other previous JavaScript is omitted ---