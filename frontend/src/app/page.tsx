import { questions } from "@/lib/questions";
import Dashboard from "@/components/patterns/Dashboard";

export const metadata = {
  title: "FANGReady - Master DSA Patterns",
  description:
    "Curated DSA problems organized by pattern to ace your FAANG interviews.",
};

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Dashboard questions={questions} />
    </div>
  );
}
