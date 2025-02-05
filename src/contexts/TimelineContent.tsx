import React, { createContext, useContext, useState } from "react";

export enum TimelineType {
  GALLERY = "Gallery",
  MEMBER = "Member",
}

interface TimelineContextProps {
  tab: TimelineType;
  setTab: (tab: TimelineType) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  setYears: (years: string[]) => void;
  years: string[];
}

const TimelineContext = createContext<TimelineContextProps | undefined>(undefined);

export const useTimelineContext = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error("useTimelineContext must be used within a TimelineProvider");
  }
  return context;
};

export const TimelineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tab, setTab] = useState<TimelineType>(TimelineType.GALLERY);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [years, setYears] = useState<string[]>([]);

  return (
    <TimelineContext.Provider value={{ tab, setTab, selectedYear, setSelectedYear, setYears, years }}>
      {children}
    </TimelineContext.Provider>
  );
};
