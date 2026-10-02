import { SettingsForm } from "@/components/admin/settings-form";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function AdminPengaturanPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">
          Pengaturan
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Informasi ini tampil di halaman Cara Pesan.
        </p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
