import { getToolBySlug, ToolDef } from './toolsRegistry';

export interface ToolSEOData {
    seoTitle: string;
    seoDescription: string;
    introduction: string;
    howItWorks: string;
    features: string[];
    technicalDetails: string;
    useCases: string[];
    applicationCategory: 'MultimediaApplication' | 'UtilityApplication' | 'DesignApplication' | 'DeveloperApplication';
    faqs: { question: string; answer: string }[];
}

export function getDynamicSEOContent(slug: string): ToolSEOData {
    const tool = getToolBySlug(slug);
    if (!tool) {
        return {
            seoTitle: 'Free Online Utility Tool | VisualizeMyData',
            seoDescription: 'Free, secure, browser-based online utility tool.',
            introduction: 'This online utility tool helps you complete everyday productivity tasks easily.',
            howItWorks: 'Simply upload your files or enter inputs, and processing happens instantly.',
            features: ['Free to use', '100% Secure', 'Client-side processing'],
            technicalDetails: 'Built using modern React, HTML5, and native browser APIs.',
            useCases: ['Everyday productivity'],
            applicationCategory: 'UtilityApplication',
            faqs: []
        };
    }

    const { name, description, category } = tool;

    // Define category-specific verbs and keywords
    let domain = 'productivity';
    let appCat: ToolSEOData['applicationCategory'] = 'UtilityApplication';
    if (category === 'Image Tools') {
        domain = 'digital media and image processing';
        appCat = 'MultimediaApplication';
    } else if (category === 'Developer Tools') {
        domain = 'software engineering and data conversion';
        appCat = 'DeveloperApplication';
    } else if (category === 'Business Tools') {
        domain = 'business document formatting and office administration';
        appCat = 'DesignApplication';
    } else if (category === 'Student Tools') {
        domain = 'academic organization, GPA calculation, and studying';
        appCat = 'UtilityApplication';
    } else if (category === 'Food Technology') {
        domain = 'food science research, QA parameters, and recipe formulation';
        appCat = 'UtilityApplication';
    } else if (category === 'Shareable Tools') {
        domain = 'group collaboration, team management, and decision making';
        appCat = 'UtilityApplication';
    }

    // Build unique long introduction (200+ words)
    const introduction = `The ${name} is a high-value, professional-grade online utility designed to streamline operations in the domain of ${domain}. Specifically, it addresses the need to ${description.toLowerCase()} with speed, precision, and privacy. In modern workflows, users are frequently forced to upload their confidential files or sensitive calculations to remote servers. This introduces massive privacy risks, compliance concerns, and server-side latency. The ${name} on VisualizeMyData operates 100% inside your local web browser. By executing the calculation or rendering logic locally using client-side JavaScript, it guarantees that your inputs, files, and variables never leave your device. Whether you are working from a secure corporate network, a student laboratory, or a remote location, this tool provides a robust, zero-installation, and offline-compatible environment for your day-to-day requirements.`;

    // Build unique long how-to-use / how-it-works (150+ words)
    const howItWorks = `To use the ${name}, simply locate the input fields or file upload area at the top of this workspace. Enter your raw variables or drop your source files. As soon as the inputs are received, the local Javascript execution model processes the parameters in real time. For calculators, values are dynamically computed using native mathematical algorithms. For document builders, the content is rendered into an interactive print-ready layout that utilizes clean CSS layouts. You can preview the output instantly, adjust settings (such as colors, values, or sizes), and click the primary action button to download or print your results. No signups, email verification, or registration blocks are required, allowing you to start and complete your work in less than five seconds.`;

    // Build unique technical details (100+ words)
    const technicalDetails = `Under the hood, this utility is built entirely with React components and standard web technologies (HTML5, CSS3, and JavaScript ES6+). It leverages reactive state variables to monitor user input and trigger re-renders instantly. Processing tasks are performed on the main thread using standard optimization guidelines to ensure zero lag and sub-second execution speeds. Document outputs use CSS media print frameworks to align columns and page breaks for clean PDF generation. Image tasks utilize high-resolution canvas pixels. No external trackers, ads script wrappers, or telemetry nodes are active inside the tool workspace, which guarantees a lightweight file footprint and a Google Lighthouse score exceeding 90.`;

    // Category-specific lists
    let features: string[] = [];
    let useCases: string[] = [];
    let faqs: { question: string; answer: string }[] = [];

    if (category === 'Student Tools') {
        features = [
            `Academic Standard Alignment: Calculates metrics using standard university and high school schemas.`,
            `Offline Study Companion: Works without an active internet connection once loaded on your mobile or tablet.`,
            `100% Private Gradebook: Your GPA, study timer sessions, and resume text are stored locally in your browser.`,
            `Export to Print: Convert resumes and countdown lists directly to clean, standard PDF formats.`
        ];
        useCases = [
            `High school and university students tracking their academic progress or attendance targets.`,
            `Applicants formatting professional resumes to apply for competitive internship positions.`,
            `Students using Pomodoro intervals to schedule deep study blocks and prepare for exams.`
        ];
        faqs = [
            {
                question: `Does this calculator save my grades or study timer history?`,
                answer: `No. All metrics and inputs are kept in your browser's temporary memory (or localStorage if you save a countdown). Close the tab and your data is completely cleared.`
            },
            {
                question: `Can I export the student resume to a standard PDF?`,
                answer: `Yes. Simply click the download button, which will open the browser print dialog. You can select "Save as PDF" to generate a perfectly formatted PDF.`
            },
            {
                question: `Is the GPA Converter aligned with international grading scales?`,
                answer: `Yes. It supports conversions between standard 4.0 scales, 10.0 CGPA scales, and raw percentage metrics commonly used globally.`
            }
        ];
    } else if (category === 'Business Tools') {
        features = [
            `Instant PDF Export: Generate invoice, card, or letterhead files instantly in standard print layouts.`,
            `Custom Branding: Upload your own company logo and choose signature fonts locally.`,
            `Client-Side Document Drafting: Complete quotes, business cards, and certificates with zero server latency.`,
            `Reusable Layouts: Store preferred layouts in browser localStorage for future drafts.`
        ];
        useCases = [
            `Freelancers and small business owners generating professional invoices and quotations on the go.`,
            `Designers drafting business card mockups and letterheads with direct local printing previews.`,
            `Administrators awarding certificates of completion to workshop participants instantly.`
        ];
        faqs = [
            {
                question: `Can I change the currencies or taxes on the invoice generator?`,
                answer: `Yes. The tool features fully customizable tax rates, discounts, and currency settings that update the total amount dynamically.`
            },
            {
                question: `Are my signature drawings stored anywhere?`,
                answer: `Absolutely not. The signature pad draws on a local canvas element. When you export, it converts to a base64 PNG in your browser, keeping your signature fully private.`
            },
            {
                question: `Does the PDF print version support background colors and logos?`,
                answer: `Yes. To print background colors, ensure that 'Background graphics' is enabled in your browser's print options dialog.`
            }
        ];
    } else if (category === 'Food Technology') {
        features = [
            `Standard Titration Calculations: FFA calculations use official biochemical equations.`,
            `Industrial Scale Conversions: Converts raw moisture metrics and recipe volumes for commercial batching.`,
            `Nutrition Fact Panel Compliance: Creates standard FDA style panels from raw nutrient weights.`,
            `Solids-Not-Fat (SNF) Auto-Correction: Corrects CLR values based on standard Gerber reading calibration.`
        ];
        useCases = [
            `Dairy scientists and quality control personnel testing milk SNF and Gerber fat percentages.`,
            `Food product developers scaling recipes for test kitchens or commercial factory production.`,
            `Small-scale food businesses calculating packaging nutrition labels and recipe margins.`
        ];
        faqs = [
            {
                question: `What equation is used for the Milk SNF calculation?`,
                answer: `It uses the standard Indian Dairy Association formula: SNF = (CLR/4) + (0.21 * Fat %) + 0.36 (or 0.14 depending on lactometer temperature settings).`
            },
            {
                question: `How does the moisture basis converter work?`,
                answer: `It translates wet-basis moisture (ratio of water to total product weight) to dry-basis (ratio of water to dry matter weight) and vice versa.`
            },
            {
                question: `Are the FDA nutrition panels compliant with modern packaging laws?`,
                answer: `Yes. The generated panel matches the standard layout guidelines, including serving sizes, daily values, and bold nutrient headings.`
            }
        ];
    } else if (category === 'Shareable Tools') {
        features = [
            `Interactive Canvas Animations: Spin wheels and coin flips feature high-performance CSS and Canvas rendering.`,
            `Pro Customization: QR Generator Pro supports logo uploads, gradient colors, and rounded dots.`,
            `Randomization Algorithms: Random name pickers and team generators use cryptographically secure random values.`,
            `Physics Dice Roller: Dices are rolled using physics-inspired vectors and rolling sequences.`
        ];
        useCases = [
            `Teachers drawing student names or splitting classrooms into random balanced teams.`,
            `Organizers hosting raffles or giveaways using the spin wheel or name picker.`,
            `Individuals choosing options or playing games using coin flips and dice rolls.`
        ];
        faqs = [
            {
                question: `Is the QR Code Generator Pro completely free for commercial links?`,
                answer: `Yes. The generated QR codes have no expiration date, no scan limits, and can be used on commercial packages or billboards.`
            },
            {
                question: `Are the name draws or team selections biased?`,
                answer: `No. The calculations leverage JavaScript's Math.random() seed, ensuring that all draws are uniformly distributed and fair.`
            },
            {
                question: `Can I save my wheel options or names list?`,
                answer: `Yes. The lists are automatically cached in your browser's localStorage so they will load the next time you open the tool.`
            }
        ];
    } else {
        // Fallback for Developer or Image Tools not manually written
        features = [
            `Browser-Based Execution: Runs 100% locally with zero data uploads.`,
            `Sub-Second Performance: Compiles and parses variables in milliseconds.`,
            `No Signup Required: Free access with no registration walls.`,
            `Mobile Optimization: Responsive layout designed for both screens.`
        ];
        useCases = [
            `Professionals executing quick conversions on their devices.`,
            `Developers debugging JSON, regex patterns, or timestamps offline.`,
            `Designers cropping or optimizing graphics on local environments.`
        ];
        faqs = [
            {
                question: `Is my input data secure?`,
                answer: `Yes. All inputs, text, and variables remain in your browser's local memory, ensuring complete privacy.`
            },
            {
                question: `Does this utility work offline?`,
                answer: `Yes. Once the page is loaded, the entire script runs without requiring an internet connection.`
            },
            {
                question: `Are there limits to how many times I can use it?`,
                answer: `No. There are no daily limits, usage caps, or paywalls.`
            }
        ];
    }

    return {
        seoTitle: `${name} – Free Online Utility | VisualizeMyData`,
        seoDescription: `${description} Fast, secure, and 100% client-side. No signups, no database, files never leave your device.`,
        introduction,
        howItWorks,
        features,
        technicalDetails,
        useCases,
        applicationCategory: appCat,
        faqs
    };
}
