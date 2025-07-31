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

        // 设置背景颜色
        document.getElementById(elementId).style.background = `linear-gradient(to bottom right, var(--gray-4), rgb(${r}, ${g}, ${b}))`;

        // 或者设置文字颜色确保可读性
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        document.getElementById(elementId).style.color = brightness > 128 ? 'black' : 'white';
    };

    img.onerror = function () {
        console.error('无法加载头像图像');
    };
}