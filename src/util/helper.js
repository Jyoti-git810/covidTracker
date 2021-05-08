export const sortData=(data)=>{
    const sortData=[...data];
    console.log("m",sortData)
    return sortData.sort((a,b)=>(a.cases>b.cases?-1:1))

}
