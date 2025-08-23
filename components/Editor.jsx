import TopNav from './TopNav';

export default function Editor(props) {
    return (
        <section className="notes-container">
            <TopNav {...props} />
            <textarea placeholder="Start typing..."></textarea>
        </section>
    );
}
