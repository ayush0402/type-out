import React from 'react'

const Table = ({data}) => {
  return (
<div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    S. No.
                </th>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Score
                </th>
               
            </tr>
        </thead>
        <tbody>
            
                 <tr class="mx-200 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                 <td class="px-6 py-4">
                 {data.map((user) => (
        <div className="user">{user.rank}</div>
      ))}
                 </td>
                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <a href='/data'> {data.map((user) => (
        <div className="user">{user.name}</div>
      ))} </a>
                 </th>
                 <td class="px-6 py-4">
                 {data.map((user) => (
        <div className="user">{user.score}</div>
      ))}
                 </td>
                 
             </tr>
            
           
            
        </tbody>
    </table>
    </div>
  )
}

export default Table
