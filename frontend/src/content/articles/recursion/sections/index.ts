import FundamentalsSection from './fundamentals';
import TypesSection from './types';
import NumbersSection from './numbers';
import StringsSection from './strings';
import ArraysSection from './arrays';
import DataStructuresSection from './data-structures';

export const sections: Record<string, React.ComponentType> = {
  fundamentals: FundamentalsSection,
  types: TypesSection,
  numbers: NumbersSection,
  strings: StringsSection,
  arrays: ArraysSection,
  'data-structures': DataStructuresSection,
};

export function getSectionComponent(sectionSlug: string): React.ComponentType | undefined {
  return sections[sectionSlug];
}
