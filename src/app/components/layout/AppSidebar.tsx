import { NavLink, useLocation } from "react-router";
import { 
  MessageSquarePlus, 
  ChevronRight, 
  UserCog, 
  UserPlus, 
  Settings, 
  Users, 
  Activity, 
  Palette, 
  LayoutTemplate, 
  MessageSquare, 
  BookOpen, 
  Info, 
  LogOut,
  Check,
  Pipette,
  Accessibility,
  Moon,
  Type,
  Contrast
} from "lucide-react";
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuCheckboxItem
} from "../ui/dropdown-menu";
import { cn } from "../ui/utils";
import { useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";

const THEME_COLORS = [
  { id: "pink", value: "#e32168" },
  { id: "blue", value: "#2563eb" },
  { id: "teal", value: "#0d9488" },
  { id: "orange", value: "#f59e0b" },
  { id: "purple", value: "#8b5cf6" },
  { id: "yellow", value: "#fbbf24" },
  { id: "lightblue", value: "#0ea5e9" }
];

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
                    <ChevronRight className="ml-auto shrink-0 transition-[transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=open]/collapsible:rotate-90" />
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

  const { 
    primaryColor, setPrimaryColor, 
    isDarkMode, setIsDarkMode, 
    isHighContrast, setIsHighContrast, 
    isLargeText, setIsLargeText 
  } = useThemeContext();

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton tooltip="HC Superadmin" className="h-auto py-1.5 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Avatar className="size-7 rounded-md">
                    <AvatarFallback className="rounded-md bg-primary text-xs text-primary-foreground">
                      HS
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate text-sm text-foreground">HC Superadmin</span>
                    <span className="truncate text-[11px] text-slate-400">hc_superadmin@gmail.com</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" side="top" align="center" sideOffset={4}>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="size-8 rounded-md">
                      <AvatarFallback className="rounded-md bg-primary text-xs text-primary-foreground">HS</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium text-foreground">HC Superadmin</span>
                      <span className="truncate text-xs text-muted-foreground">hc_superadmin@gmail.com</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserCog className="mr-2" />
                  Manage Users
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPlus className="mr-2" />
                  Manage Onboarding
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2" />
                  Manage Organization
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="mr-2" />
                  Org Patient Counts
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Activity className="mr-2" />
                  Integration Monitoring
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Palette className="mr-2" />
                    Color Theme
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="p-3 w-[220px]">
                      <div className="font-medium text-slate-700 text-sm mb-3">Select Primary Color</div>
                      <div className="grid grid-cols-4 gap-2">
                        {THEME_COLORS.map((color) => (
                          <button
                            key={color.id}
                            className={cn(
                              "size-9 rounded-md flex items-center justify-center transition-all",
                              primaryColor === color.value ? "ring-2 ring-slate-200 ring-offset-1" : "hover:scale-110"
                            )}
                            style={{ backgroundColor: color.value }}
                            onClick={() => setPrimaryColor(color.value)}
                          >
                            {primaryColor === color.value && <Check className="size-5 text-white" strokeWidth={3} />}
                          </button>
                        ))}
                        {/* Custom Color Button */}
                        <div className="relative size-9 rounded-md border border-dashed border-slate-400 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer overflow-hidden group">
                          <Pipette className="size-4 text-slate-500 group-hover:text-slate-700" />
                          <input 
                            type="color" 
                            className="absolute inset-[-10px] opacity-0 cursor-pointer w-[200%] h-[200%]"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                          />
                        </div>
                      </div>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Accessibility className="mr-2" />
                    Accessibility
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-[200px]">
                      <DropdownMenuCheckboxItem 
                        checked={isDarkMode} 
                        onCheckedChange={setIsDarkMode}
                      >
                        <Moon className="mr-2" />
                        Dark Mode
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem 
                        checked={isHighContrast} 
                        onCheckedChange={setIsHighContrast}
                      >
                        <Contrast className="mr-2" />
                        High Contrast
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem 
                        checked={isLargeText} 
                        onCheckedChange={setIsLargeText}
                      >
                        <Type className="mr-2" />
                        Large Text
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <LayoutTemplate className="mr-2" />
                  Survey Config
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2" />
                  Templates
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <BookOpen className="mr-2" />
                  Guide
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Info className="mr-2" />
                  About
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
