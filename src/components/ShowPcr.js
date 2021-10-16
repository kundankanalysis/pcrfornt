import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector, useStore } from 'react-redux';
import {fetchData} from "../Redux/action/pcrstocks.action";
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip,BarChart ,Label,Bar,LabelList } from 'recharts';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table
} from '@mui/material';
import TextField from '@mui/material/TextField';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

 function ShowPcr() {
  const [data, setdata] = useState([{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page b', uv: 400, pv: 200, amt: 2400}])
  const [stockList,setstockList] = useState([])
  const [stockListvalue,setstockListvalue] = useState([])
  const [StockName,setStockName] = useState("Dabur")
  const pcrData = useSelector(state => state)
  const dispatch = useDispatch()
  let str1 ,str2,patt,res1,res2;
  
  useEffect(() => {
    var sendObj = {}
    sendObj["url"] = "fetch";
    sendObj["fetch"] = "fetch";
    sendObj["data"] = {
      find : "dabur"
    };
    dispatch(fetchData(sendObj))
    sendObj = {}
    sendObj["url"] = "fetchstocks";
    sendObj["fetch"] = "fetchstocks";
    sendObj["data"] = {
      find : "all"
    };
    dispatch(fetchData(sendObj))
    return () => {
      
    }
  }, [])

  useEffect(() => {
    console.log(pcrData.pcrstockReducer.response.data)
    if(Object.keys(pcrData.pcrstockReducer.response).length>0){
      setdata(pcrData.pcrstockReducer.response.data)
    }
    if(Object.keys(pcrData.pcrstockReducer.responsestocks).length>0){
      setstockList(pcrData.pcrstockReducer.responsestocks.data)
    }
    
    return () => {
      
    }
  }, [pcrData])

  const showstocks = (params) =>{
    var sendObj = {}
    sendObj["url"] = "fetch";
    sendObj["fetch"] = "fetch";
    sendObj["data"] = {
      find : params["shortname"]
    };
    dispatch(fetchData(sendObj))
    setStockName(params["name"])
  }

  const witdhscreen = 1050

  return (
    <>
      <Grid direction="row" container spacing={2}>
        <Grid item xs={8} style={{"paddingLeft":"60px"}}>
          <h1 style={{"marginLeft":"50px"}}>{StockName}</h1>
        </Grid>
        <Grid item xs={2} >
          <TextField onChange={(e)=>setstockListvalue(e.target.value)} id="outlined-basic" style={{"marginLeft":"50px"}} label="Search Stocks" variant="outlined" />
        </Grid>
      </Grid>
      <Grid direction="row" container spacing={2}>
        <Grid item xs={10} style={{"paddingLeft":"60px"}}>
          
          <LineChart width={witdhscreen} height={380} data={data} >
            <Line type="monotone" dataKey="pcrpoints" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="pcrFormatDate" />
            <YAxis />
            <Tooltip />
          </LineChart>
          <BarChart 
            width={witdhscreen}
            height={390} 
            data={data} 
            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="pcrFormatDate">
              <Label value="" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis label={{ value: '', angle: -90, position: 'insideLeft' }} />
            <Bar dataKey="pcrpoints" fill="#8884d8">
              <LabelList dataKey="pcrpoints" position="top" />
            </Bar>
            <Tooltip />
          </BarChart>
        </Grid>
        <Grid item xs={2} style={{"paddingRight":"10px","height":"100vh","overflow-y":"auto"}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {/* <StyledTableCell>Name</StyledTableCell> */}
                  <StyledTableCell> Short Name</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stockList.length>0 && stockList.map(function(row){
                   str1 = row["name"];
                   str2 = row["shortname"];
                   patt = new RegExp(stockListvalue,"ig");
                   res1 = patt.test(str1);
                   res2 = patt.test(str2);
                  if(stockListvalue){
                    if(res1 || res2){
                      return(
                        <StyledTableRow key={row.name} style={{"cursor":"pointer"}} onClick={()=>showstocks(row)}>
                            {/* <StyledTableCell>{row["name"]}</StyledTableCell> */}
                            <StyledTableCell>{row["shortname"]}</StyledTableCell>
                        </StyledTableRow>
                      )
                    }
                  }
                  else{
                    return(
                      <StyledTableRow key={row.name} style={{"cursor":"pointer"}} onClick={()=>showstocks(row)}>
                          <StyledTableCell>{row["name"]}</StyledTableCell>
                          <StyledTableCell>{row["shortname"]}</StyledTableCell>
                      </StyledTableRow>
                    )
                  }
                  
                  
                })}
                 
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  )
}

export default ShowPcr
