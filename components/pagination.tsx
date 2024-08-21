"use client";
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IPaginationProps {
  links: {
    url: string;
    label: string;
    active: boolean;
  }[];
}

export default function Pagination(props: IPaginationProps) {
  const { links } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleChangePage(page: string) {
    const params = new URLSearchParams(searchParams);

    if (Number(page) > 1) {
      params.set("page", page);
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        {links.map(({ label, url, active }, idx) => {
          if (label.includes("Próximo") || label.includes("Anterior")) {
            return null;
          }

          return (
            <PaginationItem key={idx}>
              <PaginationLink
                isActive={active}
                onClick={() => handleChangePage(label)}
                dangerouslySetInnerHTML={{ __html: label }}
              />
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
