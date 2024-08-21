"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const debouncedSearch = useDebounce(handleSearchResult, 1000);

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    debouncedSearch(event.currentTarget.value);
  }

  function handleSearchResult(searchString: string) {
    const params = new URLSearchParams(searchParams);

    if (searchString) {
      params.set("search", searchString);
    } else {
      params.delete("search");
    }

    replace(`${pathName}?${params.toString()}`);
  }

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Busque por nome..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        onChange={handleChangeInput}
      />
    </div>
  );
}
