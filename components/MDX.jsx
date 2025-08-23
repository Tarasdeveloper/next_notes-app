import TopNav from './TopNav';

export default function MDX(props) {
    return (
        <section className="mdx-container">
            <TopNav {...props} />
        </section>
    );
}
