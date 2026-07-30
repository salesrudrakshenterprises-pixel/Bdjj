import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function getTimeAgo(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  const intervals: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [604800, 'week'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
  ];

  for (const [secondsInInterval, label] of intervals) {
    const count = Math.floor(seconds / secondsInInterval);
    if (count >= 1) {
      return `${count} ${label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    upcoming: 'text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-300',
    ongoing: 'text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-300',
    completed: 'text-gray-600 bg-gray-50 dark:bg-gray-900 dark:text-gray-300',
    cancelled: 'text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-300',
    confirmed: 'text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-300',
    pending: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-300',
    failed: 'text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-300',
    scheduled: 'text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-300',
    basic: 'text-gray-600 bg-gray-50 dark:bg-gray-900 dark:text-gray-300',
    premium: 'text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-300',
    lifetime: 'text-purple-600 bg-purple-50 dark:bg-purple-950 dark:text-purple-300',
    read: 'text-gray-400',
    unread: 'text-amber-600 font-semibold',
  };
  return colors[status] || 'text-gray-600 bg-gray-50';
}

export function getEventTypeColor(type: string): string {
  const colors: Record<string, string> = {
    satsang: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    meditation: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    workshop: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    festival: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    retreat: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
}
