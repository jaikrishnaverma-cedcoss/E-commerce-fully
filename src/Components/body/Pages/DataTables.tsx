import { isArray } from 'chart.js/dist/helpers/helpers.core'
import React from 'react'
import { MyListProducts, MyPlaceOrder, MyProducts, Mysettings } from '../../../Types/MyTypescript'
import SimpleSlider from '../../Extras/SimpleSlider'

const DataTables = ({ table, title ,subTitle ,deletor}: any) => {
   
    // delete list row
    // const deleteThis = (i: number) => {
    //     if(Array.isArray(table))
    //     state[objKey].splice(i, 1)
    //     else if(objKey =='settings')
    //     state[objKey]={Default_Price: '1000', Default_Stocks: '400', Default_zip_code: '1233', Default_Title: 'true'}
    //     setState({ ...state })
    // }

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
                  {title}
                  <small className="text-secondary mx-1 fs-6">
                    {(subTitle)&&' | '+subTitle}
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
                        {(table.length < 1)&&<th>No Data Available</th>}
                        {
                            (table.length > 0) && Object.keys(table[table.length-1]).map(x => <th scope="col">{x.replaceAll('_', ' ').charAt(0).toUpperCase() + x.replaceAll('_', ' ').slice(1)}</th>)
                        }
                        {(table.length > 0 && deletor) && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {
                        (table.length > 0) && table.map((row: Mysettings|MyProducts|MyPlaceOrder|any, i: number) => {
                            return <tr>{

                                Object.keys(row).map((val: string) => {
                                if(Array.isArray(row[val])){
                               return <td>{(val === 'image'|| val=== 'images')?  <SimpleSlider arr={row[val]}/> :row[val].map((element:string)=><p>{element}</p> )}</td>
                                }
                                else
                                return <td>{row[val]}</td>
                              })
                            }
                            {
(deletor)&&<td><button className="btn btn-danger btn-sm" onClick={() => deletor(i)}><i className="bi bi-trash-fill"></i></button></td>
                            
                            }
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