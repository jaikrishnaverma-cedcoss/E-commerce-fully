import { MyState } from "../MyTypescript"

const useSettings = (state: MyState, key: string) => {

    const bySettings = (current_obj: any) => {

        if (state.settings.Default_Title && key == 'products') {
            current_obj.Name += ' | ' + current_obj.Tags
        }
        if (!current_obj.Price && key == 'products')
            current_obj['Price'] = state.settings.Default_Price

        if (!current_obj.Stocks && key == 'products')
            current_obj['Stocks'] = state.settings.Default_Stocks

        if (!current_obj.Zip && key == 'placeOrder')
            current_obj = {...current_obj,zip:state.settings.Default_zip_code}
            
        if(!current_obj.Default_Title && key =='settings')
        current_obj.Default_Title = 'false'
        return current_obj
    }

    return {bySettings}
}


export default useSettings