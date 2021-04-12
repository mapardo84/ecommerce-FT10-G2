import { Layout } from 'antd';
import '../content/content.less'
import "antd/dist/antd.less";

const { Content } = Layout;


export const ContentRender = () => {
    return (
        <div>
<Layout>
<Content style={{ padding: '0 50px' }}>
      
      <div className="site-layout-content">Content</div>
    </Content>
      </Layout>
   

        </div>
    )
}
