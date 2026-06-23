
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}

      <nav className="border-b border-slate-800 sticky top-0 bg-slate-950/90 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-cyan-400">
              ETIS
            </h1>

            <p className="text-xs text-slate-500">
              Event Traffic Intelligence System
            </p>
          </div>

          <div className="flex gap-3">

            <Link
              href="/login"
              className="px-5 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 transition"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition"
            >
              Sign Up
            </Link>

          </div>

        </div>
      </nav>

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6">
              ● AI Powered Traffic Operations Platform
            </div>

            <h1 className="text-6xl font-bold leading-tight">
              Predict Traffic
              <span className="text-cyan-400">
                {" "}Before{" "}
              </span>
              It Becomes Chaos
            </h1>

            <p className="mt-6 text-xl text-slate-400 leading-relaxed">
              ETIS helps traffic police, city authorities,
              and emergency responders predict congestion,
              optimize resource deployment,
              and manage incidents in real-time.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                href="/login"
                className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 rounded-2xl font-semibold transition"
              >
                Launch Command Center
              </Link>

              <Link
                href="/signup"
                className="px-8 py-4 border border-slate-700 hover:bg-slate-900 rounded-2xl font-semibold transition"
              >
                Create Account
              </Link>

              <Link
                href="/report"
                className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-2xl font-semibold transition"
              >
                Report Problem
              </Link>

            </div>

          </div>

          <div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Live Situation Snapshot
              </h2>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
                  <p className="text-red-400 text-sm">
                    Critical Events
                  </p>

                  <h3 className="text-4xl font-bold mt-2">
                    21
                  </h3>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
                  <p className="text-green-400 text-sm">
                    Officers Active
                  </p>

                  <h3 className="text-4xl font-bold mt-2">
                    48
                  </h3>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
                  <p className="text-blue-400 text-sm">
                    Incidents Managed
                  </p>

                  <h3 className="text-4xl font-bold mt-2">
                    8173
                  </h3>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5">
                  <p className="text-purple-400 text-sm">
                    AI Accuracy
                  </p>

                  <h3 className="text-4xl font-bold mt-2">
                    99%
                  </h3>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CURRENT URBAN CHALLENGES */}

      <section className="border-t border-slate-800 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-bold">
              Urban Traffic Challenges
            </h2>

            <p className="text-slate-400 mt-4">
              Inspired by traffic issues commonly faced in Bengaluru and other major cities.
            </p>

          </div>

          <div className="grid lg:grid-cols-4 gap-6">

            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
              <div className="text-5xl mb-4">🚧</div>

              <h3 className="text-xl font-bold text-orange-400 mb-3">
                Road Construction
              </h3>

              <p className="text-slate-400">
                Metro expansion and infrastructure work create traffic bottlenecks.
              </p>
            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
              <div className="text-5xl mb-4">🚗</div>

              <h3 className="text-xl font-bold text-red-400 mb-3">
                Peak Hour Congestion
              </h3>

              <p className="text-slate-400">
                Severe delays occur in office and IT corridors during rush hours.
              </p>
            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
              <div className="text-5xl mb-4">🎉</div>

              <h3 className="text-xl font-bold text-purple-400 mb-3">
                Public Events
              </h3>

              <p className="text-slate-400">
                Festivals, rallies and gatherings cause sudden traffic spikes.
              </p>
            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
              <div className="text-5xl mb-4">🚑</div>

              <h3 className="text-xl font-bold text-cyan-400 mb-3">
                Emergency Access
              </h3>

              <p className="text-slate-400">
                Congestion delays ambulances and emergency response vehicles.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* STAKEHOLDERS */}

      <section className="border-t border-slate-800 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            Who Benefits From ETIS?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
              <div className="text-4xl mb-3">🚗</div>
              <h3 className="font-bold text-xl mb-2">Citizens</h3>
              <p className="text-slate-400">
                Faster travel and early congestion warnings.
              </p>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
              <div className="text-4xl mb-3">👮</div>
              <h3 className="font-bold text-xl mb-2">Traffic Police</h3>
              <p className="text-slate-400">
                Data-driven officer deployment decisions.
              </p>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
              <div className="text-4xl mb-3">🏛️</div>
              <h3 className="font-bold text-xl mb-2">Authorities</h3>
              <p className="text-slate-400">
                Better city-wide event planning and analytics.
              </p>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
              <div className="text-4xl mb-3">🚑</div>
              <h3 className="font-bold text-xl mb-2">Emergency Teams</h3>
              <p className="text-slate-400">
                Improved route access during emergencies.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="border-t border-slate-800 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            Core Capabilities
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
              🤖 AI Prediction
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
              🗺️ Live Mapping
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
              🚓 Auto Dispatch
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
              📊 Analytics
            </div>

          </div>

        </div>

      </section>

      {/* FOOTER CTA */}

      <section className="py-24">

        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-5xl font-bold">
            Transform Traffic Management with ETIS
          </h2>

          <p className="text-slate-400 mt-5 text-lg">
            Predict congestion. Deploy resources intelligently.
            Respond faster.
          </p>

          <Link
            href="/login"
            className="inline-block mt-10 px-10 py-4 bg-cyan-600 hover:bg-cyan-700 rounded-2xl text-lg font-semibold transition"
          >
            Launch ETIS Platform
          </Link>

        </div>

      </section>

    </main>
  );
}
