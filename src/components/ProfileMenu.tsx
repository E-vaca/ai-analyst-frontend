import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItems, MenuItem, MenuButton, Transition } from "@headlessui/react";

interface ProfileMenuProps {
  onLogout: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onLogout }) => {

  const handleLogout = () => {
    // Remove tokens from storage
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    // Update global state
    onLogout();
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User Profile"
          />
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <MenuItem>
            {({ active }) => (
              <Link
                to="/profile"
                className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
              >
                Your Profile
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <Link
                to="/settings"
                className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
              >
                Settings
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={`${active ? "bg-gray-100" : ""} w-full text-left px-4 py-2 text-sm text-gray-700`}
              >
                Sign out
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default ProfileMenu;