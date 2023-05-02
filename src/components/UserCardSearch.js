import React from "react";

function UserCardSearch(props){
    let listItem = props.data.map(item =>
        <div>{item.id}</div>
    )
    
    console.log(props.data)
    return(
        <>
            {listItem}
        </>
    )
}

export default UserCardSearch;