import ProblemPageClient from "./ProblemPageClient";

export const runtime = "edge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProblemPage({ params }: PageProps) {
  return <ProblemPageClient params={params} />;
}
