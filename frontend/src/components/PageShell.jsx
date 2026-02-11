import React from 'react';

function PageShell({ title, description, children }) {
    return (
        <div>
            <section className="mx-auto max-w-6xl px-6 pb-12 pt-10">
                <span className="badge">Velno Studio</span>
                <h1 className="font-display mt-6 text-4xl font-semibold md:text-5xl">{title}</h1>
                {description ? <p className="mt-4 max-w-2xl text-white/70">{description}</p> : null}
            </section>
            {children}
        </div>
    );
}

export default PageShell;
