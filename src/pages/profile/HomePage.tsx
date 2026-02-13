import PrimaryButton from "@/components/ui/PrimaryButton";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";

const HomePage: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
    <div className="w-[80vw]">
      <DashboardLayout>
        {user && (
          <div className="bg-[#FBFBFA]  border border-[#F0F0ED] rounded-[16px] shadow p-6 flex flex-col md:flex-row justify-between items-center mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full text-[#34352E] bg-[#FFFFFF] flex items-center justify-center text-[18px] ">
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
            <div className="bg-[#34352E] text-[#F1F1EC] h-[48px] max-w-[185px] leading-[25px] text-[18px] px-5 rounded-full hover:bg-gray-500 flex items-center justify-center gap-2">
              <Link to="/dashboard-personal-info">Complete now</Link>
              <ChevronRight width={18} />
            </div>
          </div>
        )}

        <h3 className="font-extrabold font-bricolage text-[22px] leading-[30px] text-[#34352E] mb-4">
          Your Procedures
        </h3>

        <div className="flex flex-col w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 w-full">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                count={stat.count}
                label={stat.label}
              />
            ))}
          </div>

          <div className="w-full flex justify-center">
            <Link to="/services">
              <PrimaryButton text="Explore Services" width="262px" />
            </Link>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default HomePage;

const StatCard: React.FC<{ count: number; label: string }> = ({
  count,
  label,
}) => {
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
