import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { firestore, ORDERS } from '../libs/firebase';
import { setDoc, collection, query, getDocs, deleteDoc, updateDoc, doc } from '@firebase/firestore';

import OrderInput from "../components/OrderInput";
import OrderList from "../components/OrderList";
import { PATH } from "../components/common";

const ManagePage = () => {

    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        getAllOrders();
    }, []);

    const getAllOrders = async () => {
        const q = query(collection(firestore, ORDERS));
        const querySnapshot = await getDocs(q);
        const orders = querySnapshot.docs.map((doc) => doc.data());
        setOrders(orders);
    }

    const deleteOrder = (id) => {
        if (window.confirm("Delete this?")) {
            let newOrders = [...orders].filter(el => el.id != id);
            setOrders(newOrders);
            deleteDoc(doc(firestore, ORDERS, id))
        }
    }

    const addOrder = async (order) => {
        await setDoc(doc(firestore, ORDERS, order.id), order);

        getAllOrders();
    }

    const updateOrder = async (order) => {
        await updateDoc(doc(firestore, ORDERS, order.id), order);

        getAllOrders();
    }

    return (
        <div className="container">
            <h1 style={{ textAlign: "center" }}>Orders &nbsp;
                <button className="btn waves-effect waves-light" type="button" onClick={() => { navigate(PATH.HOME) }}>
                    Back
                </button>
            </h1>
            <OrderInput order={currentOrder} addOrder={addOrder} updateOrder={updateOrder} setCurrentOrder={setCurrentOrder} />
            <OrderList orders={orders} deleteOrder={deleteOrder} setCurrentOrder={setCurrentOrder} />
        </div>
    )

}

export default ManagePage;
