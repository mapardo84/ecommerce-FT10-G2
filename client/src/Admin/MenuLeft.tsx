import { Menu } from "antd";
import {
    PieChartOutlined,
    WalletOutlined,
} from "@ant-design/icons";
import hotelImg from './hotel.png'
import { useDispatch, useSelector } from 'react-redux';
import { initialStateProps } from '../reducers/adminReducer';
import { changePage, sidebarChange } from "./actions/adminUi";
import { Layout } from "antd";
import { NavLink } from "react-router-dom";

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


const paginas = ['Inicio', 'Rooms']

export const MenuLeft = () => {
    const dispatch = useDispatch()

    const { sidebarColapsed, page } = useSelector((state: initialStateProps) => state.adminui)

    const onCollapse = () => {
        dispatch(sidebarChange())
    };

    const setPage = (page: string) => {
        dispatch(changePage(page))
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
                    <div style={{ height: '60px' }}>
                        <img
                            src={hotelImg}
                            style={{ height: "55px", marginLeft: '10px' }}
                            alt="Hotel logo" />
                        {
                            !sidebarColapsed && 'Hotel Admin'
                        }
                    </div>
                    <Menu.Item key={paginas[0]} icon={<PieChartOutlined />} onClick={() => setPage(paginas[0])}>
                        <NavLink to="/admin">{paginas[0]}</NavLink>
                    </Menu.Item>
                    <Menu.Item key={paginas[1]} icon={<WalletOutlined />} onClick={() => setPage(paginas[1])}>
                        <NavLink to="/admin/rooms">{paginas[1]}</NavLink>
                    </Menu.Item>




                </Menu>
            </Sider>
        </>
    )
}
