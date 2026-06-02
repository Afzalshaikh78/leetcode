import React from "react";
import Link from "next/link";
import { BookOpen, Code2, Layers3, Trophy, Zap, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Code2,
    title: "Practice with purpose",
    description: "Solve carefully structured problems that build real interview skills, not just syntax memory.",
  },
  {
    icon: Trophy,
    title: "Track your progress",
    description: "See solved problems, recent submissions, and playlists in one place so momentum stays visible.",
  },
  {
    icon: Layers3,
    title: "Organize your learning",
    description: "Group problems into playlists and revisit them whenever you want a focused review session.",
  },
  {
    icon: Zap,
    title: "Fast feedback loop",
    description: "Run code, check test cases, and iterate quickly so every attempt turns into useful learning.",
  },
];

const stats = [
  { label: "Problem solving", value: "Focused" },
  { label: "Learning path", value: "Structured" },
  { label: "Progress tracking", value: "Built in" },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-32 text-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-10 flex items-center gap-2">
          <Badge className="bg-white/10 text-white hover:bg-white/10">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            About the platform
          </Badge>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-black tracking-tight text-white sm:text-6xl">
                A cleaner way to practice DSA and build consistency.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                This workspace is designed to help you practice problems, save them into playlists, review your solved list,
                and keep your progress visible without the noise.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-amber-400 text-slate-950 hover:bg-amber-300">
                <Link href="/problems">
                  Start solving
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Link href="/profile">
                  View profile
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <Card key={stat.label} className="border-white/10 bg-white/5 text-white backdrop-blur">
                  <CardContent className="p-5">
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <p className="mt-1 text-xl font-semibold">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="border-white/10 bg-white/5 text-white backdrop-blur">
            <CardContent className="space-y-6 p-8">
              <div className="rounded-2xl bg-gradient-to-br from-amber-400/20 to-cyan-400/10 p-6">
                <BookOpen className="h-8 w-8 text-amber-300" />
                <h2 className="mt-4 text-2xl font-bold">Built for momentum</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  The goal is simple: make practice feel organized, rewarding, and easy to return to every day.
                </p>
              </div>

              <div className="space-y-4">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div key={feature.title} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                      <div className="rounded-xl bg-amber-400/10 p-3">
                        <Icon className="h-5 w-5 text-amber-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{feature.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-300">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
