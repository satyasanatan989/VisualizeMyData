import { getToolBySlug, ToolDef, QUICK_TOOLS } from './toolsRegistry';

export interface ToolSEOData {
    seoTitle: string;
    seoDescription: string;
    introduction: string; // What is this tool?
    whyUse: string;       // Why use this tool?
    features: string[];   // Key Features
    guide: string[];      // Step-by-step Guide
    examples: { input: string; output: string; description: string }[]; // Real Examples
    proUseCases: string[]; // Professional Use Cases
    studentUseCases: string[]; // Student Use Cases
    businessUseCases: string[]; // Business Use Cases
    faqs: { question: string; answer: string }[]; // FAQs
    tips: string[]; // Tips
    mistakes: string[]; // Common Mistakes
    relatedTools: { name: string; href: string }[]; // Related Tools
    conclusion: string; // Conclusion
    applicationCategory: 'MultimediaApplication' | 'UtilityApplication' | 'DesignApplication' | 'DeveloperApplication';
}

export function getDynamicSEOContent(slug: string): ToolSEOData {
    const tool = getToolBySlug(slug);
    
    // Core fallback if tool isn't in quick registry but is a core tool
    const coreMapping: Record<string, Partial<ToolDef>> = {
        'excel-visualizer': { name: 'Excel Data Visualizer', category: 'Utility Tools', description: 'Upload Excel files (.xlsx/.xls) to instantly build interactive dashboards and charts.' },
        'csv-visualizer': { name: 'CSV Data Visualizer', category: 'Utility Tools', description: 'Convert CSV files to charts, clean data, and export dashboards offline.' },
        'pdf-visualizer': { name: 'PDF Table Extractor & Visualizer', category: 'PDF Tools', description: 'Extract tabular data from PDF files and convert them to interactive graphs.' },
        'google-sheets-visualizer': { name: 'Google Sheets Live Visualizer', category: 'Utility Tools', description: 'Paste a public Google Sheets link to sync and plot data dynamically.' },
        'multi-chart-generator': { name: 'Multi-Chart Dashboard Generator', category: 'Utility Tools', description: 'Plot multiple metrics on various charts in a side-by-side dashboard.' },
        'dashboard-generator': { name: 'Interactive Dashboard Builder', category: 'Utility Tools', description: 'Auto-detect columns, categorize data, and build comprehensive analytical reports.' }
    };

    const activeTool: ToolDef = tool || (coreMapping[slug] ? {
        slug,
        name: coreMapping[slug].name!,
        category: coreMapping[slug].category! as any,
        description: coreMapping[slug].description!,
        badge: 'POPULAR',
        icon: 'FileText'
    } : {
        slug,
        name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        category: 'Utility Tools' as any,
        description: 'Process files and compile reports instantly inside your local browser.',
        badge: 'FREE',
        icon: 'Settings'
    });

    const { name, description, category } = activeTool;

    // Define category variables
    let domain = 'productivity';
    let appCat: ToolSEOData['applicationCategory'] = 'UtilityApplication';
    if (category === 'Image Tools') {
        domain = 'digital media, image resizing, formatting, and graphics optimization';
        appCat = 'MultimediaApplication';
    } else if (category === 'Developer Tools') {
        domain = 'software development, formatting, encoding, and data transformation';
        appCat = 'DeveloperApplication';
    } else if (category === 'Business Tools') {
        domain = 'corporate document creation, administrative operations, and invoice drafting';
        appCat = 'DesignApplication';
    } else if (category === 'Student Tools') {
        domain = 'academic management, study organization, and grade computations';
        appCat = 'UtilityApplication';
    } else if (category === 'Food Technology') {
        domain = 'food science testing, milk processing formulas, and recipe scaling';
        appCat = 'UtilityApplication';
    } else if (category === 'Shareable Tools') {
        domain = 'group decisions, team management, and public presentations';
        appCat = 'UtilityApplication';
    }

    // 1. What is this tool?
    const introduction = `The ${name} is a high-value, browser-based online application engineered to streamline workflows in the field of ${domain}. Designed to resolve user friction points when trying to ${description.toLowerCase()}, this tool offers a secure, zero-installation, and offline-compatible workspace. Traditionally, online operations require uploading sensitive files or personal documents to a remote cloud server. This exposes you to severe data security vulnerabilities, potential breaches, and server latency. VisualiseMyData solves this by executing 100% of the processing engine directly inside your local web browser, meaning your images, datasets, signatures, or variables never leave your device.`;

    // 2. Why use this tool?
    const whyUse = `You should use the ${name} because it eliminates the need for expensive software subscriptions, complicated registrations, and server-side delays. If you are handling proprietary corporate records, academic assignments, or personal photos, uploading them online is risky. This application processes your files in-memory using native JavaScript browser modules. It guarantees sub-second rendering speeds, operates perfectly without an active internet connection once loaded, and offers a premium glassmorphic interface that reduces cognitive overload.`;

    // 3. Key Features
    const features = [
        `100% Local Sandbox: All computations, file reads, and image manipulations happen in your browser memory.`,
        `Sub-Second Execution: Powered by native JavaScript compilers, bypassing remote server round-trips.`,
        `High-Quality Outputs: Export perfect, presentation-ready PNGs, clean JSON, or standard PDF documents instantly.`,
        `Responsive Layout: Fully optimized for touch-screen mobile devices, tablets, and wide-screen desktops.`
    ];

    // 4. Step-by-step Guide
    const guide = [
        `Locate the workspace: Scroll to the active tool panel at the top of this landing page.`,
        `Provide inputs: Drag and drop your source file (Excel, CSV, PDF, WEBP, or JPG) or type the required numbers.`,
        `Adjust parameters: Toggle options such as width, height, colors, layout schemas, or format standards in real-time.`,
        `Save locally: Click the primary download button or print trigger to save the processed file directly to your downloads folder.`
    ];

    // 5. Real Examples
    const examples = [
        {
            input: `Typical raw parameters or standard raw files (e.g. unformatted spreadsheet, raw photo, or basic numeric values).`,
            output: `Fully structured and optimized output (e.g. clean line graph, compressed image, or formatted print PDF).`,
            description: `A standard conversion takes less than 500 milliseconds and updates the visualization zone instantly.`
        },
        {
            input: `User adjustments (e.g. changed quality slider, added custom tax rate, or filtered specific columns).`,
            output: `Updated file preview showing the changes in real-time.`,
            description: `Allows checking the result before clicking the local export trigger.`
        }
    ];

    // 6. Professional Use Cases
    const proUseCases = [
        `Data analysts formatting quick CSV sheets for board presentations.`,
        `Webmasters optimizing image layouts to decrease page load times.`,
        `Consultants drafting client invoices and certificates on secure networks.`
    ];

    // 7. Student Use Cases
    const studentUseCases = [
        `University students compiling research datasets into charts.`,
        `Graduates formatting resumes using print-ready HTML modules.`,
        `Students tracking grade averages using GPA scales.`
    ];

    // 8. Business Use Cases
    const businessUseCases = [
        `Small businesses generating professional documents without expensive licenses.`,
        `Quality managers scaling recipe portions or milk fat metrics.`,
        `Marketing teams generating QR links for promo packages.`
    ];

    // 9. Frequently Asked Questions
    const faqs = [
        {
            question: `Is my file or data stored anywhere?`,
            answer: `No. VisualizeMyData operates on a zero-server policy. All processing is executed locally in your browser session. Your data is deleted the moment you close the tab.`
        },
        {
            question: `Do I need to sign up or log in to use the ${name}?`,
            answer: `No signup or registration is required. You get instant access to the full, unlimited features of this tool.`
        },
        {
            question: `Can I use this utility offline?`,
            answer: `Yes. Once the page is fully loaded in your browser, the tool operates without an active internet connection since all files run locally.`
        }
    ];

    // 10. Tips
    const tips = [
        `Check file formats before uploading (e.g., ensure your CSV is comma-delimited).`,
        `Double-check preview scales before downloading images or PDF documents.`,
        `Bookmark this page to have quick, offline-capable access to this tool directly in your browser.`
    ];

    // 11. Common Mistakes
    const mistakes = [
        `Uploading corrupted files that the browser cannot parse.`,
        `Closing the tab before clicking the local download or save buttons.`,
        `Assuming the tool requires server internet speed for processing.`
    ];

    // 12. Related Tools
    // Get related tools based on category
    const relatedList = QUICK_TOOLS
        .filter(t => t.category === category && t.slug !== slug)
        .slice(0, 3)
        .map(t => ({ name: t.name, href: `/tools/${t.slug}` }));

    if (relatedList.length < 3) {
        relatedList.push({ name: 'Excel Visualizer', href: '/excel-visualizer' });
        relatedList.push({ name: 'CSV Visualizer', href: '/csv-visualizer' });
    }

    // 13. Conclusion
    const conclusion = `The ${name} is the ideal browser-based utility for users seeking a fast, free, and private method to ${description.toLowerCase()}. By running completely client-side, it guarantees absolute confidentiality for your personal data and files. Try it today and experience immediate local processing without server delays.`;

    return {
        seoTitle: `${name} – Free Online Browser Tool | VisualizeMyData`,
        seoDescription: `${description} Fast, secure, and 100% client-side. No signups, no database, files never leave your device.`,
        introduction,
        whyUse,
        features,
        guide,
        examples,
        proUseCases,
        studentUseCases,
        businessUseCases,
        faqs,
        tips,
        mistakes,
        relatedTools: relatedList,
        conclusion,
        applicationCategory: appCat
    };
}
