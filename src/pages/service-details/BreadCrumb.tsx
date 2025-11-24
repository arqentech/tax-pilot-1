import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/BreadCrumb";

type Crumb = {
  label: string;
  href?: string | null;
};

interface GenericBreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

const Breadcrumbs: React.FC<GenericBreadcrumbsProps> = ({
  items,
  className = "",
}) => {
  return (
    <div
      className={`bg-[#F6F6F3] hidden  md:h-[50px] md:flex justify-center items-center rounded-xl ${className}`}
    >
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <BreadcrumbItem key={index}>
              {item.href ? (
                <BreadcrumbLink
                  href={item.href}
                  className="text-[16px] leading-[25px] text-[#A9AAA5]"
                >
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-[16px] leading-[25px] text-[#A9AAA5]">
                  {item.label}
                </BreadcrumbPage>
              )}

              {index !== items.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
