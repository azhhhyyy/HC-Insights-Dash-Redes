import { Outlet } from "react-router";

export default function AcoLayout() {
  return (
    <div className="flex h-full w-full flex-col min-w-0 bg-muted/20">
      <Outlet />
    </div>
  );
}
