'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FileUploadZone from '@/components/FileUploadZone';
import Dashboard from '@/components/Dashboard';
import { ParsedData } from '@/lib/excelParser';
import { PdfParseResult } from '@/lib/pdfParser';

interface ExtendedData extends ParsedData {
    _isPdf?: boolean;
    _pdfResult?: PdfParseResult;
    _pdfFile?: File;
}

export default function DashboardView() {
    const [parsedData, setParsedData] = useState<ExtendedData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleDataParsed = (data: ParsedData, isPdf = false, pdfResult?: PdfParseResult) => {
        const extended: ExtendedData = {
            ...data,
            _isPdf: isPdf,
            _pdfResult: pdfResult,
            _pdfFile: uploadedFile || undefined,
        };
        setParsedData(extended);
    };

    return (
        <div style={{ width: '100%' }}>
            <AnimatePresence mode="wait">
                {!parsedData ? (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
                        transition={{ duration: 0.4 }}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <FileUploadZone
                            onDataParsed={(data, isPdf, pdfResult) => handleDataParsed(data, isPdf, pdfResult)}
                            isLoading={isLoading}
                            setIsLoading={(loading) => {
                                // capture file reference before clearing
                                setIsLoading(loading);
                            }}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <Dashboard
                            parsedData={parsedData}
                            isPdf={parsedData._isPdf}
                            pdfFile={parsedData._pdfFile}
                            pdfResult={parsedData._pdfResult}
                            onReset={() => setParsedData(null)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
