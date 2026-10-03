"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Shield } from "lucide-react";
import { Link } from "@/i18n/navigation";
import styles from "./reference-matchup.module.css";

const sections = [
  { id: "overview", label: "overview" },
  { id: "lane-plan", label: "lanePlan" },
  { id: "cooldowns", label: "cooldowns" },
  { id: "power-spikes", label: "powerSpikes" },
] as const;

export function MatchupSections() {
  const t = useTranslations("Matchup");
  const [section, setSection] = useState<string>("overview");
  return (
    <nav className={styles.sectionNav} aria-label={t("matchupSections")}>
      {sections.map(({ id, label }) => (
        <Link
          key={id}
          href={`#${id}`}
          aria-current={section === id ? "location" : undefined}
          onClick={() => setSection(id)}
        >
          {t(label)}
        </Link>
      ))}
      <span className={styles.laneTag}>
        <Shield size={12} aria-hidden="true" />
        {t("skillMatchup")}
      </span>
    </nav>
  );
}
