import { Suspense } from 'react';

export default function NotesLayout({ children }) {
    return (
        <>
            <Suspense fallback={<h5 className="text-gradient">Loading...</h5>}>
                {children}
            </Suspense>
        </>
    );
}
