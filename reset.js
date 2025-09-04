function resetUI() {
  // Reset kontainer JW/Clappr
  const playerDiv = document.getElementById('player');
  if (playerDiv) {
    playerDiv.style.display = 'none';
    playerDiv.innerHTML = '';
  }

  // Reset kontainer iframe
  const iframePlayer = document.getElementById('video-iframe');
  if (iframePlayer) {
    iframePlayer.style.display = 'none';
    iframePlayer.src = 'about:blank';
  }

  // Reset kontainer Shaka
  const shakaContainer = document.getElementById('shaka-container');
  if (shakaContainer) {
      shakaContainer.style.display = 'none';
  }

  // Reset dropdown Envivo
  const envivoDropdown = document.querySelector('.envivo-dropdown-container');
  if (envivoDropdown) {
    envivoDropdown.remove();
  }
}