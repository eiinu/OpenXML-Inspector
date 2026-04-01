import type { OpenXmlRule } from './types';

export const spreadsheetRules: OpenXmlRule[] = [
  {
    id: 'x-sheetData',
    title: '工作表数据 (sheetData)',
    category: 'SpreadsheetML',
    path: '/xl/worksheets/sheet1.xml',
    description: 'Excel 工作表主体数据区域，包含行（row）与单元格（c）。',
    tags: ['excel', 'sheetData', 'worksheet', 'cell'],
    highlights: ['行号在 row/@r', '单元格地址在 c/@r', '值内容通常在 v 或 is/t'],
    commonValues: [
      { name: 'row/@r', value: '1..N', note: '行号' },
      { name: 'c/@t', value: 'n|s|b|str|inlineStr', note: '单元格数据类型' },
      { name: 'c/@s', value: '0|1|2...', note: '样式索引（styles.xml）' }
    ]
  },
  {
    id: 'x-c',
    title: '单元格 (c)',
    category: 'SpreadsheetML',
    path: '/xl/worksheets/sheet1.xml',
    description: '单个单元格元素，可携带值、公式、样式和批注关系。',
    tags: ['excel', 'cell', 'c', 'formula'],
    highlights: ['f 表示公式', 'v 表示存储值', '共享字符串通过 t=s + v 索引到 sharedStrings.xml'],
    commonValues: [
      { name: '@r', value: 'A1|B2|C10', note: '单元格坐标' },
      { name: '@t', value: 's', note: '共享字符串类型' },
      { name: 'f/@t', value: 'normal|shared|array', note: '公式类型' }
    ]
  },
  {
    id: 'x-numFmt',
    title: '数字格式 (numFmt)',
    category: 'SpreadsheetML',
    path: '/xl/styles.xml',
    description: '定义 Excel 自定义数字格式，供 cellXfs 引用。',
    tags: ['excel', 'numFmt', 'styles', 'formatCode'],
    highlights: ['ID>=164 常为自定义格式', '格式码可表达日期、货币、百分比', '通过 xf/@numFmtId 绑定'],
    commonValues: [
      { name: '@numFmtId', value: '164+', note: '自定义格式 ID' },
      { name: '@formatCode', value: '#,##0.00_);[Red](#,##0.00)', note: '格式字符串' },
      { name: 'xf/@applyNumberFormat', value: '0|1', note: '是否应用数字格式' }
    ]
  },
  {
    id: 'x-dataValidation',
    title: '数据验证 (dataValidation)',
    category: 'SpreadsheetML',
    path: '/xl/worksheets/sheet1.xml',
    description: '定义下拉、数值范围、日期范围等输入规则。',
    tags: ['excel', 'validation', 'dataValidation', 'dropdown'],
    highlights: ['多个验证项由 dataValidations 包裹', 'sqref 指定应用区域', '公式条件在 formula1/formula2'],
    commonValues: [
      { name: '@type', value: 'list|whole|decimal|date|custom', note: '验证类型' },
      { name: '@operator', value: 'between|equal|greaterThan', note: '比较操作符' },
      { name: '@sqref', value: 'A1:A100 C1:C100', note: '作用单元格范围' }
    ]
  },
  {
    id: 'x-mergeCell',
    title: '合并单元格 (mergeCell)',
    category: 'SpreadsheetML',
    path: '/xl/worksheets/sheet1.xml',
    description: '记录合并区域引用，显示与编辑行为由首个单元格主导。',
    tags: ['excel', 'merge', 'mergeCell', 'range'],
    highlights: ['位于 mergeCells 节点内', 'ref 指定矩形区域', '格式通常只保留左上角单元格'],
    commonValues: [
      { name: '@ref', value: 'A1:C1', note: '合并区间' },
      { name: 'mergeCells/@count', value: '1..N', note: '合并数量' },
      { name: 'c/@s', value: 'styleId', note: '仅需为首单元格指定样式' }
    ]
  },
  {
    id: 'x-definedName',
    title: '命名区域 (definedName)',
    category: 'SpreadsheetML',
    path: '/xl/workbook.xml',
    description: '定义名称到公式或区域的映射，可用于公式和数据验证。',
    tags: ['excel', 'name', 'definedName', 'workbook'],
    highlights: ['工作簿级和工作表级名称均支持', '可定义常量和函数表达式', '本地名称受 localSheetId 限制'],
    commonValues: [
      { name: '@name', value: 'SalesRange', note: '名称标识符' },
      { name: '@localSheetId', value: '0|1...', note: '工作表作用域' },
      { name: 'text()', value: 'Sheet1!$A$1:$A$100', note: '引用公式/区域' }
    ]
  },
  {
    id: 'c-numFmt',
    title: '图表数字格式 (c:numFmt)',
    category: 'SpreadsheetML',
    path: '/xl/charts/chart1.xml',
    description: '定义图表轴、标签的数字显示格式。',
    tags: ['excel', 'chart', 'format', 'c:numFmt'],
    highlights: ['关联 formatCode 字符串', '可控制是否链接源格式', '常见于图表轴和数据标签'],
    commonValues: [
      { name: 'formatCode', value: '0.00%;[Red]-0.00%', note: '自定义正负数与颜色' },
      { name: 'sourceLinked', value: '0|1', note: '是否继承源数据格式' },
      { name: 'formatCode', value: 'yyyy-mm-dd', note: '日期展示格式' }
    ]
  }
];
