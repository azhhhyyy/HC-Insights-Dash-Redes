import { NavLink, useLocation } from "react-router";
import { MessageSquarePlus, ChevronRight } from "lucide-react";
import { NAV_ITEMS, HCC_NAV_ITEMS, ACO_NAV_ITEMS, OUTCOMES_NAV_ITEMS, SYSTEM_NAV_ITEMS, type NavItem } from "../../lib/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarRail,
  useSidebar,
} from "../ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Avatar, AvatarFallback } from "../ui/avatar";

function NavMenu({ items }: { items: NavItem[] }) {
  const { pathname } = useLocation();
  return (
    <SidebarMenu>
      {items.map((item) => {
        const active = pathname === item.path || pathname.startsWith(item.path + "/");
        const Icon = item.icon;

        if (item.subItems && item.subItems.length > 0) {
          return (
            <Collapsible
              key={item.key}
              asChild
              defaultOpen={active}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.label} isActive={active}>
                    <Icon />
                    <span className="truncate flex-1 text-left">{item.label}</span>
                    <ChevronRight className="ml-auto shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  <SidebarMenuSub className="pb-2 relative">
                    {item.subItems.map((subItem) => {
                      const isSubActive = pathname === subItem.path;
                      return (
                        <SidebarMenuSubItem key={subItem.key}>
                          <SidebarMenuSubButton asChild isActive={isSubActive}>
                            <NavLink to={subItem.path}>
                              <span>{subItem.label}</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        }

        return (
          <SidebarMenuItem key={item.key}>
            <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
              <NavLink to={item.path}>
                <Icon />
                <span>{item.label}</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();

  const isHcc = pathname.startsWith("/hcc");
  const isAco = pathname.startsWith("/aco");
  const isOutcomes = pathname.startsWith("/outcomes");

  let navItems = NAV_ITEMS;
  let groupLabel = "Analytics";

  if (isHcc) {
    navItems = HCC_NAV_ITEMS;
    groupLabel = "HCC Insights";
  } else if (isAco) {
    navItems = ACO_NAV_ITEMS;
    groupLabel = "ACO Insights";
  } else if (isOutcomes) {
    navItems = OUTCOMES_NAV_ITEMS;
    groupLabel = "Patient Outcomes";
  }

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 px-1 py-1.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary text-sm text-primary-foreground">
            A
          </span>
          {!collapsed && (
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="truncate tracking-tight text-foreground" style={{ fontWeight: 600 }}>
                ACME DPC
              </span>
              <span className="truncate text-[11px] text-slate-400">Your Logo Here</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
          <NavMenu items={navItems} />
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <NavMenu items={SYSTEM_NAV_ITEMS} />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Send feedback">
              <MessageSquarePlus />
              <span>Send feedback</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Hannah Smith" className="h-auto py-1.5">
              <Avatar className="size-7 rounded-md">
                <AvatarFallback className="rounded-md bg-primary text-xs text-primary-foreground">
                  HS
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col leading-tight">
                <span className="truncate text-sm text-foreground">Hannah Smith</span>
                <span className="truncate text-[11px] text-slate-400">Administrator</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
