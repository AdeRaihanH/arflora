import { prisma } from "@/lib/db";

export const settingKeys = [
  "bankName",
  "bankAccount",
  "bankHolder",
  "paymentNote",
] as const;

export type SettingKey = (typeof settingKeys)[number];

export const defaultSettings: Record<SettingKey, string> = {
  bankName: "",
  bankAccount: "",
  bankHolder: "",
  paymentNote: "",
};

export async function getSettings(): Promise<Record<SettingKey, string>> {
  const rows = await prisma.setting.findMany({
    where: { key: { in: [...settingKeys] } },
  });
  const result = { ...defaultSettings };
  for (const row of rows) {
    if ((settingKeys as readonly string[]).includes(row.key)) {
      result[row.key as SettingKey] = row.value;
    }
  }
  return result;
}
