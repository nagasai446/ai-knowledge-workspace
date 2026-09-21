const API_URL = import.meta.env.VITE_API_URL;

export async function checkHealth(){
    const response =await fetch(`${API_URL}/health`);

    if(!response.ok){
        throw new Error("API Request Failed");
    }

    return response.json();
}