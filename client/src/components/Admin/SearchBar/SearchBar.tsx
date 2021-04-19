import { AutoComplete, Button, Input, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getByBookingID, getByPaxID, getFirstName, getLastName } from '../../../actions/SearchBookings/action_searchBookings'

export const SearchBooking = () => {

    const dispatch = useDispatch()
    const bookingStore = useSelector((state: any) => state.booking_pax)
    // const bookingStore={
    //     byFirstName:[{name:"Elba"},{name:"gila"}],
    //     byID:[{name:5},{name:10}],
    //     byLastName:[{name:"Gallo"},{name:"deMierda"}]
    // }
    const [search, setSearch] = useState("")



    useEffect(() => {
        
        dispatch(getByPaxID(search))
        dispatch(getByBookingID(search))
        dispatch(getFirstName(search))
        dispatch(getLastName(search))
    
    }, [dispatch, search])

    const onChange = (value: any) => {
        setSearch(value)

    }


    const renderTitle = (title:string) => (
        <span key={title}>
            {title}
        </span>
    );
    
    let i =0;
    const renderItem = (title:any) => {
        i++
        return({
        value: `${i}.${title}`,
        label: (
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {title}
            </div>
        ),
    });
    }
    

    const mapeoByPaxID = (array:any[]) => {
        return array?array.map((x) => renderItem(x.pax_id?.id)):[]
    }
    const mapeoByBookingId = (array:any[]) => {        
        return array?array.map((x) =>renderItem(x.booking_id?.id)):[]   
    }
    const mapeoByFirstName = (array:any[]) => {
        return array?array.map((x) =>renderItem(x.pax_id?.first_name)):[]
    }
    const mapeoByLastName = (array:any[]) => {
        return array?array.map((x) => renderItem(x.pax_id?.last_name)):[]
    }

    const options = [
        {
            label: renderTitle('By Pax'),
            options: mapeoByPaxID(bookingStore?.bypaxID)?mapeoByPaxID(bookingStore?.bypaxID):[],
        },
        {
            label: renderTitle('By Booking'),
            options: mapeoByBookingId(bookingStore?.bybookingID)?mapeoByBookingId(bookingStore?.bybookingID):[],
        },
        {
            label: renderTitle('By First Name'),
            options: mapeoByFirstName(bookingStore?.byFirstName),
        },
        {
            label: renderTitle('By Last Name'),
            options: mapeoByLastName(bookingStore?.byLastName)
        },
    ];

    // const searchResult = (value: any) => {
    //     return bookingStore?.byLastName?.map((x: any) => {
    //         if (x.pax_id.last_name.toUpperCase().includes(value.toUpperCase())) {
    //             console.log(x.pax_id.last_name)
    //             const category = `${x.pax_id.last_name}`;
    //             return {
    //                 value: category,
    //                 // label: (
    //                 //     <div
    //                 //         style={{
    //                 //             display: 'flex',
    //                 //             justifyContent: 'space-between',
    //                 //         }}
    //                 //     >
    //                 //         <span>{x.pax_id.last_name}</span>
    //                 //     </div>
    //                 // ),
    //             }
    //         }
    //     });
    // }

    // const [opciones, setOpciones] = useState<any[]>([]);

    // const handleSearch = (value: any) => {
    //     setOpciones(value ? searchResult(value) : []);
    // };

    const onSelect = (value: any) => {
        console.log('onSelect', value);
    };

    return (
        <AutoComplete
            dropdownMatchSelectWidth={252}
            style={{
                width: 300,
            }}
            options={options}
            onSelect={onSelect}
            onSearch={onChange}
        >
            <Input.Search size="large" placeholder="input here" onSearch={onSelect} enterButton />
        </AutoComplete>
    );
};
// -------------------------------------------------------------------------------------------------------

/* <input style={{ display: "flex", margin: "auto", width: 200 }} onChange={onChange}></input>
        <div><strong>RESERVAS</strong></div>
        <div><br /> ID PAX</div>
        {
            bookingStore?.bypaxID?.map((book: any, i: number) => {
                return (
                    <>
                        <div key={`a${i}`}>
                            <div >Booking {i}</div>
                            <div ><strong>First Name:  </strong>{book.pax_id.first_name}</div>
                            <div ><strong>Last Name:  </strong>{book.pax_id.last_name}</div>
                            <div ><strong>ID ID ID:  </strong>{book.id}</div>
                            <div ><strong>Checkin:  </strong>{book.booking_id.checkin}</div>
                            <div ><strong>Checkout:  </strong>{book.booking_id.checkout}</div>
                            <hr />
                            <hr />
                        </div>
                    </>
                )
            })
        }
        <hr />
        <hr />
        <hr />
        <hr />


        <hr />
        {bookingStore.bybookingID ? <div> <br />POR BOOKING</div> : null}
        {
            bookingStore?.bybookingID?.map((book: any, i: number) => {
                return (
                    <>
                        <div key={`b${i}`}>
                            <div >Booking {i}</div>
                            <div ><strong>First Name:  </strong>{book.pax_id.first_name}</div>
                            <div ><strong>Last Name:  </strong>{book.pax_id.last_name}</div>
                            <div ><strong>ID ID ID:  </strong>{book.id}</div>
                            <div ><strong>Checkin:  </strong>{book.booking_id.checkin}</div>
                            <div ><strong>Checkout:  </strong>{book.booking_id.checkout}</div>
                            <hr />
                            <hr />
                        </div>
                    </>
                )
            })
        }
        {bookingStore.byFirstName ? <div> <br />NOMBRE/APELLIDO</div> : null}
        {
            bookingStore?.byFirstName?.map((book: any, i: number) => {
                return (
                    <>
                        <div key={`c${i}`}>
                            <div >Booking {i}</div>
                            <div ><strong>First Name:  </strong>{book.pax_id.first_name}</div>
                            <div ><strong>Last Name:  </strong>{book.pax_id.last_name}</div>
                            <div ><strong>ID ID ID:  </strong>{book.id}</div>
                            <div ><strong>Checkin:  </strong>{book.booking_id.checkin}</div>
                            <div ><strong>Checkout:  </strong>{book.booking_id.checkout}</div>
                            <hr />
                            <hr />
                        </div>
                    </>
                )
            })
        }
        {
            bookingStore?.byLastName?.map((book: any, i: number) => {
                return (
                    <>
                        <div key={`d${i}`}>
                            <div >Booking {i}</div>
                            <div ><strong>First Name:  </strong>{book.pax_id.first_name}</div>
                            <div ><strong>Last Name:  </strong>{book.pax_id.last_name}</div>
                            <div ><strong>ID ID ID:  </strong>{book.id}</div>
                            <div ><strong>Checkin:  </strong>{book.booking_id.checkin}</div>
                            <div ><strong>Checkout:  </strong>{book.booking_id.checkout}</div>
                            <hr />
                            <hr />
                        </div>
                    </>
                )
            })
        }</>
)
} */

// import React, { useState } from 'react';
// import { Input, AutoComplete } from 'antd';
// import { SelectProps } from 'antd/es/select';

// function getRandomInt(max: number, min: number = 0) {
//   return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
// }

// const searchResult = (query: string) =>
//   new Array(getRandomInt(5))
//     .join('.')
//     .split('.')
//     .map((_, idx) => {
//       const category = `${query}${idx}`;
//       return {
//         value: category,
//         label: (
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//             }}
//           >
//             <span>
//               Found {query} on{' '}
//               <a
//                 href={`https://s.taobao.com/search?q=${query}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {category}
//               </a>
//             </span>
//             <span>{getRandomInt(200, 100)} results</span>
//           </div>
//         ),
//       };
//     });

// const Complete = () => {
//   const [options, setOptions] = useState<SelectProps<object>['options']>([]);

//   const handleSearch = (value: string) => {
//     setOptions(value ? searchResult(value) : []);
//   };

//   const onSelect = (value: string) => {
//     console.log('onSelect', value);
//   };


// export const SearchBooking=()=>{
//     const [options, setOptions] = useState<SelectProps<object>['options']>([]);

//   const handleSearch = (value: string) => {
//     setOptions(value ? searchResult(value) : []);
//   };

//   const onSelect = (value: string) => {
//     console.log('onSelect', value);
//   };

//   return (
//     <AutoComplete
//       dropdownMatchSelectWidth={252}
//       style={{ width: 300 }}
//       options={options}
//       onSelect={onSelect}
//       onSearch={handleSearch}
//     >
//       <Input.Search size="large" placeholder="input here" enterButton />
//     </AutoComplete>
//   );
// };
