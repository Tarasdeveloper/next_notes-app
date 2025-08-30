import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function SideNav({
    showNav,
    setShowNav,
    noteIds,
    setNoteIds,
    handleCreateNote,
}) {
    // const notes = ['hello', 'world', 'test'];

    const { logout, currentUser } = useAuth();

    const ref = useRef(null);
    const router = useRouter();

    async function deleteNote(noteId) {
        try {
            const notesRef = doc(db, 'users', currentUser.uid, 'notes', noteId);
            await deleteDoc(notesRef);
            setNoteIds((prev) => prev.filter((id) => id !== noteId));
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setShowNav(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, setShowNav]);

    useEffect(() => {
        if (!currentUser) return;

        async function fetchIndexes() {
            try {
                const notesRef = collection(
                    db,
                    'users',
                    currentUser.uid,
                    'notes'
                );
                const snapshot = await getDocs(notesRef);
                const notesIndexes = snapshot.docs.map((doc) => doc.id);
                setNoteIds(notesIndexes);
            } catch (err) {
                console.log(err.message);
            } finally {
                // setIsLoadingUser(false);
            }
        }
        fetchIndexes();
    }, []);

    return (
        <section ref={ref} className={'nav ' + (showNav ? '' : 'hidden-nav')}>
            <h1 className="text-gradient">MDNOTES</h1>
            <h6>Easy Notes</h6>
            <div className="full-line"></div>
            <button onClick={handleCreateNote}>
                <h6>New note</h6>
                <i className="fa-solid fa-plus"></i>
            </button>
            <div className="notes-list">
                {noteIds.length === 0 ? (
                    <p> You have no notes</p>
                ) : (
                    noteIds.map((note, idx) => {
                        const [n, d] = note.split('__');
                        const date = new Date(parseInt(d)).toString();
                        return (
                            <button
                                onClick={() => router.push(`/notes?id=${note}`)}
                                className="card-button-secondary list-btn"
                                key={idx}
                            >
                                <p>{n}</p>
                                <small>
                                    {date.split(' ').slice(1, 4).join(' ')}
                                </small>
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteNote(note);
                                    }}
                                    className="delete-btn"
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
            <div className="full-line"></div>
            <button onClick={logout}>
                <h6>Logout</h6>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
        </section>
    );
}
