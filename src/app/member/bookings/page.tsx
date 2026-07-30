'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { events } from '@/lib/data';
import { formatDate, formatCurrency, getStatusColor } from '@/lib/utils';
import { Calendar, Ticket, X, Check, Clock, ArrowRight } from 'lucide-react';

const mockBookings = [
  {
    id: 'b1',
    eventId: '1',
    eventTitle: 'Divine Satsang with Gurudev',
    eventDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    tickets: 2,
    amount: 0,
    status: 'confirmed' as const,
    bookedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'b2',
    eventId: '2',
    eventTitle: 'Meditation Retreat',
    eventDate: new Date(Date.now() + 14 * 86400000).toISOString(),
    tickets: 1,
    amount: 5000,
    status: 'pending' as const,
    bookedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'b3',
    eventId: '4',
    eventTitle: 'Spiritual Workshop: Art of Living',
    eventDate: new Date(Date.now() - 10 * 86400000).toISOString(),
    tickets: 1,
    amount: 999,
    status: 'confirmed' as const,
    bookedAt: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
  {
    id: 'b4',
    eventId: '3',
    eventTitle: 'Festival of Lights Celebration',
    eventDate: new Date(Date.now() - 60 * 86400000).toISOString(),
    tickets: 3,
    amount: 0,
    status: 'cancelled' as const,
    bookedAt: new Date(Date.now() - 90 * 86400000).toISOString(),
  },
];

export default function BookingsPage() {
  const now = new Date();
  const upcoming = mockBookings.filter((b) => new Date(b.eventDate) > now);
  const past = mockBookings.filter((b) => new Date(b.eventDate) <= now);

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">My Bookings</h1>
            <p className="text-text-muted text-sm mt-1">Manage your event registrations</p>
          </div>
          <Link href="/events" className="btn-primary">
            <Calendar className="w-4 h-4" />
            Browse Events
          </Link>
        </div>

        {/* Upcoming */}
        <div className="mb-10">
          <h2 className="text-lg font-display font-semibold flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-accent" />
            Upcoming Bookings
          </h2>
          <div className="space-y-3">
            {upcoming.length > 0 ? (
              upcoming.map((booking, i) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-5"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                        <Ticket className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{booking.eventTitle}</h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                          <span>{formatDate(booking.eventDate)}</span>
                          <span>{booking.tickets} ticket{booking.tickets > 1 ? 's' : ''}</span>
                          {booking.amount > 0 && <span>{formatCurrency(booking.amount)}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-3 py-1 rounded-full capitalize ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                      {booking.status !== 'cancelled' && (
                        <button className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 transition-colors">
                          <X className="w-3 h-3" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="glass-card rounded-2xl p-10 text-center">
                <Calendar className="w-10 h-10 text-text-muted mx-auto mb-3" />
                <p className="text-text-muted mb-3">No upcoming bookings</p>
                <Link href="/events" className="btn-outline text-sm">
                  Browse Events <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Past */}
        <div>
          <h2 className="text-lg font-display font-semibold flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-text-muted" />
            Past Bookings
          </h2>
          <div className="space-y-3">
            {past.length > 0 ? (
              past.map((booking, i) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-5 opacity-70"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-text-muted shrink-0">
                        <Ticket className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-secondary">{booking.eventTitle}</h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                          <span>{formatDate(booking.eventDate)}</span>
                          <span>{booking.tickets} ticket{booking.tickets > 1 ? 's' : ''}</span>
                          {booking.amount > 0 && <span>{formatCurrency(booking.amount)}</span>}
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full capitalize ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="glass-card rounded-2xl p-10 text-center">
                <p className="text-text-muted">No past bookings</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
