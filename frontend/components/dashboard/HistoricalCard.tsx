export default function HistoricalCard({ history }: any) {
  if (!history) return null;

  const similarity = Math.round(history.average_similarity * 100);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-xl h-full">
      <h2 className="text-lg font-bold mb-4">Historical Intelligence</h2>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Similarity Match</span>

            <span className="font-semibold">{similarity}%</span>
          </div>

          <div className="h-2 bg-slate-800 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{
                width: `${similarity}%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800 rounded-xl p-3">
            <p className="text-xs text-slate-400">Similar Cases</p>

            <h3 className="text-2xl font-bold">
              {history.similar_incidents_found}
            </h3>
          </div>

          <div className="bg-slate-800 rounded-xl p-3">
            <p className="text-xs text-slate-400">Priority Rate</p>

            <h3 className="text-2xl font-bold text-red-400">
              {history.high_priority_rate}%
            </h3>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-3">
          <p className="text-xs text-slate-400">Most Common Cause</p>

          <h3 className="font-semibold capitalize">
            {history.most_common_cause}
          </h3>
        </div>
      </div>
    </div>
  );
}
