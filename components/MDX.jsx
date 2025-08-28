import Markdown from 'markdown-to-jsx';
import TopNav from './TopNav';

export default function MDX({ text, ...props }) {
    const md = `# This is a header 1 
##  This is a header 2
### This is a header 3
Hello world [click me](https://google.com) `;

    return (
        <section className="mdx-container">
            <TopNav {...props} />
            <article>
                <Markdown>{text.trim()}</Markdown>
            </article>
        </section>
    );
}
