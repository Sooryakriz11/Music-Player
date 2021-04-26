/*
Getting Needed Elements
----------------------------------------------------------------------------------
*/

//Container
let container = document.querySelector(".container");

//Control Elemets
let playBtn = document.querySelector(".ri-play-fill");
let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".prev");

//Volume Elements
let volumeSection = document.querySelector(".volume-sec");
let volumeBtn = document.querySelector(".volume-btn");
let volumeContainer = document.querySelector(".volume-container");

//Audio Info Elements
let author = document.getElementById("author");
let album = document.getElementById("album");
let image = document.getElementById("image");
/*
Variables
----------------------------------------------------------------------------------
*/
let isPlaying = false;
let defaultAudioIndex = 0;

/*
Volume Range
----------------------------------------------------------------------------------
*/
volumeSldr = new mdc.slider.MDCSlider(
  document.querySelector(".mdc-slider.volume")
);
volumeSldr.root.addEventListener("MDCSlider:change", (e) =>
  changeVolumeIcons(e.detail.value)
);

/*
All Music
*/
let allMusic = [
  {
    author: "BILLIE EILISH",
    album: "Don't Smile At Me",
    image:
      "https://i.insider.com/5e67e76d1122cf797d51e108?width=1100&format=jpeg&auto=webp",
    audio: "Assets/Music/yt1s.com - Billie Eilish Khalid  lovely.mp3",
  },
  {
    author: "WITT LOWRY",
    album: "Into Your Arms",
    image:
      "https://www.hypestorm.net/wp-content/uploads/2019/06/Into-Your-Arms-Cover-ART.jpg",
    audio:
      "Assets/Music/yt1s.com - Witt Lowry  Into Your Arms feat Ava Max Official Music Video.mp3",
  },
  {
    author: "ALEX & RUS",
    album: "Wild Lioness",
    image:
      "https://a10.gaanacdn.com/images/albums/51/2667351/crop_480x480_2667351.jpg",
    audio: "Assets/Music/semeer3.mpeg",
  },
];

/*
Audio
*/
let music;

/*
Functions
----------------------------------------------------------------------------------
*/

/*
To Display Audio Info
*/
const showAudioInfo = (data) => {
  //Music
  music = new Audio(data.audio);

  //Author
  author.innerHTML = data.author;

  //Album
  album.innerHTML = data.album;

  //Image
  image.src = data.image;
};

/*
To Play And Pause Music
*/
const playPauseMusic = () => {
  // Checking Whether the Music is Playing Or not
  if (!isPlaying) {
    music.play();
    isPlaying = true;
    playBtn.classList.replace("ri-play-fill", "ri-pause-fill");
  } else {
    music.pause();
    isPlaying = false;
    playBtn.classList.replace("ri-pause-fill", "ri-play-fill");
  }
};

/*
To Show Volume Slider
*/
const showVolume = () => {
  volumeContainer.classList.toggle("active");
};

/*
To Change Volume Icons According to Volume Level
*/
const changeVolumeIcons = (value) => {
  console.log(value);
  if (value === 0) {
    volumeBtn.classList.replace(volumeBtn.classList[0], "ri-volume-mute-line");
  } else if (value < 40) {
    volumeBtn.classList.replace(volumeBtn.classList[0], "ri-volume-down-line");
  } else if (value > 40) {
    volumeBtn.classList.replace(volumeBtn.classList[0], "ri-volume-up-line");
  }
};

/*
To Play Next Song
*/
const nextPrevSong = (status) => {
  isPlaying === false ? (isPlaying = true) : "";
  playPauseMusic();
  if (status === "next") {
    defaultAudioIndex = defaultAudioIndex + 1;
    music = new Audio(allMusic[defaultAudioIndex]);
    if (defaultAudioIndex > allMusic.length - 1) {
      defaultAudioIndex = 0;
      showAudioInfo(allMusic[defaultAudioIndex]);
    } else {
      showAudioInfo(allMusic[defaultAudioIndex]);
    }
  } else {
    defaultAudioIndex = defaultAudioIndex - 1;
    music = new Audio(allMusic[defaultAudioIndex]);
    if (defaultAudioIndex === -1) {
      defaultAudioIndex = allMusic.length - 1;
      showAudioInfo(allMusic[defaultAudioIndex]);
    } else {
      showAudioInfo(allMusic[defaultAudioIndex]);
    }
  }
};
/*
Event Listeners
----------------------------------------------------------------------------------
*/

/*
Window On Load
----------------------------------------------------------------------------------
*/
window.addEventListener("load", () =>
  showAudioInfo(allMusic[defaultAudioIndex])
);

/*
Play Pause Listener Button
*/
playBtn.addEventListener("click", playPauseMusic);

/*
Play Pause Listener Space Bar
*/
document.addEventListener("keydown", (e) =>
  e.code === "Space" ? playPauseMusic() : ""
);

/*
Show Volume Controller
*/
volumeSection.addEventListener("click", showVolume);

/*
Next Music 
----------------------------------------------------------------------------------
*/
nextBtn.addEventListener("click", () => nextPrevSong("next"));

/*
Prev Music 
----------------------------------------------------------------------------------
*/
prevBtn.addEventListener("click", () => nextPrevSong("prev"));

// Music Ends
