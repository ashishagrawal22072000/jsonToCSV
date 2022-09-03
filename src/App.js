import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";
export default function App() {
  const [data, setData] = useState([]);

  const _export = React.useRef(null);

  const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save(data);
    }
  };

  const _grid = React.useRef();

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("https://dummyjson.com/todos")
        .then((res) => {
          console.log(res.data.todos);
          setData(res.data.todos);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  return (
    <div>
      <ExcelExport data={data} ref={_export}>
        <Grid
          data={data}
          style={{
            height: "420px",
          }}
          ref={_grid}
        >
          <GridToolbar>
            <button
              title="Export Excel"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
              onClick={excelExport}
            >
              Export to Excel
            </button>
          </GridToolbar>
          {data.map((ele, i) => {
            return (
              <>
                <GridColumn field={ele} title={ele} width={200} />
              </>
            );
          })}
          {/* <GridColumn field="id" title="Sno." width="50px" />
          <GridColumn field="maidenName" title="MiddleName" width="100px" />
          <GridColumn field="lastName" title="LastName" width="100px" />

          <GridColumn field="age" title="Age" width="100px" />
          <GridColumn field="email" title="Email" width="100px" />
          <GridColumn field="phone" title="Phone" width="150px" />
          <GridColumn field="birthDate" title="DOB" width="100px" />

          <GridColumn field="Discontinued" title="Discontinued" /> */}
        </Grid>
      </ExcelExport>
    </div>
  );
}
