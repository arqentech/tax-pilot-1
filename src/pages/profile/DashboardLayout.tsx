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
    <div className="w-full  ">
      <div className="lg:hidden w-full border-b border-[#E6E6E1] mb-4 lg:mb-6">
        <nav className="flex justify-between gap-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex-1 text-center py-3 font-medium border-b-2 transition-colors ${
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

      <div className="flex flex-col lg:flex-row min-h-[80vh] py-4 lg:py-10 gap-6 w-full">
        <aside className="hidden lg:block w-full max-w-[291px]">
          <nav className="flex flex-col">
            {sidebarItems.map((item) => (
              <Link key={item.label} to={item.path}>
                <SidebarItem
                  label={item.label}
                  icon={item.icon}
                  active={location.pathname === item.path}
                  className="text-left"
                />
              </Link>
            ))}
          </nav>
        </aside>

        <main className=" w-full min-w-0 lg:max-w-[999px] mx-auto lg:mx-0">
          {children}
        </main>
      </div>
    </div>
  );
};

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
