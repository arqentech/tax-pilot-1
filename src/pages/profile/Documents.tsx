import React, { useEffect, useState } from "react";
import { DashboardLayout } from "./DashboardLayout";

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data: Document[] = [
          {
            label: "Certificates and Receipts",
            count: 1,
            icon: (
              <img
                src="/svg/profile-home/documents/certificates.svg"
                alt="certificates "
                className="w-10 h-10"
              />
            ),
          },
          {
            label: "ISEE",
            count: 1,
            icon: (
              <img
                src="/svg/profile-home/documents/certificates.svg"
                alt="certificates"
                className="w-10 h-10"
              />
            ),
          },
          {
            label: "Family",
            count: 1,
            icon: (
              <img
                src="/svg/profile-home/documents/family.svg"
                alt="family"
                className="w-10 h-10"
              />
            ),
          },
          {
            label: "Ali Sher",
            count: 1,
            icon: (
              <img
                src="/svg/profile-home/home/user.svg"
                alt="user"
                className="w-10 h-10"
              />
            ),
          },
          {
            label: "Others",
            count: 0,
            icon: (
              <img
                src="/svg/profile-home/documents/glasses.svg"
                alt="glasses"
                className="w-10 h-10"
              />
            ),
          },
        ];

        setDocuments(data);
      } catch (error) {
        console.error("Failed to fetch documents", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading documents...</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="min-w-[985px] border border-[#F0F0ED] mx-auto rounded-[16px] p-6 ">
          <h2 className="text-[22px] leading-[30px] font-bricolage font-extrabold mb-1">
            My documents
          </h2>
          <p className="text-[18px] text-[#9D9E98] mb-6">
            In this section you can view uploaded documents or upload new ones.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
            {documents.map((doc) => (
              <DocumentCard
                key={doc.label}
                label={doc.label}
                count={doc.count}
                icon={doc.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Documents;

interface Document {
  label: string;
  count: number;
  icon: React.ReactNode;
}

interface DocumentCardProps {
  label: string;
  count: number;
  icon: React.ReactNode;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ label, count, icon }) => {
  return (
    <div className="flex flex-col w-full max-w-[286px] items-center justify-center bg-[#FBFBFA] border border-[#F0F0ED] rounded-[16px] p-6 text-center hover:shadow-md transition">
      <div className="mb-3">{icon}</div>

      <p className="text-[18px] text-[#9D9E98]">{label}</p>
      <p className="text-[26px] font-bold text-[#5F6057]">{count}</p>
    </div>
  );
};
