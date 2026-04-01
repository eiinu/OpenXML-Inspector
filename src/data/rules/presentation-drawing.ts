import type { OpenXmlRule } from './types';

export const presentationDrawingRules: OpenXmlRule[] = [
  {
    id: 'p-sld',
    title: '幻灯片根元素 (p:sld)',
    category: 'PresentationML',
    path: '/ppt/slides/slide1.xml',
    description: '单页幻灯片根节点，包含通用数据与形状树。',
    tags: ['ppt', 'slide', 'p:sld', 'presentationml'],
    highlights: ['普通内容在 p:cSld', '页面属性在 p:sldLayoutIdLst 关联布局', '关系文件负责资源链接'],
    commonValues: [
      { name: 'p:cSld', value: 'present', note: '公共幻灯片数据容器' },
      { name: 'p:clrMapOvr', value: 'masterClrMapping|overrideClrMapping', note: '颜色映射覆盖' },
      { name: 'p:transition', value: 'fade|push|wipe', note: '切换效果定义' }
    ]
  },
  {
    id: 'p-sp',
    title: '演示文本形状 (p:sp)',
    category: 'PresentationML',
    path: '/ppt/slides/slide1.xml',
    description: 'PPT 中最常见的文本/占位符形状元素。',
    tags: ['ppt', 'shape', 'p:sp', 'placeholder'],
    highlights: ['非可视属性在 p:nvSpPr', '几何与变换在 p:spPr', '文本在 p:txBody'],
    commonValues: [
      { name: 'p:ph/@type', value: 'title|body|ctrTitle|subTitle', note: '占位符类型' },
      { name: 'a:xfrm/a:off', value: 'x,y (EMU)', note: '形状位置' },
      { name: 'a:xfrm/a:ext', value: 'cx,cy (EMU)', note: '形状尺寸' }
    ]
  },
  {
    id: 'a-sp',
    title: '图形形状 (a:sp)',
    category: 'DrawingML',
    path: '/ppt/slides/slide1.xml',
    description: 'DrawingML 场景中的基本形状对象，包含几何、填充、文本框等定义。',
    tags: ['ppt', 'shape', 'drawingml', 'a:sp'],
    highlights: ['几何形状由 a:prstGeom 控制', '文本内容通常在 a:txBody 内', '样式可继承主题和版式'],
    commonValues: [
      { name: 'a:prstGeom/@prst', value: 'rect|roundRect|ellipse', note: '预设几何类型' },
      { name: 'a:solidFill', value: 'schemeClr|srgbClr', note: '填充颜色来源' },
      { name: 'a:ln/@w', value: '9525', note: '线宽（EMU）' }
    ]
  },
  {
    id: 'a-blip',
    title: '图像引用 (a:blip)',
    category: 'DrawingML',
    path: '/ppt/slides/slide1.xml',
    description: '用于引用嵌入或外部图片资源，常见于图片和填充设置。',
    tags: ['drawingml', 'image', 'a:blip', 'r:embed'],
    highlights: ['r:embed 指向 .rels 内图片关系', '可叠加图像效果', '也可使用 r:link 外链图片'],
    commonValues: [
      { name: 'r:embed', value: 'rId2', note: '嵌入资源关系 ID' },
      { name: 'r:link', value: 'rId9', note: '外部图片关系 ID' },
      { name: 'cstate', value: 'print|screen|email', note: '压缩状态提示' }
    ]
  },
  {
    id: 'a-theme',
    title: '主题定义 (a:theme)',
    category: 'DrawingML',
    path: '/ppt/theme/theme1.xml',
    description: 'Office 主题文件，定义配色、字体和效果方案。',
    tags: ['drawingml', 'theme', 'a:theme', 'color scheme'],
    highlights: ['clrScheme 定义主题色', 'fontScheme 定义中西文字体', 'fmtScheme 定义填充线条效果'],
    commonValues: [
      { name: 'a:clrScheme', value: 'dk1|lt1|accent1..accent6', note: '主题色槽位' },
      { name: 'a:latin/@typeface', value: 'Calibri|Arial', note: '拉丁文字体' },
      { name: 'a:effectStyleLst', value: 'glow|shadow|softEdge', note: '效果样式集合' }
    ]
  },
  {
    id: 'a-txBody',
    title: '文本主体 (a:txBody)',
    category: 'DrawingML',
    path: '/ppt/slides/slide1.xml',
    description: '承载形状内文本内容和段落属性的容器。',
    tags: ['drawingml', 'text', 'a:txBody', 'paragraph'],
    highlights: ['段落元素是 a:p', '默认文本样式在 a:lstStyle', '文本方向与边距在 bodyPr'],
    commonValues: [
      { name: 'a:bodyPr/@wrap', value: 'square|none', note: '自动换行策略' },
      { name: 'a:bodyPr/@anchor', value: 't|ctr|b', note: '垂直对齐' },
      { name: 'a:pPr/@algn', value: 'l|ctr|r|just', note: '段落对齐' }
    ]
  }
];
