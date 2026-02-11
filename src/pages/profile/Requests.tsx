import React, { useState, useMemo } from "react";
import { DashboardLayout } from "./DashboardLayout";
import SearchBar from "@/components/ui/SearchBar";
import { cn } from "@/lib/utils";
import RequestsFilterDropdown from "@/components/ui/profile/RequestsFilterDropdown";

interface Request {
  id: string;
  practicleId: string;
  service: string;
  price: string;
  status: RequestStatus;
}

type RequestStatus = "Pending" | "In Progress" | "Completed";

interface StatusBadgeProps {
  status: RequestStatus;
}

interface StatusBadgeConfig {
  icon: string;
  textColor: string;
  borderColor: string;
  bgColor: string;
  width: string;
  textSize: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = STATUS_CONFIG[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-[5px] rounded-[21px] border h-[26px] px-3 py-1.5",
        config.width,
        config.textSize,
      )}
      style={{
        color: config.textColor,
        borderColor: config.borderColor,
        backgroundColor: config.bgColor,
      }}
    >
      <img src={config.icon} alt="" className="w-4 h-4 flex-shrink-0" />
      <span>{status}</span>
    </div>
  );
};

const RequestsTable: React.FC<{ requests: Request[] }> = ({ requests }) => {
  if (requests.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-[#9D9E98] text-lg">There are no new requests</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-[16px] ">
      <table className="w-full ">
        <thead>
          <tr
            className="border bg-[#F0F0ED]"
            style={{
              width: "895px",
              height: "54px",
            }}
          >
            <th className="text-left py-4 px-4 text-[18px] font-medium text-[#9D9E98]">
              Practicle ID
            </th>
            <th className="text-left py-4 px-4 text-[18px] font-medium text-[#9D9E98]">
              Service
            </th>
            <th className="text-left py-4 px-4 text-[18px] font-medium text-[#9D9E98]">
              Price
            </th>
            <th className="text-left py-4 px-4 text-[18px] font-medium text-[#9D9E98]">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr
              key={request.id}
              className="border-b border-[#E6E6E1] hover:bg-[#FBFBFA] transition-colors"
            >
              <td className="py-4 px-4 text-sm text-[#34352E] font-medium">
                {request.practicleId}
              </td>
              <td className="py-4 px-4 text-sm text-[#34352E]">
                {request.service}
              </td>
              <td className="py-4 px-4 text-sm text-[#34352E] font-medium">
                {request.price}
              </td>
              <td className="py-4 px-4">
                <StatusBadge status={request.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function Requests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredRequests = useMemo(() => {
    let filtered = mockRequests;

    if (selectedFilter !== "All") {
      filtered = filtered.filter((req) => req.status === selectedFilter);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (req) =>
          req.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
          req.practicleId.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered;
  }, [searchQuery, selectedFilter]);

  return (
    <DashboardLayout>
      <div className="w-[60vw] min-w-0">
        <div className="border border-[#F0F0ED] rounded-[16px] p-10">
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h1 className="font-bricolage font-extrabold text-[28px] md:text-[22px] text-[#34352E] flex-shrink-0">
                All Requests
              </h1>

              <div className="flex flex gap-2 items-center overflow-hidden">
                <SearchBar
                  onSearch={setSearchQuery}
                  value={searchQuery}
                  placeholder="Search"
                  wrapperClass="h-[48px] w-[296px] md:w-[352px] !placeholder:text-[#A4A59F] text-[#A4A59F]"
                />

                <div className="relative flex-shrink-0">
                  <RequestsFilterDropdown
                    items={["All", "Pending", "In Progress", "Completed"]}
                    onSelect={(item) => setSelectedFilter(item)}
                    triggerClass="text-[18px] h-[48px] w-[90px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[16px] p-4 md:p-6 w-full">
            <RequestsTable requests={filteredRequests} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Requests;

const mockRequests: Request[] = [
  {
    id: "1",
    practicleId: "01",
    service: "ISEE Form for Minors",
    price: "€ 29.99",
    status: "Pending",
  },
  {
    id: "2",
    practicleId: "02",
    service: "Signing a Rental Agreement",
    price: "€ 12.99",
    status: "In Progress",
  },
  {
    id: "3",
    practicleId: "02",
    service: "Land registry search",
    price: "€ 12.99",
    status: "Completed",
  },
];

const STATUS_CONFIG: Record<RequestStatus, StatusBadgeConfig> = {
  Pending: {
    icon: "/svg/profile-home/requests/flag.svg.svg",
    textColor: "#34352E",
    borderColor: "#34352E2E",
    bgColor: "#34352E1C",
    width: "w-[96px]",
    textSize: "text-[14px]",
  },
  "In Progress": {
    icon: "/svg/profile-home/requests/progress.svg",
    textColor: "#3C0D6D",
    borderColor: "#D2BDE9",
    bgColor: "#E7D8FB",
    width: "w-[116px]",
    textSize: "text-[12px]",
  },
  Completed: {
    icon: "/svg/profile-home/requests/completed.svg",
    textColor: "#36500C",
    borderColor: "#D9E6C0",
    bgColor: "#EEFCD7",
    width: "w-[116px]",
    textSize: "text-[14px]",
  },
};
