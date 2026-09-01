// Seeded Random Number Generator for reproducible textures
export class SeededRNG {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  // Mulberry32 algorithm - fast and good quality
  next(): number {
    let t = (this.seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // Range helper
  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  // Integer range
  int(min: number, max: number): number {
    return Math.floor(this.range(min, max + 1));
  }

  // Gaussian distribution approximation
  gaussian(mean: number = 0, std: number = 1): number {
    const u1 = this.next();
    const u2 = this.next();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return z * std + mean;
  }
}

// Perlin-like noise implementation
export class PerlinNoise {
  private permutation: number[];
  private rng: SeededRNG;

  constructor(seed: number) {
    this.rng = new SeededRNG(seed);
    this.permutation = this.generatePermutation();
  }

  private generatePermutation(): number[] {
    const p = Array.from({ length: 256 }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = 255; i > 0; i--) {
      const j = this.rng.int(0, i);
      [p[i], p[j]] = [p[j], p[i]];
    }
    return [...p, ...p];
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  noise2D(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);

    const u = this.fade(x);
    const v = this.fade(y);

    const A = this.permutation[X] + Y;
    const B = this.permutation[X + 1] + Y;

    return this.lerp(
      this.lerp(
        this.grad(this.permutation[A], x, y),
        this.grad(this.permutation[B], x - 1, y),
        u
      ),
      this.lerp(
        this.grad(this.permutation[A + 1], x, y - 1),
        this.grad(this.permutation[B + 1], x - 1, y - 1),
        u
      ),
      v
    );
  }

  // Fractal Brownian Motion for more complex textures
  fbm(
    x: number,
    y: number,
    octaves: number = 6,
    lacunarity: number = 2,
    persistence: number = 0.5
  ): number {
    let value = 0;
    let amplitude = 1;
    let frequency = 1;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      value += amplitude * this.noise2D(x * frequency, y * frequency);
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= lacunarity;
    }

    return value / maxValue;
  }
}

// Style variant configurations
export interface ConcreteStyleConfig {
  name: string;
  description: string;
  // Base color palette (HSL values)
  baseHue: number;
  baseSaturation: number;
  baseLightness: number;
  lightnessVariation: number;
  // Texture parameters
  noiseScale: number;
  noiseOctaves: number;
  noisePersistence: number;
  // Surface features
  porosity: number; // 0-1, density of small holes
  poreSize: [number, number]; // min, max radius
  // Cracks
  crackDensity: number; // 0-1
  crackWidth: [number, number];
  crackLength: [number, number];
  // Aggregate (stones/pebbles)
  aggregateDensity: number;
  aggregateSize: [number, number];
  aggregateColors: string[];
  // Special effects
  stainDensity: number;
  stainSize: [number, number];
  stainOpacity: [number, number];
  // Form lines (board-formed concrete)
  formLines: boolean;
  formLineSpacing: number;
  formLineWidth: number;
  formLineOpacity: number;
  // Weathering
  weatheringIntensity: number;
  edgeDarkening: number;
}

export const CONCRETE_STYLES: Record<string, ConcreteStyleConfig> = {
  brutalist: {
    name: "Raw Brutalist",
    description: "Heavy, monolithic concrete with deep texture and prominent cracks",
    baseHue: 35,
    baseSaturation: 8,
    baseLightness: 55,
    lightnessVariation: 15,
    noiseScale: 0.008,
    noiseOctaves: 8,
    noisePersistence: 0.6,
    porosity: 0.15,
    poreSize: [1, 4],
    crackDensity: 0.4,
    crackWidth: [1, 3],
    crackLength: [30, 150],
    aggregateDensity: 0,
    aggregateSize: [0, 0],
    aggregateColors: [],
    stainDensity: 0.3,
    stainSize: [20, 80],
    stainOpacity: [0.05, 0.15],
    formLines: false,
    formLineSpacing: 0,
    formLineWidth: 0,
    formLineOpacity: 0,
    weatheringIntensity: 0.3,
    edgeDarkening: 0.2,
  },
  polished: {
    name: "Polished Industrial",
    description: "Smooth, refined surface with subtle aggregate and minimal imperfections",
    baseHue: 30,
    baseSaturation: 5,
    baseLightness: 65,
    lightnessVariation: 8,
    noiseScale: 0.015,
    noiseOctaves: 4,
    noisePersistence: 0.4,
    porosity: 0.02,
    poreSize: [0.5, 1.5],
    crackDensity: 0.05,
    crackWidth: [0.5, 1],
    crackLength: [10, 40],
    aggregateDensity: 0.3,
    aggregateSize: [2, 6],
    aggregateColors: ["#8a8a8a", "#a0a0a0", "#707070", "#b8b8b8"],
    stainDensity: 0.05,
    stainSize: [10, 30],
    stainOpacity: [0.02, 0.06],
    formLines: false,
    formLineSpacing: 0,
    formLineWidth: 0,
    formLineOpacity: 0,
    weatheringIntensity: 0.05,
    edgeDarkening: 0.05,
  },
  weathered: {
    name: "Weathered Patina",
    description: "Aged concrete with water stains, erosion marks, and organic patina",
    baseHue: 40,
    baseSaturation: 12,
    baseLightness: 50,
    lightnessVariation: 20,
    noiseScale: 0.006,
    noiseOctaves: 7,
    noisePersistence: 0.55,
    porosity: 0.25,
    poreSize: [1, 5],
    crackDensity: 0.6,
    crackWidth: [1, 4],
    crackLength: [20, 120],
    aggregateDensity: 0.1,
    aggregateSize: [3, 8],
    aggregateColors: ["#6a6a5a", "#7a7a6a", "#5a5a4a"],
    stainDensity: 0.6,
    stainSize: [30, 150],
    stainOpacity: [0.08, 0.25],
    formLines: false,
    formLineSpacing: 0,
    formLineWidth: 0,
    formLineOpacity: 0,
    weatheringIntensity: 0.7,
    edgeDarkening: 0.35,
  },
  boardFormed: {
    name: "Board-Formed",
    description: "Concrete with distinctive wood grain texture from formwork",
    baseHue: 32,
    baseSaturation: 10,
    baseLightness: 58,
    lightnessVariation: 12,
    noiseScale: 0.01,
    noiseOctaves: 5,
    noisePersistence: 0.45,
    porosity: 0.08,
    poreSize: [1, 3],
    crackDensity: 0.15,
    crackWidth: [0.5, 2],
    crackLength: [15, 60],
    aggregateDensity: 0,
    aggregateSize: [0, 0],
    aggregateColors: [],
    stainDensity: 0.15,
    stainSize: [15, 50],
    stainOpacity: [0.03, 0.1],
    formLines: true,
    formLineSpacing: 12,
    formLineWidth: 2,
    formLineOpacity: 0.25,
    weatheringIntensity: 0.2,
    edgeDarkening: 0.15,
  },
  exposed: {
    name: "Exposed Aggregate",
    description: "Decorative concrete with visible pebbles and stones",
    baseHue: 35,
    baseSaturation: 6,
    baseLightness: 52,
    lightnessVariation: 10,
    noiseScale: 0.012,
    noiseOctaves: 5,
    noisePersistence: 0.5,
    porosity: 0.1,
    poreSize: [1, 2],
    crackDensity: 0.1,
    crackWidth: [0.5, 1.5],
    crackLength: [10, 50],
    aggregateDensity: 0.7,
    aggregateSize: [4, 14],
    aggregateColors: [
      "#5a5a5a",
      "#7a7a7a",
      "#8a8070",
      "#6a6050",
      "#9a9a8a",
      "#4a4a4a",
      "#b0a090",
      "#706860",
    ],
    stainDensity: 0.08,
    stainSize: [10, 40],
    stainOpacity: [0.03, 0.08],
    formLines: false,
    formLineSpacing: 0,
    formLineWidth: 0,
    formLineOpacity: 0,
    weatheringIntensity: 0.15,
    edgeDarkening: 0.1,
  },
};

// Main texture generation function
export function generateConcreteTexture(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  style: ConcreteStyleConfig,
  seed: number
): void {
  const rng = new SeededRNG(seed);
  const noise = new PerlinNoise(seed);

  // Create image data for pixel manipulation
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  // Generate base texture
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;

      // Multi-layered noise for organic texture
      const n1 = noise.fbm(
        x * style.noiseScale,
        y * style.noiseScale,
        style.noiseOctaves,
        2,
        style.noisePersistence
      );
      const n2 = noise.fbm(
        x * style.noiseScale * 3 + 100,
        y * style.noiseScale * 3 + 100,
        4,
        2,
        0.5
      );
      const n3 = noise.fbm(
        x * style.noiseScale * 0.5 + 200,
        y * style.noiseScale * 0.5 + 200,
        3,
        2,
        0.6
      );

      // Combine noise layers
      const combinedNoise = n1 * 0.6 + n2 * 0.25 + n3 * 0.15;

      // Calculate lightness with variation
      const lightness =
        style.baseLightness +
        combinedNoise * style.lightnessVariation * 2 -
        style.lightnessVariation;

      // Edge darkening (vignette effect)
      const edgeX = Math.abs(x - width / 2) / (width / 2);
      const edgeY = Math.abs(y - height / 2) / (height / 2);
      const edgeFactor = Math.pow(Math.max(edgeX, edgeY), 2) * style.edgeDarkening;

      // Convert HSL to RGB
      const finalLightness = Math.max(0, Math.min(100, lightness - edgeFactor * 20));
      const [r, g, b] = hslToRgb(
        style.baseHue,
        style.baseSaturation,
        finalLightness
      );

      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // Add form lines (board-formed concrete)
  if (style.formLines) {
    drawFormLines(ctx, width, height, style, rng, noise);
  }

  // Add pores/holes
  drawPores(ctx, width, height, style, rng);

  // Add stains
  drawStains(ctx, width, height, style, rng, noise);

  // Add aggregate
  if (style.aggregateDensity > 0) {
    drawAggregate(ctx, width, height, style, rng);
  }

  // Add cracks
  drawCracks(ctx, width, height, style, rng);

  // Apply weathering overlay
  if (style.weatheringIntensity > 0) {
    applyWeathering(ctx, width, height, style, rng, noise);
  }
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function drawFormLines(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  style: ConcreteStyleConfig,
  rng: SeededRNG,
  noise: PerlinNoise
): void {
  ctx.save();
  ctx.globalCompositeOperation = "multiply";

  const spacing = style.formLineSpacing;
  const lineWidth = style.formLineWidth;

  for (let y = spacing; y < height; y += spacing) {
    const yOffset = noise.fbm(y * 0.1, 0, 3, 2, 0.5) * 3;
    const opacity = style.formLineOpacity * (0.7 + rng.next() * 0.3);

    ctx.strokeStyle = `rgba(60, 50, 40, ${opacity})`;
    ctx.lineWidth = lineWidth * (0.8 + rng.next() * 0.4);

    ctx.beginPath();
    ctx.moveTo(0, y + yOffset);

    for (let x = 0; x < width; x += 20) {
      const xNoise = noise.fbm(x * 0.05, y * 0.05, 2, 2, 0.5) * 2;
      ctx.lineTo(x, y + yOffset + xNoise);
    }

    ctx.stroke();

    // Add subtle wood grain texture within lines
    if (rng.next() > 0.5) {
      ctx.strokeStyle = `rgba(80, 70, 60, ${opacity * 0.3})`;
      ctx.lineWidth = 0.5;

      for (let subY = y - spacing / 2; subY < y; subY += 3 + rng.int(0, 2)) {
        if (rng.next() > 0.3) {
          ctx.beginPath();
          const startX = rng.range(0, width * 0.3);
          const endX = startX + rng.range(50, 200);
          ctx.moveTo(startX, subY + rng.range(-1, 1));
          ctx.lineTo(Math.min(endX, width), subY + rng.range(-1, 1));
          ctx.stroke();
        }
      }
    }
  }

  ctx.restore();
}

function drawPores(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  style: ConcreteStyleConfig,
  rng: SeededRNG
): void {
  const poreCount = Math.floor(width * height * style.porosity * 0.001);

  ctx.save();

  for (let i = 0; i < poreCount; i++) {
    const x = rng.range(0, width);
    const y = rng.range(0, height);
    const radius = rng.range(style.poreSize[0], style.poreSize[1]);

    // Create gradient for depth effect
    const gradient = ctx.createRadialGradient(
      x - radius * 0.3,
      y - radius * 0.3,
      0,
      x,
      y,
      radius
    );
    gradient.addColorStop(0, "rgba(40, 35, 30, 0.6)");
    gradient.addColorStop(0.5, "rgba(30, 25, 20, 0.4)");
    gradient.addColorStop(1, "rgba(50, 45, 40, 0.1)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(
      x,
      y,
      radius,
      radius * (0.7 + rng.next() * 0.3),
      rng.range(0, Math.PI),
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  ctx.restore();
}

function drawStains(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  style: ConcreteStyleConfig,
  rng: SeededRNG,
  noise: PerlinNoise
): void {
  const stainCount = Math.floor(style.stainDensity * 20);

  ctx.save();
  ctx.globalCompositeOperation = "multiply";

  for (let i = 0; i < stainCount; i++) {
    const x = rng.range(0, width);
    const y = rng.range(0, height);
    const size = rng.range(style.stainSize[0], style.stainSize[1]);
    const opacity = rng.range(style.stainOpacity[0], style.stainOpacity[1]);

    // Organic stain shape using noise
    ctx.beginPath();
    const points = 32;
    for (let j = 0; j <= points; j++) {
      const angle = (j / points) * Math.PI * 2;
      const noiseVal = noise.fbm(
        Math.cos(angle) * 2 + i,
        Math.sin(angle) * 2 + i,
        4,
        2,
        0.5
      );
      const r = size * (0.5 + noiseVal * 0.5);
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;

      if (j === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();

    // Gradient fill for natural look
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    const hue = rng.range(25, 45);
    gradient.addColorStop(0, `hsla(${hue}, 15%, 35%, ${opacity})`);
    gradient.addColorStop(0.7, `hsla(${hue}, 10%, 40%, ${opacity * 0.5})`);
    gradient.addColorStop(1, `hsla(${hue}, 5%, 45%, 0)`);

    ctx.fillStyle = gradient;
    ctx.fill();
  }

  ctx.restore();
}

function drawAggregate(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  style: ConcreteStyleConfig,
  rng: SeededRNG
): void {
  const stoneCount = Math.floor(
    width * height * style.aggregateDensity * 0.0005
  );

  ctx.save();

  for (let i = 0; i < stoneCount; i++) {
    const x = rng.range(style.aggregateSize[1], width - style.aggregateSize[1]);
    const y = rng.range(style.aggregateSize[1], height - style.aggregateSize[1]);
    const size = rng.range(style.aggregateSize[0], style.aggregateSize[1]);
    const color =
      style.aggregateColors[rng.int(0, style.aggregateColors.length - 1)];

    // Draw stone with irregular shape
    ctx.beginPath();
    const points = rng.int(5, 8);
    for (let j = 0; j <= points; j++) {
      const angle = (j / points) * Math.PI * 2;
      const r = size * (0.7 + rng.next() * 0.3);
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;

      if (j === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.quadraticCurveTo(
          x + Math.cos(angle - 0.3) * size * 1.1,
          y + Math.sin(angle - 0.3) * size * 1.1,
          px,
          py
        );
      }
    }
    ctx.closePath();

    // Gradient for 3D effect
    const gradient = ctx.createRadialGradient(
      x - size * 0.2,
      y - size * 0.2,
      0,
      x,
      y,
      size
    );
    gradient.addColorStop(0, lightenColor(color, 20));
    gradient.addColorStop(0.5, color);
    gradient.addColorStop(1, darkenColor(color, 20));

    ctx.fillStyle = gradient;
    ctx.fill();

    // Subtle shadow
    ctx.strokeStyle = `rgba(0, 0, 0, 0.2)`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  ctx.restore();
}

function drawCracks(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  style: ConcreteStyleConfig,
  rng: SeededRNG
): void {
  const crackCount = Math.floor(style.crackDensity * 15);

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let i = 0; i < crackCount; i++) {
    const startX = rng.range(0, width);
    const startY = rng.range(0, height);
    const length = rng.range(style.crackLength[0], style.crackLength[1]);
    const baseWidth = rng.range(style.crackWidth[0], style.crackWidth[1]);

    // Main crack direction with randomness
    let angle = rng.range(0, Math.PI * 2);
    let x = startX;
    let y = startY;

    // Draw main crack
    ctx.beginPath();
    ctx.moveTo(x, y);

    const segments = Math.floor(length / 5);
    for (let j = 0; j < segments; j++) {
      // Vary angle slightly for organic look
      angle += rng.gaussian(0, 0.3);
      const segmentLength = rng.range(3, 8);

      x += Math.cos(angle) * segmentLength;
      y += Math.sin(angle) * segmentLength;

      // Keep within bounds
      x = Math.max(0, Math.min(width, x));
      y = Math.max(0, Math.min(height, y));

      ctx.lineTo(x, y);

      // Occasionally branch
      if (rng.next() < 0.15 && j > 2) {
        drawCrackBranch(ctx, x, y, angle, length * 0.3, style, rng);
      }
    }

    // Gradient stroke for depth
    const crackWidth = baseWidth * (1 - (i / crackCount) * 0.3);
    ctx.strokeStyle = `rgba(35, 30, 25, ${0.4 + rng.next() * 0.3})`;
    ctx.lineWidth = crackWidth;
    ctx.stroke();

    // Highlight edge
    ctx.strokeStyle = `rgba(90, 85, 80, 0.2)`;
    ctx.lineWidth = crackWidth * 0.3;
    ctx.stroke();
  }

  ctx.restore();
}

function drawCrackBranch(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  baseAngle: number,
  length: number,
  style: ConcreteStyleConfig,
  rng: SeededRNG
): void {
  const branchAngle = baseAngle + rng.range(-0.8, 0.8);
  let x = startX;
  let y = startY;

  ctx.beginPath();
  ctx.moveTo(x, y);

  const segments = Math.floor(length / 4);
  for (let i = 0; i < segments; i++) {
    const angle = branchAngle + rng.gaussian(0, 0.2);
    const segLen = rng.range(2, 5);
    x += Math.cos(angle) * segLen;
    y += Math.sin(angle) * segLen;
    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = `rgba(40, 35, 30, 0.3)`;
  ctx.lineWidth = style.crackWidth[0] * 0.5;
  ctx.stroke();
}

function applyWeathering(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  style: ConcreteStyleConfig,
  rng: SeededRNG,
  noise: PerlinNoise
): void {
  ctx.save();
  ctx.globalCompositeOperation = "overlay";

  // Create weathering pattern
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;

      // Weathering noise
      const weatherNoise = noise.fbm(x * 0.003, y * 0.003, 4, 2, 0.6);
      const detail = noise.fbm(x * 0.02, y * 0.02, 3, 2, 0.5);

      const combined = weatherNoise * 0.7 + detail * 0.3;
      const intensity = style.weatheringIntensity * combined * 30;

      // Apply as subtle lightness adjustment
      data[i] = Math.max(0, Math.min(255, data[i] + intensity));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + intensity));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + intensity));
    }
  }

  ctx.putImageData(imageData, 0, 0);
  ctx.restore();
}

function lightenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + percent * 2.55);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + percent * 2.55);
  const b = Math.min(255, (num & 0x0000ff) + percent * 2.55);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function darkenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - percent * 2.55);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - percent * 2.55);
  const b = Math.max(0, (num & 0x0000ff) - percent * 2.55);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}
