import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";

const NUM_PER_PAGE = 5;

export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const totalPages = Math.ceil(count / NUM_PER_PAGE);

  function handleIncrease() {
    if (currentPage < totalPages) {
      searchParams.set("page", currentPage + 1);
      setSearchParams(searchParams);
    }
  }

  function handleDecrease() {
    if (currentPage > 1) {
      searchParams.set("page", currentPage - 1);
      setSearchParams(searchParams);
    }
  }

  return (
    <div className="flex justify-between items-center">
      <p>
        Showing {(currentPage - 1) * NUM_PER_PAGE + 1} to{" "}
        {currentPage === totalPages ? count : currentPage * NUM_PER_PAGE} of{" "}
        {count} results
      </p>
      <div className="flex gap-2 items-center">
        <Button
          type="small"
          onClick={handleDecrease}
          disabled={currentPage === 1}
        >
          <span>
            <HiArrowLeft />
          </span>
          Previous
        </Button>
        <Button
          type="small"
          onClick={handleIncrease}
          disabled={currentPage === totalPages}
        >
          Next
          <span>
            <HiArrowRight />
          </span>
        </Button>
      </div>
    </div>
  );
}
