import type { Locale } from "next-intl";
import type { MatchupDetail } from "./types";

const mockFioraVsAatrox: MatchupDetail = {
  id: "fiora-vs-aatrox",
  championId: "fiora",
  championName: "Fiora",
  opponentId: "aatrox",
  opponentName: "Aatrox",
  difficulty: "SKILL",
  difficultyNote: "Totally relies on parrying (W) his Q3 or W.",
  waveStrategy: "SLOW_PUSH",
  waveInstruction: "Slow push wave 1-2, crash wave 3 at 2:45. Force him to use Q on waves.",
  jungleGankWarningTime: "3:15 - 3:30",
  dos: [
    "Q diagonally into Q1/Q2 sweetspots to hit vitals and dodge knockup.",
    "Hold W for his Q3 or to block W pull back.",
    "Walk back to reset bad vital positions.",
  ],
  donts: [
    "Do not use W randomly before he uses E or Q3.",
    "Do not all-in level 1 if he has Ignite and you miss first vital.",
    "Watch out for E+Q combos changing sweetspot location instantly.",
  ],
  keyCooldowns: [
    {
      assetId: "AatroxQ",
      abilityKey: "Q",
      abilityName: "The Darkin Blade",
      cooldownRank1: 14,
      punishWindowTip: "14s window after he uses all 3 Qs or let them expire.",
    },
    {
      assetId: "AatroxW",
      abilityKey: "W",
      abilityName: "Infernal Chains",
      cooldownRank1: 20,
      punishWindowTip: "20s cooldown. If dodged, you control the lane c space.",
    },
  ],
  spikes: {
    level1to3: "Even. Fiora wins on vitals; Aatrox wins on spacing.",
    level6: "Fiora favored if R proc < 2.5s. Aatrox better teamfight extended drain tanking.",
    firstBase: "Tiamat for Fiora (wave clear); Phage/Kindlegem for Aatrox (HP/CDR).",
    firstItem: "Trinity/Hydra: Fiora begins to out-scale hard in 1v1.",
  },
  spellAdaptation: {
    againstSpell: "IGNITE",
    adjustmentTip: "He wants early kill. Concede prio wave 1-2, stay >70% HP.",
  },
};

const vietnameseMatchup: MatchupDetail = {
  ...mockFioraVsAatrox,
  difficultyNote: "Phụ thuộc vào việc dùng W phản đòn Q3 hoặc W của Aatrox.",
  waveInstruction: "Đẩy chậm đợt 1–2, đưa đợt 3 vào trụ lúc 2:45. Ép Aatrox dùng Q dọn lính.",
  dos: [
    "Q chéo qua vùng sát thương mạnh Q1/Q2 để đánh điểm yếu và né hất tung.",
    "Giữ W để chặn Q3 hoặc cú kéo về của W.",
    "Lùi lại để đổi vị trí điểm yếu bất lợi.",
  ],
  donts: [
    "Không dùng W tùy tiện trước khi Aatrox dùng E hoặc Q3.",
    "Không đánh đến cùng cấp 1 nếu Aatrox có Thiêu Đốt và bạn hụt điểm yếu đầu.",
    "Cẩn thận combo E+Q đổi vị trí vùng sát thương mạnh ngay lập tức.",
  ],
  keyCooldowns: [
    {
      assetId: "AatroxQ",
      abilityKey: "Q",
      abilityName: "Quỷ Kiếm Darkin",
      cooldownRank1: 14,
      punishWindowTip: "Có 14 giây sau khi Aatrox dùng cả 3 Q hoặc để chuỗi Q hết hạn.",
    },
    {
      assetId: "AatroxW",
      abilityKey: "W",
      abilityName: "Xiềng Xích Địa Ngục",
      cooldownRank1: 20,
      punishWindowTip: "Hồi chiêu 20 giây. Né được W giúp bạn kiểm soát khoảng trống trên đường.",
    },
  ],
  spikes: {
    level1to3: "Cân bằng. Fiora thắng nhờ điểm yếu; Aatrox thắng nhờ giữ khoảng cách.",
    level6:
      "Fiora có lợi nếu kích hoạt hết R trong < 2,5 giây. Aatrox mạnh hơn trong giao tranh kéo dài.",
    firstBase: "Fiora: Tiamat (dọn lính). Aatrox: Búa Gỗ/Hỏa Ngọc (máu/hồi chiêu).",
    firstItem: "Tam Hợp/Rìu Mãng Xà: Fiora bắt đầu vượt trội trong đấu tay đôi.",
  },
  spellAdaptation: {
    againstSpell: "IGNITE",
    adjustmentTip: "Aatrox muốn hạ gục sớm. Nhường quyền đẩy đợt 1–2, giữ trên 70% máu.",
  },
};

export function getSampleMatchup(locale: Locale): MatchupDetail {
  return locale === "vi" ? vietnameseMatchup : mockFioraVsAatrox;
}
