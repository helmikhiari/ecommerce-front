import axios from "axios";


export async function addVariantToCart(variantID,quantity)
{
    try 
    {
        const token=localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        }    
        const response=await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE}/user/addToCart`,{variantID,quantity},{headers});
        if (response.status==204)
            return true;
    } catch (error) {
        return false;
    }
}