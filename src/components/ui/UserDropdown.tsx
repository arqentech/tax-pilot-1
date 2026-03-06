import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuth, logout } from "@/utils/auth";
import { cn } from "@/lib/utils";

const UserDropdown = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full text-[#34352E] hover:bg-gray-100 transition-colors"
          aria-label="User menu"
        >
          <img
            src="/svg/profile-home/home/user.svg"
            alt="user"
            className="h-5 w-5"
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[180px] rounded-[12px] border border-[#E6E6E1] bg-white p-1 shadow-md z-50"
          sideOffset={8}
          align="end"
        >
          {isAuthenticated ? (
            <>
              <DropdownMenu.Item
                className={cn(
                  "flex items-center gap-2 cursor-pointer select-none rounded-md px-3 py-2 text-sm text-[#34352E] hover:bg-gray-100 focus:bg-gray-100 outline-none",
                )}
                onSelect={() => navigate("/area-clienti")}
              >
                <User className="h-4 w-4" />
                Profile
              </DropdownMenu.Item>

              <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />

              <DropdownMenu.Item
                className={cn(
                  "flex items-center gap-2 cursor-pointer select-none rounded-md px-3 py-2 text-sm text-[#34352E] hover:bg-gray-100 focus:bg-gray-100 outline-none",
                )}
                onSelect={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenu.Item>
            </>
          ) : (
            <DropdownMenu.Item
              className={cn(
                "flex items-center gap-2 cursor-pointer select-none rounded-md px-3 py-2 text-sm text-[#34352E] hover:bg-gray-100 focus:bg-gray-100 outline-none",
              )}
              onSelect={() => navigate("/login")}
            >
              <User className="h-4 w-4" />
              Login
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserDropdown;
