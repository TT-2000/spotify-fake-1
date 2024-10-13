import { useEffect, useState } from 'react';
import ColorThief from 'colorthief';

const ImageColorThief = (src) => {
    const [dominantColor, setDominantColor] = useState(null);

    useEffect(() => {
        if (src) {
            const img = document.createElement('img');
            img.src = `${src}`;
            img.alt = 'Sample Image';
            img.crossOrigin = "anonymous"
            img.style = { display: 'none' }
            const colorThief = new ColorThief();

            if (img.complete) {
                // Lấy màu dominant từ hình ảnh
                const color = colorThief.getColor(img);

                setDominantColor(color);
            } else {
                // Lấy màu sau khi hình ảnh đã load
                img.addEventListener('load', () => {
                    const color = colorThief.getColor(img);
                    setDominantColor(color);
                });
            }
        }
    }, [src]);


    return dominantColor && `rgb(${dominantColor?.join(',')})`
};

export default ImageColorThief;