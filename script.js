// document.getElementById('menuSetting').addEventListener('click', ()=>{
//     document.getElementById('overlay').classList.add('active');
// })

// document.addEventListener('DOMContentLoaded', () => {
//     const offcanvasNavbar = document.getElementById('offcanvasNavbar');
//     const overlay = document.getElementById('overlay');

//     offcanvasNavbar.addEventListener('show.bs.offcanvas', () => {
//         overlay.classList.add('active');
//     });

//     offcanvasNavbar.addEventListener('hide.bs.offcanvas', () => {
//         overlay.classList.remove('active');
//     });

//     overlay.addEventListener('click', () => {
//         const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasNavbar);
//         if (offcanvasInstance) {
//             offcanvasInstance.hide();
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', ()=>{
    // rotate dropdrop svg
    const addColorBtn = document.getElementById('addcolorBtn');
    const addColorSvg = document.getElementById('addcolorToggleSvg');
    addColorBtn.addEventListener('click', ()=>{
        addColorSvg.classList.toggle('rotated');
    })
    const pickFontBtn = document.getElementById('pickFontBtn');
    const pickFontSvg = document.getElementById('PickFontToggleSvg');
    pickFontBtn.addEventListener('click', ()=>{
        pickFontSvg.classList.toggle('rotated');
    })
    //remove radius function
    const removecolorBtnRadius = document.getElementById('removecolorBtnRadius');
    removecolorBtnRadius.addEventListener('click', ()=>{
        removecolorBtnRadius.classList.toggle('bottom-radius')
    })
    const removeFontBtnRadius = document.getElementById('removeFontBtnRadius');
    removeFontBtnRadius.addEventListener('click', ()=>{
    removeFontBtnRadius.classList.toggle('bottom-radius')
    })

    // loop duration function
    const rangeInput = document.getElementById('customRange1');
    const rangeValue = document.getElementById('rangeValue')
    rangeInput.addEventListener('input', function(){
        rangeValue.textContent = this.value;
    })

    //Loop spacing function
    const spaceInput = document.getElementById('customRange3');
    const spaceValue = document.getElementById('letterSpValue');
    spaceInput.addEventListener('input', function(){
        spaceValue.textContent = this.value;
    })

    // Upload image function
    document.getElementById('uploadBtn').addEventListener('click', function() {
        document.getElementById('imageUpload').click();
    });

    document.getElementById('imageUpload').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.getElementById('OutputContent');
                    const ctx = canvas.getContext('2d');

                    // Clear the canvas
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Calculate the aspect ratios
                    const canvasAspect = canvas.width / canvas.height;
                    const imageAspect = img.width / img.height;

                    let sx, sy, sWidth, sHeight;

                    if (imageAspect > canvasAspect) {
                        // Image is wider relative to its height than the canvas
                        sHeight = img.height;
                        sWidth = img.height * canvasAspect;
                        sx = (img.width - sWidth) / 2;
                        sy = 0;
                    } else {
                        // Image is taller relative to its width than the canvas
                        sWidth = img.width;
                        sHeight = img.width / canvasAspect;
                        sx = 0;
                        sy = (img.height - sHeight) / 2;
                    }

                    // Draw the image covering the canvas
                    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Reset button
    var reset_btn = document.getElementById('reset-btn');
    reset_btn.addEventListener('click', function(){
        var input_reset = document.getElementById('loopText');
        var text_color = document.getElementById('textColor');
        var reset_select = document.getElementById('animation');
        var reset_select2 = document.getElementById('changeFont');
        var reset_select3 = document.getElementById('loopDirection');
        var font_size_reset = document.getElementById('changeFontSize');
        var loop_duration_reset = document.getElementById("customRange1");
        var loop_duration_reset2 = document.getElementById("rangeValue");
        var letter_spacing_reset = document.getElementById("customRange3")
        var letter_spacing_reset2 = document.getElementById("letterSpValue");
        var speed_reset = document.getElementById("customRange4");
    // Reset text
    input_reset.value =""; 
    // Reset color 
    text_color.value= "black"; 
    // Reset select
    font_size_reset.value ="48"; // Reset font size
    // Reset loop duration
    loop_duration_reset.value="5"; 
    loop_duration_reset2.innerHTML="5"; 
    // Reset letter spacing 
    letter_spacing_reset.value = "1";
    letter_spacing_reset2.innerHTML= "1";
    // Reset speed
    speed_reset.value="1"; 
    // Reset select 
    reset_select.value = reset_select.options[0].value;
    reset_select2.value = reset_select2.options[0].value;  
    reset_select3.value = reset_select3.options[0].value;

    });

    //Dark and light mode function
    const modeToggle = document.getElementById('lightDarkModeBtn');
    // Function to update the button text
    const updateButtonText = () => {
      if (!document.body.classList.contains('light-mode')) {
        modeToggle.textContent = 'Light mode';
      } else {
        modeToggle.textContent = 'Dark mode';
      }
    };
    // Initial button text setup
    updateButtonText();
    modeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      updateButtonText();
    });

    // Ensure the correct icon is visible on page load
    var enterIcon = document.getElementById("enterFullScreenIcon");
    var exitIcon = document.getElementById("exitFullScreenIcon");
    var pauseLoopingBtn = document.getElementById("pauseLoopingBtn");
    var lockScreenToggleBtn = document.getElementById("lockScreenToggleBtn");
  
    enterIcon.style.display = 'block';
    exitIcon.style.display = 'none';
    pauseLoopingBtn.style.display = 'none';
    lockScreenToggleBtn.style.display = 'none';


    //Play and Pause Looping text function
    var pauseLoop = document.getElementById("pauseLoop");
    var playLoop = document.getElementById("playLoop");
    var pauseLoopingBtn = document.getElementById("pauseLoopingBtn");

    let animationRunning = true; // Variable to track animation state
    let animationFrameId; // Variable to store the animation frame ID
    let startTime = null; // Initialize startTime

    pauseLoopingBtn.addEventListener('click', function () {
        pauseLoop.classList.toggle('active');
        playLoop.classList.toggle('active');

        if (animationRunning) {
            cancelAnimationFrame(animationFrameId); // Pause the animation
        } else {
            requestAnimationFrame(animateText); // Resume the animation
        }
        animationRunning = !animationRunning; // Toggle the state
    });

  
    
// Global variables
let imageLoaded = false;
let currentImage = null;


// Easing Functions
function easeInQuad(t) {
    return t * t;
}

function easeOutQuad(t) {
    return t * (2 - t);
}

function linear(t) {
    return t;
}
// Function to apply wave animation to the text
function waveAnimation(t, amplitude, frequency) {
    return amplitude * Math.sin(frequency * t * Math.PI * 2);
}


// Clear Canvas Function
function clearCanvas() {
    const canvas = document.getElementById("OutputContent");
    const c = canvas.getContext("2d");
    const scale = window.devicePixelRatio;
    canvas.width = 500 * scale;
    canvas.height = 300 * scale;
    c.scale(scale, scale);
}

// Function to draw image on canvas
function drawImageOnCanvas(url) {
    const canvas = document.getElementById('OutputContent');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = () => {
        currentImage = img;
        imageLoaded = true;
        animateText(); // Start animation after image is loaded
    }
}

// Animate Text Function
function animateText(timestamp) {
    const canvas = document.getElementById("OutputContent");
    const c = canvas.getContext("2d");
    if (!startTime) startTime = timestamp;
    const elapsedTime = timestamp - startTime; // Convert to seconds
    const inputTxt = document.getElementById("loopText").value;
    const txtColor = document.getElementById("textColor").value;
    const changeFont = document.getElementById("changeFont").value;
    const changeFontSize = document.getElementById("changeFontSize").value;
    const animationType = document.getElementById("animation").value;
    const loopDirection = document.getElementById("loopDirection").value;
    const speed = parseFloat(document.getElementById("customRange4").value);    
    const letterSpacing = parseFloat(document.getElementById('customRange3').value);
    const duration = parseFloat(document.getElementById("customRange1").value);


    const scale = window.devicePixelRatio;
    const canvasWidth = canvas.width / scale;
    const canvasHeight = canvas.height / scale;

    const waveAmplitude = 20; // Set the amplitude for the wave
    const waveFrequency = 0.05; // Set the frequency for the wave


    c.clearRect(0, 0, canvasWidth, canvasHeight); // Clear the canvas

    if (imageLoaded && currentImage) {
        c.drawImage(currentImage, 0, 0, canvasWidth, canvasHeight); // Draw image
    }

    c.fillStyle = txtColor; // Change text color
    c.font = `${changeFontSize}px ${changeFont}`; // Change font size and font style
    c.textAlign = "center"; // Middle from left to right
    c.textBaseline = "middle"; // Middle from top to bottom
    c.letterSpacing = `${letterSpacing}px`;

    // Adjusting the elapsed time to reflect the speed factor
    const adjustedElapsedTime = elapsedTime * speed / 2000;
    

    const textWidth = c.measureText(inputTxt).width;
    let t = (adjustedElapsedTime % duration) / duration; // Normalize t to be between 0 and 1

    switch (animationType) {
        case "ease-in":
            t = easeInQuad(t);
            break;
        case "ease-out":
            t = easeOutQuad(t);
            break;
        case "linear":
            default:
            t = linear(t);
            break;
       
    }

    
 

    let newPosX;
    if (loopDirection === "ltr") {
        newPosX = -textWidth + t * (canvasWidth + textWidth * 2);
    } else {
        newPosX = canvasWidth + textWidth - t * (canvasWidth + textWidth * 2);
    }

    c.fillText(inputTxt, newPosX, canvasHeight / 2); // Draw text

    // Apply wave animation to each character
    for (let i = 0; i < inputTxt.length; i++) {
    const char = inputTxt[i];
    const charWidth = c.measureText(char).width;
    const charX = newPosX + i * (charWidth + letterSpacing);
    const charY = canvasHeight / 2 + waveAnimation(elapsedTime / 1000 + i, waveAmplitude, waveFrequency);
    c.fillText(char, charX, charY);
    }

    animationFrameId = requestAnimationFrame(animateText);
}

// Reset and start new animation
document.getElementById("generate-btn").addEventListener("click", function () {
    cancelAnimationFrame(animationFrameId);
    startTime = null; // Reset start time for new animation cycle
    requestAnimationFrame(animateText); // Start animation on button click
});

// Open gallery and load image
const imageUrls = [
    "https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1227511/pexels-photo-1227511.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/413195/pexels-photo-413195.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/370799/pexels-photo-370799.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1242348/pexels-photo-1242348.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/960137/pexels-photo-960137.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1831234/pexels-photo-1831234.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/255377/pexels-photo-255377.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/673648/pexels-photo-673648.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/316466/pexels-photo-316466.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/194096/pexels-photo-194096.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/961402/pexels-photo-961402.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1037993/pexels-photo-1037993.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/399160/pexels-photo-399160.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1227515/pexels-photo-1227515.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/268966/pexels-photo-268966.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/326333/pexels-photo-326333.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/268976/pexels-photo-268976.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3694711/pexels-photo-3694711.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3310691/pexels-photo-3310691.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/159027/bokeh-blue-light-blue-neon-159027.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/584305/pexels-photo-584305.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1303098/pexels-photo-1303098.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/207300/pexels-photo-207300.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2894957/pexels-photo-2894957.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/985266/pexels-photo-985266.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/358904/pexels-photo-358904.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1343537/pexels-photo-1343537.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3297593/pexels-photo-3297593.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2259232/pexels-photo-2259232.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1789968/pexels-photo-1789968.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/593324/pexels-photo-593324.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/207253/pexels-photo-207253.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/132204/pexels-photo-132204.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1048033/pexels-photo-1048033.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2847648/pexels-photo-2847648.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/313563/sand-pattern-wave-texture-313563.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/163999/pexels-photo-163999.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/936800/pexels-photo-936800.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/268883/pexels-photo-268883.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/355748/pexels-photo-355748.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/301717/pexels-photo-301717.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/235992/pexels-photo-235992.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/518245/pexels-photo-518245.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1410140/pexels-photo-1410140.jpeg?auto=compress&cs=tinysrgb&w=600",
    // (List of image URLs as provided in the original code)
];

    const openGalleryButton = document.getElementById('openGalleryButton');
    const galleryModal = document.getElementById('galleryModal');
    const closeModal = document.getElementById('closeModal');
    const modalContent = galleryModal.querySelector('.modal-content');

    // Load images into the gallery modal
    imageUrls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = "Gallery Image";
        img.addEventListener('click', () => {
            drawImageOnCanvas(url);
            galleryModal.classList.remove('show');
            setTimeout(() => {
                galleryModal.style.display = 'none';
            }, 500);
        });
        modalContent.appendChild(img);
    });

    // Open gallery modal with animation
    openGalleryButton.addEventListener('click', () => {
        galleryModal.style.display = 'block';
        setTimeout(() => {
            galleryModal.classList.add('show');
        }, 10); // Slight delay to ensure CSS transition
    });

    // Close gallery modal with animation
    closeModal.addEventListener('click', () => {
        galleryModal.classList.remove('show');
        setTimeout(() => {
            galleryModal.style.display = 'none';
        }, 300); // Match the transition duration
    });

    // Close gallery modal if outside of modal-content is clicked
    galleryModal.addEventListener('click', (event) => {
        if (event.target === galleryModal) {
            closeGalleryModal();
        }
    });

    function closeGalleryModal() {
        galleryModal.classList.remove('show');
        setTimeout(() => {
            galleryModal.style.display = 'none';
        }, 300);
    }

    // Image upload from device
    const uploadBtn = document.getElementById('uploadBtn');
    const imageUploadInput = document.getElementById('imageUpload');

    uploadBtn.addEventListener('click', () => {
        imageUploadInput.click();
    });

    imageUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                drawImageOnCanvas(e.target.result);
            }
            reader.readAsDataURL(file);
        }
    });

    // Initial canvas clear
    clearCanvas();

    

});

//Full screen mode API function
function toggleFullScreen() {
    var elem = document.getElementById("rectangle");
    var enterIcon = document.getElementById("enterFullScreenIcon");
    var exitIcon = document.getElementById("exitFullScreenIcon");
    
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
    
    // Toggle the visibility of the SVG icons
    enterIcon.style.display = document.fullscreenElement ? 'none' : 'block';
    exitIcon.style.display = document.fullscreenElement ? 'block' : 'none';
}
    
// Handle full-screen change event to update button icons
document.addEventListener("fullscreenchange", function() {
    updateButton();
});
    
function updateButton() {
    var enterIcon = document.getElementById("enterFullScreenIcon");
    var exitIcon = document.getElementById("exitFullScreenIcon");
    var GalleryButton = document.getElementById('openGalleryButton');
    var uploadImgButton = document.getElementById('uploadImagBtn');
    var pauseLoopingBtn = document.getElementById("pauseLoopingBtn");
    var lockScreenToggleBtn = document.getElementById("lockScreenToggleBtn");
    enterIcon.style.display = document.fullscreenElement ? 'none' : 'block';
    exitIcon.style.display = document.fullscreenElement ? 'block' : 'none';
    GalleryButton.style.display = document.fullscreenElement ? 'none' : 'block';
    uploadImgButton.style.display = document.fullscreenElement ? 'none' : 'block';
    pauseLoopingBtn.style.display = document.fullscreenElement ? 'block' : 'none';
    lockScreenToggleBtn.style.display = document.fullscreenElement ? 'block' : 'none';
}

