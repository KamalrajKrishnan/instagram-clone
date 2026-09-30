import {React, useState, useEffect} from 'react';
 const Counter = () => {
    const [count, setCount] = useState(0);
    const [curDateTime, setCurDateTime] = useState("");

    const resetCounter = ()=>{
        setCount(0);
    }

    useEffect(() => {
        const date = new Date();
        const currentDate = date.getDate();
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();
        const currentHour = date.getHours();
        const currentMin = date.getMinutes();
        const currentMS = date.getSeconds();

        const curTime = `${currentDate}/${currentMonth}/${currentYear} ${currentHour} : ${currentMin} : ${currentMS}`;
        setCurDateTime(curTime);
      const interval = setInterval(()=>{
        setCount(prevCount=>prevCount+1);
      },1000);

      return ()=>{clearInterval(interval)};

    }, [count]);
    
  return (
    <div>
        <h1 className='mt-2 border-green-900 px-3 py-1 text-green-600 bg-green-600 text-white disabled:bg-green-600 disabled:text-white cursor-pointer'>{curDateTime}</h1>
        <p className='mt-2 border-green-900 px-3 py-1 text-green-600 bg-green-600 text-white disabled:bg-green-600 disabled:text-white cursor-pointer'>{count}</p>
        <button className="mt-2 border border-red-600 px-3 py-1 text-xs text-red-600 hover:bg-red-600 hover:text-white disabled:bg-red-600 disabled:text-white cursor-pointer" onClick={resetCounter}>Reset</button>
    </div>
  )
}

export default Counter;
