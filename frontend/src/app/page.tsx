import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Master DSA Patterns
            </span>
            <br />
            <span className="text-white">Ace Your FAANG Interview</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Learn the essential patterns first, then practice with curated problems.
            The systematic approach to cracking Big Tech interviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/patterns"
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-semibold text-lg hover:opacity-90 transition"
            >
              Start Learning Patterns
            </Link>
            <Link
              href="/questions"
              className="px-8 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white font-semibold text-lg hover:bg-gray-700 transition"
            >
              Practice Questions
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            The Right Way to Prepare
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="pl-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">Learn Patterns First</h3>
                <p className="text-gray-400 mb-4">
                  Master the 15 core DSA patterns with code templates in JavaScript and Java.
                  Understand when to use each pattern and common mistakes to avoid.
                </p>
                <Link
                  href="/patterns"
                  className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
                >
                  Explore 15 Patterns
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="pl-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">Practice with Purpose</h3>
                <p className="text-gray-400 mb-4">
                  260+ curated problems organized by pattern and company.
                  Track your progress and focus on high-frequency questions.
                </p>
                <Link
                  href="/questions"
                  className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-1"
                >
                  Start Practicing
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patterns Preview */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            15 Essential Patterns
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            These patterns cover 90% of coding interview problems. Master them and you'll recognize solutions instantly.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {patterns.map((pattern) => (
              <Link
                key={pattern.id}
                href={`/patterns/${pattern.id}`}
                className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-indigo-500/50 transition text-center"
              >
                <span className="text-3xl block mb-2">{pattern.icon}</span>
                <span className="text-sm text-gray-300">{pattern.name}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/patterns"
              className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-2"
            >
              View All Patterns
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-400">15</div>
              <div className="text-gray-400">Core Patterns</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400">260+</div>
              <div className="text-gray-400">Curated Problems</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400">2</div>
              <div className="text-gray-400">Languages (JS/Java)</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400">10+</div>
              <div className="text-gray-400">Companies Covered</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const patterns = [
  { id: 'two-pointers', name: 'Two Pointers', icon: '👆👆' },
  { id: 'sliding-window', name: 'Sliding Window', icon: '🪟' },
  { id: 'prefix-sum', name: 'Prefix Sum', icon: '➕' },
  { id: 'hash-map', name: 'Hash Map', icon: '🗂️' },
  { id: 'binary-search', name: 'Binary Search', icon: '🔍' },
  { id: 'stack', name: 'Stack', icon: '📚' },
  { id: 'linked-list', name: 'Linked List', icon: '🔗' },
  { id: 'trees', name: 'Trees', icon: '🌳' },
  { id: 'graphs', name: 'Graphs', icon: '🕸️' },
  { id: 'heap', name: 'Heap', icon: '⛰️' },
  { id: 'dynamic-programming', name: 'Dynamic Programming', icon: '📊' },
  { id: 'backtracking', name: 'Backtracking', icon: '🔙' },
  { id: 'intervals', name: 'Intervals', icon: '📅' },
  { id: 'trie', name: 'Trie', icon: '🔤' },
  { id: 'union-find', name: 'Union Find', icon: '🔗' },
];
