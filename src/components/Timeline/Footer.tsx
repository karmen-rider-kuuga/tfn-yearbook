import { colors } from "@/configs/colors";
import { useTimelineContext } from "@/contexts/TimelineContext";

export default function Footer() {
  const { selectedYear, years, setSelectedYear } = useTimelineContext();

  const sortedYears = years.map(Number).sort((a, b) => a - b);
  const currentIndex = sortedYears.indexOf(Number(selectedYear));
  const previousYear = currentIndex > 0 ? sortedYears[currentIndex - 1] : null;
  const nextYear = currentIndex < sortedYears.length - 1 ? sortedYears[currentIndex + 1] : null;

  return (
    <div
      style={{ color: colors.chocolate }}
      className="flex justify-between items-center font-Montserrat font-semibold"
    >
      {previousYear ? (
        <a href="#" className="flex items-center space-x-2" onClick={() => setSelectedYear(previousYear.toString())}>
          <span className="rotate-90">←</span>
          <span>Go to {previousYear}</span>
        </a>
      ) : (
        <div />
      )}

      <span>End of {selectedYear || "Timeline"}</span>

      {nextYear ? (
        <a href="#" className="flex items-center space-x-2" onClick={() => setSelectedYear(nextYear.toString())}>
          <span>Go to {nextYear}</span>
          <span className="rotate-270">→</span>
        </a>
      ) : (
        <div />
      )}
    </div>
  );
}
