import { useEffect, useState } from "react";
import { isAuth } from "./common";

const OrderList = ({ orders, deleteOrder, setCurrentOrder }) => {

    const [displayOrders, setDisplayOrders] = useState([]);

    const [deal, setDeal] = useState("");
    const [product, setProduct] = useState("");
    const [buyerName, setBuyerName] = useState("");
    const [buyerPhone, setBuyerPhone] = useState("");
    const [buyerAddr, setBuyerAddr] = useState("");
    const [shipCode, setShipCode] = useState("");

    const orderList = displayOrders.map((el, index) => {
        return (
            <tr key={index} onClick={() => { isAuth() && setCurrentOrder && setCurrentOrder(el) }}>
                <td>{el.deal}</td>
                <td>{el.product}</td>
                <td>{el.buyerName}</td>
                <td>{el.buyerPhone}</td>
                <td>{el.buyerAddr}</td>
                <td>{el.shipCode}</td>
                {
                    isAuth() &&
                    <td><button className="btn red"
                        disabled={!el.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteOrder && deleteOrder(el.id);
                        }} >Delete</button></td>
                }
            </tr >
        )
    })

    useEffect(() => {
        if (deal || product || buyerName || buyerPhone || buyerAddr || shipCode) {
            let newDisplayOrders = orders.filter(el => {
                return (deal && el.deal.includes(deal))
                    || (product && el.product.includes(product))
                    || (buyerName && el.buyerName.includes(buyerName))
                    || (buyerPhone && el.buyerPhone.includes(buyerPhone))
                    || (buyerAddr && el.buyerAddr.includes(buyerAddr))
                    || (shipCode && el.shipCode.includes(shipCode))
            });
            setDisplayOrders(newDisplayOrders);
        } else {
            setDisplayOrders(orders);
        }
    }, [orders, deal, product, buyerName, buyerPhone, buyerAddr, shipCode]);

    return (
        <div>
            <table className="highlight striped centered">
                <thead>
                    <tr>
                        <th>
                            {!isAuth() && <>Deal</>}
                            {isAuth() &&
                                <div className="input-field col s6">
                                    <input placeholder=""
                                        id="deal"
                                        type="text"
                                        className="validate"
                                        onChange={(e) => { setDeal(e.target.value) }}
                                        value={deal} />
                                    <label className="active" htmlFor="deal">Deal</label>
                                </div>
                            }
                        </th>
                        <th>{!isAuth() && <>Sản phẩm</>}
                            {isAuth() &&
                                <div className="input-field col s6">
                                    <input placeholder=""
                                        id="product"
                                        type="text"
                                        className="validate"
                                        onChange={(e) => { setProduct(e.target.value) }}
                                        value={product} />
                                    <label className="active" htmlFor="product">Sản phẩm</label>
                                </div>
                            }
                        </th>
                        <th>
                            {!isAuth() && <>Tên người mua</>}
                            {isAuth() &&
                                <div className="input-field col s6">
                                    <input placeholder=""
                                        id="buyerName"
                                        type="text"
                                        className="validate"
                                        onChange={(e) => { setBuyerName(e.target.value) }}
                                        value={buyerName} />
                                    <label className="active" htmlFor="buyerName">Tên người mua</label>
                                </div>
                            }
                        </th>
                        <th>
                            {!isAuth() && <>SĐT</>}
                            {isAuth() &&
                                <div className="input-field col s6">
                                    <input placeholder=""
                                        id="buyerPhone"
                                        type="text"
                                        className="validate"
                                        onChange={(e) => { setBuyerPhone(e.target.value) }}
                                        value={buyerPhone} />
                                    <label className="active" htmlFor="buyerPhone">SĐT</label>
                                </div>
                            }
                        </th>
                        <th>
                            {!isAuth() && <>Địa chỉ</>}
                            {isAuth() &&
                                <div className="input-field col s6">
                                    <input placeholder=""
                                        id="buyerAddr"
                                        type="text"
                                        className="validate"
                                        onChange={(e) => { setBuyerAddr(e.target.value) }}
                                        value={buyerAddr} />
                                    <label className="active" htmlFor="buyerAddr">Địa chỉ</label>
                                </div>
                            }
                        </th>
                        <th>
                            {!isAuth() && <>Mã vận đơn</>}
                            {isAuth() &&
                                <div className="input-field col s6">
                                    <input placeholder=""
                                        id="shipCode"
                                        type="text"
                                        className="validate"
                                        onChange={(e) => { setShipCode(e.target.value) }}
                                        value={shipCode} />
                                    <label className="active" htmlFor="shipCode">Mã vận đơn</label>
                                </div>
                            }
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orderList}
                </tbody>
            </table>
        </div>
    )
}

export default OrderList;