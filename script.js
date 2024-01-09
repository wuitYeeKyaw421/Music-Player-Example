let audiotag = document.getElementsByClassName("audiotag")[0];
let musicListTag = document.getElementsByClassName("musicList")[0];
let timediv = document.getElementsByClassName("time")[0];
let currentprogress = document.getElementsByClassName("currentprogress")[0];
let playbutton = document.getElementsByClassName("play")[0];
let pausebutton = document.getElementsByClassName("pause")[0];
let backwardbutton = document.getElementsByClassName("backward")[0];
let forwardbutton = document.getElementsByClassName("forward")[0];

let musicList = [
  {
    id: "../Music/Alan Walker All Falls Down.mp3",
    name: "Alan Walker All Falls Down",
  },
  { id: "../Music/Alan Walker Faded.mp3", name: "Alan Walker Faded" },
  { id: "../Music/Alan Walker Ignite.mp3", name: "Alan Walker Ignite" },
  { id: "../Music/HAPPIER x SUNFLOWER.mp3", name: "HAPPIER x SUNFLOWER" },
  { id: "../Music/Lily Alan Walker.mp3", name: "Alan Walker Lily" },
];

let musicItem;
//SHOW MUSIC LIST
for (let i = 0; i < musicList.length; i++) {
  let musicdiv = document.createElement("div");
  musicdiv.classList.add("musicItem");
  musicdiv.id = i;
  musicdiv.addEventListener("click", () => {
    currentplayingindex = i;
    playsong(currentplayingindex);
  });
  let musicname = i + 1 + ". " + musicList[i].name;
  musicdiv.textContent = musicname;
  musicListTag.append(musicdiv);
  musicItem = document.querySelectorAll("musicItem");
}

/* ===== DURATION TEXT ===== */
let duration = 0;
let durationtext = "00:00";
audiotag.addEventListener("loadeddata", () => {
  duration = Math.floor(audiotag.duration);
  durationtext = minXsecText(duration);
});

let currenttimetext;
audiotag.addEventListener("timeupdate", () => {
  let currenttime = Math.floor(audiotag.currentTime);
  currenttimetext = minXsecText(currenttime);
  minutesecondtext = currenttimetext + " : " + durationtext;
  timediv.textContent = minutesecondtext;

  updatecurrentprogress(currenttime);
});

/* ===== PROGRESS BAR ===== */
let updatecurrentprogress = (currenttime) => {
  let updateprogressbar = (250 / duration) * currenttime;
  currentprogress.style.width = updateprogressbar.toString() + "px";
};

/* ===== MINUTE & SECOND TEXT ===== */
let minXsecText = (totaltime) => {
  let minute = Math.floor(totaltime / 60);
  let second = totaltime % 60;

  let minutetext = minute < 10 ? "0" + minute.toString() : minute;
  let secondtext = second < 10 ? "0" + second.toString() : second;

  return minutetext + ":" + secondtext;
};

/* ===== BUTTONS ===== */
let currentplayingindex = 0;

/* ===== PLAY BUTTON ===== */
playbutton.addEventListener("click", () => {
  let currenttime = Math.floor(audiotag.currentTime);
  if (currenttime === 0) {
    playsong(currentplayingindex);
  } else {
    audiotag.play();
    isplaying = true;
    updateplaypausebutton();
  }
});

/* ===== PAUSE BUTTON ===== */
pausebutton.addEventListener("click", () => {
  isplaying = false;
  updateplaypausebutton();
  audiotag.pause();
});

/* ===== BACKWARD BUTTON ===== */
backwardbutton.addEventListener("click", () => {
  if (currentplayingindex === 0) {
    return;
  } else {
    currentplayingindex -= 1;
    playsong(currentplayingindex);
  }
});

/* ===== FORWARD BUTTON ===== */
forwardbutton.addEventListener("click", () => {
  if (currentplayingindex === musicList.length - 1) {
    return;
  } else {
    currentplayingindex += 1;
    playsong(currentplayingindex);
  }
});

/* ===== UPDATE PLAY & PAUSE BUTTON ===== */
let isplaying = false;
let updateplaypausebutton = () => {
  if (isplaying) {
    playbutton.style.display = "none";
    pausebutton.style.display = "inline";
  } else {
    playbutton.style.display = "inline";
    pausebutton.style.display = "none";
  }
};

/* ===== PLAY SONG FUNCTION ===== */
let playsong = () => {
  let songtoplay = musicList[currentplayingindex].id;
  audiotag.src = songtoplay;
  audiotag.play();
  isplaying = true;
  updateplaypausebutton();
  playingMusicFunc();
};

let playingMusicFunc = () => {
  let musics = musicListTag.children;
  for (let i = 0; i < musics.length; i++) {
    musics[i].classList.remove("playing");
  }
  musics[currentplayingindex].classList.add("playing");
};
