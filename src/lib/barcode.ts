// Pure client-side Code 39 Barcode Generator in TypeScript

const ENCODINGS: Record<string, string> = {
    '0': '000110100',
    '1': '100100001',
    '2': '001100001',
    '3': '101100000',
    '4': '000110001',
    '5': '100110000',
    '6': '001110000',
    '7': '000100101',
    '8': '100100100',
    '9': '001100100',
    'A': '100001001',
    'B': '001001001',
    'C': '101001000',
    'D': '000011001',
    'E': '100011000',
    'F': '001011000',
    'G': '000001101',
    'H': '100001100',
    'I': '001001100',
    'J': '000011100',
    'K': '100000011',
    'L': '001000011',
    'M': '101000010',
    'N': '000010011',
    'O': '100010010',
    'P': '001010010',
    'Q': '000000111',
    'R': '100000110',
    'S': '001000110',
    'T': '000010110',
    'U': '110000001',
    'V': '011000001',
    'W': '111000000',
    'X': '010010001',
    'Y': '110010000',
    'Z': '011010000',
    '-': '010000101',
    '.': '110000100',
    ' ': '011000100',
    '*': '010010100',
    '$': '010101000',
    '/': '010100010',
    '+': '010001010',
    '%': '000101010',
};

export function drawBarcode(
    canvas: HTMLCanvasElement,
    text: string,
    widthScale = 2,
    height = 80,
    fgColor = '#000000',
    bgColor = '#ffffff'
): boolean {
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;

    // Clean text and enclose in start/stop asterisk character
    const cleanedText = `*${text.toUpperCase()}*`;

    // Verify all characters are supported
    for (let i = 0; i < cleanedText.length; i++) {
        if (!ENCODINGS[cleanedText[i]]) {
            return false; // unsupported character
        }
    }

    // Code 39 parameters
    const narrowWidth = widthScale;
    const wideWidth = widthScale * 2.5;
    const gapWidth = widthScale;

    // Calculate total width
    let totalWidth = 20; // margin left/right
    for (let i = 0; i < cleanedText.length; i++) {
        const char = cleanedText[i];
        const pattern = ENCODINGS[char];
        for (let j = 0; j < 9; j++) {
            const isWide = pattern[j] === '1';
            totalWidth += isWide ? wideWidth : narrowWidth;
        }
        totalWidth += gapWidth; // inter-character gap
    }

    canvas.width = totalWidth;
    canvas.height = height + 40; // extra space for text labels

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stripes
    let x = 10; // start offset
    ctx.fillStyle = fgColor;

    for (let i = 0; i < cleanedText.length; i++) {
        const char = cleanedText[i];
        const pattern = ENCODINGS[char];

        for (let j = 0; j < 9; j++) {
            const isBar = j % 2 === 0;
            const isWide = pattern[j] === '1';
            const w = isWide ? wideWidth : narrowWidth;

            if (isBar) {
                ctx.fillRect(x, 10, w, height);
            }
            x += w;
        }
        x += gapWidth; // inter-character gap
    }

    // Draw text label below the barcode
    ctx.fillStyle = fgColor;
    ctx.font = `bold ${Math.max(12, widthScale * 6)}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText(text.toUpperCase(), canvas.width / 2, height + 28);

    return true;
}
