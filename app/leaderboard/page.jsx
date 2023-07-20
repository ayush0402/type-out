import React from 'react';
import Table from '../../components/Table'
const data=[
    {
        name:"Akshay Bhatnagar",
        score:"200",
    },
    {
        name:"ayush kumar",
        score:100,
    },
    {
        name:"Mohit Aswani",
        score:400
    },
    {
        name:"Tejas Taneja",
        score:"350",
    }
];
data.sort((a,b)=>a.score>b.score?-1:1);
const page = () => {
  return (
    
    <div>
        <Table data={data}></Table>
    </div>
  )
}

export default page
