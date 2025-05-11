// api/client.ts

const API_BASE_URL = 'http://localhost:8080'; // Replace with your Spring Boot backend URL

export const getClients = async () => {
  const response = await fetch(`${API_BASE_URL}/clients`);
  if (!response.ok) {
    throw new Error('Failed to fetch clients');
  }
  return response.json();
};

export const createClient = async (clientData: any) => { // Replace 'any' with a proper type
  const response = await fetch(`${API_BASE_URL}/clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clientData),
  });
  if (!response.ok) {
    throw new Error('Failed to create client');
  }
  return response.json();
};

// Add other client-related API functions here (updateClient, deleteClient, etc.)