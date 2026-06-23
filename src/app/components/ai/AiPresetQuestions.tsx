import React from 'react';
import { Badge } from "../ui/badge";

const PRESETS = [
  "Summarize patient risk",
  "Show utilization gaps",
  "Generate outcomes report",
  "Any new coding opportunities?"
];

export function AiPresetQuestions({ onSelect }: { onSelect: (question: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PRESETS.map((preset) => (
        <Badge
          key={preset}
          variant="secondary"
          className="cursor-pointer hover:bg-secondary/80 text-xs py-1"
          onClick={() => onSelect(preset)}
        >
          {preset}
        </Badge>
      ))}
    </div>
  );
}
