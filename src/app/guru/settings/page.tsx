'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import {
  User, Bell, Lock, Shield, Save, Eye, Settings, Camera, Mail, Phone
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function SettingsPage() {
  const [name, setName] = useState('Gurudev');
  const [email, setEmail] = useState('gurudev@bdjj.org');
  const [phone, setPhone] = useState('+91-9876543210');
  const [bio, setBio] = useState('Spiritual guide and founder of Brahm Divya Jeewan Jyoti. Dedicated to guiding souls on the path of divine awakening.');
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [apptReminders, setApptReminders] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [directBooking, setDirectBooking] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <div
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full cursor-pointer transition-all ${value ? 'bg-accent' : 'bg-white/10'}`}
    >
      <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all shadow ${value ? 'translate-x-5' : ''}`} />
    </div>
  );

  return (
    <main className="min-h-screen bg-bg-primary px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <SectionHeading title="Guru Settings" centered={false} />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <AnimatedCard>
              <h3 className="font-display text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-accent" /> Profile Settings
              </h3>
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light text-3xl font-bold text-[#1A1A2E] shadow-xl">
                      G
                    </div>
                    <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[#1A1A2E] hover:bg-accent-light transition-all shadow-lg">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-text-muted">Click to update photo</p>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-text-secondary">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 px-4 text-sm text-white outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-text-secondary">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">Bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 px-4 text-sm text-white outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <AnimatedCard>
              <h3 className="font-display text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent" /> Notification Preferences
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', desc: 'Receive updates via email', value: emailNotif, onChange: setEmailNotif },
                  { label: 'SMS Alerts', desc: 'Get text message alerts for urgent matters', value: smsAlerts, onChange: setSmsAlerts },
                  { label: 'Appointment Reminders', desc: 'Reminders before scheduled appointments', value: apptReminders, onChange: setApptReminders },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-accent/5 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle value={item.value} onChange={item.onChange} />
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <AnimatedCard>
              <h3 className="font-display text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Lock className="h-5 w-5 text-accent" /> Change Password
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-text-secondary">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 px-4 text-sm text-white placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 px-4 text-sm text-white placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 px-4 text-sm text-white placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                  </div>
                </div>
                <GlowButton variant="outline" size="sm">
                  <Lock className="h-4 w-4" /> Update Password
                </GlowButton>
              </div>
            </AnimatedCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <AnimatedCard>
              <h3 className="font-display text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" /> Privacy Settings
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Show Profile Publicly', desc: 'Your profile visible to all visitors', value: publicProfile, onChange: setPublicProfile },
                  { label: 'Show Email Address', desc: 'Display email on your public profile', value: showEmail, onChange: setShowEmail },
                  { label: 'Allow Direct Booking', desc: 'Let members book appointments directly', value: directBooking, onChange: setDirectBooking },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-accent/5 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle value={item.value} onChange={item.onChange} />
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center pb-8">
            <GlowButton onClick={handleSave} loading={saving} size="lg">
              <Save className="h-5 w-5" />
              Save All Settings
            </GlowButton>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
