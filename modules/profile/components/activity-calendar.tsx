"use client";

import { useEffect, useState } from "react";
import type { ActivityData } from "@/app/api/users/activity/route";

const COLORS = {
  0: "bg-muted",
  1: "bg-emerald-200 dark:bg-emerald-900",
  2: "bg-emerald-300 dark:bg-emerald-700",
  3: "bg-emerald-500 dark:bg-emerald-500",
  4: "bg-emerald-600 dark:bg-emerald-400",
} as const;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getIntensity(count: number): keyof typeof COLORS {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

// key in LOCAL time, not UTC
function toLocalDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function buildWeeks(): Date[][] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // go back exactly 52 weeks to a Sunday
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay() - 51 * 7);

  const weeks: Date[][] = [];
  const cursor = new Date(start);

  while (cursor <= today) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      const day = new Date(cursor);
      // only include days up to today
      if (day <= today) week.push(day);
      cursor.setDate(cursor.getDate() + 1);
    }
    if (week.length > 0) weeks.push(week);
  }

  return weeks;
}

export function ActivityCalendar() {
  const [activity, setActivity] = useState<ActivityData>({});
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users/activity")
      .then((r) => r.json())
      .then((data) => {
        setActivity(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const weeks = buildWeeks();

  // month label: pin to the week that contains the 1st of that month
  const monthLabels: { label: string; weekIndex: number }[] = [];
  weeks.forEach((week, wi) => {
    for (const day of week) {
      if (day.getDate() === 1) {
        monthLabels.push({ label: MONTHS[day.getMonth()], weekIndex: wi });
        break;
      }
    }
  });
  // always show label for the very first week
  if (monthLabels.length === 0 || monthLabels[0].weekIndex !== 0) {
    monthLabels.unshift({ label: MONTHS[weeks[0][0].getMonth()], weekIndex: 0 });
  }

  if (loading) {
    return <div className="h-28 animate-pulse rounded-lg bg-muted" />;
  }

  return (
    <div className="relative" onMouseLeave={() => setTooltip(null)}>
      {/* Month labels */}
      <div className="mb-1 flex" style={{ paddingLeft: "2rem" }}>
        {weeks.map((_, wi) => {
          const label = monthLabels.find((m) => m.weekIndex === wi);
          return (
            <div key={wi} className="shrink-0 text-[10px] text-muted-foreground" style={{ width: 14, marginRight: 2 }}>
              {label?.label ?? ""}
            </div>
          );
        })}
      </div>

      <div className="flex gap-0">
        {/* Day-of-week labels */}
        <div className="mr-2 flex flex-col" style={{ gap: 2 }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
            <div key={day} className="flex items-center justify-end text-[10px] text-muted-foreground" style={{ height: 14, visibility: i % 2 === 0 ? "hidden" : "visible" }}>
              {day}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-0.5 overflow-x-auto pb-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {/* pad incomplete first week with empty slots */}
              {wi === 0 && Array.from({ length: 7 - week.length }).map((_, i) => <div key={`pad-${i}`} style={{ height: 14, width: 14 }} />)}
              {week.map((day) => {
                const key = toLocalDateKey(day);
                const data = activity[key];
                const intensity = getIntensity(data?.total ?? 0);
                const colorClass = COLORS[intensity];

                return (
                  <div
                    key={key}
                    className={`h-3.5 w-3.5 shrink-0 cursor-pointer rounded-sm transition-transform hover:scale-125 ${colorClass}`}
                    onMouseEnter={(e) => {
                      const rect = (e.target as HTMLElement).getBoundingClientRect();
                      const parentRect = (e.target as HTMLElement).closest(".relative")!.getBoundingClientRect();
                      setTooltip({
                        text: data ? `${key}: ${data.total} submission${data.total !== 1 ? "s" : ""} (${data.accepted} accepted)` : `${key}: No activity`,
                        x: rect.left - parentRect.left + 6,
                        y: rect.top - parentRect.top - 36,
                      });
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
        <span>Less</span>
        {([0, 1, 2, 3, 4] as const).map((i) => (
          <div key={i} className={`h-2.5 w-2.5 rounded-sm ${COLORS[i]}`} />
        ))}
        <span>More</span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-50 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md"
          style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
