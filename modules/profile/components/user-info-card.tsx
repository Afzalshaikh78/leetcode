import React from 'react';
import { User, Mail, Calendar, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';



type UserInfoCardProps = {
  userData: {
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    email?: string;
    role?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  } | null;
};

const UserInfoCard = ({ userData }: UserInfoCardProps) => {
  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const firstName = userData?.firstName ?? "";
  const lastName = userData?.lastName ?? "";
  const initials =
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.trim() ||
    userData?.email?.[0]?.toUpperCase() ||
    "U";
  const fullName = `${firstName} ${lastName}`.trim() || "Unknown User";

  return (
    <Card className="mb-8">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative overflow-visible shrink-0">
            <Avatar className="border-4 border-primary/20" style={{ width: "96px", height: "96px" }}>
              <AvatarImage src={userData?.imageUrl || ""} alt={fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <AvatarFallback className="text-3xl font-bold">{initials}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5 border-2 border-background">
              <Shield className="w-3 h-3 text-white" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{fullName}</h1>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{userData?.email || "Unknown email"}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Badge variant={userData?.role === "ADMIN" ? "destructive" : "secondary"}>{userData?.role || "USER"}</Badge>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Calendar className="w-4 h-4" />
                <span>Joined {formatDate(userData?.createdAt)}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <User className="w-4 h-4" />
                <span>Last active {formatDate(userData?.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
