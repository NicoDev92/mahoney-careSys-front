import { Pagination } from "react-bootstrap";


export const Paginator = ({ handlePageChange, currentPage, totalPages }) => {

    return (
        <>
            <Pagination className="pagination-sm">
                <Pagination.First
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 0}
                />
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage)}
                    disabled={currentPage === 0}
                />
                {[...Array(totalPages).keys()].map((page) => (
                    <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        {page + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 2)}
                    disabled={currentPage === totalPages - 1}
                />
                <Pagination.Last
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages - 1}
                />
            </Pagination>
        </>
    );
}