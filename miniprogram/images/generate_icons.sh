#!/bin/bash
# 生成简单的 TabBar 图标占位符
# 实际项目中需要替换为正式设计的图标

# 使用 Python 生成简单的 PNG 图标
python3 -c "
import struct, zlib

def create_png(width, height, color, alpha=255):
    def make_chunk(chunk_type, data):
        chunk = chunk_type + data
        return struct.pack('>I', len(data)) + chunk + struct.pack('>I', zlib.crc32(chunk) & 0xffffffff)
    
    header = b'\x89PNG\r\n\x1a\n'
    ihdr = make_chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0))
    
    raw_data = b''
    for y in range(height):
        raw_data += b'\x00'
        for x in range(width):
            cx, cy = width // 2, height // 2
            dx, dy = abs(x - cx), abs(y - cy)
            dist = (dx * dx + dy * dy) ** 0.5
            if dist < width * 0.35:
                raw_data += bytes([color[0], color[1], color[2], alpha])
            else:
                raw_data += bytes([0, 0, 0, 0])
    
    idat = make_chunk(b'IDAT', zlib.compress(raw_data))
    iend = make_chunk(b'IEND', b'')
    return header + ihdr + idat + iend

icons = {
    'home': (148, 163, 184),
    'home-active': (139, 92, 246),
    'assess': (148, 163, 184),
    'assess-active': (139, 92, 246),
}

for name, color in icons.items():
    png = create_png(81, 81, color)
    with open(f'{name}.png', 'wb') as f:
        f.write(png)
    print(f'Created {name}.png')
"
