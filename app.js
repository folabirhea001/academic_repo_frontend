// ================================================
// SMART Academic Repository — App Utilities
// ================================================

function showAlert(msg, type = 'success') {
  document.getElementById('__toast')?.remove();
  const t = { success: ['ok', 'bi-check-circle-fill'], danger: ['err', 'bi-x-circle-fill'], warning: ['warn', 'bi-exclamation-triangle-fill'] };
  const [cls, icon] = t[type] || t.success;
  const d = document.createElement('div');
  d.id = '__toast';
  d.className = `s-toast ${cls}`;
  d.innerHTML = `<div class="d-flex align-items-center gap-2"><i class="bi ${icon}"></i><span>${msg}</span></div><button onclick="this.closest('.s-toast').remove()">✕</button>`;
  document.body.appendChild(d);
  setTimeout(() => d?.remove(), 5000);
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    clearSession();
    window.location.href = 'index.html';
  }
}
