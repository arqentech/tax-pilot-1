import React, { useState, useMemo } from "react";
import { DashboardLayout } from "./DashboardLayout";
import SearchBar from "@/components/ui/SearchBar";
import { Flag, Clock, CheckCircle2, ChevronDown } from "lucide-react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

type RequestStatus = "Pending" | "In Progress" | "Completed";

interface Request {
  id: string;
  practicleId: string;
  service: string;
  price: string;
  status: RequestStatus;
}

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

const StatusBadge: React.FC<{ status: RequestStatus }> = ({ status }) => {
  const statusConfig = {
    Pending: {
      bg: "bg-[#F6F6F3]",
      text: "text-[#5F6057]",
      icon: Flag,
      iconColor: "text-[#5F6057]",
    },
    "In Progress": {
      bg: "bg-[#F3F0FF]",
      text: "text-[#6B46C1]",
      icon: Clock,
      iconColor: "text-[#6B46C1]",
    },
    Completed: {
      bg: "bg-[#F0FDF4]",
      text: "text-[#16A34A]",
      icon: CheckCircle2,
      iconColor: "text-[#16A34A]",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
        config.bg,
        config.text
      )}
    >
      <Icon className={cn("w-4 h-4", config.iconColor)} />
      <span className="text-sm font-medium">{status}</span>
    </div>
  );
};

const FilterDropdown: React.FC<{
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}> = ({ selectedFilter, onFilterChange }) => {
  const filters = ["All", "Pending", "In Progress", "Completed"];

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger className="inline-flex items-center justify-center gap-2 rounded-full bg-[#34352E] text-[#F1F1EC] px-4 py-2 h-[48px] hover:bg-[#2E2E2E] transition-colors">
        <span className="text-sm font-medium">{selectedFilter}</span>
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          sideOffset={8}
          className="rounded-[12px] border border-[#E6E6E1] bg-[#FFFFFF] p-1 shadow-md min-w-[150px]"
        >
          {filters.map((filter) => (
            <DropdownMenuPrimitive.Item
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={cn(
                "cursor-pointer select-none rounded-md px-3 py-2 text-sm text-[#34352E] hover:bg-[#F6F6F3] focus:bg-[#F6F6F3] outline-none",
                selectedFilter === filter && "bg-[#F6F6F3] font-medium"
              )}
            >
              {filter}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
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
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#E6E6E1]">
            <th className="text-left py-4 px-4 text-sm font-medium text-[#9D9E98]">
              Practicle ID
            </th>
            <th className="text-left py-4 px-4 text-sm font-medium text-[#9D9E98]">
              Service
            </th>
            <th className="text-left py-4 px-4 text-sm font-medium text-[#9D9E98]">
              Price
            </th>
            <th className="text-left py-4 px-4 text-sm font-medium text-[#9D9E98]">
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

    // Filter by status
    if (selectedFilter !== "All") {
      filtered = filtered.filter(
        (req) => req.status === selectedFilter
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (req) =>
          req.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
          req.practicleId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, selectedFilter]);

  return (
    <DashboardLayout>
      <div className="w-full min-w-0">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="font-bricolage font-extrabold text-[22px] md:text-[28px] text-[#34352E] flex-shrink-0">
              All Requests
            </h1>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 flex-1 sm:max-w-none md:max-w-[600px] lg:max-w-[700px]">
              <div className="flex-1 min-w-0">
                <SearchBar
                  onSearch={setSearchQuery}
                  value={searchQuery}
                  placeholder="Search"
                  wrapperClass="h-[48px] w-full"
                />
              </div>
              <div className="flex-shrink-0">
                <FilterDropdown
                  selectedFilter={selectedFilter}
                  onFilterChange={setSelectedFilter}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-[16px] border border-[#F0F0ED] p-4 md:p-6 w-full">
          <RequestsTable requests={filteredRequests} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Requests;
