import React from 'react'
import { MyListProducts, MyPlaceOrder, MyProducts, Mysettings } from '../../MyTypescript'

const DataTables = ({ table, state, objKey, setState }: MyListProducts) => {
   
    // delete list row
    const deleteThis = (i: number) => {
        if(Array.isArray(state[objKey])&&objKey!=='settings')
        state[objKey].splice(i, 1)
        else if(objKey =='settings')
        state[objKey]={Default_Price: '1000', Default_Stocks: '400', Default_zip_code: '1233', Default_Title: 'true'}
        setState({ ...state })
    }

    if (!Array.isArray(table)) {
        let obj: any = {}
        Object.entries(table).forEach((x:[string, unknown]):void => {
            obj[x[0]] = x[1]
        })
        table = [obj]
    }
    return (
        <div  className='d-flex flex-wrap justify-content-center  p-4 tabdiv' >
              <div className="col-12  mb-2 pe-md-2">
          <div className="card border-0 shadow-lg mt-2">
            <div className="card-title p-3 pb-0">
              <div className="d-flex justify-content-between">
                <p className="card-title fs-5 n-blue">
                  Recent Sales
                  <small className="text-secondary mx-1 fs-6">
                    | Today
                  </small>{" "}
                </p>
                <small className="text-secondary mx-1 fs-6">...</small>
              </div>
            </div>
            <div className="card-body p-3 pt-0">
              <div className="w-100">
            <table className="w-100 table my-2" id="exampleTable" >
                <thead>
                    <tr>
                        {(table.length > 0) ? <th>id</th> : <th>No Data Available</th>}
                        {
                            (table.length > 0) && Object.keys(table[table.length-1]).map(x => <th scope="col">{x.replaceAll('_',' ')}</th>)
                        }
                        {(table.length > 0) && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {
                        (table.length > 0) && table.map((row: Mysettings|MyProducts|MyPlaceOrder|any, i: number) => {
                            return <tr><td>{i}</td>{

                                Object.keys(row).map((val: string) => <td>{row[val]}</td>)
                            }<td><button className="btn btn-danger btn-sm" onClick={() => deleteThis(i)}><i className="bi bi-trash-fill"></i></button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

       
            
              </div>
            </div>
          </div>
        </div>
        </div>
        

    )
}

export default DataTables