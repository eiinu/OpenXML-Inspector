import type { OpenXmlRule } from './types';

export const wordprocessingRules: OpenXmlRule[] = [
  {
    id: 'w-p',
    title: '段落元素 (w:p)',
    category: 'WordprocessingML',
    path: '/word/document.xml',
    description: '表示 Word 文档中的一个段落容器，可包含文字、书签、批注等内容。',
    tags: ['word', 'paragraph', 'w:p', '段落'],
    highlights: ['通常包含一个或多个 w:r（run）', '段落样式通过 w:pPr 控制', '可带编号、缩进、对齐等属性'],
    commonValues: [
      { name: 'w:jc/@w:val', value: 'left|center|right|both', note: '控制段落对齐方式' },
      { name: 'w:spacing/@w:line', value: '240', note: '行距，单位通常为 twentieths of a point' },
      { name: 'w:ind/@w:firstLine', value: '420', note: '首行缩进' }
    ]
  },
  {
    id: 'w-r',
    title: '文字运行 (w:r)',
    category: 'WordprocessingML',
    path: '/word/document.xml',
    description: '段落内最常见的文字运行单元，承载文本、字段、图片锚点等。',
    tags: ['word', 'run', 'w:r', '文字'],
    highlights: ['文字内容常位于 w:t', '样式通过 w:rPr 设置', '可包含分页符和换行符'],
    commonValues: [
      { name: 'w:b', value: 'on|off', note: '粗体开关' },
      { name: 'w:i', value: 'on|off', note: '斜体开关' },
      { name: 'w:sz/@w:val', value: '21|24|28', note: '字号（半磅）' }
    ]
  },
  {
    id: 'w-tbl',
    title: '表格元素 (w:tbl)',
    category: 'WordprocessingML',
    path: '/word/document.xml',
    description: '定义 Word 表格，包含网格、行、单元格及样式信息。',
    tags: ['word', 'table', 'w:tbl', '单元格'],
    highlights: ['表格属性位于 w:tblPr', '列宽网格由 w:tblGrid 表示', '单元格内容存放在 w:tc > w:p'],
    commonValues: [
      { name: 'w:tblW/@w:type', value: 'auto|dxa|pct', note: '表格宽度计算方式' },
      { name: 'w:tblLayout/@w:type', value: 'autofit|fixed', note: '自适应或固定布局' },
      { name: 'w:vAlign/@w:val', value: 'top|center|bottom', note: '单元格垂直对齐方式' }
    ]
  },
  {
    id: 'w-hyperlink',
    title: '超链接 (w:hyperlink)',
    category: 'WordprocessingML',
    path: '/word/document.xml',
    description: '将文本运行包装为超链接，可指向书签或外部地址。',
    tags: ['word', 'hyperlink', 'w:hyperlink', '链接'],
    highlights: ['外部链接依赖关系文件中的 r:id', '内部跳转使用 w:anchor', '可包含多个 w:r'],
    commonValues: [
      { name: 'r:id', value: 'rId5', note: '关系 ID，对应 document.xml.rels' },
      { name: 'w:anchor', value: 'Heading1', note: '跳转到文档内书签' },
      { name: 'w:history', value: '1', note: '链接是否记录访问历史' }
    ]
  },
  {
    id: 'w-sdt',
    title: '内容控件 (w:sdt)',
    category: 'WordprocessingML',
    path: '/word/document.xml',
    description: '结构化文档标签（Content Control），用于表单和模板占位。',
    tags: ['word', 'sdt', 'content control', '表单'],
    highlights: ['元数据在 w:sdtPr', '内容体在 w:sdtContent', '可绑定自定义 XML 数据'],
    commonValues: [
      { name: 'w:alias/@w:val', value: '客户名称', note: '控件显示名称' },
      { name: 'w:tag/@w:val', value: 'customer_name', note: '程序识别标签' },
      { name: 'w:lock/@w:val', value: 'sdtLocked|contentLocked', note: '锁定策略' }
    ]
  },
  {
    id: 'w-numPr',
    title: '编号属性 (w:numPr)',
    category: 'WordprocessingML',
    path: '/word/document.xml',
    description: '段落编号/项目符号的关键属性，映射到 numbering.xml。',
    tags: ['word', 'numbering', 'w:numPr', '列表'],
    highlights: ['w:numId 指定编号定义', 'w:ilvl 指定层级', '可与段落样式联合控制列表外观'],
    commonValues: [
      { name: 'w:numId/@w:val', value: '1|2|3', note: '编号实例 ID' },
      { name: 'w:ilvl/@w:val', value: '0|1|2', note: '多级列表层级' },
      { name: 'w:lvlText/@w:val', value: '%1.%2.', note: '级别编号文本模板' }
    ]
  },
  {
    id: 'w-sectPr',
    title: '节属性 (w:sectPr)',
    category: 'WordprocessingML',
    path: '/word/document.xml',
    description: '定义页面尺寸、方向、页边距、页眉页脚等节级设置。',
    tags: ['word', 'section', 'w:sectPr', '页面'],
    highlights: ['可位于文档末尾或段落属性内', '页码起始值可在此配置', '页边距单位为 twentieths of point'],
    commonValues: [
      { name: 'w:pgSz/@w:orient', value: 'portrait|landscape', note: '页面方向' },
      { name: 'w:pgMar/@w:top', value: '1440', note: '上边距（1英寸）' },
      { name: 'w:titlePg', value: 'present', note: '首页不同页眉页脚' }
    ]
  },
  {
    id: 'w-fldSimple',
    title: '简单域 (w:fldSimple)',
    category: 'WordprocessingML',
    path: '/word/document.xml',
    description: '以单元素方式表示域代码（例如页码、日期、链接）。',
    tags: ['word', 'field', 'w:fldSimple', '域'],
    highlights: ['复杂域可由 begin/separate/end 的 w:fldChar 表示', '指令写在 w:instr 属性', '显示文本仍放在 w:r/w:t'],
    commonValues: [
      { name: 'w:instr', value: 'PAGE \\* MERGEFORMAT', note: '页码域示例' },
      { name: 'w:dirty', value: 'true|false', note: '是否需更新域值' },
      { name: 'w:fldLock', value: 'true|false', note: '是否锁定域更新' }
    ]
  }
];
