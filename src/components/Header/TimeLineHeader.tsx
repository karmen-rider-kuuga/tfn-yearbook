export enum TimelineType {
  GALLERY = "GALLERY",
  MEMBER = "MEMBER",
}

interface Props {
  tab: TimelineType;
  setTab: (tab: TimelineType) => void;
}

export default function TimeLineHeader(props: Props) {
  const { tab, setTab } = props;

  return (
    <div className="max-w-screen-2xl mx-auto font-Montserrat border-b border-gray-200">
      <div className="w-full mx-auto px-12 py-4 flex justify-between items-center">

        {/* 🔘 Tab Menu */}
        <div className="flex space-x-6">
          <button
            className={`font-semibold ${tab === TimelineType.GALLERY
              ? "text-black border-b-2 border-black pb-1"
              : "text-gray-600 hover:text-black font-normal"
              }`}
            onClick={() => setTab(TimelineType.GALLERY)}
          >
            Gallery
          </button>
          <button
            className={`font-semibold ${tab === TimelineType.MEMBER
              ? "text-black border-b-2 border-black pb-1"
              : "text-gray-600 hover:text-black font-normal"
              }`}
            onClick={() => setTab(TimelineType.MEMBER)}
          >
            Member
          </button>
        </div>

        {/* 🔘 Empty Space for Flex */}
        <div className="flex-grow"></div>

      </div>
    </div>
  );

}
