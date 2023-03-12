import { useEffect, useState } from "react";
import { isAuth } from "./common";
import uuid from 'react-uuid';

const OrderInput = ({ order, addOrder, updateOrder, setCurrentOrder }) => {

    const [id, setId] = useState(null);
    const [deal, setDeal] = useState("");
    const [product, setProduct] = useState("");
    const [buyerName, setBuyerName] = useState("");
    const [buyerPhone, setBuyerPhone] = useState("");
    const [buyerAddr, setBuyerAddr] = useState("");
    const [shipCode, setShipCode] = useState("");
    const [isRenderInput, setIsRenderInput] = useState(false);

    useEffect(() => {
        setId(order.id ?? '');
        setDeal(order.deal ?? '');
        setProduct(order.product ?? '');
        setBuyerName(order.buyerName ?? '');
        setBuyerPhone(order.buyerPhone ?? '');
        setBuyerAddr(order.buyerAddr ?? '');
        setShipCode(order.shipCode ?? '');
        setIsRenderInput(order.id ? true : false);
    }, [order]);

    const refreshInput = () => {
        setCurrentOrder({})
        setId(null);
        setDeal("");
        setProduct("");
        setBuyerName("");
        setBuyerPhone("");
        setBuyerAddr("");
        setShipCode("");
    }

    return (
        <>
            {!isRenderInput &&
                <button className="btn blue" onClick={() => setIsRenderInput(true)}>Add</button>
            }
            {isRenderInput &&
                <div className="row">
                    <div className="col s12">
                        <div className="card blue-grey lighten-5" style={{ padding: "0 50px" }}>
                            <div className="card-content">
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input placeholder=""
                                            id="deal"
                                            type="text"
                                            className="validate"
                                            required
                                            onChange={(e) => { setDeal(e.target.value) }}
                                            value={deal} />
                                        <label className="active" htmlFor="deal">Deal</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input placeholder=""
                                            id="product"
                                            type="text"
                                            className="validate"
                                            required
                                            onChange={(e) => { setProduct(e.target.value) }}
                                            value={product} />
                                        <label className="active" htmlFor="product">Sản phẩm</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input placeholder=""
                                            id="buyerName"
                                            type="text"
                                            className="validate"
                                            required
                                            onChange={(e) => { setBuyerName(e.target.value) }}
                                            value={buyerName} />
                                        <label className="active" htmlFor="buyerName">Tên người mua</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input placeholder=""
                                            id="buyerPhone"
                                            type="text"
                                            className="validate"
                                            required
                                            onChange={(e) => { setBuyerPhone(e.target.value) }}
                                            value={buyerPhone} />
                                        <label className="active" htmlFor="buyerPhone">SĐT</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input placeholder=""
                                            id="buyerAddr"
                                            type="text"
                                            className="validate"
                                            required
                                            onChange={(e) => { setBuyerAddr(e.target.value) }}
                                            value={buyerAddr} />
                                        <label className="active" htmlFor="buyerAddr">Địa chỉ</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input placeholder=""
                                            id="shipCode"
                                            type="text"
                                            className="validate"
                                            required
                                            onChange={(e) => { setShipCode(e.target.value) }}
                                            value={shipCode} />
                                        <label className="active" htmlFor="shipCode">Mã vận đơn</label>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action">
                                {!id &&
                                    <div style={{ display: "inline-block" }}>
                                        <button className="btn blue"
                                            onClick={() => {
                                                if (!(deal.trim() && product.trim() && buyerName.trim() && buyerPhone.trim() && buyerAddr.trim() && shipCode.trim())) return;
                                                refreshInput();
                                                setIsRenderInput(false);
                                                addOrder && addOrder({
                                                    id: uuid(),
                                                    deal: deal.trim(),
                                                    product: product.trim(),
                                                    buyerName: buyerName.trim(),
                                                    buyerPhone: buyerPhone.trim(),
                                                    buyerAddr: buyerAddr.trim(),
                                                    shipCode: shipCode.trim(),
                                                });
                                            }}
                                            disabled={!(deal.trim() && product.trim() && buyerName.trim() && buyerPhone.trim() && buyerAddr.trim() && shipCode.trim())}
                                        >Add</button>
                                        <button className="btn grey" style={{ margin: "0 15px" }}
                                            onClick={() => { refreshInput(); setIsRenderInput(false); }}>Cancel</button>
                                    </div>
                                }
                                {id &&
                                    <div style={{ display: "inline-block" }}>
                                        <button className="btn blue"
                                            onClick={() => {
                                                if (!isAuth() || !(deal.trim() && product.trim() && buyerName.trim() && buyerPhone.trim() && buyerAddr.trim() && shipCode.trim())) return;
                                                refreshInput();
                                                setIsRenderInput(false);
                                                updateOrder && updateOrder({
                                                    id: id,
                                                    deal: deal.trim(),
                                                    product: product.trim(),
                                                    buyerName: buyerName.trim(),
                                                    buyerPhone: buyerPhone.trim(),
                                                    buyerAddr: buyerAddr.trim(),
                                                    shipCode: shipCode.trim(),
                                                });
                                            }}
                                            disabled={!(deal.trim() && product.trim() && buyerName.trim() && buyerPhone.trim() && buyerAddr.trim() && shipCode.trim())}>Update</button>
                                        <button className="btn grey" style={{ margin: "0 15px" }}
                                            onClick={() => { refreshInput(); setIsRenderInput(false); }}>Cancel</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default OrderInput;