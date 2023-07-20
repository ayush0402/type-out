import React from 'react';
import Table from '../../components/Table'
const data=[
    {
        name:"Akshay Bhatnagar",
        score:"200",
        rank:1
    },
    {
        name:"ayush kumar",
        score:100,
        rank:2
    }
];
const page = () => {
  return (
    
    <div>
        <Table data={data}></Table>
    </div>
  )
}

export default page
