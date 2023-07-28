const monthNames:string[] = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
const formatDate = (data:Date|null)=>{
    if(!data){
        return '';
    }
    const month = monthNames[data.getMonth()];
    const year = data.getFullYear();
    return `${month}, ${year}`;
}

export {formatDate};