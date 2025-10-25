// server component (Next.js app router)
import RetiredCreditsList from "@/components/ledger/RetiredCreditsList";
import AuditorMode from "@/components/ledger/AuditorMode";

export const metadata = {
  title: "GreenChain — Ledger",
  description: "Complete history of retired carbon credits",
};

export default function LedgerPage() {
  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <header className="mb-2">
        <h1 className="text-3xl font-extrabold text-white">Retirement Ledger</h1>
        <p className="text-sm text-neutral-400 mt-1">Complete history of retired carbon credits</p>
      </header>

      <RetiredCreditsList />

      <AuditorMode />
    </div>
  );
}
