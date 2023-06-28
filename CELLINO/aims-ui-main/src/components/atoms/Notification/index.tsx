import { Badge } from "@mui/material";

export interface NotificationIconProps {
  variant?: "dot" | "standard";
  overlap?: "circular" | "rectangular";
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({
  variant = "dot",
  overlap = "circular",
}) => {
  return (
    <Badge
      variant={variant}
      overlap={overlap}
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: "#FF5630",
          color: "#FF5630",
        },
      }}
    >
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.4599 11.4862H17.2437C18.2289 11.4862 19.0275 12.2848 19.0275 13.27C19.0275 14.2552 18.2289 15.0539 17.2437 15.0539H1.78383C0.798648 15.0539 0 14.2552 0 13.27C0 12.2848 0.798648 11.4862 1.78383 11.4862H3.56766L4.23157 5.51099C4.53063 2.81945 6.80566 0.783203 9.51376 0.783203C12.2219 0.783203 14.4969 2.81945 14.796 5.51099L15.4599 11.4862Z"
          fill="#BCB7C0"
        />
        <path
          d="M11.8922 18.6216C11.8922 17.308 10.8273 16.2432 9.51371 16.2432C8.20013 16.2432 7.13527 17.308 7.13527 18.6216C7.13527 19.9352 8.20013 21 9.51371 21C10.8273 21 11.8922 19.9352 11.8922 18.6216Z"
          fill="#BCB7C0"
        />
      </svg>
    </Badge>
  );
};
