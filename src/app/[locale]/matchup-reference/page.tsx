import type { Metadata } from "next";
import { ReferenceMatchup } from "@/components/matchup-pocs/reference-matchup";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "vi" ? "Fiora vs Aatrox · POC kèo đấu | Topgap" : "Fiora vs Aatrox · Matchup POC | Topgap",
    description: locale === "vi" ? "Giao diện thử nghiệm Fiora đối đầu Aatrox: kế hoạch đi đường, hồi chiêu và ngưỡng sức mạnh." : "Fiora versus Aatrox interface prototype: lane strategy, key cooldowns and power spikes.",
    robots: { index: false, follow: true },
  };
}

export default function ReferencePage() {
  return <ReferenceMatchup />;
}
