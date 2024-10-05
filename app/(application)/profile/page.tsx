"use client";

import { AuthController } from "@/components/profile/auth-controller";
import { AutoBidAuctions } from "@/components/profile/auto-bid-auctions";
import { ProfileInfoCard } from "@/components/profile/profile-info-card";
import { SideInfoCard } from "@/components/profile/side-info-card";
import { TrackedAuctions } from "@/components/profile/tracked-auctions";

export default async function ProfilePage() {
  return (
    <AuthController>
      <div className="flex justify-between items-center gap-6">
        <ProfileInfoCard />
        <SideInfoCard />
      </div>
      <TrackedAuctions />
      <AutoBidAuctions />
    </AuthController>
  );
}
