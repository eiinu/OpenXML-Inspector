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
  }
];
