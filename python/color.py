import colorsys

def hsl_to_hex(h, s, l):
    # HSL values are in the range [0, 1]
    r, g, b = colorsys.hls_to_rgb(h / 360.0, l / 100.0, s / 100.0)
    hex_color = "#{:02X}{:02X}{:02X}".format(int(r * 255), int(g * 255), int(b * 255))
    return hex_color

# 例如，將 hsl(45, 100%, 71%) 轉換為 HEX
hsl_color = (45, 100, 71)
hex_color = hsl_to_hex(*hsl_color)
print(hex_color)
