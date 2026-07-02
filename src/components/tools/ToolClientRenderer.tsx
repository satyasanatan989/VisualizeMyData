'use client';

import React from 'react';
import { ToolDef } from '@/lib/toolsRegistry';
import ToolWrapper from './ToolWrapper';
import { JpgToPng, PngToJpg, WebpToPng, PngToWebp, ImageCompressor, ImageResizer, ImageCropper, ImageRotator, PassportPhotoMaker, ScreenshotBeautifier, FaviconGenerator, ColorPaletteExtractor } from './ImageTools';
import { ImageToPdf, PdfToImage, PdfMerger, PdfSplitter, PdfPreview } from './PdfTools';
import { WordCounter, CharacterCounter, RemoveDuplicateLines, PasswordGenerator } from './TextTools';
import { JsonFormatter, JsonViewer, Base64Encoder, Base64Decoder, UrlEncoder, UrlDecoder, UuidGenerator, JwtDecoder, JsonValidator, RegexTester, TimestampConverter } from './DevTools';
import { QrCodeGenerator, BarcodeGenerator, AgeCalculator, BmiCalculator, PercentageCalculator, UnitConverter } from './UtilityTools';
import { AttendanceCalculator, CgpaCalculator, GpaConverter, StudyTimer, PomodoroTimer, ExamCountdown, ResumeBuilder, InternshipResumeBuilder, CoverPageGenerator } from './StudentTools';
import { InvoiceGenerator, QuotationGenerator, BusinessCardGenerator, LetterheadGenerator, SignatureGenerator, CertificateGenerator } from './BusinessTools';
import { MilkSnfCalculator, GerberFatCalculator, FfaCalculator, MoistureBasisConverter, RecipeScalingCalculator, FoodCostCalculator, NutritionLabelCalculator, BatchYieldCalculator } from './FoodTechTools';
import { QrGeneratorPro, BarcodeGeneratorPro, RandomTeamGenerator, RandomNamePicker, SpinWheel, CoinFlip, DiceRoller } from './ShareableTools';

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
            case 'passport-photo-maker': return <PassportPhotoMaker />;
            case 'screenshot-beautifier': return <ScreenshotBeautifier />;
            case 'favicon-generator': return <FaviconGenerator />;
            case 'color-palette-extractor': return <ColorPaletteExtractor />;

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
            case 'uuid-generator': return <UuidGenerator />;
            case 'jwt-decoder': return <JwtDecoder />;
            case 'json-validator': return <JsonValidator />;
            case 'regex-tester': return <RegexTester />;
            case 'timestamp-converter': return <TimestampConverter />;

            // Utility Tools
            case 'qr-code-generator': return <QrCodeGenerator />;
            case 'barcode-generator': return <BarcodeGenerator />;
            case 'age-calculator': return <AgeCalculator />;
            case 'bmi-calculator': return <BmiCalculator />;
            case 'percentage-calculator': return <PercentageCalculator />;
            case 'unit-converter': return <UnitConverter />;

            // Student Tools
            case 'attendance-calculator': return <AttendanceCalculator />;
            case 'cgpa-calculator': return <CgpaCalculator />;
            case 'gpa-converter': return <GpaConverter />;
            case 'study-timer': return <StudyTimer />;
            case 'pomodoro-timer': return <PomodoroTimer />;
            case 'exam-countdown': return <ExamCountdown />;
            case 'resume-builder': return <ResumeBuilder />;
            case 'internship-resume-builder': return <InternshipResumeBuilder />;
            case 'cover-page-generator': return <CoverPageGenerator />;

            // Business Tools
            case 'invoice-generator': return <InvoiceGenerator />;
            case 'quotation-generator': return <QuotationGenerator />;
            case 'business-card-generator': return <BusinessCardGenerator />;
            case 'letterhead-generator': return <LetterheadGenerator />;
            case 'signature-generator': return <SignatureGenerator />;
            case 'certificate-generator': return <CertificateGenerator />;

            // Food Tech Tools
            case 'milk-snf-calculator': return <MilkSnfCalculator />;
            case 'gerber-fat-calculator': return <GerberFatCalculator />;
            case 'ffa-calculator': return <FfaCalculator />;
            case 'moisture-basis-converter': return <MoistureBasisConverter />;
            case 'recipe-scaling-calculator': return <RecipeScalingCalculator />;
            case 'food-cost-calculator': return <FoodCostCalculator />;
            case 'nutrition-label-calculator': return <NutritionLabelCalculator />;
            case 'batch-yield-calculator': return <BatchYieldCalculator />;

            // Shareable Tools
            case 'qr-generator-pro': return <QrGeneratorPro />;
            case 'barcode-generator-pro': return <BarcodeGeneratorPro />;
            case 'random-team-generator': return <RandomTeamGenerator />;
            case 'random-name-picker': return <RandomNamePicker />;
            case 'spin-wheel': return <SpinWheel />;
            case 'coin-flip': return <CoinFlip />;
            case 'dice-roller': return <DiceRoller />;

            default: return <div style={{ padding: 20, color: 'var(--text-muted)' }}>Component under construction.</div>;
        }
    };

    return (
        <ToolWrapper tool={tool}>
            {renderContent()}
        </ToolWrapper>
    );
}

