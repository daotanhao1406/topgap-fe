import type { Metadata } from "next";
import { MatchupExperience } from "@/components/matchup-pocs/experience";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Fiora vs Aatrox · Arena POC | Topgap",
    description: locale === "vi" ? "Bản thử nghiệm Arena: đọc nhanh kế hoạch đi đường, hồi chiêu và ngưỡng sức mạnh của kèo Fiora đối đầu Aatrox." : "Arena prototype: scan the lane plan, cooldowns and power spikes for Fiora versus Aatrox.",
    robots: { index: false, follow: true },
  };
}

export default function ArenaPage() {
  return <MatchupExperience />;
}
