document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const query = document.getElementById('search-input').value.trim();
  if (!query) return;

  window.location.href = `/search?q=${encodeURIComponent(query)}`;
});

const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl    = document.getElementById('duration');


function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener('play', () => {
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'block';
});

audio.addEventListener('pause', () => {
  playIcon.style.display = 'block';
  pauseIcon.style.display = 'none';
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});

progress.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

prevBtn.addEventListener('click', () => {
  audio.currentTime = 0;
  audio.play();
});
nextBtn.addEventListener('click', () => {
  audio.currentTime = 0;
  audio.play();
});