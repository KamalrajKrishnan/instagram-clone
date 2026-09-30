import { useState, useEffect } from "react";
const useFetch = (url) =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Couldn't retrieve data");
                    }

                    return response.json();
                })
                .then((data) => {
                    setData(data);
                })
                .catch((error) => {
                    console.log(error);
                    setError(error.message);
                });
        }, 2000);
        return () => clearTimeout(timer);       
    }, []);
    return [data, error];
};

export default useFetch