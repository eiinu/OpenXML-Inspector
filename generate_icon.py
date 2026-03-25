from PIL import Image, ImageDraw, ImageFont

# 创建一个 512x512 的 RGBA 图像
img = Image.new('RGBA', (512, 512), (255, 255, 255, 255))
draw = ImageDraw.Draw(img)

# 绘制蓝色背景
draw.rectangle([0, 0, 512, 512], fill=(59, 130, 246, 255))

# 绘制文档图标
draw.rectangle([100, 150, 412, 362], fill=(255, 255, 255, 255))
draw.line([100, 180, 412, 180], fill=(203, 213, 225, 255), width=2)
draw.line([100, 210, 412, 210], fill=(203, 213, 225, 255), width=2)
draw.line([100, 240, 412, 240], fill=(203, 213, 225, 255), width=2)

# 绘制 XML 代码
try:
    font = ImageFont.truetype('/System/Library/Fonts/Menlo.ttc', 24)
except:
    font = ImageFont.load_default()

draw.text((120, 280), '<document>', font=font, fill=(59, 130, 246, 255))
draw.text((140, 310), '<body>', font=font, fill=(59, 130, 246, 255))
draw.text((160, 340), '<paragraph>', font=font, fill=(16, 185, 129, 255))
draw.text((140, 370), '</body>', font=font, fill=(59, 130, 246, 255))
draw.text((120, 400), '</document>', font=font, fill=(59, 130, 246, 255))

# 绘制放大镜
draw.ellipse([350, 100, 450, 200], outline=(255, 255, 255, 255), width=8)
draw.line([420, 170, 480, 230], fill=(255, 255, 255, 255), width=8)
draw.ellipse([385, 135, 415, 165], fill=(255, 255, 255, 255))

# 保存图像
img.save('src-tauri/icons/icon.png')
print('Icon generated successfully!')