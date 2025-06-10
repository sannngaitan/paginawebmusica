const audio          = document.getElementById('audio-player');
const playBtn        = document.getElementById('play-btn');
const playIcon       = document.getElementById('play-icon');
const pauseIcon      = document.getElementById('pause-icon');
const prevBtn        = document.getElementById('prev-btn');
const nextBtn        = document.getElementById('next-btn');
const progress       = document.getElementById('progress');
const currentTimeEl  = document.getElementById('current-time');
const durationEl     = document.getElementById('duration');

const playlistItems      = Array.from(document.querySelectorAll('.playlist li'));
let currentTrackIndex    = -1;  // -1 = ninguna seleccionada aún

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = String(Math.floor(sec % 60)).padStart(2, '0');
  return `${m}:${s}`;
}

function loadTrack(index) {
  const item = playlistItems[index];
  audio.src = item.dataset.src;
  document.querySelector('.track-title').textContent  = item.dataset.title;
  document.querySelector('.track-artist').textContent = item.dataset.artist;
  document.querySelector('.track-art').src            = item.dataset.art;
  currentTrackIndex = index;
  playlistItems.forEach(el => el.classList.remove('active'));
  item.classList.add('active');
}

function playTrack(index) {
  loadTrack(index);
  audio.currentTime = 0;
  audio.play();
}

function playNextTrack() {
  if (!playlistItems.length) return;
  const next = (currentTrackIndex + 1) % playlistItems.length;
  playTrack(next);
}

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

playBtn.addEventListener('click', () => {
  audio.paused ? audio.play() : audio.pause();
});

audio.addEventListener('play',  () => {
  playIcon.style.display  = 'none';
  pauseIcon.style.display = 'block';
});
audio.addEventListener('pause', () => {
  playIcon.style.display  = 'block';
  pauseIcon.style.display = 'none';
});

audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

progress.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

prevBtn.addEventListener('click', playNextTrack);
nextBtn.addEventListener('click', playNextTrack);

audio.addEventListener('ended', playNextTrack);

playlistItems.forEach((item, idx) => {
  item.addEventListener('click', () => playTrack(idx));
});
