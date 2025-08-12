export function setBackgroundFromAvatar(elementId, avatarUrl) {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // 处理跨域问题
    img.src = avatarUrl;

    img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 设置canvas尺寸与图像相同
        canvas.width = img.width;
        canvas.height = img.height;

        // 绘制图像到canvas
        ctx.drawImage(img, 0, 0);

        // 获取图像数据
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // 计算平均颜色
        let r = 0, g = 0, b = 0;
        let count = 0;

        // 采样部分像素以提高性能
        for (let i = 0; i < data.length; i += 16) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
        }

        // 计算平均值
        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        const lightColor = lightenColor([r, g, b], 1.3, 0.7);

        // 设置背景颜色
        let backgroundColor = `linear-gradient(to bottom right, var(--gray-4), rgb(${lightColor.join(',')}))`;
        const blackBackgroundColor = 'linear-gradient(to bottom right, var(--gray-4), var(--gray-10))';

        // 或者设置文字颜色确保可读性
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        backgroundColor = brightness > 128 ? blackBackgroundColor : backgroundColor;

        document.getElementById(elementId).style.background = backgroundColor;
    };

    img.onerror = function () {
        console.error('无法加载头像图像');
    };
}

function lightenColor(rgb, brightnessFactor = 1.2, saturationFactor = 0.8) {
    let [r, g, b] = rgb;

    // 转换为HSL色彩空间（简化版）
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // 灰色
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    // 调整亮度和饱和度
    l = Math.min(0.9, l * brightnessFactor); // 不超过90%亮度
    s = Math.min(0.5, s * saturationFactor);  // 不超过50%饱和度

    // 转换回RGB
    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    if (s === 0) {
        r = g = b = l; // 灰色
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ];
}