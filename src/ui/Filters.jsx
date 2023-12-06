import { useSearchParams } from "react-router-dom";

export default function Filters({ options, filterField, multiple = true }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // determine how many filters are there already so that all the filter button gets 'active' class
  const currentFilters = searchParams.get(filterField)
    ? searchParams.get(filterField).split(",")
    : options.at(0).value;
  // console.log(currentFilters);

  function handleClick(filterValue) {
    /****** If We need to set one query variable at a time the do this *******/
    if (searchParams.get("page")) {
      searchParams.set("page", 1);
    }

    if (!multiple) {
      searchParams.set(filterField, filterValue);
      setSearchParams(searchParams);
      return;
    }
    /***** For Multiple query variables ******/
    // 1) check If any filter exist in the URL, If yes then tranform it to an array otherwise undefined
    const existingFilters =
      searchParams.get(filterField) && searchParams.get(filterField) !== "all"
        ? searchParams.get(filterField).split(",")
        : undefined;

    // 2) If filterValue is 'all' then set searchParams to only with that value and all the filters gets removed if any. else remove the filterValue 'all' value from the URL as keeps the 'all' value intact doesn't make sense.
    if (filterValue === "all") {
      searchParams.set(filterField, filterValue);
      setSearchParams(searchParams);
      return;
    } else {
      searchParams.delete(filterField);
      setSearchParams(searchParams);
    }

    // 3) If filterValue is already included in the URL then remove it from URL
    if (existingFilters?.includes(filterValue)) {
      const values = existingFilters.filter((fil) => fil !== filterValue);

      // 4) After remove the filterValue If values array found empty then set the filter in the URL with 'all' value as this makes the most sense in this situation.
      if (values.length === 0) {
        searchParams.set(filterField, "all");
        setSearchParams(searchParams);
        return;
      }

      searchParams.set(filterField, values.join(","));
      setSearchParams(searchParams);
      return;
    }

    // 5) If there is No values in the URL before (means first time filterValue got selected) then set the value to only that filterValue and return (No need to make it an array first time)
    if (!existingFilters) {
      searchParams.set(filterField, filterValue);
      setSearchParams(searchParams);
      return;
    }

    // 6) If One or more filterValues already in the URL currently and selected filterValue is unique one means not in the URL then add this filterValue with those active ones.
    searchParams.set(filterField, [...existingFilters, filterValue].join(","));
    setSearchParams(searchParams);
  }

  return (
    <div className="flex items-center gap-1 bg-gray-800 p-1 rounded-md">
      {options.map((option) => (
        <button
          key={option.value}
          className={`flex items-center text-sm rounded font-semibold uppercase tracking-wide text-gray-200 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:outline-none 
          focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-1.5 ${
            currentFilters?.includes(option.value)
              ? "bg-blue-800 text-stone-50"
              : ""
          } `}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(filterValue) {
    searchParams.set(filterField, filterValue);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex items-center">
      {options.map((option) => (
        <button
          key={option.value}
          className={`flex items-center text-sm rounded border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-1.5 ${
            currentFilter === option.value ? "bg-blue-800 text-stone-50" : ""
          } `}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
