import React, { useState } from 'react'
import useSettings from '../../Hooks/useSettings';
import { MyPlaceOrder, MyProducts } from '../../MyTypescript';

type MySetting={
  bySettings:(el:any)=>MyPlaceOrder|MyProducts
}
const AddProduct = ({ inputs, state, objKey, setState }: any) => {
  const [formData, updateFormData] = useState({});
  const [select, setSelect] = useState<boolean>(false)

  //custom hook to handle default obj values
  const {bySettings}:MySetting = useSettings(state, objKey)

  const handleChange: React.ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>= (e) => {
    updateFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  // checkbox toggler
  const HandleCheck: React.ChangeEventHandler<HTMLSelectElement|HTMLInputElement>= (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: (select) ? 'false' : 'true'
    });
    setSelect(!select)
  };


  // object map for check with hook
  const formHandler= (e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    if (objKey == 'settings') {
      state[objKey] = bySettings(formData)
    } else {
      state[objKey].push(bySettings(formData))
    }
    setState({ ...state })
    e.currentTarget.reset()
  }

  return (
    <>
      <form onSubmit={formHandler} style={{ width: '100%' }} className='d-flex flex-wrap justify-content-center  p-4 '>
        <div className='d-flex flex-wrap justify-content-between' style={{ maxWidth: '700px' }}>
          {
            inputs.map((x: any, i: number) => <div className="m-1 col-5" style={{ minWidth: '290px' }}>
              <label htmlFor="exampleInputEmail1" className="form-label">{x.name.replaceAll('_', ' ')}</label>
              {(x.type === 'textarea') ?
                <textarea required={x.required} name={x.name} onChange={handleChange} className="form-control" id={x.name + i} placeholder={`Enter ${x.name}...`} aria-describedby={`about ${x.name} `}></textarea>
                : (x.type === 'select') ?
                  <select required={x.required} name={x.name} className="form-select" onChange={handleChange} aria-label="Default select example">
                    {
                      (x.data.length > 0) ?
                        [{ Name: '' }, ...x.data].map((x: any) => <option value={x.Name}>{(x.Name == '') ? 'select any' : x.Name}</option>)
                        : <option value=''>No product Available</option>
                    }
                  </select> : (x.type === 'radio') ?
                  <div className="form-check form-switch">
                    <input name={x.name} key={formData.toString()} onChange={HandleCheck} className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={select} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{x.span.replaceAll('_', ' ')}</label>
                  </div> :
                  <input required={x.required} name={x.name} onChange={handleChange} type={x.type} className="form-control" id={x.name + i} aria-describedby={`about ${x.name} `} placeholder={`Enter ${x.name}`} />
              }
              {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            )}
        </div>
        <div className="col-12" style={{ maxWidth: '700px' }}>
          <button type="submit" className="btn btn-primary my-3  ">Submit</button>
        </div>
      </form>
    </>
  )
}

export default AddProduct