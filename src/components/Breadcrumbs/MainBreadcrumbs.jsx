import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useLocation, Link } from "react-router-dom";

function MainBreadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(x => x);
  
    return (
        <Breadcrumbs separator="/" itemClasses={{ separator: "px-2" }} size="lg" className="mb-4">
          <BreadcrumbItem>
            <Link to="/inicio">Inicio</Link>
          </BreadcrumbItem>
          {pathnames.length > 0 && pathnames[0] === "inicio" && pathnames.length === 1
            ? null
            : pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                return (
                  <BreadcrumbItem key={to}>
                    <Link to={to}>{value.charAt(0).toUpperCase() + value.slice(1)}</Link>
                  </BreadcrumbItem>
                );
              })}
        </Breadcrumbs>
      );
}

export default MainBreadcrumbs;