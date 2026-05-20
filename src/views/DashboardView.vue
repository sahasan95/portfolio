<template>
  <div class="dashboard-container">
    <aside class="sidebar">
      <div class="brand">
        <span class="logo-icon">⚡</span>
        <h2>DevWorkspace</h2>
      </div>
      <nav class="nav-menu">
        <a href="#" class="nav-item active">📊 Project Overview</a>
        <a href="#" class="nav-item">🔒 Secure Credentials</a>
        <a href="#" class="nav-item">⚙️ Settings</a>
      </nav>
      <div class="sidebar-footer">
        <button @click="handleSignOut" class="signout-btn">🚪 Sign Out</button>
      </div>
    </aside>

    <main class="main-content">
      <header class="content-header">
        <div>
          <h1>Welcome to your Dashboard</h1>
          <p class="subtitle">System connection active • Token authenticated</p>
        </div>
        <div class="user-badge">
          <div class="avatar">Dev</div>
        </div>
      </header>

      <section class="metrics-grid">
        <div class="metric-card">
          <span class="card-icon blue">📦</span>
          <div class="metric-info">
            <h3>Active Repositories</h3>
            <p class="metric-value">{{ projects.length }}</p>
          </div>
        </div>
        <div class="metric-card">
          <span class="card-icon green">🔑</span>
          <div class="metric-info">
            <h3>API Integrity</h3>
            <p class="metric-value">100%</p>
          </div>
        </div>
        <div class="metric-card">
          <span class="card-icon purple">⏱️</span>
          <div class="metric-info">
            <h3>Session Expiry</h3>
            <p class="metric-value">60m</p>
          </div>
        </div>
      </section>

      <section class="data-section">
        <div class="section-header">
          <h2>Monitored REST Endpoints</h2>
          <button @click="showModal = true" class="add-project-btn">➕ Add New Project</button>
        </div>
        
        <div v-if="loading" class="state-message">
          <p>Fetching endpoints from secure storage...</p>
        </div>

        <div v-else-if="error" class="state-message error-text">
          <p>⚠️ {{ error }}</p>
        </div>

        <div v-else-if="projects.length > 0" class="table-container">
          <table class="project-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Project Title</th>
                <th>Tech Stack</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in projects" :key="project.id">
                <td>#{{ project.id }}</td>
                <td class="project-title">{{ project.title }}</td>
                <td><code class="tech-badge">{{ project.tech_stack }}</code></td>
                <td>
                  <span class="status-pill" :class="project.status.toLowerCase().replace(' ', '-')">
                    {{ project.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="empty-state-table">
          <p>No active project records found on the backend database file.</p>
        </div>
      </section>
    </main>

    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-card">
        <h3>Create New Database Record</h3>
        <form @submit.prevent="handleCreateProject">
          <div class="form-group">
            <label>Project Title</label>
            <input v-model="newForm.title" type="text" placeholder="e.g. Microservice API" required />
          </div>
          <div class="form-group">
            <label>Tech Stack</label>
            <input v-model="newForm.tech_stack" type="text" placeholder="e.g. FastAPI, Vue, SQLite" required />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="newForm.status">
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="button" @click="showModal = false" class="cancel-btn">Cancel</button>
            <button type="submit" class="submit-btn">Save to DB</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const projects = ref([])
const loading = ref(true)
const error = ref('')

// Modal state managers
const showModal = ref(false)
const newForm = ref({
  title: '',
  tech_stack: '',
  status: 'In Progress'
})

async function fetchProjects() {
  try {
    loading.value = true
    error.value = ''
    const token = localStorage.getItem('user-token')
    
    const response = await axios.get('http://127.0.0.1:8000/api/v1/projects', {
      headers: { Authorization: `Bearer ${token}` }
    })
    projects.value = response.data
  } catch (err) {
    console.error("Failed to pull projects:", err)
    error.value = 'Failed to authenticate secure resource stream from backend.'
  } finally {
    loading.value = false
  }
}

async function handleCreateProject() {
  try {
    const token = localStorage.getItem('user-token')
    
    // Fire dynamic HTTP POST request with user form data payload
    const response = await axios.post('http://127.0.0.1:8000/api/v1/projects', newForm.value, {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    // Add the fresh database response row straight into our local dynamic array list
    projects.value.push(response.data)
    
    // Reset and close modal
    showModal.value = false
    newForm.value = { title: '', tech_stack: '', status: 'In Progress' }
  } catch (err) {
    console.error("Failed to write record:", err)
    alert("Could not write record to database.")
  }
}

onMounted(() => {
  fetchProjects()
})

function handleSignOut() {
  localStorage.removeItem('user-token')
  router.push('/login')
}
</script>

<style scoped>
/* Keeping your beautiful baseline styles intact */
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #0f0f11;
  color: #e4e4e7;
}
.sidebar {
  width: 260px;
  background-color: #16161a;
  border-right: 1px solid #27272a;
  display: flex;
  flex-direction: column;
  padding: 24px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
}
.brand h2 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}
.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
}
.nav-item {
  color: #a1a1aa;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s;
}
.nav-item:hover, .nav-item.active {
  background-color: #27272a;
  color: #ffffff;
}
.sidebar-footer {
  padding-top: 16px;
  border-top: 1px solid #27272a;
}
.signout-btn {
  width: 100%;
  background: transparent;
  border: 1px solid #dc2626;
  color: #ef4444;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.signout-btn:hover {
  background: rgba(239, 68, 68, 0.1);
}
.main-content {
  flex-grow: 1;
  padding: 40px;
  max-width: 1200px;
}
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}
.content-header h1 {
  font-size: 1.75rem;
  margin: 0 0 4px 0;
}
.subtitle {
  color: #71717a;
  margin: 0;
  font-size: 0.9rem;
}
.avatar {
  background-color: #27272a;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
}
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}
.metric-card {
  background-color: #16161a;
  border: 1px solid #27272a;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.card-icon {
  font-size: 1.5rem;
  padding: 12px;
  border-radius: 8px;
}
.card-icon.blue { background: rgba(59, 130, 246, 0.1); }
.card-icon.green { background: rgba(34, 197, 94, 0.1); }
.card-icon.purple { background: rgba(168, 85, 247, 0.1); }
.metric-info h3 { font-size: 0.85rem; color: #71717a; margin: 0 0 4px 0; }
.metric-value { font-size: 1.5rem; font-weight: 600; margin: 0; }
.data-section {
  background-color: #16161a;
  border: 1px solid #27272a;
  border-radius: 12px;
  padding: 24px;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.section-header h2 { font-size: 1.1rem; margin: 0; }
.status-indicator {
  font-size: 0.8rem;
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  padding: 4px 12px;
  border-radius: 12px;
}
.table-container { overflow-x: auto; margin-top: 10px; }
.project-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem; }
.project-table th { padding: 14px; border-bottom: 1px solid #27272a; color: #71717a; font-weight: 500; }
.project-table td { padding: 16px 14px; border-bottom: 1px solid #1f1f23; }
.project-title { font-weight: 500; color: #ffffff; }
.tech-badge { background-color: #0f0f11; padding: 4px 8px; border-radius: 4px; border: 1px solid #27272a; color: #3b82f6; font-family: monospace; }
.status-pill { padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 500; }
.status-pill.in-progress { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.status-pill.completed { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
.status-pill.archived { background: rgba(113, 113, 122, 0.1); color: #a1a1aa; }
.state-message { padding: 40px; text-align: center; color: #71717a; }
.empty-state-table { border: 2px dashed #27272a; border-radius: 8px; padding: 40px; text-align: center; color: #71717a; }

/* --- NEW MODAL & BUTTON STYLES --- */
.add-project-btn {
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}
.add-project-btn:hover { background-color: #2563eb; }
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}
.modal-card {
  background: #16161a;
  border: 1px solid #27272a;
  border-radius: 12px;
  width: 400px; padding: 24px;
}
.modal-card h3 { margin: 0 0 20px 0; font-size: 1.2rem; }
.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.form-group label { font-size: 0.85rem; color: #a1a1aa; }
.form-group input, .form-group select {
  background: #0f0f11;
  border: 1px solid #27272a;
  color: #ffffff;
  padding: 10px; border-radius: 6px;
  outline: none;
}
.form-group input:focus { border-color: #3b82f6; }
.modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; }
.cancel-btn { background: transparent; border: 1px solid #27272a; color: #e4e4e7; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
.submit-btn { background: #22c55e; border: none; color: #ffffff; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 500; }
.submit-btn:hover { background: #16a34a; }
</style>