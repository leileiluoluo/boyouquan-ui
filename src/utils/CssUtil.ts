// 你已有的颜色提亮函数（不动）
function lightenColor(
  rgb: [number, number, number],
  brightnessFactor: number = 1.2,
  saturationFactor: number = 0.8,
): [number, number, number] {
  let [r, g, b] = rgb;

  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h: number,
    s: number,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }

  l = Math.min(0.9, l * brightnessFactor);
  s = Math.min(0.5, s * saturationFactor);

  const hue2rgb = (p: number, q: number, t: number): number => {
    let tVal = t;
    if (tVal < 0) tVal += 1;
    if (tVal > 1) tVal -= 1;
    if (tVal < 1 / 6) return p + (q - p) * 6 * tVal;
    if (tVal < 1 / 2) return q;
    if (tVal < 2 / 3) return p + (q - p) * (2 / 3 - tVal) * 6;
    return p;
  };

  let finalR: number, finalG: number, finalB: number;
  if (s === 0) {
    finalR = finalG = finalB = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    finalR = hue2rgb(p, q, h + 1 / 3);
    finalG = hue2rgb(p, q, h);
    finalB = hue2rgb(p, q, h - 1 / 3);
  }

  return [
    Math.round(finalR * 255),
    Math.round(finalG * 255),
    Math.round(finalB * 255),
  ];
}

// =====================================================================
// ✅✅✅ 你要的核心方法：从头像获取背景色（异步返回 string）
// =====================================================================
export function getBackgroundColorFromAvatar(avatarUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = avatarUrl;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(getDefaultGradient());
          return;
        }

        canvas.width = 40;
        canvas.height = 40;
        ctx.drawImage(img, 0, 0, 40, 40);

        const data = ctx.getImageData(0, 0, 40, 40).data;
        let r = 0, g = 0, b = 0, count = 0;

        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }

        const avgR = Math.floor(r / count);
        const avgG = Math.floor(g / count);
        const avgB = Math.floor(b / count);

        const lightColor = lightenColor([avgR, avgG, avgB], 1.4, 0.7);
        const brightness = (avgR * 299 + avgG * 587 + avgB * 114) / 1000;

        if (brightness > 100) {
          resolve(`linear-gradient(135deg, rgb(${avgR},${avgG},${avgB}), rgb(${lightColor.join(',')}))`);
        } else {
          resolve(getDefaultGradient());
        }
      } catch (err) {
        resolve(getDefaultGradient());
      }
    };

    img.onerror = () => {
      resolve(getDefaultGradient());
    };
  });
}

// 默认柔和灰色渐变
function getDefaultGradient(): string {
  return 'linear-gradient(135deg, #e5e7eb, #f3f4f6)';
}

export function setBackgroundFromAvatar(
  elementId: string,
  avatarUrl: string,
): void {
  getBackgroundColorFromAvatar(avatarUrl).then((color) => {
    const el = document.getElementById(elementId);
    if (el) el.style.background = color;
  });
}
