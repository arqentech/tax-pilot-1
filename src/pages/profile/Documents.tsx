import React, { useEffect, useState } from "react";
import { DashboardLayout } from "./DashboardLayout";
import {
  FileManagementModal,
  FileManagementState,
} from "@/components/ui/profile/FileManagementModal";

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [modalState, setModalState] = useState<FileManagementState>("empty");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleCardClick = (label: string) => {
    setOpenModal(label);
    const doc = documents.find((d) => d.label === label);
    if (doc && doc.count > 0) {
      setUploadedFiles([
        {
          id: "1",
          name: "Tax-certificate.pdf",
          date: "04.03.2024 PM",
        },
      ]);
      setModalState("files-uploaded");
    } else {
      setModalState("empty");
      setUploadedFiles([]);
    }
  };

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
                alt="certificates"
                className="w-8 h-8 sm:w-10 sm:h-10"
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
                className="w-8 h-8 sm:w-10 sm:h-10"
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
                className="w-8 h-8 sm:w-10 sm:h-10"
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
                className="w-8 h-8 sm:w-10 sm:h-10"
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
                className="w-8 h-8 sm:w-10 sm:h-10"
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
    <div className="">
      <DashboardLayout>
        <div className="w-full">
          <div className=" md:p-12 w-full mx-auto md:border border-[#F0F0ED] rounded-[16px]">
            <h2 className="max-w-[350px] text-lg sm:text-xl lg:text-[22px] leading-[30px] font-bricolage font-extrabold mb-1">
              My documents
            </h2>

            <p className="text-sm sm:text-base lg:text-[18px] text-[#9D9E98] mb-6">
              In this section you can view uploaded documents or upload new
              ones.
            </p>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:py-4 justify-items-center gap-6 md:gap-12">
              {documents.map((doc) => (
                <DocumentCard
                  key={doc.label}
                  label={doc.label}
                  count={doc.count}
                  icon={doc.icon}
                  onClick={() => handleCardClick(doc.label)}
                />
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>

      {openModal && (
        <FileManagementModal
          isOpen={true}
          onClose={() => {
            setOpenModal(null);
            setModalState("empty");
            setUploadedFiles([]);
          }}
          state={modalState}
          files={uploadedFiles}
          documentLabel={openModal}
          onFileTypeSelect={(fileType) => {
            console.log("Selected file type:", fileType);
          }}
          onUpload={() => {
            if (modalState === "empty") {
              setModalState("select-type");
            } else if (modalState === "select-type") {
              // Simulate file upload
              const newFile: UploadedFile = {
                id: Date.now().toString(),
                name: "Tax-certificate.pdf",
                date: new Date().toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              };
              setUploadedFiles([...uploadedFiles, newFile]);
              setModalState("files-uploaded");
            }
          }}
          onDeleteFile={(fileId) => {
            setUploadedFiles(uploadedFiles.filter((f) => f.id !== fileId));
            if (uploadedFiles.length === 1) {
              setModalState("empty");
            }
          }}
          onAddMore={() => {
            setModalState("select-type");
          }}
        />
      )}
    </div>
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
  onClick: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  label,
  count,
  icon,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col w-full gap-1 msm:max-w-[400px] md:max-w-[300px] items-center justify-center bg-[#FBFBFA] border border-[#F0F0ED] rounded-[16px] p-10 text-center hover:shadow-md transition cursor-pointer"
    >
      <div className="mb-3">{icon}</div>

      <span className="text-[18px] text-[#9D9E98]  whitespace-nowrap">
        {label}
      </span>

      <p className=" text-[26px] font-bold text-[#5F6057]">{count}</p>
    </div>
  );
};

interface UploadedFile {
  id: string;
  name: string;
  date: string;
}
