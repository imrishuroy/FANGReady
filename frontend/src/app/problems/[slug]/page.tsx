import ProblemPageClient from "./ProblemPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProblemPage({ params }: PageProps) {
  return <ProblemPageClient params={params} />;
}
