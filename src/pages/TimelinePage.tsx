import TimeLineHeader from "@/components/Header/TimeLineHeader";
import Footer from "@/components/Timeline/Footer";
import Gallery from "@/components/Timeline/Gallery";
import MemberList from "@/components/Timeline/Member";
import { colors } from "@/configs/colors";
import { TimelineProvider, useTimelineContext } from "@/contexts/TimelineContext";

export default function TimelinePage() {
  return (
    <TimelineProvider>
      <div
        style={{ backgroundColor: colors.background }}
        className="px-4 sm:px-8 lg:px-16 py-6"
      >
        <TimeLineHeader />
        <div className="w-full h-px bg-[#CCCFE5]" />
        <Content />
        <Footer />
      </div>
    </TimelineProvider>
  );
}

function Content() {
  const { tab } = useTimelineContext();

  return (
    <>
      {tab === "Gallery" && <Gallery />}
      {tab === "Member" && <MemberList />}
    </>
  );
}
