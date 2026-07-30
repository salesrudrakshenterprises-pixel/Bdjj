'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { getInitials, getStatusColor } from '@/lib/utils';
import { User, Mail, Phone, MapPin, CalendarDays, Lock, Save, Camera } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    dob: '',
    gender: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSave = () => {
    updateUser({ name: form.name, email: form.email, phone: form.phone });
    setEditMode(false);
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card rounded-3xl p-8 md:p-10 text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="relative inline-block"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-bg-primary text-3xl font-bold">
              {user?.name ? getInitials(user.name) : 'M'}
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-bg-primary hover:bg-accent-dark transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </motion.div>

          <h1 className="text-2xl font-display font-bold mt-4">{user?.name || 'Member'}</h1>
          <p className="text-text-muted text-sm">{user?.email}</p>
          {user?.membershipType && (
            <span className={`inline-block mt-3 text-xs px-3 py-1 rounded-full capitalize ${getStatusColor(user.membershipType)}`}>
              {user.membershipType} Member
            </span>
          )}
          {user?.membershipId && (
            <p className="text-xs text-text-muted mt-1">ID: {user.membershipId}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-accent" />
                Personal Information
              </h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className="text-accent text-sm hover:text-accent-light transition-colors"
              >
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-text-muted">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    disabled={!editMode}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-text-muted">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    disabled={!editMode}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-text-muted">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    disabled={!editMode}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-text-muted">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    disabled={!editMode}
                    placeholder="Your address"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-text-muted">Date of Birth</label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="date"
                      value={form.dob}
                      onChange={(e) => setForm({ ...form, dob: e.target.value })}
                      disabled={!editMode}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all disabled:opacity-60"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-text-muted">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    disabled={!editMode}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all disabled:opacity-60"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {editMode && (
                <button onClick={handleSave} className="btn-primary w-full justify-center mt-4">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="text-lg font-display font-semibold flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-accent" />
              Change Password
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-text-muted">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  placeholder="Enter current password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-text-muted">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  placeholder="Enter new password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-text-muted">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                />
              </div>

              <button className="btn-primary w-full justify-center mt-4">
                <Lock className="w-4 h-4" />
                Update Password
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
