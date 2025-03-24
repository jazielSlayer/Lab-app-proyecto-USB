import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { LogOut, LayoutDashboard, Users, Settings } from 'lucide-react';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Layout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">Lab Management</h2>
          <p className="text-sm text-gray-600 mt-1">{user?.email}</p>
        </div>
        <nav className="mt-4">
          <Link
            to="/"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Dashboard
          </Link>
          <Link
            to="/users"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Users className="w-5 h-5 mr-2" />
            Users
          </Link>
          <Link
            to="/settings"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;