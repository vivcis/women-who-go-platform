import React from "react";
import {
  BookOpen,
  Users,
  TrendingUp,
  Calendar,
  Code2,
  MessageSquare,
  Ticket
} from "lucide-react";

interface IconRendererProps {
  icon: string;
  className?: string;
  strokeWidth?: number;
}

const IconRendererComponent: React.FC<IconRendererProps> = ({
  icon,
  className = "w-6 h-6",
  strokeWidth = 2
}) => {
  const iconProps = { className, strokeWidth };

  switch (icon) {
    case "book":
      return <BookOpen {...iconProps} />;
    case "users":
      return <Users {...iconProps} />;
    case "chart":
      return <TrendingUp {...iconProps} />;
    case "calendar":
      return <Calendar {...iconProps} />;
    case "code":
      return <Code2 {...iconProps} />;
    case "message":
      return <MessageSquare {...iconProps} />;
    case "ticket":
      return <Ticket {...iconProps} />;
    default:
      return null;
  }
};

IconRendererComponent.displayName = 'IconRenderer';

export const IconRenderer = React.memo(IconRendererComponent);