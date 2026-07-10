import { requireOwner } from '@/lib/auth/session';
import { db } from '@dispensary/db/client';
import { SettingsForm } from './settings-form';

export default async function SettingsPage() {
  await requireOwner();

  const settings = await db.query.businessSettings.findFirst();

  const safeSettings = {
    businessName: settings?.businessName || 'La Elegant Boutique',
    ownerName: settings?.ownerName || 'Owner',
    phone: settings?.phone || '',
    address: settings?.address || '',
    currency: settings?.currency || 'RWF',
    lowStockAlertQuantity: settings?.lowStockAlertQuantity || '5',
  };

  return (
    <section className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
      <aside className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-[#343434] dark:bg-[#222222] sm:p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--primary)]">
          Owner settings
        </p>
        <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-[#222222] dark:text-[#F5F5F5]">
          Settings
        </h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-[#6B7280] dark:text-[#A3A3A3]">
          Keep the shop details clean for reports, stock warnings, and daily work.
        </p>

        <div className="mt-5 divide-y divide-neutral-100 text-sm dark:divide-[#343434]">
          <div className="py-3">
            <p className="font-black text-[#222222] dark:text-[#F5F5F5]">Business details</p>
            <p className="mt-1 font-semibold leading-6 text-[#6B7280] dark:text-[#A3A3A3]">
              These names appear inside the system and reports.
            </p>
          </div>

          <div className="py-3">
            <p className="font-black text-[#222222] dark:text-[#F5F5F5]">Low stock warning</p>
            <p className="mt-1 font-semibold leading-6 text-[#6B7280] dark:text-[#A3A3A3]">
              This helps you know when products need restock.
            </p>
          </div>

          <div className="py-3">
            <p className="font-black text-[#222222] dark:text-[#F5F5F5]">Currency</p>
            <p className="mt-1 font-semibold leading-6 text-[#6B7280] dark:text-[#A3A3A3]">
              This shop uses RWF for all money records.
            </p>
          </div>
        </div>
      </aside>

      <section className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-[#343434] dark:bg-[#222222] sm:p-5">
        <div className="mb-5 border-b border-neutral-100 pb-4 dark:border-[#343434]">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--primary)]">
            Shop profile
          </p>
          <h2 className="mt-2 font-display text-2xl font-black tracking-tight text-[#222222] dark:text-[#F5F5F5]">
            Business details
          </h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-[#6B7280] dark:text-[#A3A3A3]">
            Simple details only. No technical settings.
          </p>
        </div>

        <SettingsForm settings={safeSettings} />
      </section>
    </section>
  );
}
