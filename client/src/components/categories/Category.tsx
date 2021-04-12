import { Button,Layout,Image } from 'antd';
import './Category.less';
const {Sider,Content} = Layout
const Category = ({ categ }: any): JSX.Element => {

        return (
       
        <div className='categoryContainer'>
            <Layout className='categoryLayout'>
                <Content className='categoryContent'>
                    <Image src={categ.images[0]} width={600} />
                </Content>
                <Sider width={250} className='categorySider'>
                    <div>
                        <h3 className='categoryH3'>
                          {categ.name}
                        </h3>
                    </div>
                    <div>
                        <p className='categoryP'>
                            {categ.description}
                        </p>
                    </div>
                    <div className='categoryButtons'>
                        <Button type='link' className='categoryMoreInfoButton'>
                            More Info...
                        </Button>
                    </div>
                </Sider>
            </Layout>


        </div>  
        
        )
}
    
    
    
       
      



export default Category;