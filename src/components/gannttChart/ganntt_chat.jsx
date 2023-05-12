// import logo from './logo.svg';
import { useEffect, useState } from "react";
import "../timeline/style.css";
import ReactGantt, { GanttRow } from "react-gantt";
import moment from "moment";
import {
  Gantt,
  Task,
  EventOption,
  StylingOption,
  ViewMode,
  DisplayOption,
} from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import axios from "axios";
import groupArray from "group-array";
import MyTimeline from "../timeline/timeline";
import { MDBTooltip } from "mdb-react-ui-kit";
import RiskTable from "../riskTable/riskTable";

let arr = [];

let apiData = {
  projectStartDate: "2023-05-04T11:31:15.000Z",
  projectEndDate: "2025-04-05T11:31:15.000Z",
  data: [
    {
      startDate: "2023-05-04T11:31:15.000Z",
      endDate: "2023-11-04T11:31:15.000Z",
      country_name: "Russia",
      category_id: 1,
      category_name: "Admin documentation",
      base_timeline: 6,
    },
    {
      startDate: "2023-05-04T11:31:15.000Z",
      endDate: "2023-11-04T11:31:15.000Z",
      country_name: "Turkey",
      category_id: 1,
      category_name: "Admin documentation",
      base_timeline: 6,
    },
    {
      startDate: "2023-05-04T11:31:15.000Z",
      endDate: "2023-11-04T11:31:15.000Z",
      country_name: "Russia",
      category_id: 2,
      category_name: "Quality dossier preparation",
      base_timeline: 6,
    },
    {
      startDate: "2023-05-04T11:31:15.000Z",
      endDate: "2023-11-04T11:31:15.000Z",
      country_name: "Turkey",
      category_id: 2,
      category_name: "Quality dossier preparation",
      base_timeline: 6,
    },
    {
      startDate: "2023-05-04T11:31:15.000Z",
      endDate: "2024-02-04T11:31:15.000Z",
      country_name: "Russia",
      category_id: 3,
      category_name: "Clinical study",
      base_timeline: 9,
    },
    {
      startDate: "2023-05-04T11:31:15.000Z",
      endDate: "2024-02-04T11:31:15.000Z",
      country_name: "Turkey",
      category_id: 3,
      category_name: "Clinical study",
      base_timeline: 9,
    },
    {
      startDate: "2024-02-04T11:31:15.000Z",
      endDate: "2024-08-04T11:31:15.000Z",
      country_name: "Russia",
      category_id: 4,
      category_name: "Health Authority Dossier Review",
      base_timeline: 6,
    },
    {
      startDate: "2024-02-04T11:31:15.000Z",
      endDate: "2024-08-04T11:31:15.000Z",
      country_name: "Turkey",
      category_id: 4,
      category_name: "Health Authority Dossier Review",
      base_timeline: 6,
    },
    {
      startDate: "2024-12-05T11:31:15.000Z",
      endDate: "2025-04-05T11:31:15.000Z",
      country_name: "Russia",
      category_id: 7,
      category_name: "Lead time",
      base_timeline: 4,
    },
    {
      startDate: "2024-12-05T11:31:15.000Z",
      endDate: "2025-04-05T11:31:15.000Z",
      country_name: "Turkey",
      category_id: 7,
      category_name: "Lead time",
      base_timeline: 4,
    },
  ],
};

apiData = {
  projectStartDate: "2023-05-12T12:14:59.000Z",
  projectEndDate: "2026-06-13T12:14:59.000Z",
  data: [
    {
      category_id: 1,
      country: 2,
      startDate: "2023-05-12T12:14:59.000Z",
      endDate: "2023-11-12T12:14:59.000Z",
      country_name: "Russia",
      category_name: "Admin dossier",
      base_timeline: 6,
    },
    {
      category_id: 2,
      country: 2,
      startDate: "2023-05-12T12:14:59.000Z",
      endDate: "2023-11-12T12:14:59.000Z",
      country_name: "Russia",
      category_name: "Quality dossier",
      base_timeline: 6,
    },
    {
      category_id: 3,
      country: 2,
      startDate: "2023-05-12T12:14:59.000Z",
      endDate: "2024-02-12T12:14:59.000Z",
      country_name: "Russia",
      category_name: "Clinical dossier",
      base_timeline: 9,
    },
    {
      category_id: 4,
      country: 2,
      startDate: "2024-02-12T12:14:59.000Z",
      endDate: "2025-02-12T12:14:59.000Z",
      country_name: "Russia",
      category_name: "Health Authority Dossier Review",
      base_timeline: 24,
    },
    {
      category_id: 7,
      country: 2,
      startDate: "2025-02-13T12:14:59.000Z",
      endDate: "2025-06-13T12:14:59.000Z",
      country_name: "Russia",
      category_name: "Lead time",
      base_timeline: 4,
    },
    {
      category_id: 1,
      country: 3,
      startDate: "2023-05-12T12:14:59.000Z",
      endDate: "2023-11-12T12:14:59.000Z",
      country_name: "Turkey",
      category_name: "Admin dossier",
      base_timeline: 6,
    },
    {
      category_id: 2,
      country: 3,
      startDate: "2023-05-12T12:14:59.000Z",
      endDate: "2023-11-12T12:14:59.000Z",
      country_name: "Turkey",
      category_name: "Quality dossier",
      base_timeline: 6,
    },
    {
      category_id: 3,
      country: 3,
      startDate: "2023-05-12T12:14:59.000Z",
      endDate: "2024-02-12T12:14:59.000Z",
      country_name: "Turkey",
      category_name: "Clinical dossier",
      base_timeline: 9,
    },
    {
      category_id: 4,
      country: 3,
      startDate: "2024-02-12T12:14:59.000Z",
      endDate: "2025-02-12T12:14:59.000Z",
      country_name: "Turkey",
      category_name: "Health Authority Dossier Review",
      base_timeline: 24,
    },
    {
      category_id: 7,
      country: 3,
      startDate: "2025-02-13T12:14:59.000Z",
      endDate: "2025-06-13T12:14:59.000Z",
      country_name: "Turkey",
      category_name: "Lead time",
      base_timeline: 4,
    },
    {
      category_id: 1,
      country: 5,
      startDate: "2023-05-12T12:14:59.000Z",
      endDate: "2023-11-12T12:14:59.000Z",
      country_name: "Saudi Arabia",
      category_name: "Admin dossier",
      base_timeline: 6,
    },
    {
      category_id: 2,
      country: 5,
      startDate: "2023-05-12T12:14:59.000Z",
      endDate: "2023-11-12T12:14:59.000Z",
      country_name: "Saudi Arabia",
      category_name: "Quality dossier",
      base_timeline: 6,
    },
    {
      category_id: 3,
      country: 5,
      startDate: "2023-05-12T12:14:59.000Z",
      endDate: "2024-02-12T12:14:59.000Z",
      country_name: "Saudi Arabia",
      category_name: "Clinical dossier",
      base_timeline: 9,
    },
    {
      category_id: 4,
      country: 5,
      startDate: "2024-02-12T12:14:59.000Z",
      endDate: "2026-02-12T12:14:59.000Z",
      country_name: "Saudi Arabia",
      category_name: "Health Authority Dossier Review",
      base_timeline: 24,
    },
    {
      category_id: 7,
      country: 5,
      startDate: "2026-02-13T12:14:59.000Z",
      endDate: "2026-06-13T12:14:59.000Z",
      country_name: "Saudi Arabia",
      category_name: "Lead time",
      base_timeline: 4,
    },
  ],
  risk_table_data: [
    {
      country: "Russia",
      question: "CTD dossier available",
      notes: "Submission delay",
      answer_for_timelines: 9,
      user_selected_answer: "No",
      risk_level: "Medium",
      msg: "",
      project_name: "test  deepak projectqWER",
    },
    {
      country: "Russia",
      question: "MA license active (renewal overdue/ dormant license)",
      notes: "Submission delay",
      answer_for_timelines: 6,
      user_selected_answer: "No",
      risk_level: "Medium",
      msg: "Further Regulatory Assessmet Required",
      project_name: "test  deepak projectqWER",
    },
    {
      country: "Saudi Arabia",
      question: "CTD dossier available",
      notes: "Submission delay",
      answer_for_timelines: 9,
      user_selected_answer: "No",
      risk_level: "Medium",
      msg: "",
      project_name: "test  deepak projectqWER",
    },
    {
      country: "Saudi Arabia",
      question: "MA license active (renewal overdue/ dormant license)",
      notes: "Submission delay",
      answer_for_timelines: 6,
      user_selected_answer: "No",
      risk_level: "Medium",
      msg: "Further Regulatory Assessmet Required",
      project_name: "test  deepak projectqWER",
    },
    {
      country: "Turkey",
      question: "CTD dossier available",
      notes: "Submission delay",
      answer_for_timelines: 9,
      user_selected_answer: "No",
      risk_level: "Medium",
      msg: "",
      project_name: "test  deepak projectqWER",
    },
    {
      country: "Turkey",
      question: "MA license active (renewal overdue/ dormant license)",
      notes: "Submission delay",
      answer_for_timelines: 6,
      user_selected_answer: "No",
      risk_level: "Medium",
      msg: "Further Regulatory Assessmet Required",
      project_name: "test  deepak projectqWER",
    },
    {
      country: "Turkey",
      question: "Is global study available ?",
      notes: "Submission delay due to study time and cost",
      answer_for_timelines: 9,
      user_selected_answer: "No",
      risk_level: "High",
      msg: "Further Regulatory Assessment Required",
      project_name: "test  deepak projectqWER",
    },
  ],
  show_gantt_chart: {},
};

function GanntttChart() {
  const [data, setData] = useState(apiData?.data);
  // const [cats, setCats] = useState([]);
  const [grArr, setGrArr] = useState([]);
  const [endDate, setEndDate] = useState(new Date());
  const [projectDuration, setProjectDuration] = useState(null);
  const [timeWidth, setTimeWidth] = useState(0);
  const [noOfInt, setNoOfInt] = useState(0);

  useEffect(() => {
    let date1 = new Date(data[0]?.startDate);
    let date2 = new Date(endDate);
    if (!date1 || !date2) {
      return;
    }
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    setProjectDuration(parseInt(Difference_In_Days));
  }, [data, endDate]);

  useEffect(() => {
    console.log(
      "class-width",
      document.getElementsByClassName("items-list")?.length
    );
    setNoOfInt(document.getElementsByClassName("items-list")?.length);
    // calNoOfMonths(apiData?.data[0]?.startDate, apiData?.data[0]?.endDate);
    data?.length && projectDuration && timelineWidth();
  }, [data, projectDuration]);

  useEffect(() => {
    const groupedArray = groupArray(data, "country_name", "category_name");
    console.log("group", groupedArray);
    console.log(Object.entries(groupedArray));
    setGrArr(Object.entries(groupedArray));
  }, [data]);

  useEffect(() => {
    let maxTimestamp = data[0]?.endDate,
      minTimestamp = data[data?.length - 1]?.startDate;

    for (let i = 0; i < data?.length; i++) {
      if (data[i]?.endDate >= maxTimestamp) {
        maxTimestamp = data[i]?.endDate;
      }
    }
    // console.log('max end date', maxTimestamp)
    setEndDate(new Date(maxTimestamp));
  }, [data]);

  const calDuration = (start, end) => {
    let date1 = new Date(start);
    let date2 = new Date(end);

    // console.log(start, end);

    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    let per = (Difference_In_Days / projectDuration) * 100;
    // console.log('duration ', per);
    return `${per}%`;
  };

  const getMaxByCatagory = (data, index, cat) => {
    if (cat === "Lead time") {
      data = Object.entries(data).splice(index - 1, index - 1);
      let a = data[0][1];
      console.log("a[0].endDate", a[0].endDate);
      return a[0].endDate;
    } else {
      data = Object.entries(data).splice(0, index);
    }
    const max = data.reduce((prev, current) => {
      return prev[1][0].endDate > current[1][0].endDate ? prev : current;
    });
    cat === "Lead time" && console.log("maxxxx", max[1][0].endDate, cat, data);
    return max[1][0].endDate;
  };

  // const calRisk = (catData) => {
  //   console.log("category", catData);
  //   let temp = catData.filter((e) => e?.Correct_Incorrect === "Incorrect");
  //   console.log(temp);
  //   if (temp?.length) {
  //     return "red";
  //   }
  //   return;
  // };

  // const filter = (e) => {
  //   let val = e.target.value;

  //   if (val == "") {
  //     setData(arr);
  //     return;
  //   }

  //   setData(
  //     arr.filter((e) => e.Country?.toLowerCase()?.includes(val?.toLowerCase()))
  //   );
  // };

  const timelineWidth = () => {
    // const groupedArray = groupArray(data, "category_name");

    let adminData = data?.filter((el) =>
      ["Admin dossier", "Quality dossier", "Clinical dossier"].includes(
        el?.category_name
      )
    );

    let maxEndDate = adminData.reduce((prev, curr) => {
      return prev?.endDate > curr ? prev?.endDate : curr;
    })?.endDate;

    let wid1 = parseFloat(calDuration(apiData?.projectStartDate, maxEndDate));

    adminData = data?.filter((el) =>
      ["Health Authority Dossier Review"].includes(el?.category_name)
    );

    maxEndDate = adminData.reduce((prev, curr) => {
      return prev?.endDate > curr ? prev?.endDate : curr;
    });

    let wid2 = parseFloat(
      calDuration(maxEndDate?.startDate, maxEndDate?.endDate)
    );

    adminData = data?.filter((el) => ["Lead time"].includes(el?.category_name));

    maxEndDate = adminData.reduce((prev, curr) => {
      return prev?.endDate > curr ? prev?.endDate : curr;
    });

    let wid3 = parseFloat(
      calDuration(maxEndDate?.startDate, maxEndDate?.endDate)
    );

    setTimeWidth(wid1 + wid2 + wid3);
    console.log("timeline width", wid1, wid2, wid3);
  };

  const calNoOfMonths = (start, end) => {
    let date1 = new Date(start);
    let date2 = new Date(end);
    let count = 0;
    for (let d = date1; d < date2; d.setMonth(d.getMonth() + 1)) {
      count++;
    }
    // console.log("no of months", count);
    return count;
  };

  // console.log("group", data);

  // return (
  //   <div className="">
  //     <Box sx={{ width: "100%", typography: "body1" }}>
  //       <TabContext value={tabValue}>
  //         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
  //           <TabList
  //             onChange={handleTabChange}
  //             aria-label="lab API tabs example"
  //           >
  //             <Tab label="Gap Analysis" value="1" />
  //             <Tab label="Gantt Chart" value="2" />
  //           </TabList>
  //         </Box>
  //         <TabPanel value="1">
  //           <div style={{ marginBottom: 30 }}>
  //             {" "}
  //             <RiskTable riskTableData={riskTableData} />
  //           </div>
  //         </TabPanel>
  //         <TabPanel value="2">
  //           <Box>
  //             {/* {!showGanttChart && ( */}

  //             {/* )} */}
  //             {/* {showGanttChart && ( */}
  //             <div>
  //               <h1
  //                 style={{
  //                   fontSize: "22px",
  //                   fontWeight: "600",
  //                   textAlign: "center",
  //                 }}
  //               >
  //                 Time Estimate
  //               </h1>
  //               {/* <div style={{ display: 'flex', justifyContent: 'right', paddingRight: "5%" }}>
  //               Country: <input onChange={filter} type='text' />
  //           </div> */}
  //               {/* <Gantt viewMode='Month' tasks={tasks} /> */}
  //               <div
  //                 style={{
  //                   display: "flex",
  //                   flexDirection: "column",
  //                   justifyContent: "center",
  //                 }}
  //               >
  //                 <div>
  //                   <MyTimeline
  //                     startDate={new Date(data[0]?.startDate)}
  //                     endDate={endDate}
  //                   />
  //                 </div>
  //                 {grArr?.length > 0 &&
  //                   grArr.map((d, idx) => {
  //                     return (
  //                       <>
  //                         <div
  //                           style={{
  //                             display: "flex",
  //                             justifyContent: "center",
  //                             gap: "100px",
  //                           }}
  //                         >
  //                           <div
  //                             className="new-ganntt-chart-wrapper"
  //                             style={{
  //                               display: "flex",
  //                               justifyContent: "flex-start",
  //                               width: "100%",
  //                               gap: "25px",
  //                             }}
  //                           >
  //                             <div style={{ width: "75px" }}>{d[0]}</div>
  //                             <div
  //                               style={{
  //                                 display: "block",
  //                                 width: "inherit",
  //                                 overflowX: "clip",
  //                                 overflowY: "visible",
  //                               }}
  //                             >
  //                               {showGanttChart[d[0]] == false ? (
  //                                 <div
  //                                   style={{
  //                                     // textAlign: 'center',
  //                                     padding: 3,
  //                                     backgroundColor: "red",
  //                                     color: "white",
  //                                     width: "40%",
  //                                     // margin: 'auto',
  //                                   }}
  //                                 >
  //                                   <div
  //                                     style={{
  //                                       textAlign: "center",
  //                                       textTransform: "uppercase",
  //                                     }}
  //                                   >
  //                                     {" "}
  //                                     CPP mandatory
  //                                   </div>
  //                                 </div>
  //                               ) : (
  //                                 <>
  //                                   {Object.entries(d[1])?.length > 0 &&
  //                                     Object.entries(d[1]).map((cat, index) => {
  //                                       return cat[0] ===
  //                                         "Lead time" ? null : cat[0] ===
  //                                         "Health Authority Dossier Review" ? (
  //                                         <div
  //                                           className="test"
  //                                           style={{
  //                                             display: "flex",
  //                                             justifyContent: "left",
  //                                             gap: "1px",
  //                                             marginLeft: calDuration(
  //                                               apiData?.projectStartDate,
  //                                               getMaxByCatagory(
  //                                                 d[1],
  //                                                 index,
  //                                                 cat[0]
  //                                               )
  //                                             ),
  //                                           }}
  //                                         >
  //                                           <div
  //                                             style={{
  //                                               width: calDuration(
  //                                                 Object.values(d[1])[index][0]
  //                                                   ?.startDate,
  //                                                 Object.values(d[1])[index][0]
  //                                                   ?.endDate
  //                                               ),
  //                                               backgroundColor:
  //                                                 Object.values(d[1])[index][0]
  //                                                   ?.category_name ===
  //                                                 "Health Authority Dossier Review"
  //                                                   ? "#5BC2E7"
  //                                                   : "",
  //                                               fontSize: "14px",
  //                                               padding: "2px",
  //                                               textOverflow: "ellipsis",
  //                                               maxHeight: "25px",
  //                                               textAlign: "center",
  //                                               boxSizing: "border-box",
  //                                               fontWeight: "600",
  //                                               borderRadius: "7px",
  //                                               color: "white",
  //                                               // overflow: 'hidden',
  //                                             }}
  //                                           >
  //                                             <div className="canntt_chart arrow submission_approval">
  //                                               <div>
  //                                                 {" "}
  //                                                 {/* <ArrowDownwardIcon
  //                                                   style={{
  //                                                     position: "absolute",
  //                                                     left: "0",
  //                                                     width: "18px",
  //                                                     height: "18px",
  //                                                     background: "#808080",
  //                                                     // transform: 'rotate(145deg)',
  //                                                     // marginTop: '4px',
  //                                                   }}
  //                                                 ></ArrowDownwardIcon> */}
  //                                               </div>
  //                                               {cat[0]}
  //                                               <div>
  //                                                 {" "}
  //                                                 {/* <ArrowDownwardIcon
  //                                                   style={{
  //                                                     position: "absolute",
  //                                                     right: "0",
  //                                                     top: -1,
  //                                                     width: "18px",
  //                                                     height: "18px",
  //                                                     background: "#7CCC6C",
  //                                                     // transform: 'rotate(145deg)',
  //                                                     // marginTop: '4px',
  //                                                   }}
  //                                                 ></ArrowDownwardIcon> */}
  //                                               </div>
  //                                               <span>
  //                                                 <div>
  //                                                   <span>Legend: </span>
  //                                                   {cat[1][0]?.Category}
  //                                                 </div>
  //                                                 <div>
  //                                                   <span>Start Date:</span>
  //                                                   {new Date(
  //                                                     cat[1][0].startDate
  //                                                   )
  //                                                     .toString()
  //                                                     .slice(4, 7)}{" "}
  //                                                   {new Date(
  //                                                     cat[1][0].startDate
  //                                                   )
  //                                                     .toString()
  //                                                     .slice(11, 16)}
  //                                                 </div>
  //                                                 <div>
  //                                                   <span>End Date:</span>{" "}
  //                                                   {new Date(cat[1][0].endDate)
  //                                                     .toString()
  //                                                     .slice(4, 7)}{" "}
  //                                                   {new Date(cat[1][0].endDate)
  //                                                     .toString()
  //                                                     .slice(11, 16)}
  //                                                 </div>
  //                                                 {/* <div>
  //                                   <span>Resource:</span> {cat[1][0]?.Category}
  //                                 </div> */}
  //                                                 {/* <div>
  //                                   <span>Cost:</span>{' '}
  //                                   {cat[1].filter((e) =>
  //                                     e?.Question?.includes('costs')
  //                                   )[0]?.Answer || 'NA'}
  //                                 </div> */}
  //                                               </span>
  //                                             </div>
  //                                           </div>
  //                                           <div
  //                                             style={{
  //                                               width: calDuration(
  //                                                 Object.values(d[1])[
  //                                                   index + 1
  //                                                 ][0]?.startDate,
  //                                                 Object.values(d[1])[
  //                                                   index + 1
  //                                                 ][0]?.endDate
  //                                               ),
  //                                               backgroundColor:
  //                                                 Object.values(d[1])[
  //                                                   index + 1
  //                                                 ][0]?.category_name ===
  //                                                 "Lead time"
  //                                                   ? "#64CCC9"
  //                                                   : "",
  //                                               fontSize: "14px",
  //                                               padding: "2px",
  //                                               textOverflow: "ellipsis",
  //                                               maxHeight: "25px",
  //                                               textAlign: "center",
  //                                               boxSizing: "border-box",
  //                                               fontWeight: "600",
  //                                               borderRadius: "7px",
  //                                               color: "white",
  //                                               // overflow: 'hidden',
  //                                             }}
  //                                           >
  //                                             <div className="canntt_chart arrow lead_time">
  //                                               <div>
  //                                                 <div>
  //                                                   {" "}
  //                                                   {/* <ArrowDownwardIcon
  //                                                     style={{
  //                                                       position: "absolute",
  //                                                       right: "0",
  //                                                       width: "18px",
  //                                                       height: "18px",
  //                                                       background: "#00B140",
  //                                                       // transform: 'rotate(145deg)',
  //                                                       // marginTop: '4px',
  //                                                     }}
  //                                                   ></ArrowDownwardIcon> */}
  //                                                 </div>
  //                                               </div>
  //                                               {
  //                                                 Object.values(d[1])[
  //                                                   index + 1
  //                                                 ][0]?.category_name
  //                                               }
  //                                               <span>
  //                                                 <div>
  //                                                   <span>Legend: </span>
  //                                                   {
  //                                                     Object.values(d[1])[
  //                                                       index + 1
  //                                                     ][0]?.Category
  //                                                   }
  //                                                 </div>
  //                                                 <div>
  //                                                   <span>Start Date:</span>
  //                                                   {new Date(
  //                                                     Object.values(d[1])[
  //                                                       index + 1
  //                                                     ][0].startDate
  //                                                   )
  //                                                     .toString()
  //                                                     .slice(4, 7)}{" "}
  //                                                   {new Date(
  //                                                     Object.values(d[1])[
  //                                                       index + 1
  //                                                     ][0].startDate
  //                                                   )
  //                                                     .toString()
  //                                                     .slice(11, 16)}
  //                                                 </div>
  //                                                 <div>
  //                                                   <span>End Date:</span>{" "}
  //                                                   {new Date(
  //                                                     Object.values(d[1])[
  //                                                       index + 1
  //                                                     ][0].endDate
  //                                                   )
  //                                                     .toString()
  //                                                     .slice(4, 7)}{" "}
  //                                                   {new Date(
  //                                                     Object.values(d[1])[
  //                                                       index + 1
  //                                                     ][0].endDate
  //                                                   )
  //                                                     .toString()
  //                                                     .slice(11, 16)}
  //                                                 </div>
  //                                                 {/* <div>
  //                                   <span>Resource:</span> {cat[1][0]?.Category}
  //                                 </div> */}
  //                                                 {/* <div>
  //                                   <span>Cost:</span>{' '}
  //                                   {cat[1].filter((e) =>
  //                                     e?.Question?.includes('costs')
  //                                   )[0]?.Answer || 'NA'}
  //                                 </div> */}
  //                                               </span>
  //                                             </div>
  //                                           </div>
  //                                         </div>
  //                                       ) : (
  //                                         <div
  //                                           className="canntt_chart"
  //                                           style={{
  //                                             backgroundColor:
  //                                               cat[0] === "Quality dossier"
  //                                                 ? "#004F71"
  //                                                 : cat[0] === "Admin dossier"
  //                                                 ? "#002A3A"
  //                                                 : cat[0] ===
  //                                                   "Health Authority Dossier Review"
  //                                                 ? "#5BC2E7"
  //                                                 : cat[0] ===
  //                                                   "Clinical dossier"
  //                                                 ? "#009CDE"
  //                                                 : cat[0] === "Lead time"
  //                                                 ? "#64CCC9"
  //                                                 : "",
  //                                             width: calDuration(
  //                                               cat[1][0]?.startDate,
  //                                               cat[1][0]?.endDate
  //                                             ),
  //                                             marginLeft: 0,
  //                                             // cat[1][0]?.startDate ===
  //                                             // projectStartDate
  //                                             //   ? '0'
  //                                             //   : cat[0] ===
  //                                             //     'Health Authority Dossier Review'
  //                                             //   ? calDuration(
  //                                             //       projectStartDate,
  //                                             //       getMaxByCatagory(
  //                                             //         d[1],
  //                                             //         index,
  //                                             //         cat[0]
  //                                             //       )
  //                                             //     )
  //                                             //   : cat[0] === 'Lead time'
  //                                             //   ? calDuration(
  //                                             //       Object.values(d[1])[0][0]
  //                                             //         .startDate,
  //                                             //       Object.values(d[1])[
  //                                             //         index ? index - 1 : 0
  //                                             //       ][0]?.endDate
  //                                             //     )
  //                                             //   : calDuration(
  //                                             //       projectStartDate,
  //                                             //       // getMaxByCatagory(d[1])
  //                                             //       Object.values(d[1])[
  //                                             //         index ? index - 1 : 0
  //                                             //       ][0]?.endDate
  //                                             //     ),
  //                                             borderRadius: "7px",
  //                                             color: "white",
  //                                             marginTop:
  //                                               cat[0] === "Lead time" && -35,
  //                                             marginBottom: "15px",
  //                                             fontSize: "14px",
  //                                             // padding: '2px',
  //                                             textOverflow: "ellipsis",
  //                                             height: "auto",
  //                                             textAlign: "center",
  //                                             boxSizing: "border-box",
  //                                             fontWeight: "600",
  //                                           }}
  //                                         >
  //                                           {cat[0]}
  //                                           <span>
  //                                             <div>
  //                                               <span>Legend: </span>
  //                                               {cat[1][0]?.Category}
  //                                             </div>
  //                                             <div>
  //                                               <span>Start Date:</span>
  //                                               {new Date(cat[1][0].startDate)
  //                                                 .toString()
  //                                                 .slice(4, 7)}{" "}
  //                                               {new Date(cat[1][0].startDate)
  //                                                 .toString()
  //                                                 .slice(11, 16)}
  //                                             </div>
  //                                             <div>
  //                                               <span>End Date:</span>{" "}
  //                                               {new Date(cat[1][0].endDate)
  //                                                 .toString()
  //                                                 .slice(4, 7)}{" "}
  //                                               {new Date(cat[1][0].endDate)
  //                                                 .toString()
  //                                                 .slice(11, 16)}
  //                                             </div>
  //                                             {/* <div>
  //                                   <span>Resource:</span> {cat[1][0]?.Category}
  //                                 </div> */}
  //                                             {/* <div>
  //                                   <span>Cost:</span>{' '}
  //                                   {cat[1].filter((e) =>
  //                                     e?.Question?.includes('costs')
  //                                   )[0]?.Answer || 'NA'}
  //                                 </div> */}
  //                                           </span>
  //                                         </div>
  //                                       );
  //                                     })}
  //                                 </>
  //                               )}
  //                             </div>
  //                           </div>
  //                         </div>
  //                         <hr
  //                           style={{
  //                             height: "2px",
  //                             borderWidth: 0,
  //                             color: "gray",
  //                             backgroundColor: "gray",
  //                           }}
  //                         />
  //                       </>
  //                     );
  //                   })}
  //               </div>

  //               <div className="colorIndicators mb-4">
  //                 <label>Category:</label>
  //                 <div className="categoryWrapper">
  //                   <span>Submission</span>
  //                   <span>Approval</span>
  //                   <span>Launch</span>
  //                   {/* <span>Health Authority Dossier Review</span>
  //                     <span>Lead time</span> */}
  //                 </div>
  //               </div>
  //             </div>
  //             {/* )} */}
  //           </Box>
  //         </TabPanel>
  //       </TabContext>
  //     </Box>

  //     {/* <Modal
  //       className="CustomizeModal "
  //       open={data?.length === 0}
  //       onClose={() => {}}
  //       aria-labelledby="modal-modal-title"
  //       aria-describedby="modal-modal-description"
  //     >
  //       <div
  //         style={{
  //           position: "fixed",
  //           top: "50%",
  //           left: "50%",
  //           transform: "translate(-50%, -50%)",
  //           display: "flex",
  //           justifyContent: "center",
  //         }}
  //       >
  //         {/* <CirclesWithBar
  //           height="100"
  //           width="100"
  //           color="#009CDE"
  //           wrapperStyle={{}}
  //           wrapperClass=""
  //           visible={true}
  //           outerCircleColor=""
  //           innerCircleColor=""
  //           barColor=""
  //           ariaLabel="circles-with-bar-loading"
  //         />
  //       </div>
  //     </Modal> */}
  //   </div>
  // );

  return (
    <div className="">
      {/* <Gantt viewMode='Month' tasks={tasks} /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div>
          <MyTimeline
            startDate={new Date(data[0]?.startDate)}
            endDate={endDate}
            width={timeWidth}
          />
        </div>

        {grArr?.length > 0 &&
          grArr.map((d, idx) => {
            // console.log("idx", idx);
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "100px",
                }}
              >
                <div
                  className="new-ganntt-chart-wrapper"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    width: "100%",
                    gap: "25px",
                  }}
                >
                  <div style={{ width: "75px" }}>{d[0]}</div>
                  <div
                    style={{
                      display: "block",
                      width: "inherit",
                      overflowX: "clip",
                      overflowY: "visible",
                    }}
                  >
                    {Object.entries(d[1])?.length > 0 &&
                      Object.entries(d[1]).map((cat, index) => {
                        return cat[0] === "Lead time" ? null : cat[0] ===
                          "Health Authority Dossier Review" ? (
                          <div
                            className="test"
                            style={{
                              display: "flex",
                              justifyContent: "left",
                              gap: "1px",
                              marginLeft: calDuration(
                                apiData?.projectStartDate,
                                getMaxByCatagory(d[1], index, cat[0])
                              ),
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                // width: calDuration(
                                //   Object.values(d[1])[index][0]?.startDate,
                                //   Object.values(d[1])[index][0]?.endDate
                                // ),
                                width: `${
                                  (100 / noOfInt) *
                                  calNoOfMonths(
                                    Object.values(d[1])[index][0]?.startDate,
                                    Object.values(d[1])[index][0]?.endDate
                                  )
                                }%`,
                                backgroundColor:
                                  Object.values(d[1])[index][0]
                                    ?.category_name ===
                                  "Health Authority Dossier Review"
                                    ? "#5BC2E7"
                                    : "",
                                fontSize: "14px",
                                padding: "2px",
                                textOverflow: "ellipsis",
                                maxHeight: "25px",
                                textAlign: "center",
                                boxSizing: "border-box",
                                fontWeight: "600",
                                borderRadius: "7px",
                                color: "white",
                                // overflow: 'hidden',
                              }}
                            >
                              <div className="canntt_chart arrow submission_approval">
                                <div>
                                  {" "}
                                  {/* <ArrowDownwardIcon
                                    style={{
                                      position: "absolute",
                                      left: "0",
                                      width: "18px",
                                      height: "18px",
                                      background: "#808080",
                                      // transform: 'rotate(145deg)',
                                      // marginTop: '4px',
                                    }}
                                  ></ArrowDownwardIcon> */}
                                </div>
                                {cat[0]}
                                <div>
                                  {" "}
                                  {/* <ArrowDownwardIcon
                                    style={{
                                      position: "absolute",
                                      right: "0",
                                      top: -1,
                                      width: "18px",
                                      height: "18px",
                                      background: "#7CCC6C",
                                      // transform: 'rotate(145deg)',
                                      // marginTop: '4px',
                                    }}
                                  ></ArrowDownwardIcon> */}
                                </div>
                                <span>
                                  <div>
                                    <span>Legend: </span>
                                    {cat[1][0]?.Category}
                                  </div>
                                  <div>
                                    <span>Start Date:</span>
                                    {new Date(cat[1][0].startDate)
                                      .toString()
                                      .slice(4, 7)}{" "}
                                    {new Date(cat[1][0].startDate)
                                      .toString()
                                      .slice(11, 16)}
                                  </div>
                                  <div>
                                    <span>End Date:</span>{" "}
                                    {new Date(cat[1][0].endDate)
                                      .toString()
                                      .slice(4, 7)}{" "}
                                    {new Date(cat[1][0].endDate)
                                      .toString()
                                      .slice(11, 16)}
                                  </div>
                                  {/* <div>
                                    <span>Resource:</span> {cat[1][0]?.Category}
                                  </div> */}
                                  {/* <div>
                                    <span>Cost:</span>{' '}
                                    {cat[1].filter((e) =>
                                      e?.Question?.includes('costs')
                                    )[0]?.Answer || 'NA'}
                                  </div> */}
                                </span>
                              </div>
                            </div>
                            <div
                              style={{
                                width: `${
                                  (100 / noOfInt) *
                                  calNoOfMonths(
                                    Object.values(d[1])[index + 1][0]
                                      ?.startDate,
                                    Object.values(d[1])[index + 1][0]?.endDate
                                  )
                                }%`,
                                backgroundColor:
                                  Object.values(d[1])[index + 1][0]
                                    ?.category_name === "Lead time"
                                    ? "#64CCC9"
                                    : "",
                                fontSize: "14px",
                                padding: "2px",
                                textOverflow: "ellipsis",
                                maxHeight: "25px",
                                textAlign: "center",
                                boxSizing: "border-box",
                                fontWeight: "600",
                                borderRadius: "7px",
                                color: "white",
                                // overflow: 'hidden',
                              }}
                            >
                              <div className="canntt_chart arrow lead_time">
                                <div>
                                  <div>
                                    {" "}
                                    {/* <ArrowDownwardIcon
                                      style={{
                                        position: "absolute",
                                        right: "0",
                                        width: "18px",
                                        height: "18px",
                                        background: "#00B140",
                                        // transform: 'rotate(145deg)',
                                        // marginTop: '4px',
                                      }}
                                    ></ArrowDownwardIcon> */}
                                  </div>
                                </div>
                                {
                                  Object.values(d[1])[index + 1][0]
                                    ?.category_name
                                }
                                <span>
                                  <div>
                                    <span>Legend: </span>
                                    {
                                      Object.values(d[1])[index + 1][0]
                                        ?.Category
                                    }
                                  </div>
                                  <div>
                                    <span>Start Date:</span>
                                    {new Date(
                                      Object.values(d[1])[
                                        index + 1
                                      ][0].startDate
                                    )
                                      .toString()
                                      .slice(4, 7)}{" "}
                                    {new Date(
                                      Object.values(d[1])[
                                        index + 1
                                      ][0].startDate
                                    )
                                      .toString()
                                      .slice(11, 16)}
                                  </div>
                                  <div>
                                    <span>End Date:</span>{" "}
                                    {new Date(
                                      Object.values(d[1])[index + 1][0].endDate
                                    )
                                      .toString()
                                      .slice(4, 7)}{" "}
                                    {new Date(
                                      Object.values(d[1])[index + 1][0].endDate
                                    )
                                      .toString()
                                      .slice(11, 16)}
                                  </div>
                                  {/* <div>
                                    <span>Resource:</span> {cat[1][0]?.Category}
                                  </div> */}
                                  {/* <div>
                                    <span>Cost:</span>{' '}
                                    {cat[1].filter((e) =>
                                      e?.Question?.includes('costs')
                                    )[0]?.Answer || 'NA'}
                                  </div> */}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="canntt_chart"
                            style={{
                              backgroundColor:
                                cat[0] === "Quality dossier"
                                  ? "#004F71"
                                  : cat[0] === "Admin dossier"
                                  ? "#002A3A"
                                  : cat[0] === "Health Authority Dossier Review"
                                  ? "#5BC2E7"
                                  : cat[0] === "Clinical dossier"
                                  ? "#009CDE"
                                  : cat[0] === "Lead time"
                                  ? "#64CCC9"
                                  : "",
                              width: `${
                                (100 / noOfInt) *
                                calNoOfMonths(
                                  cat[1][0]?.startDate,
                                  cat[1][0]?.endDate
                                )
                              }%`,
                              marginLeft: 0,
                              // cat[1][0]?.startDate ===
                              // projectStartDate
                              //   ? '0'
                              //   : cat[0] ===
                              //     'Health Authority Dossier Review'
                              //   ? calDuration(
                              //       projectStartDate,
                              //       getMaxByCatagory(
                              //         d[1],
                              //         index,
                              //         cat[0]
                              //       )
                              //     )
                              //   : cat[0] === 'Lead time'
                              //   ? calDuration(
                              //       Object.values(d[1])[0][0]
                              //         .startDate,
                              //       Object.values(d[1])[
                              //         index ? index - 1 : 0
                              //       ][0]?.endDate
                              //     )
                              //   : calDuration(
                              //       projectStartDate,
                              //       // getMaxByCatagory(d[1])
                              //       Object.values(d[1])[
                              //         index ? index - 1 : 0
                              //       ][0]?.endDate
                              //     ),
                              borderRadius: "7px",
                              color: "white",
                              marginTop: cat[0] === "Lead time" && -35,
                              marginBottom: "15px",
                              fontSize: "14px",
                              // padding: '2px',
                              textOverflow: "ellipsis",
                              height: "auto",
                              textAlign: "center",
                              boxSizing: "border-box",
                              fontWeight: "600",
                            }}
                          >
                            {cat[0]}
                            <span>
                              <div>
                                <span>Legend: </span>
                                {cat[1][0]?.Category}
                              </div>
                              <div>
                                <span>Start Date:</span>
                                {new Date(cat[1][0].startDate)
                                  .toString()
                                  .slice(4, 7)}{" "}
                                {new Date(cat[1][0].startDate)
                                  .toString()
                                  .slice(11, 16)}
                              </div>
                              <div>
                                <span>End Date:</span>{" "}
                                {new Date(cat[1][0].endDate)
                                  .toString()
                                  .slice(4, 7)}{" "}
                                {new Date(cat[1][0].endDate)
                                  .toString()
                                  .slice(11, 16)}
                              </div>
                              {/* <div>
                                    <span>Resource:</span> {cat[1][0]?.Category}
                                  </div> */}
                              {/* <div>
                                    <span>Cost:</span>{' '}
                                    {cat[1].filter((e) =>
                                      e?.Question?.includes('costs')
                                    )[0]?.Answer || 'NA'}
                                  </div> */}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {/* <RiskTable data={data} /> */}
    </div>
  );
}

{
  /* <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "90%",
                    margin: "0 auto",
                    gap: "25px",
                  }}
                >
                  <div style={{ width: "50px" }}>{d[0]}</div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      margin: "0 auto",
                    }}
                  >
                    {Object.entries(d[1])?.length > 0 &&
                      Object.entries(d[1]).map((cat) => {
                        return (
                          <>
                            <div
                              className="canntt_chart"
                              style={{
                                backgroundColor:
                                  calRisk(cat[1]) ||
                                  (cat[0] === "Quality dossier preparation"
                                    ? "#004F71"
                                    : cat[0] === "Admin documentation"
                                    ? "#470A68"
                                    : cat[0] ===
                                      "Health Authority Dossier Review"
                                    ? "#AA0061"
                                    : cat[0] === "Clinical study"
                                    ? "#64CCC9"
                                    : cat[0] === "Lead time"
                                    ? "#00B140"
                                    : ""),
                                width: calDuration(
                                  cat[1][0]?.startDate,
                                  cat[1][0]?.endDate
                                ),
                                borderRadius: "5px",
                                color:
                                  cat[0] === "Lead time" ? "black" : "white",
                                marginBottom: "15px",
                                fontSize: "14px",
                                padding: "5px",
                                height:"30px",
                                marginTop:
                                  cat[0] === "Quality dossier preparation"
                                    ? "30px"
                                    : cat[0] === "Admin documentation"
                                    ? "0px"
                                    : cat[0] ===
                                      "Health Authority Dossier Review"
                                    ? "90px"
                                    : cat[0] === "Clinical study"
                                    ? "60px"
                                    : cat[0] === "Lead time"
                                    ? "120px"
                                    : "",
                              }}
                            >
                              {cat[0]}

                              <span>
                                <div>Legend: {cat[1][0]?.Category}</div>
                                <div>
                                  Start Date:
                                  {new Date(cat[1][0].startDate)
                                    .toString()
                                    .slice(4, 7)}{" "}
                                  {new Date(cat[1][0].startDate)
                                    .toString()
                                    .slice(11, 16)}
                                </div>
                                <div>
                                  End Date:{" "}
                                  {new Date(cat[1][0].endDate)
                                    .toString()
                                    .slice(4, 7)}{" "}
                                  {new Date(cat[1][0].endDate)
                                    .toString()
                                    .slice(11, 16)}
                                </div>
                                <div>Resource: {cat[1][0]?.Category}</div>
                              </span>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </div>
              </> */
}

export default GanntttChart;
