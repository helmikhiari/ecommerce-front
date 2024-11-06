import axios from 'axios'

export async function getProducts()
{
    try {
        const response=await axios.get(process.env.NEXT_PUBLIC_API_BASE+'/product/getproducts');
        if (response.status==200)
            return response.data
    } catch (error) {
        console.log(error)
        return false;
        
    }
}


export async function getVariants(id)
{
    try {
        const response=await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/product/getproduct/${id}`);
        if (response.status==200)
            return response.data;
        } 
    catch (error) {
        console.log(error);
        return false;
        
    }
}

export async function searchProducts(name)
{
    try {
        const response=await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/product/searchProducts/${name}`);
        if (response.status==200)
            return response.data
    } catch (error) {
        console.log(error)
        return false;
        
    }
}
