import Editor from '@/components/Editor';
import MDX from '@/components/MDX';
import SideNav from '@/components/SideNav';
import { useState } from 'react';

export default function NotesPage() {
    const [isViewer, setIsViewer] = useState(true);

    return (
        <main id="notes">
            <SideNav />
            {!isViewer ? <Editor isViewer={isViewer} /> : <MDX />}
        </main>
    );
}
