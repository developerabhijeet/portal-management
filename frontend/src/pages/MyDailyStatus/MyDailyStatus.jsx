import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../../Utils/utils";
import Layout from "../../components/Layout";
import "../index.css";
import StatusTable from "./MyStatusTable";
export const MyDailyStatus = ({}) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    const getDailyStatus = async () => {
      try {
        const response = await axios.get(
          `${BaseURL}/tasks?page=${currentPage}&perPage=10&sortByDueDate=desc`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const formattedTasks = response?.data?.tasks.map((task) => {
          const formattedDate = new Date(task.date).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            },
          );
          return {
            ...task,
            date: formattedDate,
          };
        });

        setData(formattedTasks);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        alert(error);
      }
    };

    getDailyStatus();
  }, [navigate, token, currentPage]);

  const handleNavigate = (item) => {
    navigate("/daily_status_updates_details", {
      state: {
        item,
      },
    });
  };
  const handleNavigate_Edit = async (item, index) => {
    navigate("/send_daily_status", {
      state: {
        item,
        index,
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
        <div className="container mt-4 py-3" style={{backgroundColor: "#191C24"}}>
          <h2 className="text-heading">All Status</h2>
          <StatusTable
            data={data}
            handleNavigate={handleNavigate}
            handleNavigate_Edit={handleNavigate_Edit}
          />
        
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
            ),
          )}
          <button
            className="btn btn-success ms-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div></div>
      </Layout>
    </>
  );
};
