import React from "react";





export default function RiskTable({ data }) {
    return (
        <div style={{display:'flex', justifyContent:"center"}}>
            <table className="table">

                <thead>

                    <tr style={{ backgroundColor: '#000', color: '#fff' }}>

                        <th scope="col">Country</th>

                        <th scope="col">Category</th>

                        <th scope="col">Question</th>

                        <th scope="col">Risk Level</th>

                        <th scope="col">Notes</th>

                        <th scope="col">Launch Date</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        data?.map((data, index) => {
                            return (

                                <tr key={index}>

                                    <th scope="row">{data.Country}</th>

                                    <td>{data.Category}</td>

                                    <td>{data.Question}</td>

                                    <td>{data.Risk_Level}</td>

                                    <td>{data.notes}</td>

                                    <td>{new Date(data.startDate).toString().slice(4,7)}{' '}{new Date(data.startDate).toString().slice(11,16)}</td>

                                </tr>

                            )

                        })

                    }

                </tbody>

            </table>
        </div>
    )
}