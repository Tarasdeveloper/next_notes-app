'use client';

import Editor from '@/components/Editor';
import MDX from '@/components/MDX';
import SideNav from '@/components/SideNav';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useState } from 'react';

export default function NotesPage() {
    const [isViewer, setIsViewer] = useState(true);
    // const [text, setText] = useState('');
    const [showNav, setShowNav] = useState(false);
    const { currentUser, isLoadingUser } = useAuth();
    const [note, setNote] = useState({
        content: '',
    });
    const [noteIds, setNoteIds] = useState([]);
    const [savingNote, setSavingNote] = useState(false);

    function toggleNav() {
        setShowNav(!showNav);
    }

    function toggleViewer() {
        setIsViewer(!isViewer);
    }

    function handleCreateNote() {
        setNote({
            content: '',
        });
    }
    function handleEditNote(e) {
        setNote({
            ...note,
            content: e.target.value,
        });
    }

    async function handleSaveNote() {
        if (!note?.content) return;
        setSavingNote(true);

        try {
            if (note?.id) {
                const notesRef = doc(
                    db,
                    'users',
                    currentUser.uid,
                    'notes',
                    note.id
                );
                await setDoc(
                    notesRef,
                    {
                        ...note,
                    },
                    { merge: true }
                );
            } else {
                const newId = note.content.slice(0, 15) + '__' + Date.now();
                const notesRef = doc(
                    db,
                    'users',
                    currentUser.uid,
                    'notes',
                    newId
                );
                const newDocInfo = await setDoc(notesRef, {
                    content: note.content,
                    createdAt: serverTimestamp(),
                });
                setNote({ ...note, id: newId });
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setSavingNote(false);
        }
    }

    if (isLoadingUser) {
        return <h5 className="text-gradient">Loading...</h5>;
    }

    if (!currentUser) {
        window.location.href = '/';
    }

    return (
        <main id="notes">
            <SideNav
                handleCreateNote={handleCreateNote}
                noteIds={noteIds}
                setNoteIds={setNoteIds}
                showNav={showNav}
                setShowNav={setShowNav}
            />
            {!isViewer ? (
                <Editor
                    savingNote={savingNote}
                    handleSaveNote={handleSaveNote}
                    setText={handleEditNote}
                    toggleNav={toggleNav}
                    text={note?.content}
                    isViewer={isViewer}
                    toggleViewer={toggleViewer}
                />
            ) : (
                <MDX
                    savingNote={savingNote}
                    handleSaveNote={handleSaveNote}
                    toggleNav={toggleNav}
                    text={note?.content}
                    isViewer={isViewer}
                    toggleViewer={toggleViewer}
                />
            )}
        </main>
    );
}
