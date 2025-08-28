'use client';
import Editor from '@/components/Editor';
import MDX from '@/components/MDX';
import SideNav from '@/components/SideNav';
import { useState } from 'react';

export default function NotesPage() {
    const [isViewer, setIsViewer] = useState(true);
    const [text, setText] = useState('');
    const [showNav, setShowNav] = useState(false);

    function toggleNav() {
        setShowNav(!showNav);
    }

    function toggleViewer() {
        setIsViewer(!isViewer);
    }

    return (
        <main id="notes">
            <SideNav showNav={showNav} setShowNav={setShowNav} />
            {!isViewer ? (
                <Editor
                    setText={setText}
                    toggleNav={toggleNav}
                    text={text}
                    isViewer={isViewer}
                    toggleViewer={toggleViewer}
                />
            ) : (
                <MDX
                    toggleNav={toggleNav}
                    text={text}
                    isViewer={isViewer}
                    toggleViewer={toggleViewer}
                />
            )}
        </main>
    );
}
