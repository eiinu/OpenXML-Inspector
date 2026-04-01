import type { OpenXmlRule } from './types';

export const packagingRules: OpenXmlRule[] = [
  {
    id: 'rels',
    title: '关系文件 (.rels)',
    category: 'Packaging',
    path: '/_rels/.rels',
    description: 'Open Packaging Convention 的关系映射文件，连接包内部部件与外部资源。',
    tags: ['opc', 'relationship', '.rels', 'TargetMode'],
    highlights: ['每个关系含 Id、Type、Target', 'TargetMode=External 表示外部链接', '常用于图片、主题、样式的引用链路'],
    commonValues: [
      { name: 'Type', value: '.../officeDocument', note: '主文档入口关系类型' },
      { name: 'TargetMode', value: 'Internal|External', note: '内部或外部资源' },
      { name: 'Target', value: 'word/document.xml', note: '关系目标路径' }
    ]
  },
  {
    id: 'content-types',
    title: '内容类型 ([Content_Types].xml)',
    category: 'Packaging',
    path: '/[Content_Types].xml',
    description: '声明包内每个部件的 MIME 类型，是打开文档所必需的索引文件。',
    tags: ['opc', 'content type', 'override', 'default'],
    highlights: ['Default 按扩展名映射', 'Override 按 PartName 精确映射', '缺失映射会导致部件无法识别'],
    commonValues: [
      { name: 'Default/@Extension', value: 'xml|rels|png', note: '扩展名条目' },
      { name: 'Override/@PartName', value: '/word/document.xml', note: '部件绝对路径' },
      { name: '@ContentType', value: 'application/vnd.openxmlformats-officedocument...', note: 'MIME 类型字符串' }
    ]
  },
  {
    id: 'core-properties',
    title: '核心属性 (cp:coreProperties)',
    category: 'Packaging',
    path: '/docProps/core.xml',
    description: '存放作者、标题、创建时间等元数据。',
    tags: ['opc', 'metadata', 'core properties', 'dc:title'],
    highlights: ['采用 Dublin Core 元数据命名空间', '创建/修改时间常为 W3C 日期格式', '可用于审计文档来源'],
    commonValues: [
      { name: 'dc:title', value: 'Quarterly Report', note: '文档标题' },
      { name: 'dc:creator', value: 'Alice', note: '作者' },
      { name: 'dcterms:created', value: '2026-03-28T09:30:00Z', note: '创建时间' }
    ]
  },
  {
    id: 'extended-properties',
    title: '扩展属性 (Properties)',
    category: 'Packaging',
    path: '/docProps/app.xml',
    description: '记录应用层统计信息，如页数、词数、模板、应用名等。',
    tags: ['opc', 'app.xml', 'properties', 'statistics'],
    highlights: ['常见于 Office 自动维护字段', '不同应用写入字段略有差异', '可用于文档指纹分析'],
    commonValues: [
      { name: 'Application', value: 'Microsoft Office Word', note: '生成应用' },
      { name: 'Pages', value: '12', note: '页数统计' },
      { name: 'Company', value: 'Contoso Ltd.', note: '公司字段' }
    ]
  },
  {
    id: 'custom-properties',
    title: '自定义属性 (property)',
    category: 'Packaging',
    path: '/docProps/custom.xml',
    description: '用户自定义键值对元数据，可用于业务标识、审批流等。',
    tags: ['opc', 'custom property', 'vt:', 'metadata'],
    highlights: ['每个属性有 pid 与 name', '值类型通过 vt:* 节点标识', '可扩展业务字段而不改正文'],
    commonValues: [
      { name: 'property/@name', value: 'DocumentId', note: '属性名' },
      { name: 'vt:lpwstr', value: 'DOC-2026-001', note: '字符串值' },
      { name: 'vt:filetime', value: '2026-03-28T09:30:00Z', note: '时间值' }
    ]
  },
  {
    id: 'digital-signature-origin',
    title: '签名源关系 (Origin)',
    category: 'Packaging',
    path: '/_xmlsignatures/origin.sigs',
    description: '数字签名入口部件，关联一个或多个签名定义。',
    tags: ['opc', 'signature', 'origin', 'xmlsignatures'],
    highlights: ['主文档可通过关系指向签名源', '签名数据位于 _xmlsignatures/sig*.xml', '用于验证完整性与来源'],
    commonValues: [
      { name: '关系类型', value: '.../digital-signature/origin', note: '签名源关系类型' },
      { name: '目标部件', value: '/_xmlsignatures/origin.sigs', note: '签名源路径' },
      { name: '签名关系', value: '.../digital-signature/signature', note: '具体签名关系类型' }
    ]
  },
  {
    id: 'thumbnail-relationship',
    title: '缩略图关系 (thumbnail)',
    category: 'Packaging',
    path: '/docProps/thumbnail.jpeg',
    description: '文档预览缩略图资源，供资源管理器或系统预览显示。',
    tags: ['opc', 'thumbnail', 'preview', 'relationship'],
    highlights: ['通常为 jpeg/png', '由根关系或属性关系引用', '不影响正文内容解析'],
    commonValues: [
      { name: '关系类型', value: '.../metadata/thumbnail', note: '缩略图关系类型' },
      { name: 'Target', value: 'docProps/thumbnail.jpeg', note: '缩略图路径' },
      { name: 'ContentType', value: 'image/jpeg', note: 'MIME 类型' }
    ]
  },
  {
    id: 'customxml-item',
    title: '自定义 XML 数据项 (item)',
    category: 'Packaging',
    path: '/customXml/item1.xml',
    description: '存储业务自定义 XML 数据，可被内容控件数据绑定。',
    tags: ['opc', 'customXml', 'datastore', 'itemProps'],
    highlights: ['itemProps 记录 schema 信息', '可供 Word 内容控件绑定', '常用于模板化系统集成'],
    commonValues: [
      { name: '数据路径', value: '/customXml/item1.xml', note: '自定义 XML 主体' },
      { name: '属性路径', value: '/customXml/itemProps1.xml', note: '数据项元信息' },
      { name: '关联关系类型', value: '.../customXml', note: '部件关系类型' }
    ]
  },
  {
    id: 'embedded-package',
    title: '嵌入对象包 (Embedded Package)',
    category: 'Packaging',
    path: '/word/embeddings/oleObject1.bin',
    description: 'OLE 或嵌入文档对象的二进制包部件。',
    tags: ['opc', 'ole', 'embedding', 'object'],
    highlights: ['可嵌入 Excel/Visio 等对象', '通过关系从文档正文引用', '内容类型通常为 OLE 包'],
    commonValues: [
      { name: 'Target', value: 'embeddings/oleObject1.bin', note: '嵌入对象路径' },
      { name: '关系类型', value: '.../oleObject|.../package', note: '对象关系类型' },
      { name: 'ContentType', value: 'application/vnd.openxmlformats-officedocument.oleObject', note: '对象 MIME 类型' }
    ]
  },
  {
    id: 'font-table-part',
    title: '字体表部件 (fontTable)',
    category: 'Packaging',
    path: '/word/fontTable.xml',
    description: '记录文档引用字体及替代信息，辅助排版一致性。',
    tags: ['opc', 'font', 'fontTable', 'word'],
    highlights: ['字体声明在 w:fonts', '可标记嵌入许可信息', '缺失字体时用于替代策略'],
    commonValues: [
      { name: '关系类型', value: '.../fontTable', note: '字体表关系类型' },
      { name: '部件路径', value: '/word/fontTable.xml', note: '字体表位置' },
      { name: '字体名', value: 'w:font/@w:name', note: '字体标识' }
    ]
  },
  {
    id: 'theme-part',
    title: '主题部件关系 (theme)',
    category: 'Packaging',
    path: '/word/theme/theme1.xml',
    description: '主题 XML 部件关系，供文档颜色、字体、效果统一管理。',
    tags: ['opc', 'theme', 'relationship', 'officeDocument'],
    highlights: ['Word/PPT/Excel 均可引用主题部件', '主题变更可影响全局样式', '通常为 theme1.xml'],
    commonValues: [
      { name: '关系类型', value: '.../theme', note: '主题关系类型' },
      { name: 'Target', value: 'theme/theme1.xml', note: '主题部件路径' },
      { name: 'ContentType', value: 'application/vnd.openxmlformats-officedocument.theme+xml', note: '主题 MIME 类型' }
    ]
  },
  {
    id: 'glossary-document',
    title: '术语库文档 (glossaryDocument)',
    category: 'Packaging',
    path: '/word/glossary/document.xml',
    description: 'Word Building Blocks/自动图文集存储部件。',
    tags: ['opc', 'word', 'glossary', 'building blocks'],
    highlights: ['用于模板和自动图文集', '结构与主文档相似', '通过关系类型识别为 glossaryDocument'],
    commonValues: [
      { name: '关系类型', value: '.../glossaryDocument', note: '术语库关系类型' },
      { name: 'Target', value: 'glossary/document.xml', note: '术语库文档路径' },
      { name: '典型场景', value: 'dotx/dotm 模板', note: '模板复用' }
    ]
  }
];
