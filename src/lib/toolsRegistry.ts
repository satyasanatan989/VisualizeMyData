export interface ToolDef {
    slug: string;
    name: string;
    description: string;
    category: 'Image Tools' | 'PDF Tools' | 'Text Tools' | 'Developer Tools' | 'Utility Tools';
    icon: string; // Lucide icon string
    badge: 'NEW' | 'POPULAR' | 'FREE';
    isFeatured?: boolean;
    isPopular?: boolean;
}

export const QUICK_TOOLS: ToolDef[] = [
    // Image Tools
    {
        slug: 'jpg-to-png',
        name: 'JPG to PNG Converter',
        description: 'Convert JPG/JPEG images to PNG format instantly inside your browser.',
        category: 'Image Tools',
        icon: 'Image',
        badge: 'FREE',
    },
    {
        slug: 'png-to-jpg',
        name: 'PNG to JPG Converter',
        description: 'Convert PNG images to JPG format with a white background locally.',
        category: 'Image Tools',
        icon: 'Image',
        badge: 'FREE',
    },
    {
        slug: 'webp-to-png',
        name: 'WEBP to PNG Converter',
        description: 'Convert modern WEBP files to high-quality PNG format offline.',
        category: 'Image Tools',
        icon: 'Image',
        badge: 'NEW',
    },
    {
        slug: 'png-to-webp',
        name: 'PNG to WEBP Converter',
        description: 'Convert PNG files to optimized, web-ready WEBP format.',
        category: 'Image Tools',
        icon: 'Image',
        badge: 'NEW',
    },
    {
        slug: 'image-compressor',
        name: 'Image Compressor',
        description: 'Compress image files to reduce file size with real-time quality controls.',
        category: 'Image Tools',
        icon: 'FileImage',
        badge: 'POPULAR',
        isFeatured: true,
        isPopular: true,
    },
    {
        slug: 'image-resizer',
        name: 'Image Resizer',
        description: 'Resize images to custom width and height in pixels easily.',
        category: 'Image Tools',
        icon: 'Maximize',
        badge: 'FREE',
    },
    {
        slug: 'image-cropper',
        name: 'Image Cropper',
        description: 'Crop images visually to focus on selected sections.',
        category: 'Image Tools',
        icon: 'Crop',
        badge: 'FREE',
    },
    {
        slug: 'image-rotator',
        name: 'Image Rotator',
        description: 'Rotate images 90° CW/CCW, or flip horizontally/vertically.',
        category: 'Image Tools',
        icon: 'RotateCw',
        badge: 'FREE',
    },

    // PDF Tools
    {
        slug: 'image-to-pdf',
        name: 'Image to PDF Converter',
        description: 'Compile multiple images into a clean PDF document client-side.',
        category: 'PDF Tools',
        icon: 'FileText',
        badge: 'POPULAR',
        isPopular: true,
    },
    {
        slug: 'pdf-to-image',
        name: 'PDF to Image Converter',
        description: 'Extract pages of a PDF document as high-resolution PNG images.',
        category: 'PDF Tools',
        icon: 'Image',
        badge: 'NEW',
    },
    {
        slug: 'pdf-merger',
        name: 'PDF Merger',
        description: 'Merge multiple PDF documents into a single PDF file instantly.',
        category: 'PDF Tools',
        icon: 'Files',
        badge: 'POPULAR',
        isFeatured: true,
        isPopular: true,
    },
    {
        slug: 'pdf-splitter',
        name: 'PDF Splitter',
        description: 'Split specific page ranges of a PDF file into a new document.',
        category: 'PDF Tools',
        icon: 'Scissors',
        badge: 'FREE',
    },
    {
        slug: 'pdf-preview',
        name: 'PDF Preview',
        description: 'Preview and navigate PDF pages with fit-width and zoom controls.',
        category: 'PDF Tools',
        icon: 'Eye',
        badge: 'FREE',
    },

    // Text Tools
    {
        slug: 'word-counter',
        name: 'Word Counter',
        description: 'Get live stats on words, characters, sentences, paragraphs, and reading time.',
        category: 'Text Tools',
        icon: 'FileSpreadsheet',
        badge: 'FREE',
    },
    {
        slug: 'character-counter',
        name: 'Character Counter',
        description: 'Analyze letter frequency, character counts, and line metrics in text.',
        category: 'Text Tools',
        icon: 'Hash',
        badge: 'FREE',
    },
    {
        slug: 'remove-duplicate-lines',
        name: 'Remove Duplicate Lines',
        description: 'Strip duplicates from any list or text with optional sorting.',
        category: 'Text Tools',
        icon: 'ListFilter',
        badge: 'NEW',
    },
    {
        slug: 'password-generator',
        name: 'Password Generator',
        description: 'Create cryptographically secure passwords with custom strength settings.',
        category: 'Text Tools',
        icon: 'Key',
        badge: 'POPULAR',
        isPopular: true,
    },

    // Developer Tools
    {
        slug: 'json-formatter',
        name: 'JSON Formatter',
        description: 'Beautify, format, parse, or minify JSON data instantly.',
        category: 'Developer Tools',
        icon: 'Code',
        badge: 'FREE',
    },
    {
        slug: 'json-viewer',
        name: 'JSON Viewer',
        description: 'Browse nested JSON data in an interactive collapsible tree view.',
        category: 'Developer Tools',
        icon: 'FolderTree',
        badge: 'NEW',
        isFeatured: true,
    },
    {
        slug: 'base64-encoder',
        name: 'Base64 Encoder',
        description: 'Encode text strings or binary files to Base64 format safely.',
        category: 'Developer Tools',
        icon: 'Binary',
        badge: 'FREE',
    },
    {
        slug: 'base64-decoder',
        name: 'Base64 Decoder',
        description: 'Decode Base64 strings back to text or download as raw binary file.',
        category: 'Developer Tools',
        icon: 'Binary',
        badge: 'FREE',
    },
    {
        slug: 'url-encoder',
        name: 'URL Encoder',
        description: 'Encode query parameters and special characters in URLs.',
        category: 'Developer Tools',
        icon: 'Globe',
        badge: 'FREE',
    },
    {
        slug: 'url-decoder',
        name: 'URL Decoder',
        description: 'Decode URL-encoded parameters back to standard text.',
        category: 'Developer Tools',
        icon: 'Globe',
        badge: 'FREE',
    },

    // Utility Tools
    {
        slug: 'qr-code-generator',
        name: 'QR Code Generator',
        description: 'Create custom QR codes for websites or text and download as PNG.',
        category: 'Utility Tools',
        icon: 'QrCode',
        badge: 'POPULAR',
        isFeatured: true,
        isPopular: true,
    },
    {
        slug: 'barcode-generator',
        name: 'Barcode Generator',
        description: 'Create standard Code 39 barcodes for numbers and text.',
        category: 'Utility Tools',
        icon: 'Barcode',
        badge: 'NEW',
    },
    {
        slug: 'age-calculator',
        name: 'Age Calculator',
        description: 'Calculate your exact age in years, months, days, and countdown to next birthday.',
        category: 'Utility Tools',
        icon: 'Calendar',
        badge: 'FREE',
    },
    {
        slug: 'bmi-calculator',
        name: 'BMI Calculator',
        description: 'Compute Body Mass Index (BMI) and discover your health category.',
        category: 'Utility Tools',
        icon: 'Activity',
        badge: 'FREE',
    },
    {
        slug: 'percentage-calculator',
        name: 'Percentage Calculator',
        description: 'Calculate percentage values, percentage ratios, and increase/decrease.',
        category: 'Utility Tools',
        icon: 'Percent',
        badge: 'POPULAR',
        isPopular: true,
    },
    {
        slug: 'unit-converter',
        name: 'Unit Converter',
        description: 'Convert Length, Weight, Temperature, Area, and Volume units instantly.',
        category: 'Utility Tools',
        icon: 'RefreshCw',
        badge: 'FREE',
    }
];

export const CATEGORIES = [
    { name: 'Image Tools', icon: '🎨', color: '#ec4899', slug: 'image' },
    { name: 'PDF Tools', icon: '📕', color: '#ef4444', slug: 'pdf' },
    { name: 'Text Tools', icon: '📝', color: '#f59e0b', slug: 'text' },
    { name: 'Developer Tools', icon: '💻', color: '#10b981', slug: 'developer' },
    { name: 'Utility Tools', icon: '🛠️', color: '#3b82f6', slug: 'utility' }
];

export function getToolBySlug(slug: string): ToolDef | undefined {
    return QUICK_TOOLS.find(t => t.slug === slug);
}

export function getRelatedTools(tool: ToolDef, limit = 3): ToolDef[] {
    return QUICK_TOOLS
        .filter(t => t.slug !== tool.slug && t.category === tool.category)
        .slice(0, limit);
}
