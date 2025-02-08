import { DisclosurePanel, DisclosureButton } from "@headlessui/react";
import { Link } from "react-router-dom";
import { NavItem } from "./DesktopNav";

interface MobileNavProps {
  items: NavItem[];
}

const MobileNav = ({ items }: MobileNavProps) => (
  <DisclosurePanel className="sm:hidden">
    <div className="space-y-1 px-2 pt-2 pb-3">
      {items.map((item) => (
        <DisclosureButton
          key={item.name}
          as={Link}
          to={item.to}
          className={`block rounded-md px-3 py-2 text-base font-medium ${
            item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
          aria-current={item.current ? "page" : undefined}
        >
          {item.name}
        </DisclosureButton>
      ))}
    </div>
  </DisclosurePanel>
);

export default MobileNav;