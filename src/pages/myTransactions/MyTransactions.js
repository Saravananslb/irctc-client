import React, {useEffect, useState} from "react";
import { Transactions } from "../../components/transaction/Transaction";
import { getBookings } from "../../apiCall";

export const MyTransactions = () => {
    const [bookings, setBookings] = useState([]);

      const getBook = () => {
        getBookings().then(res => {
            if (res.data.status)
            setBookings(res.data.booked);
        })
      }

      useEffect(() => {
          getBook();
      }, [])

    return (
        <>
            {bookings.map(item => <Transactions train={item} />)}
        </>
    )
}