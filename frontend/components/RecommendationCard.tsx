interface Props {
  result: any;
}

export default function RecommendationCard({
  result,
}: Props) {

  return (

    <div className="bg-slate-900 p-6 rounded-xl">

      <h2 className="text-2xl font-bold mb-4">

        ETIS AI Recommendation

      </h2>

      <div className="space-y-2">

        <p>
          Severity:
          <span className="ml-2 text-red-400">
            {result.severity}
          </span>
        </p>

        <p>
          Congestion:
          {result.congestion_score}%
        </p>

        <p>
          Constables:
          {result.constables}
        </p>

        <p>
          ASI:
          {result.asi}
        </p>

        <p>
          Inspector:
          {result.inspector}
        </p>

        <p>
          Barricades:
          {result.barricades}
        </p>

        <p>
          Diversion:
          {result.diversion}
        </p>

      </div>

    </div>
  );
}