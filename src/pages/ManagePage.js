import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { isAuth } from "../components/common";
import { firestore } from '../libs/firebase';
import { setDoc, collection, query, where, getDoc, getDocs, deleteDoc, updateDoc, doc } from '@firebase/firestore';

import OrderInput from "../components/OrderInput";
import OrderList from "../components/OrderList";

const ManagePage = () => {

    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        getAllOrders();
    }, []);

    const getAllOrders = async () => {
        const q = query(collection(firestore, "orders"));
        const querySnapshot = await getDocs(q);
        const orders = querySnapshot.docs.map((doc) => doc.data());
        setOrders(orders);
    }

    const deleteOrder = (id) => {
        if (window.confirm("Delete this?")) {
            let newOrders = [...orders].filter(el => el.id != id);
            setOrders(newOrders);
            deleteDoc(doc(firestore, "orders", id))
        }
    }

    const addOrder = async (order) => {
        await setDoc(doc(firestore, "orders", order.id), order);

        getAllOrders();
    }

    const updateOrder = async (order) => {
        await updateDoc(doc(firestore, "orders", order.id), order);

        getAllOrders();
    }

    return (
        <div className="container">
            <h1 style={{ textAlign: "center" }}>Orders &nbsp;
                <button className="btn waves-effect waves-light" type="button" onClick={() => { navigate("/") }}>
                    Back
                </button>
            </h1>
            <OrderInput order={currentOrder} addOrder={addOrder} updateOrder={updateOrder} setCurrentOrder={setCurrentOrder} />
            <OrderList orders={orders} deleteOrder={deleteOrder} setCurrentOrder={setCurrentOrder} />
        </div>
    )

}

export default ManagePage;
