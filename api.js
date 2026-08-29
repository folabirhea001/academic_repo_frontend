// ================================================
// SMART Academic Repository — API Layer
// ================================================
// const API = 'http://localhost:5000/api';
const API       = 'https://academic-repo-api-1.onrender.com/api';

const getToken = () => localStorage.getItem('token');
const getUser  = () => JSON.parse(localStorage.getItem('user') || '{}');
const getRole  = () => localStorage.getItem('role');

const setSession = (token, user, role) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('role', role);
};

const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
};

const requireStudent = () => {
  if (!getToken() || getRole() !== 'student') window.location.href = 'login.html';
};

const requireAdmin = () => {
  if (!getToken() || getRole() !== 'admin') window.location.href = 'admin-login.html';
};

// Core fetch helper
const apiFetch = async (path, method = 'GET', body = null, auth = true) => {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) headers['Authorization'] = `Bearer ${getToken()}`;
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${API}${path}`, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

const apiUpload = async (path, formData) => {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${getToken()}` },
    body: formData
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Upload failed');
  return data;
};

// Auth
const registerStudent  = d => apiFetch('/auth/student/register', 'POST', d, false);
const loginStudent     = d => apiFetch('/auth/student/login', 'POST', d, false);
const loginAdmin       = d => apiFetch('/auth/admin/login', 'POST', d, false);

// Materials
const getMaterials     = (f = {}) => apiFetch(`/materials${Object.keys(f).length ? '?' + new URLSearchParams(f) : ''}`);
const getRecommended   = ()       => apiFetch('/materials/recommended');
const getMaterial      = id       => apiFetch(`/materials/${id}`);
const logDownload      = id       => apiFetch(`/materials/${id}/download`, 'POST');

// Quiz
const getQuizzes       = ()       => apiFetch('/quiz');
const getQuiz          = id       => apiFetch(`/quiz/${id}`);
const submitQuiz       = (id, a)  => apiFetch(`/quiz/${id}/submit`, 'POST', { answers: a });
const getQuizHistory   = ()       => apiFetch('/quiz/history');

// Chat
const sendChatMessage  = (m, h)   => apiFetch('/chat', 'POST', { message: m, history: h });

// Admin
const adminUploadMaterial = fd    => apiUpload('/admin/materials/upload', fd);
const adminGetMaterials   = ()    => apiFetch('/admin/materials');
const adminDeleteMaterial = id    => apiFetch(`/admin/materials/${id}`, 'DELETE');
const adminCreateQuiz     = d     => apiFetch('/admin/quiz/create', 'POST', d);
const adminGenerateQuiz   = d     => apiFetch('/admin/quiz/generate', 'POST', d);
const adminGetQuizzes     = ()    => apiFetch('/admin/quizzes');
const adminGetStudents    = ()    => apiFetch('/admin/students');
