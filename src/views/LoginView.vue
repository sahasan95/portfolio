<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <!-- Top Branding Header -->
      <div class="auth-header">
        <div class="logo-shield">⚡</div>
        <h1>Developer Gateway</h1>
        <p class="subtitle">Authenticate to access your portfolio workspace</p>
      </div>

      <!-- Action Login Form -->
      <form @submit.prevent="submitLogin" class="auth-form">
        <div class="form-group">
          <label for="email">Identity (Email)</label>
          <div class="input-wrapper">
            <span class="input-icon">✉️</span>
            <input 
              id="email"
              type="email" 
              v-model="email" 
              placeholder="developer@example.com" 
              required 
            />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Security Key (Password)</label>
          <div class="input-wrapper">
            <span class="input-icon">🔑</span>
            <input 
              id="password"
              type="password" 
              v-model="password" 
              placeholder="••••••••••••" 
              required 
            />
          </div>
        </div>

        <!-- Feedback Messages -->
        <div v-if="errorMessage" class="alert-box error">
          <span class="alert-icon">⚠️</span>
          <p>{{ errorMessage }}</p>
        </div>

        <div v-if="isLoading" class="alert-box info">
          <span class="alert-icon">⏳</span>
          <p>Verifying signatures with FastAPI engine...</p>
        </div>

        <!-- Submit Engagement Trigger -->
        <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="!isLoading">Initialize Session</span>
          <span v-else>Verifying...</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const router = useRouter()

async function submitLogin() {
  errorMessage.value = ''
  isLoading.value = true
  
  // Transform data into URL-encoded format expected by OAuth2 spec
  const formData = new URLSearchParams()
  formData.append('username', email.value)
  formData.append('password', password.value)

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    
    // Save JWT access token locally
    localStorage.setItem('user-token', response.data.access_token)
    
    // Smoothly route to dashboard workspace
    router.push('/dashboard')
  } catch (error) {
    console.error('Authentication Error:', error)
    if (error.response && error.response.data && error.response.data.detail) {
      errorMessage.value = error.response.data.detail
    } else {
      errorMessage.value = 'Network failure. Ensure your FastAPI server is running on port 8000.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Full viewport centering container */
.auth-wrapper {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f0f11;
  font-family: system-ui, -apple-system, sans-serif;
  padding: 20px;
  box-sizing: border-box;
}

/* Premium central interface card */
.auth-card {
  width: 100%;
  max-width: 440px;
  background-color: #16161a;
  border: 1px solid #27272a;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

/* Header typography and branding */
.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo-shield {
  font-size: 2rem;
  background: rgba(59, 130, 246, 0.1);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin: 0 auto 16px auto;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.auth-header h1 {
  font-size: 1.5rem;
  color: #ffffff;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.subtitle {
  color: #71717a;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
}

/* Layout Form Mechanics */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #a1a1aa;
}

/* Glowing container wrappers for text inputs */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  font-size: 1rem;
  color: #52525b;
}

.input-wrapper input {
  width: 100%;
  background-color: #0f0f11;
  border: 1px solid #27272a;
  color: #ffffff;
  padding: 12px 14px 12px 42px;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  outline: none;
}

.input-wrapper input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

/* Status Notifications boxes */
.alert-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  line-height: 1.4;
}

.alert-box p {
  margin: 0;
}

.alert-box.error {
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #f87171;
}

.alert-box.info {
  background-color: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #60a5fa;
}

/* Premium active Action button */
.submit-btn {
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  margin-top: 8px;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2563eb;
}

.submit-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.submit-btn:disabled {
  background-color: #27272a;
  color: #71717a;
  cursor: not-allowed;
}
</style>