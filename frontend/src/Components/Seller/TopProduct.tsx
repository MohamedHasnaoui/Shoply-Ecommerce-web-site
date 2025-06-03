import { useEffect, useState } from "react";
import { ProductAndNbOrders } from "../../generated";
import { productService } from "../../services/product";
import { Link } from "react-router";

const TopProduct = () => {
    const [topSellingProducts, setTopSellingProducts] = useState<ProductAndNbOrders[]>([]);
    useEffect(()=>{
        const fetch = async ()=>{
        const response = await productService.getTopSellingProductsForSeller(10);
        if(response.data.getSellerTopProducts)
            setTopSellingProducts(response.data?.getSellerTopProducts)
        }
        fetch()
    },[])
    console.log(topSellingProducts)
  return (
    <div className="block block-rounded">
        <div className="block-content block-content-full">
            <table className="table table-borderless table-striped mb-0">
            <thead>
                <tr>
                <th className="d-none d-sm-table-cell" style={{width: 100}}>ID</th>
                <th>Product</th>
                <th className="text-center">Units Sold </th>
                <th className="d-none d-sm-table-cell text-center">Rating</th>
                </tr>
            </thead>
            <tbody>
                { topSellingProducts.map((Elm,key)=>{
                    return(
                        <tr key={key}>
                        <td className="d-none d-sm-table-cell">
                            <button type="button" className="fw-semibold border-0 bg-transparent">PID.{Elm.product.id}</button>
                        </td>
                        <td>    
                            <Link to={`/seller/edit-product/${Elm.product.id}`} className="border-0 bg-transparent">{Elm.product.name}</Link>
                        </td>
                        <td className="text-center">
                            <span className="text-gray-dark" >{Elm.totalSold}</span>
                        </td>
                        <td className="d-none d-sm-table-cell text-center">
                            <div className="text-warning">
                                {Elm.product.rating==0? 0:""}
                               {Array.from({ length: Elm.product.rating! }).map((_, index) => (
                                   <i key={index} className="fa fa-star"></i>
                               ))}
                            </div>
                        </td>
                        </tr>
                    )
                })}
                
            </tbody>
            </table>
        </div>
        </div>
  )
}

export default TopProduct
