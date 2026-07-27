const API_URL = "http://127.0.0.1:8000";

// Generic API helper
async function apiRequest(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "API request failed");
  }

  return response.json();
}

// -----------------------------
// User Profile
// -----------------------------
export async function getProfile() {
  return apiRequest(`${API_URL}/profile`);
}

// -----------------------------
// Recommended Jobs
// -----------------------------
export async function getJobs() {
  return apiRequest(`${API_URL}/jobs`);
}

// -----------------------------
// Live Jobs
// -----------------------------
export async function getLiveJobs() {
  return apiRequest(`${API_URL}/live-jobs`);
}

// -----------------------------
// AI Recommendations
// -----------------------------
export async function getRecommendations() {
  return apiRequest(`${API_URL}/recommendations`);
}

// -----------------------------
// Upload Resume
// -----------------------------
export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest(`${API_URL}/upload-resume`, {
    method: "POST",
    body: formData,
  });
}

// -----------------------------
// Search Jobs
// -----------------------------
export async function searchJobs(filters) {
  const params = new URLSearchParams({
    keyword: filters.keyword || "",
    location: filters.location || "",
    experience: filters.experience || "",
    work_mode: filters.workMode || "",
  });

  return apiRequest(`${API_URL}/search-jobs?${params}`);
}

// -----------------------------
// User Dashboard
// -----------------------------
export async function getUser() {
  return apiRequest(`${API_URL}/user`);
}

// -----------------------------
// Save Application
// -----------------------------
export async function saveApplication(job) {
  return apiRequest(`${API_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      company: job.company,
      title: job.title,
      status: "Applied",
      applied_date: new Date().toISOString().split("T")[0],
    }),
  });
}

// -----------------------------
// Get Applications
// -----------------------------
export async function getApplications() {
  return apiRequest(`${API_URL}/applications`);
}

// -----------------------------
// Update Application Status
// -----------------------------
export async function updateApplicationStatus(id, status) {
  return apiRequest(`${API_URL}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
    }),
  });
}

// -----------------------------
// Dashboard Analytics
// -----------------------------
export async function getAnalytics() {
  return apiRequest(`${API_URL}/analytics`);
}

// -----------------------------
// Generate Cover Letter
// -----------------------------
export async function generateCoverLetter(data) {
  return apiRequest(`${API_URL}/cover-letter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}