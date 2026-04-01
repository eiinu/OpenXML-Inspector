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
  },
  {
    id: 'p-pic',
    title: '图片形状 (p:pic)',
    category: 'PresentationML',
    path: '/ppt/slides/slide1.xml',
    description: '幻灯片中的图片对象，包含非可视属性、变换和图像填充。',
    tags: ['ppt', 'picture', 'p:pic', 'image'],
    highlights: ['图片引用在 a:blip', '裁剪参数在 a:srcRect', '位置尺寸由 a:xfrm 控制'],
    commonValues: [
      { name: 'p:nvPicPr', value: 'cNvPr + cNvPicPr + nvPr', note: '非可视属性集合' },
      { name: 'a:blip/@r:embed', value: 'rId3', note: '图片资源关系' },
      { name: 'a:stretch/a:fillRect', value: 'present', note: '填充拉伸方式' }
    ]
  },
  {
    id: 'p-graphicFrame',
    title: '图形框架 (p:graphicFrame)',
    category: 'PresentationML',
    path: '/ppt/slides/slide1.xml',
    description: '承载图表、表格、SmartArt 等复合对象的框架容器。',
    tags: ['ppt', 'chart', 'table', 'p:graphicFrame'],
    highlights: ['具体对象在 a:graphicData URI 中识别', '图表通过关系引用 chartX.xml', '可设置名称和锁定属性'],
    commonValues: [
      { name: 'a:graphicData/@uri', value: '.../chart|.../table|.../diagram', note: '对象类型 URI' },
      { name: 'cNvPr/@name', value: 'Chart 2', note: '对象名称' },
      { name: 'xfrm/off+ext', value: 'EMU', note: '位置与尺寸' }
    ]
  },
  {
    id: 'p-notes',
    title: '备注页 (p:notes)',
    category: 'PresentationML',
    path: '/ppt/notesSlides/notesSlide1.xml',
    description: '每页幻灯片关联的演讲者备注内容。',
    tags: ['ppt', 'notes', 'p:notes', 'speaker'],
    highlights: ['通过 slide 的关系链接', '布局与正文类似使用形状树', '可被导出讲义使用'],
    commonValues: [
      { name: '关联关系类型', value: '.../notesSlide', note: '从 slideX.xml.rels 指向' },
      { name: 'p:cSld', value: 'present', note: '备注页公共数据' },
      { name: '文本容器', value: 'p:sp > p:txBody', note: '备注文本位置' }
    ]
  },
  {
    id: 'p-transition',
    title: '切换动画 (p:transition)',
    category: 'PresentationML',
    path: '/ppt/slides/slide1.xml',
    description: '定义幻灯片切换效果和速度。',
    tags: ['ppt', 'transition', 'animation', 'p:transition'],
    highlights: ['可设持续时长和触发方式', '支持方向参数', '可能带声音增强效果'],
    commonValues: [
      { name: '@spd', value: 'slow|med|fast', note: '切换速度' },
      { name: '子元素', value: 'p:fade|p:push|p:wipe', note: '切换类型' },
      { name: '@advClick', value: '0|1', note: '是否允许点击切换' }
    ]
  },
  {
    id: 'a-gradFill',
    title: '渐变填充 (a:gradFill)',
    category: 'DrawingML',
    path: '/ppt/slides/slide1.xml',
    description: '定义形状、文本或背景的渐变色填充。',
    tags: ['drawingml', 'gradient', 'a:gradFill', 'fill'],
    highlights: ['颜色停靠点在 gsLst', '支持线性和路径渐变', '可与主题色联动'],
    commonValues: [
      { name: 'a:gs/@pos', value: '0..100000', note: '渐变停靠点位置' },
      { name: 'a:lin/@ang', value: '5400000', note: '渐变角度（1/60000 度）' },
      { name: 'a:path/@path', value: 'shape|circle|rect', note: '路径渐变模式' }
    ]
  },
  {
    id: 'a-effectLst',
    title: '效果列表 (a:effectLst)',
    category: 'DrawingML',
    path: '/ppt/slides/slide1.xml',
    description: '定义阴影、发光、柔化边缘等视觉效果。',
    tags: ['drawingml', 'effects', 'a:effectLst', 'shadow'],
    highlights: ['可叠加多个效果', '常出现在样式和直接格式中', '渲染结果依赖客户端实现'],
    commonValues: [
      { name: 'a:outerShdw', value: 'blurRad|dist|dir', note: '外阴影参数' },
      { name: 'a:glow/@rad', value: '38100', note: '发光半径（EMU）' },
      { name: 'a:softEdge/@rad', value: '25400', note: '柔化边缘半径' }
    ]
  },
  {
    id: 'a-videoFile',
    title: '视频文件引用 (a:videoFile)',
    category: 'DrawingML',
    path: '/ppt/slides/slide1.xml',
    description: '在媒体对象中引用视频资源文件。',
    tags: ['drawingml', 'video', 'a:videoFile', 'media'],
    highlights: ['通常与 p:pic 或媒体节点搭配', '可嵌入或外链', '播放设置在扩展属性中'],
    commonValues: [
      { name: 'r:link', value: 'rId12', note: '媒体关系 ID' },
      { name: 'contentType', value: 'video/mp4', note: '媒体 MIME 类型' },
      { name: '关联部件', value: '/ppt/media/video1.mp4', note: '媒体文件路径' }
    ]
  }
];
