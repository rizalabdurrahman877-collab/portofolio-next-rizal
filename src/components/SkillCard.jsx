
export default function SkillCard({ nama, level }) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
            <h3 className="text-sm font-semibold text-utama dark:text-sky-300">
                {nama}
            </h3>

            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                Level: {level}
            </p>
        </div>
    );
}
