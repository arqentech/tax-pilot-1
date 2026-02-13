import React, { useState } from "react";
import { X, Upload, Trash2, FileText } from "lucide-react";

export type FileManagementState = "empty" | "select-type" | "files-uploaded";

interface FileManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  state?: FileManagementState;
  files?: UploadedFile[];
  documentLabel?: string;
  onFileTypeSelect?: (fileType: string) => void;
  onUpload?: () => void;
  onDeleteFile?: (fileId: string) => void;
  onAddMore?: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  date: string;
}

const fileTypes = [
  "Income certification relating to the past year and spouse, including any exempted and excluded income",
  "Death certificate of the deceased worker",
  "Certificate of last residence of the deceased",
  "Online medical certificate attesting to the mourning",
  "Historical certificate of family status",
  "Military discharge",
  "Disability allowance",
];

export const FileManagementModal: React.FC<FileManagementModalProps> = ({
  isOpen,
  onClose,
  state = "empty",
  files = [],
  documentLabel = "Certificates and Receipts",
  onFileTypeSelect,
  onUpload,
  onDeleteFile,
  onAddMore,
}) => {
  const [selectedFileType, setSelectedFileType] = useState<string>("");

  if (!isOpen) return null;

  const handleFileTypeChange = (fileType: string) => {
    setSelectedFileType(fileType);
    onFileTypeSelect?.(fileType);
  };

  const handleUpload = () => {
    if (state === "select-type" && selectedFileType) {
      onUpload?.();
    } else if (state === "empty") {
      onUpload?.();
    }
  };

  const getSubtitle = () => {
    switch (state) {
      case "empty":
        return documentLabel;
      case "select-type":
        return "Choose file type";
      case "files-uploaded":
        return "Choose file type";
      default:
        return documentLabel;
    }
  };

  const getButtonText = () => {
    switch (state) {
      case "empty":
        return "Upload file";
      case "select-type":
        return "Upload file";
      case "files-uploaded":
        return "Add more files";
      default:
        return "Upload file";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-[#FFFFFF] rounded-[16px] w-full max-w-[650px] h-auto md:h-[607px] max-h-[90vh] md:max-h-[607px] shadow-lg flex flex-col">
        <div className="relative flex items-center justify-center p-4 md:p-6 border-b border-[#E6E6E1] bg-[#FBFBFA] rounded-t-[16px] h-auto md:h-[106px] min-h-[80px] md:min-h-[106px]">
          <div className="flex flex-col items-center justify-center px-8 md:px-0">
            <h2 className="text-[18px] md:text-[22px] font-bricolage font-extrabold leading-[24px] md:leading-[30px] text-[#34352E] text-center">
              File Management
            </h2>
            <p className="text-[14px] md:text-[18px] font-archivo font-medium leading-[20px] md:leading-[24px] text-[#9D9E98] mt-1 text-center">
              {getSubtitle()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-[#9D9E98] hover:text-[#34352E] transition-colors"
          >
            <X size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 min-h-[200px] md:min-h-0">
          {state === "empty" && (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] md:min-h-[300px]">
              <p className="text-[16px] md:text-[18px] font-archivo font-medium leading-[22px] md:leading-[24px] text-[#9D9E98] mb-6">
                No files found
              </p>
            </div>
          )}

          {state === "select-type" && (
            <div className="space-y-2 md:space-y-3">
              {fileTypes.map((fileType, index) => (
                <label
                  key={index}
                  className="flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-[12px] border border-[#E6E6E1] hover:bg-[#F6F6F3] cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="fileType"
                    value={fileType}
                    checked={selectedFileType === fileType}
                    onChange={() => handleFileTypeChange(fileType)}
                    className="mt-1 w-4 h-4 text-[#0166FF] border-[#E6E6E1] focus:ring-[#0166FF] flex-shrink-0"
                  />
                  <span className="text-[14px] md:text-[18px] font-archivo font-medium leading-[20px] md:leading-[24px] text-[#34352E] flex-1">
                    {fileType}
                  </span>
                </label>
              ))}
            </div>
          )}

          {state === "files-uploaded" && (
            <div className="space-y-2 md:space-y-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-[12px] bg-[#F6F6F3] border border-[#E6E6E1] w-full md:w-[562px] h-auto md:h-[105px] min-h-[80px] md:min-h-[105px]"
                >
                  <FileText className="text-[#34352E] w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] md:text-[18px] font-archivo font-medium leading-[20px] md:leading-[24px] text-[#34352E] truncate">
                      {file.name}
                    </p>
                    <p className="text-[14px] md:text-[18px] font-archivo font-medium leading-[20px] md:leading-[24px] text-[#9D9E98] mt-1">
                      {file.date}
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteFile?.(file.id)}
                    className="text-[#9D9E98] hover:text-[#DC2626] transition-colors p-2 flex-shrink-0"
                  >
                    <Trash2 size={18} className="md:w-5 md:h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 md:p-6 border-t border-[#E6E6E1] bg-[#FBFBFA] rounded-b-[16px] h-auto md:h-[106px] min-h-[80px] md:min-h-[106px] flex items-center justify-center">
          {state === "files-uploaded" ? (
            <button
              onClick={onAddMore}
              className="bg-[#34352E] text-[#F1F1EC] w-full md:w-[184px] h-[44px] md:h-[48px] rounded-[48px] flex items-center justify-center gap-2 hover:bg-[#2E2E2E] transition-colors text-[16px] md:text-[18px] font-archivo font-medium leading-[22px] md:leading-[24px] px-4 md:px-5 py-3 md:py-[14px]"
            >
              <Upload size={16} className="md:w-[18px] md:h-[18px]" />
              Add more file
            </button>
          ) : (
            <button
              onClick={handleUpload}
              disabled={state === "select-type" && !selectedFileType}
              className="bg-[#34352E] text-[#F1F1EC] w-full md:max-w-[184px] h-[44px] md:h-[48px] rounded-[48px] flex items-center justify-center gap-2 hover:bg-[#2E2E2E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[16px] md:text-[18px] font-archivo font-medium leading-[22px] md:leading-[24px] px-4 md:px-5 py-3 md:py-[14px]"
            >
              <Upload size={16} className="md:w-[18px] md:h-[18px]" />
              {getButtonText()}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
