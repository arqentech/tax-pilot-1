import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { Link, useParams } from "react-router-dom";

const Breadcrumbs: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const formatLabel = (value: string) =>
    value?.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="bg-[#F6F6F3] hidden  md:w-full md:h-[50px] md:flex justify-center items-center rounded-xl">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className="text-[16px] leading-[25px] text-[#A9AAA5]"
            >
              <Link to="/">Home</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className="text-[16px] leading-[25px] text-[#A9AAA5]"
            >
              <Link to="/services">Services</Link>
            </BreadcrumbLink>
            {slug && <BreadcrumbSeparator />}
          </BreadcrumbItem>

          {slug && (
            <BreadcrumbItem className="text-[16px] leading-[25px] text-[#A9AAA5]">
              <BreadcrumbLink>{formatLabel(slug)}</BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
