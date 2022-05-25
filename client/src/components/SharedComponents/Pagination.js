import React from "react";

function Pagination({ contentPerPage, totalContents, paginate }) {
  // component for professional & recruiter
  // เอาไปใช้กับระบบเปลี่ยนหน้าได้ทุกฟีเจอร์ แต่ยังทำไม่เสร็จนะ ห้ามเอาไปใช้
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalContents / contentPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
