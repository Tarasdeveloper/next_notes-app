import { useEffect, useRef } from 'react';

export default function SideNav({ showNav, setShowNav }) {
    const notes = ['hello', 'world', 'test'];

    const ref = useRef(null);

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
    }, [ref]);

    return (
        <section ref={ref} className={'nav ' + (showNav ? '' : 'hidden-nav')}>
            <h1 className="text-gradient">MDNOTES</h1>
            <h6>Easy Notes</h6>
            <div className="full-line"></div>
            <button>
                <h6>New note</h6>
                <i className="fa-solid fa-plus"></i>
            </button>
            <div className="notes-list">
                {notes.length === 0 ? (
                    <p> You have no notes</p>
                ) : (
                    notes.map((note, idx) => (
                        <button
                            className="card-button-secondary list-btn"
                            key={idx}
                        >
                            <p>{note}</p>
                            <small>DATETIME</small>
                            <div className="delete-btn">
                                <i className="fa-solid fa-trash-can"></i>
                            </div>
                        </button>
                    ))
                )}
            </div>
            <div className="full-line"></div>
            <button>
                <h6>Logout</h6>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
        </section>
    );
}
