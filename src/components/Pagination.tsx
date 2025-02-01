import React, {Dispatch, SetStateAction} from 'react'
interface PaginationProps {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    totalPages: number;
}
export default function Pagination({currentPage, setCurrentPage, totalPages}: PaginationProps) {
  return (
    <nav>
    <ul className='pagination justify-content-center mt-3'>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button disabled={currentPage === 1} className='page-link' onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        </li>
{[...Array(totalPages)].map((_, index) => (
<li key={index} className={`page-item ${currentPage === index+1 ? "active" : ""}`}>
    <button className='page-link' onClick={() => setCurrentPage(index+1)}>{index+1}</button>
    </li>    
))}
<li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
    <button disabled={currentPage === totalPages} className='page-link' onClick={() => setCurrentPage(currentPage+1)}>Next</button>
</li>
    </ul>
</nav>
  );
}
