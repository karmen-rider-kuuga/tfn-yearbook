import TimeLineHeader, { TimelineType } from "@/components/Header/TimeLineHeader";
import Gallery from "@/components/Timeline/Gallery";
import Member from "@/components/Timeline/Member";
import { colors } from "@/configs/colors";
import { useState } from "react";

export default function TimelinePage() {
  const [tab, setTab] = useState<TimelineType>(TimelineType.GALLERY);

  return (
    <div
      style={{ backgroundColor: colors.background }}
      className="px-4 sm:px-8 lg:px-16 py-6"
    >
      <TimeLineHeader
        tab={tab}
        setTab={setTab} />

      {tab === TimelineType.GALLERY ? <Gallery /> : null}
      {tab === TimelineType.MEMBER ? <Member /> : null}
    </div>
  );
}