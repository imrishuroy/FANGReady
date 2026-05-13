import QuickComparisonSection from "./quick-comparison";
import KeyDifferencesSection from "./key-differences";
import HowToIdentifySection from "./how-to-identify";
import ConstraintsGuideSection from "./constraints-guide";
import CommonPitfallsSection from "./common-pitfalls";

export const sections: Record<string, React.ComponentType> = {
  "quick-comparison": QuickComparisonSection,
  "key-differences": KeyDifferencesSection,
  "how-to-identify": HowToIdentifySection,
  "constraints-guide": ConstraintsGuideSection,
  "common-pitfalls": CommonPitfallsSection,
};

export function getSectionComponent(
  sectionSlug: string
): React.ComponentType | undefined {
  return sections[sectionSlug];
}
