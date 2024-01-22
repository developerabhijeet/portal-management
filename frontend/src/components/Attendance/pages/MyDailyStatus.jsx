import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../../../Utils/utils";
import Layout from "../../Layout/Layout";

export const MyDailyStatus = ({}) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const getDailyStatus = async () => {
        try {
          const response = await axios.get(
            `${BaseURL}/tasks?page=${currentPage}&perPage=10&sortByDueDate=desc`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setData(response.data.tasks);
          setTotalPages(response.data.totalPages);
        } catch (error) {
          alert(error);
        }
      };
      getDailyStatus();
    }
  }, [navigate, token, currentPage]);

  const handleNavigate = (item) => {
    navigate("/daily_status_updates_details", {
      state: {
        item,
      },
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Layout>
        <div>
          <h4>All Status</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status Date</th>
                <th>In-Time</th>
                <th>In-Out</th>
                <th>Total Hours</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0
                ? data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.user.username}</td>
                        <td>{item.dueDate}</td>
                        <td></td>
                        <td></td>
                        <td>:</td>
                        <td>
                          <div>
                            <button
                              className="eyeicon"
                              onClick={() => handleNavigate(item)}
                            >
                              Show{" "}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-success me-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                className="btn btn-success ms-2"
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={currentPage === page}
              >
                {page}
              </button>
            )
          )}
          <button
            className="btn btn-success ms-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </Layout>
    </>
  );
};
