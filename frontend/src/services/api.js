const API_URL = "http://127.0.0.1:8000";

export async function getProfile() {
    const response = await fetch(`${API_URL}/profile`);
    return response.json();
}

export async function getJobs() {
    const response = await fetch(`${API_URL}/jobs`);
    return response.json();
}

export async function getRecommendations() {
    const response = await fetch(`${API_URL}/recommendations`);
    return response.json();
}

export async function uploadResume(file) {

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
        `${API_URL}/upload-resume`,
        {
            method: "POST",
            body: formData
        }
    );

    return response.json();

}