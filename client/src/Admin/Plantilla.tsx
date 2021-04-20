import { Layout } from "antd";
import { MenuLeft } from "./MenuLeft";
import { HeaderAdmin } from "./HeaderAdmin";
import { FooterAdmin } from "./FooterAdmin";
import { Inicio } from "./components/Inicio";


//////////////////////////////////////////////////////////
//          ESTA ES LA PLANTILLA ADMINISTRATIVA         //
//                                                      //
//  1. Copiar este archivo en su respectiva carpeta:    //
//          src/Admin/components                        //
//  2. Renombrarlo como se va a llamar su componente    //
//  3. Revisar las primeras lineas que si este bien     //
//     importados los archivos (lineas 2,3,4,5)         //
//  4. Agregar nombre de la pagina en el manu lateral   //
//     que se encuentra en el archivo MenuLeft.tsx      //
//  5. Reemplazar el componente Inicio (linea 37)       //
//     por el componente que renombro en el paso 2      //
//  6. Guardar el componente nuevo en:                  //
//      src/Admin/components                            //
//                                                      //
//          happy coding                                //
//////////////////////////////////////////////////////////


export const Plantilla = () => {


    const { Content } = Layout;

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <MenuLeft />

            <Layout>
                <HeaderAdmin />
                <Content style={{ margin: "0 16px" }}>

                    {/* aca va el componente */}
                    <Inicio />



                </Content>
                <FooterAdmin />
            </Layout>
        </Layout>
    )
}
