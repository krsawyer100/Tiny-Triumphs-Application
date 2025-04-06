import { createImage } from './createImage'

function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
}

export default async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const rotRad = getRadianAngle(rotation);

    // Calculate bounding box of the rotated image
    const sin = Math.abs(Math.sin(rotRad));
    const cos = Math.abs(Math.cos(rotRad));
    const bBoxWidth = image.width * cos + image.height * sin;
    const bBoxHeight = image.width * sin + image.height * cos;

    // Set canvas to the desired crop size
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Translate context to center of crop area
    ctx.translate(-pixelCrop.x, -pixelCrop.y);

    // Move to center of bounding box
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.translate(-image.width / 2, -image.height / 2);

    // Draw rotated image
    ctx.drawImage(image, 0, 0);

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            const fileUrl = URL.createObjectURL(blob);
            resolve(fileUrl);
        }, 'image/jpeg');
    });
}
