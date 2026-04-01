export interface OpenXmlRule {
  id: string;
  title: string;
  category: string;
  path: string;
  description: string;
  tags: string[];
  highlights: string[];
  commonValues: Array<{ name: string; value: string; note: string }>;
}
