let projects = [];
const loginScreen = document.getElementById('loginScreen');
const portal = document.getElementById('portal');
const projectList = document.getElementById('projectList');
const projectDetail = document.getElementById('projectDetail');

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  loginScreen.classList.add('hidden');
  portal.classList.add('active');
  loadProjects();
});

document.getElementById('logoutBtn').addEventListener('click', function() {
  portal.classList.remove('active');
  loginScreen.classList.remove('hidden');
});

async function loadProjects() {
  const resp = await fetch('sample-projects.json');
  projects = await resp.json();
  showProjectList();
}

function showProjectList() {
  projectList.style.display = 'block';
  projectDetail.style.display = 'none';
  projectList.innerHTML = '<h3 style="margin-bottom:1rem;">Your Projects</h3>';
  projects.forEach((p, i) => {
    projectList.innerHTML += `
      <div class="project-card" onclick="showProject(${i})">
        <h3>${p.name}</h3>
        <div class="status">${p.status}</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${p.progress}%"></div></div>
      </div>`;
  });
}

function showProject(i) {
  const p = projects[i];
  projectList.style.display = 'none';
  projectDetail.style.display = 'block';
  projectDetail.innerHTML = `
    <button class="back-btn" onclick="showProjectList()">← Back to projects</button>
    <h2>${p.name}</h2>
    <p style="color:var(--text-light);margin:0.5rem 0">${p.status} — ${p.progress}% complete</p>
    <div class="progress-bar" style="margin-bottom:1rem"><div class="progress-fill" style="width:${p.progress}%"></div></div>
    <div class="tabs">
      <button class="tab active" onclick="switchTab(event,'milestones')">Milestones</button>
      <button class="tab" onclick="switchTab(event,'files')">Files</button>
      <button class="tab" onclick="switchTab(event,'messages')">Messages</button>
    </div>
    <div id="milestones" class="tab-content active">
      ${p.milestones.map(m => `<div class="milestone"><span>${m.name}</span><span class="${m.done?'done':'pending'}">${m.done?'✓ Done':'⏳ Pending'}</span></div>`).join('')}
    </div>
    <div id="files" class="tab-content">
      ${p.files.map(f => `<div class="file-item"><span>${f.name}</span><a href="#">Download</a></div>`).join('')}
    </div>
    <div id="messages" class="tab-content">
      ${p.messages.map(m => `<div class="message"><div class="author">${m.author} <span class="time">${m.time}</span></div><p>${m.text}</p></div>`).join('')}
    </div>`;
}

function switchTab(e, tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  e.target.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}
