import React from 'react';

const Navlinks = async() => {
    const res= await fetch("https://api.api-store.workers.dev/api/bazardor/categories")
    const data= await res.json()
    const nav=data.data;
    console.log(nav)
    return (
        <div>
            
        </div>
    );
};

export default Navlinks;