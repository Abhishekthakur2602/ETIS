import Link from "next/link";

export default function CitizenReportCard() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <h2 className="text-xl font-bold mb-3">Public Incident Reporting</h2>

      <p className="text-slate-400 mb-4">
        Citizens can report accidents, traffic congestion, road damage, protests
        and water logging.
      </p>

      <Link
        href="/report"
        className="
          inline-block
          bg-blue-600
          hover:bg-blue-700
          transition
          px-4
          py-3
          rounded-xl
          font-medium
        "
      >
        Report Incident
      </Link>
    </div>
  );
}
