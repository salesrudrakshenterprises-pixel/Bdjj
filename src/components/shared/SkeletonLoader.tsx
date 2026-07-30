'use client';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('skeleton', className)} />;
}

export function HomeSkeleton() {
  return (
    <div className="space-y-4 pt-2">
      <Skeleton className="h-[200px] w-full rounded-[20px]" />
      <Skeleton className="h-[120px] w-full rounded-[20px]" />
      <div className="grid grid-cols-3 gap-3">
        <Skeleton className="h-[80px] rounded-[16px]" />
        <Skeleton className="h-[80px] rounded-[16px]" />
        <Skeleton className="h-[80px] rounded-[16px]" />
      </div>
      <Skeleton className="h-[160px] w-full rounded-[20px]" />
      <Skeleton className="h-[100px] w-full rounded-[20px]" />
      <Skeleton className="h-[180px] w-full rounded-[20px]" />
    </div>
  );
}
