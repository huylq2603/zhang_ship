import { isAuth, PATH } from "../components/common";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import OrderList from "../components/OrderList";
import { firestore, ORDERS } from "../libs/firebase";
import { collection, query, where, getDocs } from '@firebase/firestore';

const GuestPage = () => {

    const [phone, setPhone] = useState("");
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    const searchByPhone = async () => {
        const q = query(collection(firestore, ORDERS), where('buyerPhone', '==', phone));
        const querySnapshot = await getDocs(q);
        const orders = querySnapshot.docs.map((doc) => doc.data());
        setOrders(orders);
    }

    return (
        <div className="container">
            <h1>Guest Page &nbsp;
                {!isAuth() &&
                    <button className="btn waves-effect waves-light" type="button" onClick={() => { navigate(PATH.AUTHEN) }}>
                        Login
                    </button>
                }
                {isAuth() &&
                    <button className="btn waves-effect waves-light" type="button" onClick={() => { navigate(PATH.MANAGE) }}>
                        To Manage Page
                    </button>
                }
                
            </h1>
            <div className="input-field col s6">
                <input placeholder=""
                    id="phone"
                    type="text"
                    className="validate"
                    required
                    onChange={(e) => { setPhone(e.target.value) }}
                    value={phone} />
                <label className="active" htmlFor="phone">SĐT</label>
                <button className="btn blue" onClick={searchByPhone}>Search</button>
            </div>
            <OrderList orders={orders} />
        </div>
    )

}

export default GuestPage;
