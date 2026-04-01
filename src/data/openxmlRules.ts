import { packagingRules } from './rules/packaging';
import { presentationDrawingRules } from './rules/presentation-drawing';
import { spreadsheetRules } from './rules/spreadsheet';
import type { OpenXmlRule } from './rules/types';
import { wordprocessingRules } from './rules/wordprocessing';

export type { OpenXmlRule };

export const openXmlRules: OpenXmlRule[] = [
  ...wordprocessingRules,
  ...spreadsheetRules,
  ...presentationDrawingRules,
  ...packagingRules
];
