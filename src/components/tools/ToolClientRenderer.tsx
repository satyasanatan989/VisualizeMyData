'use client';

import React from 'react';
import { ToolDef } from '@/lib/toolsRegistry';
import ToolWrapper from './ToolWrapper';
import { JpgToPng, PngToJpg, WebpToPng, PngToWebp, ImageCompressor, ImageResizer, ImageCropper, ImageRotator } from './ImageTools';
import { ImageToPdf, PdfToImage, PdfMerger, PdfSplitter, PdfPreview } from './PdfTools';
import { WordCounter, CharacterCounter, RemoveDuplicateLines, PasswordGenerator } from './TextTools';
import { JsonFormatter, JsonViewer, Base64Encoder, Base64Decoder, UrlEncoder, UrlDecoder } from './DevTools';
import { QrCodeGenerator, BarcodeGenerator, AgeCalculator, BmiCalculator, PercentageCalculator, UnitConverter } from './UtilityTools';

interface ToolClientRendererProps {
    tool: ToolDef;
}

export default function ToolClientRenderer({ tool }: ToolClientRendererProps) {
    const renderContent = () => {
        switch (tool.slug) {
            // Image Tools
            case 'jpg-to-png': return <JpgToPng />;
            case 'png-to-jpg': return <PngToJpg />;
            case 'webp-to-png': return <WebpToPng />;
            case 'png-to-webp': return <PngToWebp />;
            case 'image-compressor': return <ImageCompressor />;
            case 'image-resizer': return <ImageResizer />;
            case 'image-cropper': return <ImageCropper />;
            case 'image-rotator': return <ImageRotator />;

            // PDF Tools
            case 'image-to-pdf': return <ImageToPdf />;
            case 'pdf-to-image': return <PdfToImage />;
            case 'pdf-merger': return <PdfMerger />;
            case 'pdf-splitter': return <PdfSplitter />;
            case 'pdf-preview': return <PdfPreview />;

            // Text Tools
            case 'word-counter': return <WordCounter />;
            case 'character-counter': return <CharacterCounter />;
            case 'remove-duplicate-lines': return <RemoveDuplicateLines />;
            case 'password-generator': return <PasswordGenerator />;

            // Dev Tools
            case 'json-formatter': return <JsonFormatter />;
            case 'json-viewer': return <JsonViewer />;
            case 'base64-encoder': return <Base64Encoder />;
            case 'base64-decoder': return <Base64Decoder />;
            case 'url-encoder': return <UrlEncoder />;
            case 'url-decoder': return <UrlDecoder />;

            // Utility Tools
            case 'qr-code-generator': return <QrCodeGenerator />;
            case 'barcode-generator': return <BarcodeGenerator />;
            case 'age-calculator': return <AgeCalculator />;
            case 'bmi-calculator': return <BmiCalculator />;
            case 'percentage-calculator': return <PercentageCalculator />;
            case 'unit-converter': return <UnitConverter />;

            default: return <div style={{ padding: 20, color: 'var(--text-muted)' }}>Component under construction.</div>;
        }
    };

    return (
        <ToolWrapper tool={tool}>
            {renderContent()}
        </ToolWrapper>
    );
}
