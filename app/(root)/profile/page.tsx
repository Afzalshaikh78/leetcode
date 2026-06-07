import { getCurrentUserData } from "@/modules/auth/actions";
import { SubmissionHistory } from "@/modules/problems/components/submit-history";
import PlaylistsSection from "@/modules/profile/components/playlist-section";
import ProfileStats from "@/modules/profile/components/profile-stats";
import SolvedProblems from "@/modules/profile/components/solved-problems";
import UserInfoCard from "@/modules/profile/components/user-info-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Trophy } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { ActivityCalendar } from "@/modules/profile/components/activity-calendar";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const startOfDay = (date: Date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const toDateKey = (date: Date) => date.toISOString().slice(0, 10);

const calculateStreaks = (submissions: Array<{ createdAt: string | Date; status: string }>) => {
  const activeDays = new Set<string>();

  submissions.forEach((submission) => {
    if (submission.status !== "Accepted") return;
    const date = startOfDay(new Date(submission.createdAt));
    if (Number.isNaN(date.getTime())) return;
    activeDays.add(toDateKey(date));
  });

  const today = startOfDay(new Date());
  let currentStreak = 0;
  const cursor = new Date(today);

  while (activeDays.has(toDateKey(cursor))) {
    currentStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  let longestStreak = 0;
  let runLength = 0;
  const sortedDays = Array.from(activeDays).sort();

  for (let i = 0; i < sortedDays.length; i += 1) {
    if (i === 0) {
      runLength = 1;
    } else {
      const prev = startOfDay(new Date(sortedDays[i - 1]));
      const current = startOfDay(new Date(sortedDays[i]));
      const deltaDays = Math.round((current.getTime() - prev.getTime()) / MS_PER_DAY);
      runLength = deltaDays === 1 ? runLength + 1 : 1;
    }
    longestStreak = Math.max(longestStreak, runLength);
  }

  return { currentStreak, longestStreak };
};

const ProfilePage = async () => {
  const profileData = await getCurrentUserData();
  if (!profileData) {
    redirect("/sign-in"); // or show a not logged in message
  }

  const { currentStreak, longestStreak } = calculateStreaks(profileData?.submissions ?? []);

  return (
    <div className="min-h-screen py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <UserInfoCard userData={profileData} />

        <Card className="mb-8 overflow-hidden border-border/60">
          <CardContent className="flex flex-col gap-6 p-6">
            {/* Streak header row */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-emerald-500/10 p-4">
                  <Flame className="h-8 w-8 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Coding Streak</p>
                  <h2 className="text-3xl font-bold">
                    {currentStreak} day{currentStreak === 1 ? "" : "s"}
                  </h2>
                  <p className="text-sm text-muted-foreground">Consecutive days with at least one accepted submission.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Badge variant="secondary" className="gap-1.5 px-3 py-1.5">
                  <Flame className="h-3.5 w-3.5" />
                  Current {currentStreak}
                </Badge>
                <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
                  <Trophy className="h-3.5 w-3.5" />
                  Best {longestStreak}
                </Badge>
              </div>
            </div>

            {/* Activity calendar */}
            <ActivityCalendar />
          </CardContent>
        </Card>

        <ProfileStats submissions={profileData?.submissions ?? []} solvedCount={profileData?.solvedProblems?.length ?? 0} playlistCount={profileData?.playlists?.length ?? 0} />

        <SubmissionHistory submissions={profileData.submissions} />

        <div className="grid gap-8">
          <SolvedProblems solvedProblems={profileData.solvedProblems} />
          <PlaylistsSection playlists={profileData.playlists} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;