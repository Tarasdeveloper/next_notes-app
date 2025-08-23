export default function SideNav() {
    const notes = ['hello', 'world', 'test'];

    return (
        <section className={'nav '}>
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
                        <button className="card-button-secondary" key={idx}>
                            <p>{note}</p>
                            <small>DATETIME</small>
                            DELETE ICON
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
