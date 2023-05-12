import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import "./style.css";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MyTimeline({ startDate, endDate, width }) {
  const [d, setD] = useState([]);
  const [dates, setDates] = useState([]);

  const timeline = (start_date, end_date) => {
    let date1 = new Date(startDate);
    let date2 = new Date(endDate);
    if (!date1 || !date2) {
      return;
    }
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let dayDiff = Difference_In_Time / (1000 * 3600 * 24);

    let arr = [];

    for (
      let d = new Date(start_date);
      d <= new Date(end_date);
      d.setMonth(d.getMonth() + 1)
    ) {
      arr.push(new Date(d));
    }
    // arr.push(new Date(end_date));
    return arr;
  };

  useEffect(() => {
    // setD(data);
    setDates(timeline(startDate, endDate));
  }, [startDate, endDate]);

  // console.log(startDate, endDate);
  return (
    <MDBContainer fluid className="pt-4 pb-3">
      <MDBRow>
        <MDBCol lg="12 p-0">
          <div
            className="horizontal-timeline"
            // style={{ width: `${parseInt(width)}%` }}
          >
            <MDBTypography className="items">
              {dates?.length > 0 &&
                dates.map((date) => {
                  return (
                    <li
                      className="items-list"
                      style={{
                        width: 0,
                      }}
                    >
                      <span
                        style={{
                          width: "11px",
                          height: "11px",
                          borderRadius: "50%",
                          backgroundColor: "black",
                          position: "absolute",
                          top: "-1px",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          border: "2px solid cyan",
                        }}
                      ></span>
                      <div
                        style={{
                          fontSize: "12px",
                          position: "absolute",
                          top: "24px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          paddingLeft: "0",
                        }}
                      >
                        {date?.toString()?.slice(4, 7)}{" "}
                        {date?.toString()?.slice(11, 15)}
                      </div>
                    </li>
                  );
                })}
            </MDBTypography>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
