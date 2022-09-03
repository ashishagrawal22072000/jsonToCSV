import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Header from "./Header";
import 'bootstrap/dist/css/bootstrap.css';
import { CSVLink } from 'react-csv';
export default function Apps() {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [head, setHead] = useState([]);
  // const [headers, setHeader] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get('https://dummyjson.com/todos')
        .then((res) => {
          // console.log(res.data.todos);
          setData(res.data.todos);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  // console.log(data);

  // const header = [
  //   { label: 'Sno.', key: 'id' },
  //   { label: 'Message', key: 'todo' },
  //   { label: 'UserID', key: 'userId' },
  //   { label: 'Completed', key: 'completed' },
  // ];

  // console.log("cbe", headers);
  

  
  useEffect(() => {
    const labels = data.map((ele) => {
      return setLabels(Object.keys(ele));
    });
  }, [data]);

  useEffect(() => {
    const head = labels.map((ele) => {
      return setHead({ label: ele, keys: ele });
    });
  }, [labels]);

  // console.log(labels);
  // console.log(headers);


  const csvReport = {
    filename: 'data.csv',
    header: head,
    data: data,
  };

  return (
    <div>
      <div className="container d-flex flex-row-reverse p-2">
        <button className="btn btn-dark">
          <CSVLink
            {...csvReport}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Download Me
          </CSVLink>
        </button>
      </div>
      <div className="container my-2">
        <table class="table border border-2">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody className="">
            {data.map((ele) => {
              return (
                <>
                  <tr className="">
                    <td className="border">{ele.id}</td>
                    <td className="border">{ele.todo}</td>
                    <td className="border">{ele.userId}</td>
                    <td className="border">
                      {ele.completed ? 'true' : 'false'}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
