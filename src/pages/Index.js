import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import axios from 'axios';
import config from "../config";

function Index() {
    const [products, setProducts] = useState([]);
    const [carts, setCarts] = useState([]); // Items in Carts
    const [recordInCarts, setRecordInCarts] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiPath + '/product/list');
            if (res.data.results !== undefined) {
                setProducts(res.data.results);
            }
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e.message,
                icon: 'error'
            })
        }
    }

    function showImage(item) {
        if (item.img !== undefined) {
            let imgPath = config.apiPath + '/uploads/' + item.img;

            if (item.img == "") imgPath = "default_image.webp";

            return <img className="card-img-top" height='150px' src={imgPath} alt="" />
        }

        return <></>;
    }

    const addToCart = (item) => {
        let arr = carts;
        arr.push(item);

        setCarts(arr);
        setRecordInCarts(carts.length);
    }

    return <>
        <div className="container mt-3">
            <div className="float-start">
                <div className="h3">สินค้าของร้านเรา</div>
            </div>
            <div className="float-end">
                ตะกร้าของฉัน
                <button className="btn btn-outline-success ms-2 me-2">
                    <i className="fa fa-shopping-cart me-2"></i>
                    {recordInCarts}
                </button>
                ชิ้น
            </div>
            <div className="clearfix"></div>

            <div className="row">
                {products.length > 0 ? products.map(item =>
                    <div className="col-3 mt-3" key={item.id}>
                        <div className="card">
                            {showImage(item)}
                            <div className="card-body">
                                <div>{item.name}</div>
                                <div>{item.price.toLocaleString('th-TH')}</div>
                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={e => addToCart(item)}>
                                        <i className="fa fa-shopping-cart me-2"></i>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <></>}
            </div>
        </div>
    </>
}

export default Index;