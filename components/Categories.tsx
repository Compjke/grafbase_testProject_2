"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categoryFilters } from "@/constants";


const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  console.dir({ router, pathName, searchParams });
  const handleTags = (categoryFilter: string) => {
   router.push(`${pathName}?category=${categoryFilter}`)
  };
  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto py-5">
        {categoryFilters.map((categoryFilter) => (
          <button
            className={`
               ${
                 category === categoryFilter
                 ? "bg-slate-300 font-normal"
                 : "bg-light-white-300 font-medium"
               } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
            key={categoryFilter}
            type="button"
            onClick={() => handleTags(categoryFilter)}
          >
            {categoryFilter}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
