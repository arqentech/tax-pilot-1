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

  const sidebarItems = [
    {
      label: "Home",
      path: "/dashboard-home",
      icon: (
        <img
          src="/svg/profile-home/home/home.svg"
          alt="home"
          className="w-5 h-5"
        />
      ),
    },
    {
      label: "Personal information",
      path: "/dashboard-personal-info",
      icon: (
        <img
          src="/svg/profile-home/home/user.svg"
          alt="user"
          className="w-5 h-5"
        />
      ),
    },
    {
      label: "Documents",
      path: "/dashboard-documents",
      icon: (
        <img
          src="/svg/profile-home/home/folder.svg"
          alt="documents"
          className="w-5 h-5"
        />
      ),
    },
    {
      label: "Requests",
      path: "/dashboard-requests",
      icon: (
        <img
          src="/svg/profile-home/home/announcement.svg"
          alt="announcement"
          className="w-5 h-5"
        />
      ),
    },
  ];

  return (
    <div className="flex min-h-[80vh] py-10">
      <aside className="w-full max-w-[291px] pr-12">
        <nav className="space-y-4">
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

      <main className="flex-1 min-w-[985px]">{children}</main>
    </div>
  );
};
