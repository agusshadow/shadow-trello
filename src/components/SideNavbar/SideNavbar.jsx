import { useState } from "react";
import { Link } from "react-router-dom";
import CreateBoardModal from "../../boards/CreateBoardModal";
import sideNavbarLinks from "./sideNavbarLinks";

function MainSideNavbar() {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <aside className="fixed left-0 h-full w-64 bg-gray-800 text-gray-200 p-4 overflow-y-auto">
        <nav className="space-y-4">          
          {sideNavbarLinks.map((section, index) => (
            <div className="space-y-2" key={index}>
              <span
                onClick={() => toggleSection(index)}
                className="uppercase font-medium w-full text-left flex items-center justify-between hover:bg-gray-700 rounded-md p-2 text-gray-400 cursor-pointer"
              >
                <Link to={section.link}>{section.label}</Link>
                <svg
                  className={`w-5 h-5 transition-transform ${openSections[index] ? 'rotate-180' : 'rotate-0'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.72l3.71-3.53a.75.75 0 111.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                </svg>
              </span>
              {openSections[index] && (
                <ul className="space-y-1 pl-4">
                  {section.subOptions.map((subOption, subIndex) => (
                    <li key={subIndex}>
                      <Link to={subOption.link} className="flex items-center space-x-3 hover:bg-gray-700 rounded-md p-2">
                        <span>{subOption.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default MainSideNavbar;
