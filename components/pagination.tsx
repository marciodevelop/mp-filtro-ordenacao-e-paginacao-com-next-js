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
  lastPage: number;
}

export default function Pagination(props: IPaginationProps) {
  const { links, lastPage } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  function handleChangePage(page: string) {
    if (Number(page) > 1 && Number(page) <= lastPage) {
      params.set("page", page);
    } else {
      params.set("page", "1");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handlePreviousPage() {
    const page = Number(searchParams.get("page")) - 1;
    handleChangePage(page.toString());
  }

  function handleNextPage() {
    const page = Number(searchParams.get("page")) + 1;

    handleChangePage(page.toString());
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem onClick={handlePreviousPage}>
          <PaginationPrevious
            className={`${
              links[0].url
                ? "cursor-pointer"
                : "cursor-not-allowed text-slate-400"
            }`}
          />
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
        <PaginationItem
          className={`${
            links[links.length - 1].url
              ? "cursor-pointer"
              : "cursor-not-allowed text-slate-400 disabled"
          }`}
          onClick={handleNextPage}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
