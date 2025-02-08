import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

interface NavigationBarProps {
  onLogout: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({onLogout}) => {

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          {/* Full-width container */}
          <div className="relative flex flex-grow-0 h-16 items-center mx-auto px-2 bg-black justify-between">
            <DisclosureButton
              className="inline-flex h-5 w-5 items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {open ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-4 w-4" aria-hidden="true" />
              )}
            </DisclosureButton>
            <div className="flex flex-1 justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0">
                <Link to="/dashboard">
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="/logo.svg"
                    alt="Logo"
                  />
                </Link>
              </div>

              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to="/dashboard"
                    className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </Link>
                  <Link
                    to="/services"
                    className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Services
                  </Link>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>
            <ProfileMenu onLogout={onLogout}/>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default NavigationBar;