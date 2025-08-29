'use client';

import Editor from '@/components/Editor';
import MDX from '@/components/MDX';
import SideNav from '@/components/SideNav';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function NotesPage() {
    const [isViewer, setIsViewer] = useState(true);
    const [text, setText] = useState('');
    const [showNav, setShowNav] = useState(false);
    const { currentUser, isLoadingUser } = useAuth();

    function toggleNav() {
        setShowNav(!showNav);
    }

    function toggleViewer() {
        setIsViewer(!isViewer);
    }

    if (isLoadingUser) {
        return <h6 className="text-gradient">Loading...</h6>;
    }

    if (!currentUser) {
        window.location.href = '/';
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
