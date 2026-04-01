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
  },
  {
    id: 'x-autoFilter',
    title: '自动筛选 (autoFilter)',
    category: 'SpreadsheetML',
    path: '/xl/worksheets/sheet1.xml',
    description: '定义工作表筛选区域与列筛选条件。',
    tags: ['excel', 'filter', 'autoFilter', 'worksheet'],
    highlights: ['ref 定义筛选范围', '每列条件在 filterColumn', '支持动态过滤和自定义条件'],
    commonValues: [
      { name: '@ref', value: 'A1:H200', note: '筛选作用范围' },
      { name: 'filterColumn/@colId', value: '0..N', note: '列索引（从0开始）' },
      { name: 'customFilters', value: 'operator+val', note: '自定义筛选条件' }
    ]
  },
  {
    id: 'x-conditionalFormatting',
    title: '条件格式 (conditionalFormatting)',
    category: 'SpreadsheetML',
    path: '/xl/worksheets/sheet1.xml',
    description: '定义满足条件时的样式高亮规则。',
    tags: ['excel', 'conditional formatting', 'cfRule', 'dxf'],
    highlights: ['支持公式与阈值规则', '样式引用 dxf', '优先级由 priority 控制'],
    commonValues: [
      { name: 'conditionalFormatting/@sqref', value: 'A2:A100', note: '应用范围' },
      { name: 'cfRule/@type', value: 'cellIs|expression|colorScale|dataBar|iconSet', note: '规则类型' },
      { name: 'cfRule/@priority', value: '1..N', note: '规则优先级' }
    ]
  },
  {
    id: 'x-table',
    title: '结构化表格 (table)',
    category: 'SpreadsheetML',
    path: '/xl/tables/table1.xml',
    description: 'Excel 表对象定义，包含列名、样式和筛选等信息。',
    tags: ['excel', 'table', 'structured reference', 'tableStyleInfo'],
    highlights: ['与 worksheet 中 tablePart 关联', '可启用总计行', '支持结构化引用公式'],
    commonValues: [
      { name: '@ref', value: 'A1:D200', note: '表格区域' },
      { name: '@displayName', value: 'SalesTable', note: '表格显示名' },
      { name: 'tableStyleInfo/@name', value: 'TableStyleMedium2', note: '表样式' }
    ]
  },
  {
    id: 'x-sheetView',
    title: '工作表视图 (sheetView)',
    category: 'SpreadsheetML',
    path: '/xl/worksheets/sheet1.xml',
    description: '保存冻结窗格、网格线显示、缩放等界面视图设置。',
    tags: ['excel', 'view', 'sheetView', 'pane'],
    highlights: ['多视图通过 workbookViewId 区分', '冻结窗格在 pane', '可记忆选中区域'],
    commonValues: [
      { name: '@showGridLines', value: '0|1', note: '是否显示网格线' },
      { name: 'pane/@state', value: 'frozen|split|frozenSplit', note: '窗格状态' },
      { name: 'selection/@sqref', value: 'A1', note: '当前选区' }
    ]
  },
  {
    id: 'x-calcPr',
    title: '计算属性 (calcPr)',
    category: 'SpreadsheetML',
    path: '/xl/workbook.xml',
    description: '工作簿级计算引擎设置，如重算模式和迭代计算。',
    tags: ['excel', 'calculation', 'calcPr', 'workbook'],
    highlights: ['控制自动/手动计算', '可开启迭代收敛', 'calcId 反映引擎版本'],
    commonValues: [
      { name: '@calcMode', value: 'auto|manual|autoNoTable', note: '计算模式' },
      { name: '@iterate', value: '0|1', note: '是否启用迭代计算' },
      { name: '@fullCalcOnLoad', value: '0|1', note: '打开时全量重算' }
    ]
  },
  {
    id: 'x-sharedStringItem',
    title: '共享字符串项 (si)',
    category: 'SpreadsheetML',
    path: '/xl/sharedStrings.xml',
    description: '共享字符串表的单条记录，单元格可通过索引重复引用。',
    tags: ['excel', 'shared strings', 'si', 'sst'],
    highlights: ['减少重复字符串体积', '可包含富文本 run', '索引来自 c/v 值'],
    commonValues: [
      { name: 'sst/@count', value: '总字符串数量', note: '含重复计数' },
      { name: 'sst/@uniqueCount', value: '去重数量', note: '唯一字符串计数' },
      { name: 'si/r', value: 'rich text run', note: '富文本片段' }
    ]
  },
  {
    id: 'x-pivotTableDefinition',
    title: '数据透视表定义 (pivotTableDefinition)',
    category: 'SpreadsheetML',
    path: '/xl/pivotTables/pivotTable1.xml',
    description: '定义数据透视表布局、字段、过滤和格式。',
    tags: ['excel', 'pivot table', 'pivotTableDefinition', 'cache'],
    highlights: ['依赖 pivotCacheDefinition', '行列字段分别配置', '可设置显示总计与重复标签'],
    commonValues: [
      { name: '@cacheId', value: '1|2|3', note: '缓存定义 ID' },
      { name: '@dataOnRows', value: '0|1', note: '值区域是否按行显示' },
      { name: 'location/@ref', value: 'A3:H20', note: '透视表输出区域' }
    ]
  },
  {
    id: 'x-worksheetProtection',
    title: '工作表保护 (sheetProtection)',
    category: 'SpreadsheetML',
    path: '/xl/worksheets/sheet1.xml',
    description: '控制工作表可编辑能力，可配合密码哈希保护。',
    tags: ['excel', 'protection', 'sheetProtection', 'lock'],
    highlights: ['允许细粒度权限控制', '可禁用插入行/列等操作', '密码字段为哈希值'],
    commonValues: [
      { name: '@sheet', value: '0|1', note: '是否启用保护' },
      { name: '@password', value: 'ABCD', note: '旧式哈希密码' },
      { name: '@formatCells', value: '0|1', note: '是否允许设置单元格格式' }
    ]
  }
];
