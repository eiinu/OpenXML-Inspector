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
      { name: 'w:ind/@w:firstLine', value: '420', note: '首行缩进' },
      { name: 'w:spacing/@w:before', value: '0|120|240', note: '段前间距' },
      { name: 'w:spacing/@w:after', value: '0|120|240', note: '段后间距' },
      { name: 'w:ind/@w:left', value: '0|420|720', note: '左缩进' },
      { name: 'w:ind/@w:right', value: '0|420|720', note: '右缩进' },
      { name: 'w:outlineLvl/@w:val', value: '0..8', note: '大纲级别（标题层级）' },
      { name: 'w:keepNext', value: 'on|off', note: '与下一段同页' },
      { name: 'w:keepLines', value: 'on|off', note: '段内行不分页' },
      { name: 'w:pageBreakBefore', value: 'on|off', note: '段前分页' },
      { name: 'w:widowControl', value: 'on|off', note: '孤行/寡行控制' },
      { name: 'w:numPr/w:numId/@w:val', value: '1|2|3', note: '关联编号定义（项目符号/列表）' }
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
      { name: 'w:sz/@w:val', value: '21|24|28', note: '字号（半磅）' },
      { name: 'w:u/@w:val', value: 'single|double|none', note: '下划线样式' },
      { name: 'w:color/@w:val', value: 'auto|000000|4472C4', note: '文字颜色' },
      { name: 'w:highlight/@w:val', value: 'yellow|green|none', note: '文字高亮' },
      { name: 'w:rFonts/@w:ascii', value: 'Calibri|宋体|Times New Roman', note: '西文字体' },
      { name: 'w:rFonts/@w:eastAsia', value: '宋体|等线|微软雅黑', note: '东亚字体' },
      { name: 'w:vertAlign/@w:val', value: 'superscript|subscript|baseline', note: '上标/下标' },
      { name: 'w:strike', value: 'on|off', note: '删除线' },
      { name: 'w:caps', value: 'on|off', note: '全大写显示' },
      { name: 'w:vanish', value: 'on|off', note: '隐藏文字' },
      { name: 'w:lang/@w:val', value: 'en-US|zh-CN|ja-JP', note: '运行语言' }
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
      { name: 'w:vAlign/@w:val', value: 'top|center|bottom', note: '单元格垂直对齐方式' },
      { name: 'w:tblLook/@w:val', value: '04A0|0000', note: '表格样式外观标志位' },
      { name: 'w:tblStyle/@w:val', value: 'TableGrid|LightShading', note: '表格样式 ID' }
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
      { name: 'w:history', value: '1', note: '链接是否记录访问历史' },
      { name: 'w:tooltip', value: '查看详情', note: '鼠标悬停提示文字' },
      { name: 'w:tgtFrame', value: '_blank|_self', note: '目标窗口/框架（兼容场景）' }
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
      { name: 'w:lock/@w:val', value: 'sdtLocked|contentLocked', note: '锁定策略' },
      { name: 'w:id/@w:val', value: '123456789', note: '内容控件实例 ID' },
      { name: 'w:dataBinding/@w:xpath', value: '/ns0:root/ns0:name', note: '绑定自定义 XML 的 XPath' }
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
      { name: 'w:lvlText/@w:val', value: '%1.%2.', note: '级别编号文本模板' },
      { name: 'w:numFmt/@w:val', value: 'decimal|bullet|lowerRoman', note: '编号格式' },
      { name: 'w:start/@w:val', value: '1', note: '当前级别起始编号' }
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
      { name: 'w:titlePg', value: 'present', note: '首页不同页眉页脚' },
      { name: 'w:pgNumType/@w:start', value: '1|5|10', note: '页码起始值' },
      { name: 'w:cols/@w:num', value: '1|2|3', note: '页面分栏数量' }
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
      { name: 'w:fldLock', value: 'true|false', note: '是否锁定域更新' },
      { name: '常见指令', value: 'HYPERLINK|DATE|MERGEFIELD', note: '常用域类型关键字' },
      { name: '结果文本位置', value: 'w:fldSimple > w:r > w:t', note: '域显示内容所在层级' }
    ]
  },
  {
    id: 'w-bookmarkStart',
    title: '书签开始 (w:bookmarkStart)',
    category: 'WordprocessingML',
    path: '/word/document.xml',
    description: '定义书签范围起点，需与 bookmarkEnd 的 id 成对出现。',
    tags: ['word', 'bookmark', 'w:bookmarkStart', 'anchor'],
    highlights: ['常用于目录跳转', '名称在 w:name', '范围跨段落时也可成立'],
    commonValues: [
      { name: 'w:id', value: '0|1|2...', note: '书签唯一编号' },
      { name: 'w:name', value: '_Toc123456789', note: '书签名' },
      { name: '对应结束标签', value: 'w:bookmarkEnd', note: '必须同 id 配对' },
      { name: '隐藏书签前缀', value: '_Toc|_Ref', note: 'Word 自动生成书签常见前缀' },
      { name: '可跳转目标', value: 'w:hyperlink/@w:anchor', note: '内部链接通常引用此名称' }
    ]
  },
  {
    id: 'w-commentRangeStart',
    title: '批注范围开始 (w:commentRangeStart)',
    category: 'WordprocessingML',
    path: '/word/document.xml',
    description: '标记批注作用文本的起点，与 commentRangeEnd 及 commentReference 配套。',
    tags: ['word', 'comment', 'review', 'w:commentRangeStart'],
    highlights: ['批注内容在 comments.xml', '范围可以跨多个 run', 'id 必须一致'],
    commonValues: [
      { name: 'w:id', value: '0|1|2...', note: '批注 ID' },
      { name: '关联部件', value: '/word/comments.xml', note: '批注正文存储位置' },
      { name: '引用标记', value: 'w:commentReference', note: '显示批注锚点' },
      { name: '范围结束标签', value: 'w:commentRangeEnd', note: '需与起始 id 一致' },
      { name: '批注作者信息', value: 'comments.xml/@w:author', note: '作者元数据位置' }
    ]
  },
  {
    id: 'w-footnoteReference',
    title: '脚注引用 (w:footnoteReference)',
    category: 'WordprocessingML',
    path: '/word/document.xml',
    description: '正文中的脚注引用标记，指向 footnotes.xml 中具体脚注。',
    tags: ['word', 'footnote', 'w:footnoteReference', 'reference'],
    highlights: ['脚注正文在单独部件', 'id=0/1 常为保留值', '通常位于 w:r 内'],
    commonValues: [
      { name: 'w:id', value: '2+', note: '脚注编号' },
      { name: '关联部件', value: '/word/footnotes.xml', note: '脚注内容' },
      { name: 'endnote 对应标签', value: 'w:endnoteReference', note: '尾注引用' },
      { name: '保留值', value: '0|-1', note: '分隔符/续注分隔符等保留脚注 ID' },
      { name: '正文位置', value: 'w:r 内', note: '通常作为运行级引用符号' }
    ]
  },
  {
    id: 'w-br',
    title: '换行/分页符 (w:br)',
    category: 'WordprocessingML',
    path: '/word/document.xml',
    description: '在 run 内插入换行符、分页符或分栏符。',
    tags: ['word', 'break', 'w:br', 'page break'],
    highlights: ['常见于手动换行 Shift+Enter', '分页符可强制新页', '列分隔适用于分栏布局'],
    commonValues: [
      { name: 'w:type', value: 'textWrapping|page|column', note: '换行类型' },
      { name: 'w:clear', value: 'none|left|right|all', note: '浮动对象清除方式' },
      { name: '常见位置', value: 'w:r 内', note: '运行级元素' },
      { name: '常见用途', value: 'Shift+Enter|分页符', note: '手动换行或强制分页' },
      { name: '与段落分页差异', value: 'w:br 是字符级，w:pageBreakBefore 是段落级', note: '两者作用层级不同' }
    ]
  },
  {
    id: 'w-tab',
    title: '制表符 (w:tab)',
    category: 'WordprocessingML',
    path: '/word/document.xml',
    description: '插入一个制表位跳转，结合段落 tabStops 控制位置。',
    tags: ['word', 'tab', 'w:tab', 'alignment'],
    highlights: ['仅表示一个 tab 字符', '定位规则在 w:tabs 内定义', '常见于目录和封面排版'],
    commonValues: [
      { name: 'w:tabs/w:tab/@w:val', value: 'left|center|right|decimal', note: '制表位类型' },
      { name: 'w:tabs/w:tab/@w:pos', value: '720|1440|2160', note: '制表位位置' },
      { name: 'w:leader', value: 'dot|hyphen|underscore', note: '前导符样式' },
      { name: 'w:tabs/w:tab/@w:leader', value: 'none|dot|middleDot', note: '制表位前导符' },
      { name: '生效范围', value: '段落级 w:pPr/w:tabs', note: 'tab 停靠点定义位置' }
    ]
  },
  {
    id: 'w-style',
    title: '样式定义 (w:style)',
    category: 'WordprocessingML',
    path: '/word/styles.xml',
    description: '定义段落、字符、表格、编号等样式模板。',
    tags: ['word', 'style', 'w:style', 'styles.xml'],
    highlights: ['样式可继承 basedOn', '可设置 next 样式', '文档默认样式也在此定义'],
    commonValues: [
      { name: 'w:type', value: 'paragraph|character|table|numbering', note: '样式类型' },
      { name: 'w:styleId', value: 'Heading1|Normal', note: '样式 ID' },
      { name: 'w:qFormat', value: 'present', note: '是否显示在快速样式库' },
      { name: 'w:basedOn/@w:val', value: 'Normal|BodyText', note: '继承基础样式' },
      { name: 'w:next/@w:val', value: 'Normal|BodyText', note: '按 Enter 后切换到的样式' }
    ]
  },
  {
    id: 'w-lvl',
    title: '编号级别 (w:lvl)',
    category: 'WordprocessingML',
    path: '/word/numbering.xml',
    description: '定义多级列表每一级的编号格式、文本和缩进。',
    tags: ['word', 'numbering', 'w:lvl', 'list level'],
    highlights: ['属于 abstractNum', '每级可定义不同 numFmt', 'lvlText 可引用上级编号'],
    commonValues: [
      { name: 'w:ilvl', value: '0..8', note: '列表层级' },
      { name: 'w:numFmt/@w:val', value: 'decimal|bullet|lowerLetter', note: '编号格式' },
      { name: 'w:start/@w:val', value: '1', note: '起始编号' },
      { name: 'w:lvlJc/@w:val', value: 'left|center|right', note: '编号文本对齐' },
      { name: 'w:pPr/w:ind/@w:left', value: '360|720|1080', note: '该级别段落缩进' }
    ]
  },
  {
    id: 'w-pict',
    title: '兼容图形容器 (w:pict)',
    category: 'WordprocessingML',
    path: '/word/document.xml',
    description: '旧版 VML 图形容器，用于兼容早期 Word 文档对象。',
    tags: ['word', 'vml', 'w:pict', 'legacy'],
    highlights: ['现代图形更推荐 DrawingML', '常包含 v:shape', '在旧模板中较常见'],
    commonValues: [
      { name: '子元素', value: 'v:shape|v:imagedata', note: 'VML 图元' },
      { name: '关系引用', value: 'r:id', note: '图片资源关系' },
      { name: '兼容性', value: 'legacy only', note: '面向旧格式兼容' },
      { name: '常见宿主', value: 'w:r > w:pict', note: '通常位于运行级' },
      { name: '替代方案', value: 'w:drawing', note: '现代文档建议使用 DrawingML' }
    ]
  }
];
