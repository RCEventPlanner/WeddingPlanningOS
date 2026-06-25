export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold">
          Wedding Planning OS
        </h1>

        <p className="mt-3 text-gray-600">
          Your All-in-One Wedding Planning Platform
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-xl">
              Wedding Countdown
            </h2>
            <p className="mt-2">168 Days Remaining</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-xl">
              RSVP
            </h2>
            <p className="mt-2">120 / 300 Guests Replied</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-xl">
              Budget
            </h2>
            <p className="mt-2">RM 12,500 / RM 25,000</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-xl">
              Vendor Progress
            </h2>
            <p className="mt-2">8 / 15 Completed</p>
          </div>
        </div>
      </div>
    </main>
  );
}