import { SidebarItem } from "@/components/ui/profile/SidebarItem";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const location = useLocation();

  return (
    <div className="w-full">
      {/* Mobile Tabs */}
      <div className="lg:hidden w-full border-b border-[#E6E6E1] mb-6">
        <nav className="flex">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex-1 text-center py-3 border-b-2 ${
                location.pathname === item.path
                  ? "text-[#0166FF] border-[#0166FF]"
                  : "text-[#9D9E98] border-transparent"
              }`}
            >
              {item.label.split(" ")[0]}
            </Link>
          ))}
        </nav>
      </div>

      {/* Desktop Layout */}
      <div className="flex flex-col lg:flex-row gap-6 py-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-[291px] flex-shrink-0">
          <nav className="flex flex-col">
            {sidebarItems.map((item) => (
              <Link key={item.label} to={item.path}>
                <SidebarItem
                  label={item.label}
                  icon={item.icon}
                  active={location.pathname === item.path}
                />
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
};

const sidebarItems = [
  {
    label: "Home",
    path: "/dashboard-home",
    icon: <img src="/svg/profile-home/home/home.svg" className="w-5 h-5" />,
  },
  {
    label: "Personal information",
    path: "/dashboard-personal-info",
    icon: <img src="/svg/profile-home/home/user.svg" className="w-5 h-5" />,
  },
  {
    label: "Documents",
    path: "/dashboard-documents",
    icon: <img src="/svg/profile-home/home/folder.svg" className="w-5 h-5" />,
  },
  {
    label: "Requests",
    path: "/dashboard-requests",
    icon: (
      <img src="/svg/profile-home/home/announcement.svg" className="w-5 h-5" />
    ),
  },
];
