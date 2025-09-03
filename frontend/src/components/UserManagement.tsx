import React, { useState, useEffect } from 'react';
import { Trash2, Edit3, Plus, Save, X } from 'lucide-react';
import { type User } from '../types/user';
import { userService } from '../services/userService';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUsername, setNewUsername] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingUsername, setEditingUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await userService.getUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (username: string) => {
    setError(null);
    try {
      const newUser = await userService.createUser(username);
      setUsers(prev => [...prev, newUser]);
      setNewUsername('');
    } catch (err) {
      setError('Failed to create user');
      console.error('Error creating user:', err);
    }
  };

  const updateUser = async (id: number, username: string) => {
    setError(null);
    try {
      const updatedUser = await userService.updateUser(id, username);
      setUsers(prev => prev.map(user => 
        user.user_id === id ? updatedUser : user
      ));
      setEditingId(null);
      setEditingUsername('');
    } catch (err) {
      setError('Failed to update user');
      console.error('Error updating user:', err);
    }
  };

  const deleteUser = async (id: number) => {
    setError(null);
    try {
      await userService.deleteUser(id);
      setUsers(prev => prev.filter(user => user.user_id !== id));
    } catch (err) {
      setError('Failed to delete user');
      console.error('Error deleting user:', err);
    }
  };

  const handleSubmit = () => {
    if (newUsername.trim()) {
      createUser(newUsername.trim());
    }
  };

  const startEditing = (user: User) => {
    setEditingId(user.user_id);
    setEditingUsername(user.username);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingUsername('');
  };

  const saveEdit = () => {
    if (editingId && editingUsername.trim()) {
      updateUser(editingId, editingUsername.trim());
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">User Management</h1>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-600 text-white p-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {/* Add User Form */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus size={20} />
            Add New User
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter username"
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add User
            </button>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold p-6 pb-4">Existing Users</h2>
          
          {loading ? (
            <div className="p-6 text-center text-gray-400">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="p-6 text-center text-gray-400">No users found</div>
          ) : (
            <div className="divide-y divide-gray-700">
              {users.map((user) => (
                <div key={user.user_id} className="p-4 flex items-center justify-between">
                  {editingId === user.user_id ? (
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="text"
                        value={editingUsername}
                        onChange={(e) => setEditingUsername(e.target.value)}
                        className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <button
                        onClick={saveEdit}
                        className="p-1 text-green-400 hover:text-green-300 transition-colors"
                        title="Save"
                      >
                        <Save size={18} />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
                        title="Cancel"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1">
                        <span className="text-lg">{user.username}</span>
                        <div className="text-sm text-gray-400">ID: {user.user_id}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEditing(user)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-gray-700 rounded transition-colors"
                          title="Edit user"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => deleteUser(user.user_id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded transition-colors"
                          title="Delete user"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;