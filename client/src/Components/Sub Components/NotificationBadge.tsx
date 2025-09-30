import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Badge } from "@mui/material";

export default function Notifications({ count, onClear }: { count: number; onClear: () => void }) {
  return (
    <button
      aria-label="Notifications"
      onClick={onClear}
      className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-lg border notif-button"
    >
      <Badge color="error" badgeContent={count} overlap="circular">
        <NotificationsNoneIcon />
      </Badge>
    </button>
  );
}
