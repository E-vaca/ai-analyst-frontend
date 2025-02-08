import { Link } from "react-router-dom";

export interface NavItem {
  name: string;
  to: string;
  current: boolean;
}

interface DesktopNavProps {
  items: NavItem[];
}

const DesktopNav = ({ items }: DesktopNavProps) => (
  <div>
    {items.map((item) => (
      <Link
        key={item.name}
        to={item.to}
        className={`rounded-lg px-3 py-2 text-sm font-medium ${
          item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
        aria-current={item.current ? "page" : undefined}
      >
        {item.name}
      </Link>
    ))}
  </div>
);

export default DesktopNav;