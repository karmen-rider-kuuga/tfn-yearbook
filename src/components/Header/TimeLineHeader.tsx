import { useTimelineContext, TimelineType } from "@/contexts/TimelineContext";

export default function TimeLineHeader() {
  const { tab, setTab, selectedYear, setSelectedYear, years } = useTimelineContext();

  return (
    <div className="max-w-7xl mx-auto flex justify-between items-center font-Montserrat">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Tabs */}
        <div className="flex space-x-6">
          <button
            className={`font-semibold ${tab === TimelineType.GALLERY
              ? "text-black border-b-2 border-black pb-1"
              : "text-black hover:text-black font-normal"
              }`}
            onClick={() => setTab(TimelineType.GALLERY)}
          >
            Gallery
          </button>
          <button
            className={`font-semibold ${tab === TimelineType.MEMBER
              ? "text-black border-b-2 border-black pb-1"
              : "text-black hover:text-black font-normal"
              }`}
            onClick={() => setTab(TimelineType.MEMBER)}
          >
            Member
          </button>
        </div>

        {/* Year Selector */}
        <select
          className="flex items-center space-x-2 px-4 py-2 rounded border border-gray-300"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
