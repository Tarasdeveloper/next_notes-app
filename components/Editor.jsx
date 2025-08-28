import TopNav from './TopNav';

export default function Editor({ text, setText, ...props }) {
    return (
        <section className="notes-container">
            <TopNav {...props} />
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing..."
            ></textarea>
        </section>
    );
}
