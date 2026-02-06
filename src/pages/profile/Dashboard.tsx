import PrimaryButton from "@/components/ui/PrimaryButton";
import { SidebarItem } from "@/components/ui/profile/SidebarItem";
import { ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats([
        { label: "pending", count: 5 },
        { label: "in progress", count: 2 },
        { label: "completed", count: 10 },
      ]);

      setUser({
        name: "Ali Sher Khan",
        initials: "AS",
        profileCompletion: 80,
      });

      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] py-10">
      <aside className="w-full max-w-[291px] pr-12">
        <nav className="space-y-4">
          <SidebarItem
            label="Home"
            active
            icon={
              <img src="/svg/profile/home.svg" alt="home" className="w-5 h-5" />
            }
          />
          <SidebarItem
            label="Personal information"
            icon={
              <img src="/svg/profile/user.svg" alt="user" className="w-5 h-5" />
            }
          />
          <SidebarItem
            label="Documents"
            icon={
              <img
                src="/svg/profile/folder.svg"
                alt="documents"
                className="w-5 h-5"
              />
            }
          />
          <SidebarItem
            label="Requests"
            icon={
              <img
                src="/svg/profile/announcement.svg"
                alt="announcement"
                className="w-5 h-5"
              />
            }
          />
        </nav>
      </aside>

      <main className=" w-full min-w-[985px] ">
        {user && (
          <div className="bg-[#FBFBFA] w-full border border-[#F0F0ED] rounded-[16px] shadow p-6 flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full text-[#34352E] bg-[#FFFFFF] flex items-center justify-center text-[18px]">
                {user.initials}
              </div>
              <div>
                <p className="font-bold text-[18px] text-[#5F6057]">
                  {user.name}
                </p>
                <p className="text-[18px] text-[#9D9E98]">
                  Profile {user.profileCompletion}% complete
                </p>
              </div>
            </div>
            <button className="bg-[#34352E] text-[#F1F1EC] h-[48px] max-w-[185px] leading-[25px] text-[18px] px-5 py-2 rounded-full hover:bg-gray-500 flex items-center justify-center gap-2">
              Complete now
              <ChevronRight width={18} />
            </button>
          </div>
        )}

        <h3 className="font-extrabold font-bricolage text-[22px] leading-[30px] text-[#34352E] mb-4">
          Your Procedures
        </h3>
        <div className="flex flex-col items-center mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 w-full max-w-4xl">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                count={stat.count}
                label={stat.label}
              />
            ))}
          </div>

          <Link to="/services">
            <PrimaryButton text="Explore Services" width="262px" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

interface StatCardProps {
  count: number;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ count, label }) => {
  return (
    <div className="bg-[#FBFBFA] rounded-[16px] p-6 text-center">
      <p className="text-[26px] font-bold text-[#5F6057] mb-2">{count}</p>
      <p className="text-[18px] text-[#9D9E98]">{label}</p>
    </div>
  );
};

interface Stat {
  label: string;
  count: number;
}

interface User {
  name: string;
  initials: string;
  profileCompletion: number;
}
