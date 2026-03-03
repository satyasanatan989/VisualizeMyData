'use client';

import Navbar from './Navbar';
import { useState } from 'react';

/**
 * A self-contained Navbar that owns its own dark mode state.
 * Use this on Server Component pages (legal pages, about, contact, etc.)
 * so no event handlers need to be passed from server to client.
 */
export default function NavbarWrapper() {
    const [darkMode, setDarkMode] = useState(true);
    return <Navbar darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)} />;
}
