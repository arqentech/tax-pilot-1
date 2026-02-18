import React, { useState, useMemo, useEffect } from "react";
import { DashboardLayout } from "./DashboardLayout";
import {
  StatusBadge,
  StatusBadgeConfig,
} from "@/components/ui/profile/StatusBadge";
import { DataTable, TableColumn } from "@/components/ui/profile/DataTable";
import { DataCardList } from "@/components/ui/profile/DataCardList";
import { SearchAndFilterBar } from "@/components/ui/profile/SearchAndFilterBar";

interface Request {
  id: string;
  practicleId: string;
  service: string;
  price: string;
  status: RequestStatus;
  vat: string;
  hours: string;
}

type RequestStatus = "Pending" | "In Progress" | "Completed";

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

const tableColumns: TableColumn<Request>[] = [
  {
    key: "practicleId",
    header: "Practicle ID",
    headerClassName: "text-[#9D9E98]",
    cellClassName: "text-[#5F6057]",
  },
  {
    key: "service",
    header: "Service",
    headerClassName: "text-[#9D9E98]",
    cellClassName: "text-[#5F6057] font-bold",
  },
  {
    key: "price",
    header: "Price",
    headerClassName: "text-[#5F6057]",
    cellClassName: "text-[#5F6057] font-bold",
  },
  {
    key: "status",
    header: "Status",
    headerClassName: "text-[#9D9E98]",
    render: (item) => (
      <StatusBadge status={item.status} config={STATUS_CONFIG[item.status]} />
    ),
  },
];

function Requests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const data: Request[] = [
        {
          id: "1",
          practicleId: "01",
          service: "ISEE Form for Minors",
          price: "€ 29.99",
          vat: "€ 2.99",
          hours: "2h 30m",
          status: "Pending",
        },
        {
          id: "2",
          practicleId: "02",
          service: "Signing a Rental Agreement",
          price: "€ 12.99",
          vat: "€ 1.30",
          hours: "1h 15m",
          status: "In Progress",
        },
        {
          id: "3",
          practicleId: "03",
          service: "Land registry search",
          price: "€ 12.99",
          vat: "€ 1.29",
          hours: "1h 00m",
          status: "Completed",
        },
      ];
      setRequests(data);
    };

    fetchRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    let filtered = requests;

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
  }, [searchQuery, selectedFilter, requests]);

  return (
    <div className="md:min-h-[80vh] w-[90vw] max-w-[1250px]">
      <DashboardLayout>
        <div className="md:border border-[#F0F0ED] rounded-[16px] py-4 md:p-8">
          <div className="flex flex-col md:flex-row  md:items-center items-right md:justify-between gap-4 mb-6">
            <h1 className="font-bricolage text-[#34352E] font-extrabold text-[28px] md:text-[22px]">
              All Requests
            </h1>

            <div className="w-full md:w-auto flex justify-start">
              <SearchAndFilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder="Search"
                filterItems={["All", "Pending", "In Progress", "Completed"]}
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
                filterTriggerClass="text-[18px] h-[48px] w-[90px] "
              />
            </div>
          </div>

          <div className="hidden md:block">
            <DataTable
              data={filteredRequests}
              columns={tableColumns}
              emptyMessage="There are no new requests"
              getRowKey={(item) => item.id}
            />
          </div>

          <div className="block md:hidden">
            <DataCardList
              data={filteredRequests}
              renderCard={({ item }) => (
                <div className="border border-[#E6E6E1] rounded-[15px] p-6 bg-[#F9F9F799]">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[#04226B] font-extrabold text-[18px]">
                      #{item.practicleId}
                    </span>
                    <StatusBadge
                      status={item.status}
                      config={STATUS_CONFIG[item.status]}
                    />
                  </div>

                  <p className="text-[#5F6057] font-bold text-[22px] mb-2">
                    {item.service}
                  </p>

                  <div className="font-bricolage flex items-center gap-4 text-[#34352E] font-extrabold text-[26px]">
                    <span>{item.price}</span>
                  </div>
                </div>
              )}
              emptyMessage="There are no new requests"
              emptyStateTextClassName="text-[#5F6057] text-[18px]"
              getItemKey={(item) => item.id}
            />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Requests;
