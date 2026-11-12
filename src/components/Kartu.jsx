
export default function Kartu({ judul, children }) {
    return (
        <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900 sm:p-5">
            <h2 className="mb-3 text-xl font-bold text-utama dark:text-sky-300">
                {judul}
            </h2>

            {children}
        </section>
    );
}
