'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { events } from '@/lib/data';
import { formatDate, formatCurrency, getEventTypeColor } from '@/lib/utils';
import { Calendar, Users, Ticket, CreditCard, Plus, Minus, MapPin, Globe } from 'lucide-react';

export default function EventRegistrationPage() {
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [tickets, setTickets] = useState(1);
  const [addons, setAddons] = useState({ donation: false, accommodation: false, transportation: false });
  const [form, setForm] = useState({ name: '', email: '', phone: '', requirements: '' });

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  const addonPrices = { donation: 500, accommodation: 2000, transportation: 1000 };
  const baseAmount = (selectedEvent?.price || 0) * tickets;
  const addonAmount = Object.entries(addons).reduce(
    (sum, [key, active]) => (active ? sum + addonPrices[key as keyof typeof addonPrices] * tickets : sum),
    0
  );
  const totalAmount = baseAmount + addonAmount;

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold">Event Registration</h1>
          <p className="text-text-muted text-sm mt-2">Register for upcoming spiritual events</p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <label className="block text-sm font-medium text-text-secondary mb-2">Select Event</label>
          <select
            value={selectedEventId}
            onChange={(e) => { setSelectedEventId(e.target.value); setTickets(1); }}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
          >
            <option value="">Choose an event...</option>
            {events.filter((e) => e.status === 'upcoming' || e.status === 'ongoing').map((event) => (
              <option key={event.id} value={event.id}>
                {event.title} - {formatCurrency(event.price)}
              </option>
            ))}
          </select>
        </div>

        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0 hidden sm:block"
                  style={{ backgroundImage: `url(${selectedEvent.image})` }}
                />
                <div className="flex-1">
                  <h2 className="text-xl font-display font-semibold">{selectedEvent.title}</h2>
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${getEventTypeColor(selectedEvent.type)}`}>
                    {selectedEvent.type}
                  </span>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedEvent.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedEvent.location}
                    </span>
                    <span className="flex items-center gap-1">
                      {selectedEvent.mode === 'online' ? <Globe className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                      {selectedEvent.mode}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-display font-semibold flex items-center gap-2 mb-4">
                <Ticket className="w-5 h-5 text-accent" />
                Ticket Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setTickets(Math.max(1, tickets - 1))}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-secondary hover:bg-white/10 transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-2xl font-bold w-8 text-center">{tickets}</span>
                <button
                  onClick={() => setTickets(Math.min(selectedEvent.capacity - selectedEvent.registered, tickets + 1))}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-secondary hover:bg-white/10 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-text-muted text-sm ml-2">
                  ({selectedEvent.capacity - selectedEvent.registered} available)
                </span>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-display font-semibold flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-accent" />
                Add-on Options
              </h3>
              <div className="space-y-3">
                {[
                  { key: 'donation' as const, label: 'Add Donation', desc: '₹500 - Support ashram activities' },
                  { key: 'accommodation' as const, label: 'Accommodation', desc: '₹2,000/night - On-site stay' },
                  { key: 'transportation' as const, label: 'Transportation', desc: '₹1,000 - Pickup & drop' },
                ].map((addon) => (
                  <label
                    key={addon.key}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                      addons[addon.key] ? 'bg-accent/10 border border-accent/30' : 'bg-white/5 border border-transparent'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium">{addon.label}</p>
                      <p className="text-xs text-text-muted">{addon.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={addons[addon.key]}
                      onChange={() => setAddons({ ...addons, [addon.key]: !addons[addon.key] })}
                      className="w-5 h-5 rounded accent-accent"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-display font-semibold mb-4">Registration Details</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-text-muted">Full Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-text-muted">Email</label>
                    <input
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-text-muted">Phone</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91-9876543210"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-text-muted">Special Requirements</label>
                  <textarea
                    value={form.requirements}
                    onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                    placeholder="Any special requirements or notes..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Ticket Price ({tickets}x)</span>
                  <span>{formatCurrency(baseAmount)}</span>
                </div>
                {addonAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Add-ons</span>
                    <span>{formatCurrency(addonAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-accent">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
              <button className="btn-primary w-full justify-center text-base">
                <CreditCard className="w-4 h-4" />
                Register & Pay
              </button>
            </div>
          </motion.div>
        )}

        {!selectedEventId && (
          <div className="glass-card rounded-2xl p-16 text-center">
            <Calendar className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">Select an event to begin registration</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
