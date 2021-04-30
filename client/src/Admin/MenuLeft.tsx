import { Menu } from "antd";
import {
    PieChartOutlined,
} from "@ant-design/icons";
//import hotelImg from './hotel.png'
import { useDispatch, useSelector } from 'react-redux';
import { initialStateProps } from '../reducers/adminReducer';
import { changePage, loginUser, sidebarChange } from "./actions/adminUi";
import { Layout } from "antd";
import { NavLink, useHistory } from "react-router-dom";
import { FaHotel, FaDoorClosed, FaUserAlt, FaConciergeBell } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { GiBedLamp } from "react-icons/gi";
import { SiCashapp } from "react-icons/si";
import './panel.less';
import { useEffect } from 'react';

// type MenuProps = {
//     page: string,
//     setPage: Dispatch<SetStateAction<string>>;
// }

//////////////////////////////////////////////////////////////
//          COMO AGREGAR LA PAGINA ADMINISTRATIVA           //
//                                                          //
//  1. Agregar el NOMBRE de la pagina en el array paginas   //
//  2. Copiar un nuevo Menu.Item (son 3 lineas)             //
//  3. Cambiarle a las lineas copiadas el numero del array  //
//     por la posicion en la que quedó el titulo.           //
//      Ej: paginas[0] (donde 0 es la posicion del array)   //
//  4. Cambiar la direccion del NavLink. '/admin/nuevapag   //
//  5. Puede cambiar el Icono en icon=""                    //
//  6. Agregar la ruta en la carpeta routes apuntando al    //
//     template que creo nuevo basado en el archivo         //
//     Plantilla.tsx                                        //
//                                                          //
//      Si todo sale bien deberia funcionar ahora.          //
//                                                          //
//////////////////////////////////////////////////////////////


const paginas = ['Inicio', 'Rooms', 'Categories', 'Types', 'Users', 'Checkin/Checkout', 'Paxes', 'Bookings', 'Discounts', 'Events', 'NewsLetter']

export const MenuLeft = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        loginUser()
            .then(r => {
                if (!r) {
                    history.push('/')
                }
            })
    }, [history]);

    const { sidebarColapsed, page } = useSelector((state: initialStateProps) => state.adminui);
    const onCollapse = () => {
        dispatch(sidebarChange());
    };
    const setPage = (page: string) => {
        dispatch(changePage(page));
    }
    const { Sider } = Layout;
    return (
        <>
            <Sider collapsible collapsed={sidebarColapsed} onCollapse={onCollapse}>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[page]}
                    mode="vertical-left"
                >
                    <div style={{ height: '60px' }} className="panel_name">
                        <div >
                            <FaHotel size="40" />

                            {/* <img
                            src={hotelImg}
                            style={{ height: "55px", marginLeft: '10px' }}
                            alt="Hotel logo" /> */}
                        </div>
                        <div>
                            {
                                !sidebarColapsed && 'Hotel Admin'
                            }

                        </div>
                    </div>
                    <Menu.Item key={paginas[0]} icon={<PieChartOutlined />} onClick={() => setPage(paginas[0])}>
                        <NavLink to="/admin">{paginas[0]}</NavLink>
                    </Menu.Item>
                    <Menu.Item key={paginas[1]} icon={<FaDoorClosed />} onClick={() => setPage(paginas[1])}>
                        <NavLink to="/admin/rooms">{paginas[1]}</NavLink>
                    </Menu.Item>
                    <Menu.Item key={paginas[2]} icon={<GiBedLamp />} onClick={() => setPage(paginas[2])}>
                        <NavLink to="/admin/categories">{paginas[2]}</NavLink>
                    </Menu.Item>
                    <Menu.Item key={paginas[3]} icon={<IoIosBed />} onClick={() => setPage(paginas[3])}>
                        <NavLink to="/admin/types">{paginas[3]}</NavLink>
                    </Menu.Item>
                    <Menu.Item key={paginas[4]} icon={<FaUserAlt />} onClick={() => setPage(paginas[4])}>
                        <NavLink to="/admin/users">{paginas[4]}</NavLink>
                    </Menu.Item>
                    <Menu.Item key={paginas[5]} icon={<FaConciergeBell />} onClick={() => setPage(paginas[5])}>
                        <NavLink to="/admin/checkin">{paginas[5]}</NavLink>
                    </Menu.Item>
                    <Menu.Item key={paginas[6]} icon={<FaUserAlt />} onClick={() => setPage(paginas[6])}>
                        <NavLink to="/admin/paxes">{paginas[6]}</NavLink>
                    </Menu.Item>
                    <Menu.Item key={paginas[7]} icon={<FaUserAlt />} onClick={() => setPage(paginas[7])}>
                        <NavLink to="/admin/bookings">{paginas[7]}</NavLink>
                    </Menu.Item>
                    <Menu.Item key={paginas[8]} icon={<SiCashapp />} onClick={() => setPage(paginas[8])}>
                        <NavLink to="/admin/discounts">{paginas[8]}</NavLink>
                    </Menu.Item>
                    <Menu.Item key={paginas[9]} icon={<SiCashapp />} onClick={() => setPage(paginas[9])}>
                        <NavLink to="/admin/events">{paginas[9]}</NavLink>
                    </Menu.Item>
                    <Menu.Item key={paginas[10]} icon={<SiCashapp />} onClick={() => setPage(paginas[10])}>
                        <NavLink to="/admin/newsletter">{paginas[10]}</NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
        </>
    )
}