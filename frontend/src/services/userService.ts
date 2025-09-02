import { type User } from '../types/user';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const responseData = await response.json();
    if (responseData && responseData.data) {
      return responseData.data;
    } else {
      throw new Error('Invalid response format from server');
    }
  },

  async createUser(username: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    const responseData = await response.json();
    if (responseData && responseData.data) {
      return responseData.data;
    } else {
      throw new Error('Invalid response format from server');
    }
  },

  async updateUser(id: string, username: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/updateUser/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    const responseData = await response.json();
    if (responseData && responseData.data) {
      return responseData.data;
    } else {
      throw new Error('Invalid response format from server');
    }
  },

  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/deleteUser/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  },
};